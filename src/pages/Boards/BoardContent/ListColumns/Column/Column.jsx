import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import Cloud from '@mui/icons-material/Cloud'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import Tooltip from '@mui/material/Tooltip'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AddCardIcon from '@mui/icons-material/AddCard'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import Button from '@mui/material/Button'
import ListCards from './ListCards/ListCards'
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ACTIVE_DRAG_ITEM_TYPE } from '~/constants/constant'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close';
import { cloneDeep } from 'lodash'
import { createNewCardApi, updateColumnDetailsApi } from '~/apis'
import {
    updateCurrentActiveBoard,
    selectCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'
import { useDispatch, useSelector } from 'react-redux'
import ToggleFocusInput from '~/components/Form/ToggleFocusInput'
function Column({ column }) {
    // Lấy dữ liệu state trong redux
    const board = useSelector(selectCurrentActiveBoard)
    const dispatch = useDispatch()
    //
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: column._id,
        data: {
            ...column,
            type: ACTIVE_DRAG_ITEM_TYPE.COLUMN
        }



    });

    const dndKitColumnStyles = {
        touachAction: 'none',
        transform: CSS.Translate.toString(transform),
        transition,
        height: '100%',
        opacity: isDragging ? 0.5 : undefined
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    }
    const orderedCards = column?.cards

    const [openNewCardForm, setOpenNewCardForm] = useState(false)
    const toggleOpenNewCardForm = () => {
        setOpenNewCardForm(!openNewCardForm)
    }
    const [newCardTitle, setNewCardTitle] = useState('')
    const addNewCard = async () => {
        if (!newCardTitle) {
            alert('Card title is required')
            return
        }
        //Call API add new card
        const createdCard = await createNewCardApi({
            title: newCardTitle,
            columnId: column._id,
            boardId: board._id

        })
        const newBoard = cloneDeep(board)
        const columnToUpdate = newBoard.columns.find(c => c._id === createdCard.columnId)
        if (columnToUpdate) {
            if (columnToUpdate.cards.some(card => card.FE_PlaceholderCard)) {
                columnToUpdate.cards = [createdCard]
                columnToUpdate.cardOrderIds = [createdCard._id]
            }
            else {
                columnToUpdate.cards.push(createdCard)
                columnToUpdate.cardOrderIds.push(createdCard._id)
            }

        }
        dispatch(updateCurrentActiveBoard(newBoard))

        //Reset form    
        toggleOpenNewCardForm()
        setNewCardTitle('')
    }
    const onUpdateColumnTitle = (newTitle) => {
        updateColumnDetailsApi(column._id, { title: newTitle }).then(() => {
            const newBoard = cloneDeep(board)

            const columnToUpdate = newBoard.columns.find(c => c._id === column._id)

            if (columnToUpdate) {

                columnToUpdate.title = newTitle
            }
            dispatch(updateCurrentActiveBoard(newBoard))
        })
    }
    return (
        <div ref={setNodeRef}
            style={dndKitColumnStyles}
            {...attributes}
        >
            <Box
                {...listeners}
                sx={{
                    minWidth: '300px',
                    maxWidth: '300px',
                    bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'rgba(30, 30, 30, 0.65)' : "rgba(255, 255, 255, 0.75)"),
                    backdropFilter: "blur(12px)",
                    borderRadius: "15px",
                    boxShadow: (theme) => theme.palette.mode === "light"
                        ? "0 4px 20px rgba(0,0,0,0.1)"
                        : "0 4px 20px rgba(0,0,0,0.5)",
                    ml: 2,
                    height: 'fit-content',
                    maxHeight: (theme) => `calc(${theme.trelloCustom.boardContentHeight} - ${theme.spacing(5)})`
                }}
            >

                {/* Box header */}
                <Box sx={{
                    height: (theme) => theme.trelloCustom.columnHeaderHeight,
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    {/* <Typography variant='h6'
                        sx={{
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >{column?.title} </Typography> */}
                    <ToggleFocusInput
                        value={column?.title}
                        onChangedValue={onUpdateColumnTitle}
                        data-no-dnd='true'
                    />
                    <Box>
                        <Tooltip title='More options'>
                            <KeyboardArrowDownIcon
                                sx={{
                                    color: 'action', cursor: 'pointer'
                                }}
                                id="basic-column-dropdown"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}

                            />
                        </Tooltip>

                        <Menu
                            id="basic-column-dropdown"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-column-dropdown'
                            }}
                        >
                            <MenuItem>
                                <ListItemIcon> <AddCardIcon fontSize="small" /></ListItemIcon>
                                <ListItemText>Add new card</ListItemText>
                            </MenuItem>

                            <MenuItem>
                                <ListItemIcon> <ContentCut fontSize="small" /></ListItemIcon>
                                <ListItemText>Cut</ListItemText>
                            </MenuItem>

                            <MenuItem>
                                <ListItemIcon> <ContentCopy fontSize="small" /></ListItemIcon>
                                <ListItemText>Copy</ListItemText>
                            </MenuItem>

                            <MenuItem>
                                <ListItemIcon><ContentPaste fontSize="small" /></ListItemIcon>
                                <ListItemText>Paste</ListItemText>
                            </MenuItem>

                            <Divider />
                            <MenuItem>
                                <ListItemIcon><DeleteForeverIcon fontSize="small" /></ListItemIcon>
                                <ListItemText>Remove this column</ListItemText>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon><Cloud fontSize="small" /></ListItemIcon>
                                <ListItemText>Archive this column</ListItemText>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Box>
                {/*Box item */}
                <ListCards cards={orderedCards} />
                {/*Box footer */}
                <Box sx={{
                    height: (theme) => theme.trelloCustom.columnFooterHeight,
                    p: 2,
                }}>
                    {!openNewCardForm
                        ? <Box sx={{
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <Button startIcon={<AddCardIcon />} onClick={toggleOpenNewCardForm}>Add new card</Button>
                            <Tooltip title="Drag to move">
                                <DragHandleIcon sx={{
                                    cursor: 'pointer'
                                }} />

                            </Tooltip>
                        </Box>
                        : <Box sx={{
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        }}>
                            <TextField
                                value={newCardTitle}
                                onChange={(e) => setNewCardTitle(e.target.value)}
                                label="Enter card title..." type="text" size="small" variant='outlined' autoFocus
                                data-no-dnd='true'
                                sx={{

                                }} />
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Button
                                    className='interceptor-loading'
                                    onClick={addNewCard} variant='contained' color='success' size='small' data-no-dnd='true'
                                    sx={{
                                        boxShadow: 'none',
                                        border: '0.5px solid',
                                        borderColor: (theme) => theme.palette.success.main,
                                        '&:hover': {
                                            bgcolor: (theme) => theme.palette.success.dark,
                                            boxShadow: 'none', borderColor: (theme) => theme.palette.success.main
                                        },
                                        height: '40px'
                                    }}>
                                    Add
                                </Button>
                                <CloseIcon
                                    onClick={toggleOpenNewCardForm}
                                    fontSize='small'
                                    cursor='pointer'
                                    data-no-dnd='true'
                                    sx={{
                                        color: 'white',
                                        cursor: 'pointer',
                                        '&:hover': {
                                            bgcolor: (theme) => theme.palette.warning.dark,
                                            boxShadow: 'none', borderColor: (theme) => theme.palette.success.main
                                        }
                                    }} />
                            </Box>
                        </Box>


                    }



                </Box>
            </Box>
        </div>
    )
}

export default Column
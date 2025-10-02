import { useState } from 'react'
import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify'
import { generatePlaceholderCard } from '~/utils/formatter'
import { cloneDeep } from 'lodash'
import { createNewColumnApi } from '~/apis'
import {
    updateCurrentActiveBoard,
    selectCurrentActiveBoard
} from '~/redux/activeBoard/activeBoardSlice'
import { useDispatch, useSelector } from 'react-redux'
function ListColumns({ columns }) {
    const board = useSelector(selectCurrentActiveBoard)
    const dispatch = useDispatch()
    const [openNewColumnForm, setOpenNewColumnForm] = useState(false)

    const toggleOpenNewColumnForm = () => {
        setOpenNewColumnForm(!openNewColumnForm)
    }

    const [newColumnTitle, setNewColumnTitle] = useState('')

    const addNewColumn = async () => {
        if (!newColumnTitle) {
            toast.error('Column title is required')
            return
        }

        //Call API add new column
        const createdColumn = await createNewColumnApi({
            title: newColumnTitle,
            boardId: board._id
        })
        //them card placeholder
        createdColumn.cards = [generatePlaceholderCard(createdColumn)]
        createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]
        //cap nhat lai state board
        // bản chất của spread operator là  Shallow copy/clone nên dính phải rules immutability trong redux toolkit ko dùng dc push
        //Cách 2 dùng concat để merge mảng
        const newBoard = cloneDeep(board)
        newBoard.columns.push(createdColumn)
        newBoard.columnOrderIds.push(createdColumn._id)
        dispatch(updateCurrentActiveBoard(newBoard))

        //Reset form    
        toggleOpenNewColumnForm()
        setNewColumnTitle('')
    }
    return (
        <SortableContext items={columns.map(column => column._id)} strategy={horizontalListSortingStrategy}>
            <Box sx={{
                bgcolor: 'inherit',
                width: '100%',
                height: '100%',
                overflowX: 'auto',
                display: 'flex',
                overFloxY: 'hidden',
                "&::-webkit-scrollbar-track": { m: 2 }
            }}>
                {columns?.map(column => <Column key={column._id} column={column} />)}


                {/* Add new column */}
                {!openNewColumnForm
                    ? <Box onClick={toggleOpenNewColumnForm} sx={{
                        minWidth: '250px',
                        maxWidth: '250px',
                        mx: 2,
                        borderRadius: '6px',
                        height: 'fit-content',
                        bgcolor: '#ffffff3d'
                    }}>
                        <Button startIcon={<NoteAddIcon />} sx={{
                            color: 'white',
                            width: '100%',
                            justifyContent: 'flex-start',
                            pl: 2.5,
                            py: 1
                        }} >Add column</Button>

                    </Box>
                    : <Box sx={{
                        minWidth: '250px',
                        maxWidth: '250px',
                        mx: 2,
                        borderRadius: '6px',
                        height: 'fit-content',
                        bgcolor: '#ffffff3d',
                        p: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1

                    }}>  <TextField
                            value={newColumnTitle}
                            onChange={(e) => setNewColumnTitle(e.target.value)}
                            label="Enter column title..." type="text" size="small" variant='outlined' autoFocus
                            sx={{
                                '& label': { color: 'white' },
                                '& input': { color: 'white' },
                                '& label.Mui-focused': { color: 'white' },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'white'
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'white'
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'white'
                                    }
                                }
                            }} />
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Button onClick={addNewColumn} variant='contained' color='success' size='small'
                                sx={{
                                    boxShadow: 'none',
                                    border: '0.5px solid',
                                    borderColor: (theme) => theme.palette.success.main,
                                    '&:hover': {
                                        bgcolor: (theme) => theme.palette.success.dark,
                                        boxShadow: 'none', borderColor: (theme) => theme.palette.success.main
                                    }
                                }}>
                                Add Column

                            </Button>
                            <CloseIcon
                                onClick={toggleOpenNewColumnForm}
                                fontSize='small'
                                cursor='pointer'
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
        </SortableContext>
    )
}

export default ListColumns
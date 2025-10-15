import React from 'react'
import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import AttachmentIcon from '@mui/icons-material/Attachment';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ACTIVE_DRAG_ITEM_TYPE } from '~/constants/constant'
import { useDispatch } from 'react-redux';
import { updateCurrentActiveCard } from '~/redux/activeCard/activeCardSlice';
function Card({ card }) {
    const dispatch = useDispatch()
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: card._id,
        data: {
            ...card,
            type: ACTIVE_DRAG_ITEM_TYPE.CARD
        }

    });

    const dndKitCardStyles = {
        touachAction: 'none',
        transform: CSS.Translate.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : undefined
    }

    const shouldShowCardActions = () => {
        !!card?.memberIds?.length || !!card?.comments?.length || !!card?.attachments?.length
    }

    const setActiveCard = () =>{
        dispatch(updateCurrentActiveCard(card))
    }
    return (
        <MuiCard
            onClick = {setActiveCard}
            ref={setNodeRef}
            style={dndKitCardStyles}
            {...attributes}
            {...listeners}
            sx={{
                cursor: 'pointer',
                borderRadius: 2, // bo tròn khớp column
                bgcolor: (theme) =>
                    theme.palette.mode === "light"
                        ? "rgba(255,255,255,0.85)"   // nền trắng trong suốt nhẹ
                        : "rgba(60, 60, 60, 0.5) ",     // nền tối trong suốt nhẹ
                boxShadow: '0 1px 3px rgba(0,0,0,0.15)', // shadow mềm hơn
                border: '1px solid transparent',
                overflow: 'unset',
                display: card?.FE_PlaceholderCard ? 'none' : 'block',
                transition: 'all 0.2s ease-in-out',

                '&:hover': {
                    transform: 'translateY(-2px)', // hover nổi khẽ
                    boxShadow: '0 4px 8px rgba(0,0,0,0.25)',
                    borderColor: (theme) => theme.palette.primary.main,
                    bgcolor: (theme) =>
                        theme.palette.mode === "light"
                            ? "rgba(255,255,255,0.95)"
                            : "rgba(40,40,40,0.8)"
                }
            }}
        >
            {card?.cover &&
                <CardMedia
                    sx={{ height: 140 }}
                    image={card?.cover}
                />
            }

            <CardContent sx={{
                p: 1.5,
                '&:last-child': { p: 1.5 }
            }}>
                <Typography >
                    {card?.title}
                </Typography>

            </CardContent>

            {shouldShowCardActions() &&
                <CardActions sx={{ p: '0 4px 8px 4px' }}>
                    {!!card?.memberIds?.length &&
                        <Button startIcon={<GroupIcon />} size="small">{card?.memberIds?.length}</Button>
                    }
                    {!!card?.comments?.length &&
                        <Button startIcon={<ModeCommentIcon />} size="small">{card?.comments?.length}</Button>
                    }
                    {!!card?.attachments?.length &&
                        <Button startIcon={<AttachmentIcon />} size="small">{card?.attachments?.length}</Button>
                    }
                </CardActions>
            }


        </MuiCard>
    )
}

export default Card
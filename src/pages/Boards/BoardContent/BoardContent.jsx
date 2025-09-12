import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sort';
import { DndContext, useSensor, useSensors, TouchSensor, MouseSensor, DragOverlay, defaultDropAnimationSideEffects, closestCorners } from '@dnd-kit/core';
import { useEffect, useState } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import Column from './ListColumns/Column/Column';
import Card from './ListColumns/Column/ListCards/Card/Card';
import { cloneDeep } from 'lodash'
import { ACTIVE_DRAG_ITEM_TYPE } from '~/constants/constant'
function BoardContent({ board }) {
  //yeeu cau di chuyen 10px moi kich hoat drag
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
  const sensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumns] = useState([])
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null)
  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))

  }, []);

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }
  //Tìm 1 column theo cardId
  const findColumnByCardId = (cardId) => {
    return orderedColumns.find(column => column.cards?.map(card => card._id)?.includes(cardId))
  }
  //function chung xử lý việc cập nhật lại state trong trường hợp  di chuyển card giữa 2 column khác nhau
  const moveCardBetweenDifferentColumns = () => {

  }
  const handleDragStart = (event) => {
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.type)
    setActiveDragItemData(event?.active?.data?.current)
    if (ACTIVE_DRAG_ITEM_TYPE.CARD === event?.active?.data?.current?.type) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id))
    }
  }

  const handleDragOver = (event) => {
    //Không làm gì nếu kéo column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return
    //Xử lý kéo thả card
    const { active, over } = event
    if (!active || !over) return


    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
    const { id: overCardId } = over
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)
    // xử lý kéo thả card cùng column
    if (!activeColumn || !overColumn) return
    // Nếu kéo 2 column khác nhau thì mới chạy if này, còn kéo card trong chính column của nó thì k làm gì 
    //Vì đây là đoạn xử lý lúc kéo handleDragOver, còn xử lý lúc kéo xong xuôi thì nó lại là vấn đề khác ở (handleDragEnd)
    if (activeColumn._id !== overColumn._id) {
      setOrderedColumns(prevColumn => {
        // Tìm vị trí của overCard trong column đích (nơi card sắp được thả)
        const overCardIndex = overColumn?.cards.findIndex(card => card._id === overCardId)
        //Logic tính toán lấy cardIndex mới (trên hoặc dưới overCard)
        let newCardIndex
        const isBelowOverItem =
          active.rect.current.translated && active.rect.current.translated.bottom >
          over.rect.top + over.rect.height
        const modifier = isBelowOverItem ? 1 : 0
        newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

        const nextColumns = cloneDeep(prevColumn)         
        const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
        const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

        if (nextActiveColumn) {
          nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)
          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
        }
        if (nextOverColumn) {
          nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)
          const rebuild_activeDraggingCardData = {
            ...activeDraggingCardData,
            columnId: nextOverColumn._id
          }
          nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuild_activeDraggingCardData)
          nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
        }

        return nextColumns
      })
    }
  }
  const handleDragEnd = (event) => {
    const { active, over } = event
    if (!active || !over) return
    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
    const { id: overCardId } = over
    const activeColumn = findColumnByCardId(activeDraggingCardId)

    const overColumn = findColumnByCardId(overCardId)

    //Xử lý kéo thả cards
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && active.id !== over.id) {


      if (!activeColumn || !overColumn) return

      if (oldColumnWhenDraggingCard._id !== overColumn._id) {

        setOrderedColumns(prevColumn => {
          // Tìm vị trí của overCard trong column đích (nơi card sắp được thả)
          const overCardIndex = overColumn?.cards.findIndex(card => card._id === overCardId)
          //Logic tính toán lấy cardIndex mới (trên hoặc dưới overCard)
          let newCardIndex
          const isBelowOverItem =
            active.rect.current.translated && active.rect.current.translated.top >
            over.rect.top + over.rect.height
          const modifier = isBelowOverItem ? 1 : 0
          newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

          const nextColumns = cloneDeep(prevColumn)
          const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
          const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

          if (nextActiveColumn) {
            nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)
            nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
          }
          if (nextOverColumn) {
            nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)
            const rebuild_activeDraggingCardData = {
              ...activeDraggingCardData,
              columnId: nextOverColumn._id
            }
            nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuild_activeDraggingCardData)
            nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
          }

          return nextColumns
        })

      } else {
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(c => c._id === activeDragItemId)
        const newCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(c => c._id === overCardId)
        const dndOrderedCards = arrayMove(oldColumnWhenDraggingCard?.cards, oldCardIndex, newCardIndex)

        setOrderedColumns(prevColumns => {
          const nextColumns = cloneDeep(prevColumns)
          const targetColumn = nextColumns.find(c => c._id === overColumn._id)
          targetColumn.cards = dndOrderedCards

          targetColumn.cardOrderIds = dndOrderedCards.map(c => c._id)
          return nextColumns
        })
      }
    }
    //Xử lý kéo thả columns
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && active.id !== over.id) {
      const oldColumnIndex = orderedColumns.findIndex(c => c._id === active.id)
      const newColumnIndex = orderedColumns.findIndex(c => c._id === overCardId)

      setOrderedColumns(arrayMove(orderedColumns, oldColumnIndex, newColumnIndex))
    }
    // Reset state
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumnWhenDraggingCard(null)
  }
  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      collisionDetection={closestCorners}
    >

      <Box sx={{
        width: '100%',
        display: 'flex',
        height: (theme) => theme.trelloCustom.boardContentHeight,
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : 'rgba(34, 114, 167, 1)'),
        overflowX: 'auto',
        overFloxY: 'hidden',
        p: '10px 0 0px 10px',
      }}>
        <ListColumns columns={orderedColumns} />

        <DragOverlay dropAnimation={dropAnimation}>
          {!activeDragItemType && null}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData} />}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData} />}
        </DragOverlay>

      </Box>
    </DndContext>
  )
}

export default BoardContent
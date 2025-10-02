import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { DndContext, useSensor, useSensors, DragOverlay, defaultDropAnimationSideEffects, pointerWithin, closestCorners, getFirstCollision, closestCenter } from '@dnd-kit/core';
import { useEffect, useState, useCallback, useRef } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import Column from './ListColumns/Column/Column';
import Card from './ListColumns/Column/ListCards/Card/Card';
import { cloneDeep, isEmpty } from 'lodash'
import { ACTIVE_DRAG_ITEM_TYPE } from '~/constants/constant'
import { generatePlaceholderCard } from '~/utils/formatter'
import { MouseSensor, TouchSensor } from '~/customLibraries/dndKitSensors';
function BoardContent({
  board,
  moveColumns,
  moveCardInTheSameColumn,
  moveCardToDifferentColumn }) {
  //yeeu cau di chuyen 10px moi kich hoat drag
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
  const sensors = useSensors(mouseSensor, touchSensor)
  const [orderedColumns, setOrderedColumns] = useState([])
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null)
  // Điểm va chạm cuối cùng xử lý thuật toán phát hiện  va chạm
  const lastOverId = useRef(null)
  useEffect(() => {
    setOrderedColumns(board?.columns)
  }, [board]);

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

  const moveCardBetweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData,
    triggerFrom
  ) => {
    setOrderedColumns(prevColumn => {
      // Tìm vị trí của overCard trong column đích (nơi card sắp được thả)
      const overCardIndex = overColumn?.cards.findIndex(card => card._id === overCardId)
      //Logic tính toán lấy cardIndex mới (trên hoặc dưới overCard)
      let newCardIndex
      const isBelowOverItem = active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height
      const modifier = isBelowOverItem ? 1 : 0
      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

      const nextColumns = cloneDeep(prevColumn)
      // Tìm lại 2 column (activeColumn và overColumn) trong nextColumns để thao tác
      // Vì prevColumn là state cũ, nếu ta thao tác trực tiếp trên prevColumn sẽ bị lỗi (ko render lại giao diện)
      // Nên ta cần cloneDeep để tạo ra 1 bản sao hoàn toàn mới của prevColumn để thao tác
      const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
      const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)


      if (nextActiveColumn) {
        //Xóa card khỏi column cũ (activeColumn)
        nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)
        //Thêm placeholdercard nếu column rỗng
        if (isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
        }

        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)

      }
      if (nextOverColumn) {
        // Thêm card vào column mới (overColumn)
        // Trước khi thêm thì xóa card đang kéo (nếu có) trong column đích để tránh trường hợp kéo card từ column này sang column khác rồi lại quay về column cũ
        // Lúc này card đang kéo sẽ có 2 bản sao trong 2 column khác nhau
        nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)
        const rebuild_activeDraggingCardData = {
          ...activeDraggingCardData,
          columnId: nextOverColumn._id
        }
        // Chèn card vào vị trí mới trong column đích
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuild_activeDraggingCardData)
        // Xoa placeholder card neu co
        nextOverColumn.cards = nextOverColumn.cards.filter(card => !card?.FE_PlaceholderCard)

        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
      }
      if (triggerFrom === 'handleDragEnd') {
        //
        moveCardToDifferentColumn(
          activeDraggingCardId,
          oldColumnWhenDraggingCard._id,
          nextOverColumn._id,
          nextColumns,
          nextOverColumn
        )
      }
      return nextColumns
    })
  }
  const handleDragStart = (event) => {
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.type)

    setActiveDragItemData(event?.active?.data?.current)

    if (ACTIVE_DRAG_ITEM_TYPE.CARD === event?.active?.data?.current?.type) {
      // Trả về column chứa card đang kéo
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
    // Tìm column chứa card đang kéo (active)
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    // Tìm column chứa card đang di chuyển đến (over)
    const overColumn = findColumnByCardId(overCardId)
    // xử lý kéo thả card cùng column
    if (!activeColumn || !overColumn) return
    // Nếu kéo 2 column khác nhau thì mới chạy if này, còn kéo card trong chính column của nó thì k làm gì 
    //Vì đây là đoạn xử lý lúc kéo handleDragOver, còn xử lý lúc kéo xong xuôi thì nó lại là vấn đề khác ở (handleDragEnd)
    if (activeColumn._id !== overColumn._id) {
      //abc
      moveCardBetweenDifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData,
        'handleDragOver'
      )
    }
  }

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (!active || !over) return

    //Xử lý kéo thả cards
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {

      const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active

      const { id: overCardId } = over

      const activeColumn = findColumnByCardId(activeDraggingCardId)

      const overColumn = findColumnByCardId(overCardId)

      if (!activeColumn || !overColumn) return
      // Nếu kéo 2 column khác nhau thì mới chạy if này, còn kéo card trong chính column của nó thì k làm gì
      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        moveCardBetweenDifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData,
          'handleDragEnd'
        )


      }
      else {
        // hành động kéo thả card trong cùng 1 column
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(card => card._id === activeDraggingCardId)

        const newCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)

        const dndOrderedCards = arrayMove(oldColumnWhenDraggingCard?.cards, oldCardIndex, newCardIndex)

        const dndOrderedCardsIds = dndOrderedCards.map(c => c._id)
        setOrderedColumns(prevColumns => {
          const nextColumns = cloneDeep(prevColumns)

          //Tìm lại column đích (overColumn) trong nextColumns để thao tác
          const targetColumn = nextColumns.find(column => column._id === overColumn._id)
          //Cập nhật lại cards và cardOrderIds của column đó
          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCardsIds
          return nextColumns

        })
        moveCardInTheSameColumn(dndOrderedCards, dndOrderedCardsIds, oldColumnWhenDraggingCard._id)
      }
    }
    //Xử lý kéo thả columns
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {

      const oldColumnIndex = orderedColumns.findIndex(c => c._id === active.id)

      const newColumnIndex = orderedColumns.findIndex(c => c._id === over.id)

      const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)
      moveColumns(dndOrderedColumns)

      setOrderedColumns(dndOrderedColumns)


    }
    // Reset state
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumnWhenDraggingCard(null)
  }


  // args = arguments = Các đối số, tham số
  const collisionDetectionStrategy = useCallback((args) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      return closestCorners({ ...args })
    }
    const pointerIntersections = pointerWithin(args)

    if (!pointerIntersections.length) return

    // const intersections = !!pointerIntersections?.length ? pointerIntersections : rectIntersection(args)
    // Tìm overId đầu tiên trong danh sách va chạm 

    let overId = getFirstCollision(pointerIntersections, 'id')

    if (overId) {

      const checkColumn = orderedColumns.find(c => c._id === overId)

      if (checkColumn) {
        overId = closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter(container => {
            return (container.id !== overId) && (checkColumn?.cardOrderIds?.includes(container.id))
          })
        })[0]?.id
      }
      lastOverId.current = overId
      return [{ id: overId }]
    }
    return lastOverId.current ? [{ id: lastOverId.current }] : []


    // If there are no collisions with the pointer, return rectangle intersections

  }, [activeDragItemType])
  return (
    <DndContext
      //Thuật toán phát hiện va chạm (nếu ko có nó thì card v ới cover lớn sẽ ko kéo qua column được vì lúc này nó đang bị conflict giữa card và column), chúng ta sẽ dùng closestConners thay vì closestCenter
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      collisionDetection={collisionDetectionStrategy}
    >

      <Box sx={{
        width: '100%',
        display: 'flex',
        height: (theme) => theme.trelloCustom.boardContentHeight,
        bgcolor: 'transparent',
        overflowX: "auto",
        overflowY: "hidden",
        p: "10px 0 0px 10px",
      }}>
        <ListColumns
          columns={orderedColumns}
        />

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
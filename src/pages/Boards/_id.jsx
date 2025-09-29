import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { useState, useEffect } from 'react'
import { fetchBoardDetailsAPI, createNewColumnApi, createNewCardApi, updateBoardDetailsApi, updateColumnDetailsApi, moveCardToDifferentColumnApi } from '~/apis'
import Box from '@mui/material/Box'
import { generatePlaceholderCard } from '~/utils/formatter'
import { isEmpty } from 'lodash'
import { mapOrder } from '~/utils/sort';

function Board() {
  const [board, setBoard] = useState(null)
  useEffect(() => {
    //Gọi API lấy dữ liệu về
    const boardId = '68d947219caaf619948c733a '
    fetchBoardDetailsAPI(boardId).then(board => {
      board.columns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
      board.columns.forEach(column => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]
        }
        else {
          column.cards = mapOrder(column?.cards, column?.cardOrderIds, '_id')
        }

      })
      setBoard(board)
    })
  }, [])

  // nhiem vu goi api tao moi column va lam lai du lieu state board
  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnApi({
      ...newColumnData,
      boardId: board._id
    })
    //them card placeholder
    createdColumn.cards = [generatePlaceholderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]
    //cap nhat lai state board

    const newBoard = { ...board }
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    setBoard(newBoard)
  }


  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardApi({
      ...newCardData,
      boardId: board._id,

    })
    const newBoard = { ...board }
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

      //
    }
    setBoard(newBoard)
  }

  const moveColumns = (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    setBoard(newBoard)

    //call api update lai thu tu column tren board
    updateBoardDetailsApi(newBoard._id, { columnOrderIds: dndOrderedColumnsIds })
  }

  const moveCardInTheSameColumn = (dndOrderedCards, dndOrderedCardsIds, columnId) => {
    const newBoard = { ...board }

    const columnToUpdate = newBoard.columns.find(column => column._id === columnId)

    if (columnToUpdate) {

      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardsIds
    }
    console.log(dndOrderedCardsIds)
    setBoard(newBoard)
    //call api update lai thu tu column tren board
    updateColumnDetailsApi(columnId, { cardOrderIds: dndOrderedCardsIds })
  }

  const moveCardToDifferentColumn = (currentCardId, prevColumnId, nextColumnId, dndOrderedColumns,nextOverColumn) => {


    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds

    setBoard(newBoard)

    //
    let prevCardOrderIds = dndOrderedColumns.find(c => c._id === prevColumnId)?.cardOrderIds 
    
if (prevCardOrderIds[0]?.includes('placeholder-card')) prevCardOrderIds = []


    moveCardToDifferentColumnApi({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find(c => c._id === nextColumnId)?.cardOrderIds
    })
  }
  if (!board) {
    return (
      <Box>Loading...</Box>
    )
  }
  return (

    <Container disableGutters maxWidth={false} sx={{ height: '100vh', minWidth: '100vw' }}>
      <AppBar />
      <Box sx={{
        backgroundImage: (theme) => theme.palette.mode === "light"
          ? `
    linear-gradient(135deg, #0079bf, #5067c5, #9b51e0, #ff7eb9, #7bdff2),
    radial-gradient(circle at top left, rgba(255,255,255,0.4), transparent 70%)
  `
          : `
    linear-gradient(135deg, #001F3F, #2C3E50, #4B0082, #8B008B, #006666),
    radial-gradient(circle at top left, rgba(255,255,255,0.15), transparent 70%)
  `,
        backgroundBlendMode: "overlay",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        transition: "background-image 0.5s ease",
      }}>
        <BoardBar board={board} />
        <BoardContent
          board={board}
          createNewColumn={createNewColumn}
          createNewCard={createNewCard}
          moveColumns={moveColumns}
          moveCardInTheSameColumn={moveCardInTheSameColumn}
          moveCardToDifferentColumn={moveCardToDifferentColumn}
        />
      </Box>



    </Container>
  )
}

export default Board
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { useEffect } from 'react'
import { cloneDeep } from 'lodash'
import { createNewCardApi, updateBoardDetailsApi, updateColumnDetailsApi, moveCardToDifferentColumnApi } from '~/apis'
import Box from '@mui/material/Box'
import {
  fetchBoardDetailsAPI,
  updateCurrentActiveBoard,
  selectCurrentActiveBoard
}
  from '~/redux/activeBoard/activeBoardSlice'

import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import PageLoadingSpinner from '~/components/Loading/PageLoadingSpinner'
import ActiveCard from '~/components/Modal/ActiveCard/ActiveCard'
import { selectCurrentActiveCard } from '~/redux/activeCard/activeCardSlice';
function Board() {
  const dispatch = useDispatch()

  const board = useSelector(selectCurrentActiveBoard)
  const card = useSelector(selectCurrentActiveCard)
  const { boardId } = useParams()

  useEffect(() => {
    //Gọi API lấy dữ liệu về
    // const boardId = '68d947219caaf619948c733a '
    //call api
    dispatch(fetchBoardDetailsAPI(boardId))
  }, [dispatch, boardId])

  // nhiem vu goi api tao moi column va lam lai du lieu state board


  

  const moveColumns = (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
    // Trường hợp này gán lại toàn bộ giá trị bằng 2 mảng mới giống concat nên k sao =))
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    dispatch(updateCurrentActiveBoard(newBoard))

    //call api update lai thu tu column tren board
    updateBoardDetailsApi(newBoard._id, { columnOrderIds: dndOrderedColumnsIds })
  }

  const moveCardInTheSameColumn = (dndOrderedCards, dndOrderedCardsIds, columnId) => {
    // trường hợp này đang động đến cards đang được coi là chỉ đọc ready only -- (nested object) can thiệp sâu dữ liệu nên k sài spread được 
    const newBoard = cloneDeep(board)

    const columnToUpdate = newBoard.columns.find(column => column._id === columnId)

    if (columnToUpdate) {

      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardsIds
    }
    dispatch(updateCurrentActiveBoard(newBoard))
    //call api update lai thu tu column tren board
    updateColumnDetailsApi(columnId, { cardOrderIds: dndOrderedCardsIds })
  }

  const moveCardToDifferentColumn = (currentCardId, prevColumnId, nextColumnId, dndOrderedColumns, nextOverColumn) => {


    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
    const newBoard = cloneDeep(board)
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds

    dispatch(updateCurrentActiveBoard(newBoard))

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
      <PageLoadingSpinner caption='Loading Board ...' />
    )
  }
  return (

    <Container disableGutters maxWidth={false} sx={{ height: '100vh', minWidth: '100vw' }}>
      {/* Modal Active Card, check đóng/mở dựa theo điều kiện có tồn tại data activeCard lưu trong Redux hay không
        thì mới render. Mỗi thời điểm chỉ tồn tại một cái Modal Card đang Active  */}
      {card && <ActiveCard />}


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

          moveColumns={moveColumns}
          moveCardInTheSameColumn={moveCardInTheSameColumn}
          moveCardToDifferentColumn={moveCardToDifferentColumn}
        />
      </Box>



    </Container>
  )
}

export default Board
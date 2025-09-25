import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import {mockData} from '~/apis/mock-data'
import {useState, useEffect} from 'react'
import {fetchBoardDetailsAPI} from '~/apis'  
function Board() {
  const [board, setBoard] = useState(null)  
  useEffect (() => {
    //Gọi API lấy dữ liệu về
    const boardId = '68d4074d067a63a1aad366ee'
    fetchBoardDetailsAPI(boardId).then((data) => setBoard(data)
  )
  },[])
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh', minWidth: '100vw' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent board={board} />
    </Container>
  )
}

export default Board
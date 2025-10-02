import Board from './pages/Boards/_id'
import { Routes, Route, Navigate } from 'react-router-dom'
import NotFound from '~/pages/404/NotFound'
import Auth from '~/pages/Auth/Auth'
function App() {
  return (
    <Routes>
      {/* Redirect Route */}

      <Route path='/' element={
        // replace={true} thay the route / , hieu la route / ko nam trong history cua browser nua 

        <Navigate to="boards/68d947219caaf619948c733a" replace={true} />
      } />
      {/* BoardDetail */}

      <Route path='/boards/:boardId' element={<Board />} />
      {/* Authentication */}
      <Route path='/login' element={ <Auth/>} />
      <Route path='/register' element={<Auth/>} />
      {/* 404 route*/}
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}
export default App

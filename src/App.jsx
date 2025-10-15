import Board from './pages/Boards/_id'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import NotFound from '~/pages/404/NotFound'
import Auth from '~/pages/Auth/Auth'
import AccoutVerification from '~/pages/Auth/AccoutVerifycation'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import Settings from '~/pages/Settings/Settings'
import Boards from '~/pages/Boards'
import RedirectToBoard from '~/components/RedirectToBoard/RedirectToBoard'
const ProtectedRoute = ({ user }) => {
  if (!user) return <Navigate to='/login' replace={true} />
  return <Outlet />
}
function App() {

  const currentUser = useSelector(selectCurrentUser)
  return (
    <Routes>
      {/* Redirect Route */}
      <Route element={<ProtectedRoute user={currentUser} />} >
        <Route path='/' element={<RedirectToBoard />} />
        {/* BoardDetail */}
        <Route path='/boards/:boardId' element={<Board />} />
        <Route path='/boards' element={<Boards />} />
        {/* User Setting */}
        <Route path='/settings/account' element={<Settings />} />
        <Route path='/settings/security' element={<Settings />} />
      </Route>
      {/* Authentication */}
      <Route path='/login' element={<Auth />} />
      <Route path='/register' element={<Auth />} />
      <Route path='/account/verification' element={<AccoutVerification />} />
      {/* 404 route*/}
      <Route path='*' element={<NotFound />} />

    </Routes>
  )
}
export default App

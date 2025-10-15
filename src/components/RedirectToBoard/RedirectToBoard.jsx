import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import { getBoardId } from '~/apis/index'
import { useNavigate } from 'react-router-dom'

function RedirectToBoard() {
  const currentUser = useSelector(selectCurrentUser)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (currentUser?.email) {
      getBoardId({ email: currentUser.email }).then(res => {
        if (res && !res.error && res._id) {
          navigate(`/boards/${res._id}`, { replace: true })
        } else {
          navigate('/boards', { replace: true }) // fallback nếu không có board
        }
        setLoading(false)
      })
    }
  }, [currentUser, navigate])

  if (loading) return <div>Loading...</div>
  return null
}

export default RedirectToBoard
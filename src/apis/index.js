import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'
import { toast } from 'react-toastify'
// export const fetchBoardDetailsAPI = async (boardId) => {
//     const respone = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
//     return respone.data
// }

export const updateBoardDetailsApi = async (boardId, updateData) => {
    const respone = await authorizeAxiosInstance.put(`${API_ROOT}/v1/boards/${boardId}`, updateData)

    return respone.data
}
export const moveCardToDifferentColumnApi = async (updateData) => {
    const respone = await authorizeAxiosInstance.put(`${API_ROOT}/v1/boards/supports/moving_card`, updateData)

    return respone.data
}
//Column
export const createNewColumnApi = async (newColumnData) => {
    const respone = await authorizeAxiosInstance.post(`${API_ROOT}/v1/columns`, newColumnData)

    return respone.data
}
export const updateColumnDetailsApi = async (columnId, updateData,) => {
    const respone = await authorizeAxiosInstance.put(`${API_ROOT}/v1/columns/${columnId}`, updateData)
    return respone.data
}
//Card 
export const createNewCardApi = async (newCardData) => {
    const respone = await authorizeAxiosInstance.post(`${API_ROOT}/v1/cards`, newCardData)

    return respone.data
}
export const registerUserAPI = async (data) => {
    const response = await authorizeAxiosInstance.post(`${API_ROOT}/v1/users/register`, data)
    toast.success('Account created successfully! Please check and verify your account before logging in!', {
        theme: 'colored'
    })
    return response.data
}

export const verifyUserAPI = async (data) => {
    const response = await authorizeAxiosInstance.put(`${API_ROOT}/v1/users/verify`, data)
    toast.success('Account verified successfully! Now you can login to enjoy our services! Have a good day!', {
        theme: 'colored'
    })
    return response.data
}
export const refreshTokenAPI = async () => {
    const response = await authorizeAxiosInstance.get(`${API_ROOT}/v1/users/refresh_token`)
    return response.data
}

export const fetchBoardsAPI = async (searchPath) => {
  const response = await authorizeAxiosInstance.get(`${API_ROOT}/v1/boards${searchPath}`)
  return response.data
}

export const createNewBoardAPI = async (data) => {
  const response = await authorizeAxiosInstance.post(`${API_ROOT}/v1/boards`, data)
  toast.success('Board created successfully')
  return response.data
}


export const getBoardId = async ({ email }) => {
  const response = await authorizeAxiosInstance.get(`${API_ROOT}/v1/boards/boardId`, { params: { email } })
  return response.data
}

export const updateCardDetailsApi = async (cardId, updateData) => {
    const response = await authorizeAxiosInstance.put(`${API_ROOT}/v1/cards/${cardId}`, updateData)
    return response.data
}

// export const deleteCardApi = async (cardId) => {
//     const response = await authorizeAxiosInstance.delete(`${API_ROOT}/v1/cards/${cardId}`)
//     return response.data
// }
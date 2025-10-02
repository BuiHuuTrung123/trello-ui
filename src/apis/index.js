import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'

// export const fetchBoardDetailsAPI = async (boardId) => {
//     const respone = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
//     return respone.data
// }

export const updateBoardDetailsApi = async (boardId, updateData) => {
    const respone = await authorizeAxiosInstance.put(`${API_ROOT}/v1/boards/${boardId}`, updateData)

    return respone.data
}
export const moveCardToDifferentColumnApi = async ( updateData) => {
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



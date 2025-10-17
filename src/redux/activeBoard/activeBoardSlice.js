import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'
import { isEmpty } from 'lodash'
import { mapOrder } from '~/utils/sort';
import { generatePlaceholderCard } from '~/utils/formatter'
//Khởi tạo giá trị state của 1 cái slice trong redux
const initialState = {
    currentActiveBoard: null,
    backUpData: null,
}
//Các hành động gọi api (bất đồng bộ) và cập nhật dữ liệu vào Redux, dùng Middleware createAsyncThunk đi kèm với extraReducers
export const fetchBoardDetailsAPI = createAsyncThunk(
    'activeBoard/fetchBoardDetailsAPI',
    async (boardId) => {
        const respone = await authorizeAxiosInstance.get(`${API_ROOT}/v1/boards/${boardId}`)
        // axios trả kết quả bằng property là data
        return respone.data
    }
)
export const deleteCardApi = createAsyncThunk(
    'activeBoard/deleteCardApi',
    async (cardId) => {
        const response = await authorizeAxiosInstance.delete(`${API_ROOT}/v1/cards/${cardId}`)
        return response.data
    }
)

//Khởi tạo một slice trong kho lưu trữ redux store
export const activeBoardSlice = createSlice({
    name: 'activeBoard',
    initialState,
    //reducers : nơi xử lý dữ liệu đồng bộ
    reducers: {
        updateCurrentActiveBoard: (state, action) => {
            // action.payload là chuẩn đặt tên nhân dữ liệu vào reducer, ở đây chúng ta gán nó ra 1 biến có nghĩa hơn
            const board = action.payload

            // xử lý dữ liệu nếu cần thiết của currentActiveBoard

            //Update dữ liệu của currentActiveBoard
            state.currentActiveBoard = board
        },
        updateCardInBoard: (state, action) => {
            //update nested data
            const incomingCard = action.payload
            //Tìm dần từ board -> column -> card
            const column = state.currentActiveBoard.columns.find(i => i._id === incomingCard.columnId)
            if (column) {
                const card = column.cards.find(i => i._id === incomingCard._id)
                if (card) {
                    // card.title = incomingCard.title
                    Object.keys(incomingCard).forEach(key => {
                        card[key] = incomingCard[key]
                    })
                }
            }
        },
        moveCardInBoard: (state, action) => {
            //update nested data
            const incomingMoveCard = action.payload

            //Tìm dần từ board -> column -> card
            const column = state.currentActiveBoard.columns.find(i => i._id === incomingMoveCard.columnId)

            if (column) {
                column.cards = column.cards.filter(i => i._id !== incomingMoveCard._id)
            }
        },
        // restoreCardToBoard: (state, action) => {
        //     //update nested data
        //     const incomingMoveCard = action.payload
        //     //Tìm dần từ board -> column -> card
        //     const column = state.currentActiveBoard.columns.find(i => i._id === incomingMoveCard.columnId)
        //     if (column) {
        //         column.cards.push(incomingMoveCard)
        //     }
        // }

    },
    //extraReducers nơi xử lý dữ liệu bất đồng bộ 
    extraReducers: (builder) => {
        builder.addCase(fetchBoardDetailsAPI.fulfilled, (state, action) => {
            // action.payload là respone.data do api trả về
            let board = action.payload
            // xử lý dữ liệu nếu cần thiết của currentActiveBoard
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
            //Update dữ liệu của
            state.currentActiveBoard = board
        })

        builder.addCase(deleteCardApi.pending, (state, action) => {
         state.backUpData = JSON.parse(JSON.stringify(state.currentActiveBoard))
         
        })

        builder.addCase(deleteCardApi.fulfilled, (state, action) => {
           
        
            const incomingMoveCard = action.payload
            // console.log(incomingMoveCard)
            const column = state.currentActiveBoard.columns.find(i => i._id === incomingMoveCard.columnId)
            if (column) {
                column.cards = column.cards.filter(i => i._id !== incomingMoveCard._id)
            }
            state.backUpData = null
        })

        

    }

})

// actions: là nơi dành cho các components bên dưới gọi bằng dispatch() tới nó để cập nhật lại dữ liệu thông qua reducer (chạy đồng bộ)
// để ý ở trên thì k thấy properties actions đâu cả, bởi vì những cái actions này đơn giản là được thằng redux tạo tự động theo tên của reducer
export const { updateCurrentActiveBoard, updateCardInBoard, moveCardInBoard } = activeBoardSlice.actions
//Selector: Là nơi dành cho các components bên dưới gọi bằng hooke useSelector() để lấy dữ liệu từ trong kho redux store ra sử dụng 
export const selectCurrentActiveBoard = (state) => {
    return state.activeBoard.currentActiveBoard
}
// cái file này tên là activeBoardSlice nhưng chúng ta cần export 1 thứ tên là Reducer  
// export default activeBoardSlice.reducer
//reducer
// Đó chính là hàm reducer tổng hợp của slice
// Nó biết cách lắng nghe tất cả các action mà bạn khai báo trong reducers.
// Khi bạn import và đưa vào store, Redux sẽ dùng hàm này để quản lý state của slice.
export const activeBoardReducer = activeBoardSlice.reducer
import { configureStore } from '@reduxjs/toolkit'
import { activeBoardReducer } from './activeBoard/activeBoardSlice'
//Store = cái kho lớn
//Reducer = nhân viên phụ trách từng kệ trong kho   
//State = dữ liệu đang nằm trên từng kệ đó
export const store = configureStore({
    reducer: {
        //activeBoard là tên nhánh trong state tree.
       // activeBoardReducer chính là cái function reducer bạn export từ createSlice.
        activeBoard: activeBoardReducer
    }
})
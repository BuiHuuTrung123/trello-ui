import { configureStore } from '@reduxjs/toolkit'
import { activeBoardReducer } from './activeBoard/activeBoardSlice'
import { userReducer } from './user/userSlice'
import { activeCardReducer } from './activeCard/activeCardSlice'
//Store = cái kho lớn
//Reducer = nhân viên phụ trách từng kệ trong kho   
//State = dữ liệu đang nằm trên từng kệ đó
// Cấu hình redux-persist
// https://www.npmjs.com/package/redux-persist
// Bài viết hướng dẫn nay đề hiều hơn:
// https://devins.io/how-to-use-redux-persist-with-redux-toolkit

import { combineReducers } from 'redux'; // lưu ý điều này để sử dụng redux trong node modules bộ vì khi cài
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // default là localStorage

// Cấu hình persist
// const rootPersistConfig = {
const rootPersistConfig = {
    key: 'root', // key này dùng để lưu trữ trạng thái của redux
    storage: storage, // Bên này sẽ dùng localStorage
    whitelist: ['user'], // Bên này sẽ lưu lại state của slice user
    // blacklist: ['user'], // Bên này sẽ không lưu lại state của slice user
};
//combine các Reducers
const reducers = combineReducers({
    //activeBoard là tên nhánh trong state tree.
    // activeBoardReducer chính là cái function reducer bạn export từ createSlice.
    activeBoard: activeBoardReducer,
    user: userReducer,
    activeCard: activeCardReducer
})
const persistedReducer = persistReducer(rootPersistConfig, reducers)
export const store = configureStore({
    reducer: persistedReducer,
    // Fix warning error when implement redux-persist
    // https://stackoverflow.com/a/63244831/8324172
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
})
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authorizeAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'
import { toast } from 'react-toastify'
//Khởi tạo giá trị state của 1 cái slice trong redux
const initialState = {
  currentUser: null,
}
//Các hành động gọi api (bất đồng bộ) và cập nhật dữ liệu vào Redux, dùng Middleware createAsyncThunk đi kèm với extraReducers
export const loginUserAPI = createAsyncThunk(
  'user/loginUserAPI',
  async (data) => {
    const respone = await authorizeAxiosInstance.post(`${API_ROOT}/v1/users/login`, data)
    // axios trả kết quả bằng property là data
    return respone.data
  }
)
export const logoutUserAPI = createAsyncThunk(
  'user/logoutUserAPI',
  async (showSuccessMessage = true) => {
    const response = await authorizeAxiosInstance.delete(
      `${API_ROOT}/v1/users/logout`
    )

    if (showSuccessMessage) {
      toast.success('Logged out successfully!')
    }

    return response.data
  }
)
export const updateUserAPI = createAsyncThunk(
  'user/updateUserAPI',
  async (data) => {
    const response = await authorizeAxiosInstance.put(`${API_ROOT}/v1/users/update`, data)
    return response.data
  }
)

//Khởi tạo một slice trong kho lưu trữ redux store
export const userSlice = createSlice({
  name: 'user',
  initialState,
  //reducers : nơi xử lý dữ liệu đồng bộ
  reducers: {},
  //extraReducers nơi xử lý dữ liệu bất đồng bộ 
  extraReducers: (builder) => {
    builder.addCase(loginUserAPI.fulfilled, (state, action) => {
      // action.payload là respone.data do api trả về
      const user = action.payload
      //Update dữ liệu của
      state.currentUser = user
    })

    builder.addCase(logoutUserAPI.fulfilled, (state) => {
      state.currentUser = null
    })
    
    builder.addCase(updateUserAPI.fulfilled, (state, action) => {
      const user = action.payload
      
      state.currentUser = user
    })

  }

})

export const selectCurrentUser = (state) => {
  return state.user.currentUser
}
export const userReducer = userSlice.reducer
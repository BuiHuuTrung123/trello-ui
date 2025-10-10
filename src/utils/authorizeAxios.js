import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from '~/utils/formatter'
import { refreshTokenAPI } from '~/apis'
import { logoutUserAPI } from '~/redux/user/userSlice'

// Không thể import { store } from '~/redux/store' theo cách thông thường ở đây
// Giải pháp: Inject store: là kỹ thuật khi cần sử dụng biến redux store ở các file ngoài phạm vi component
// như file authorizeAxios hiện tại
// Hiểu đơn giản: khi ứng dụng bắt đầu chạy lên, code sẽ chạy vào main.jsx đầu tiên, từ bên đó chúng ta gọi
// hàm injectStore ngay lập tức để gán biến mainStore vào biến axiosReduxStore cục bộ trong file này.
// https://redux.js.org/faq/code-structure#how-can-i-use-the-redux-store-in-non-component-files

let axiosReduxStore
export const injectStore = mainStore => {
    axiosReduxStore = mainStore
}

//Khoi tao doi tuong chung axios cau hinh chung cho du an
let authorizeAxiosInstance = axios.create()
//thoi gian cho toi da cho 1 request de 10p
authorizeAxiosInstance.defaults.timeout = 1000 * 60 * 10
//withCredentials: se cho phep axios tu dong gui cookie trong moi request len BE (phuc vu luu jwt tokens vao http only cookie cua trinh duyet)
authorizeAxiosInstance.defaults.withCredentials = true
//cau hinh  interceptors
// Add a request interceptor

// interceptor request : can thiep vao request api
authorizeAxiosInstance.interceptors.request.use((config) => {
    //Ky thuat chan spam click
    interceptorLoadingElements(true)

    return config
}, (error) => {

    return Promise.reject(error)
},
)

// Khởi tạo một cái promise cho việc gọi api refresh_token
// Mục đích tạo Promise này để khi nào gọi api refresh_token xong xuôi thì mới retry lại nhiều api bị lỗi trước đó.
// https://www.thedutchlab.com/en/insights/using-axios-interceptors-for-refreshing-your-api-token
let refreshTokenPromise = null

// Add a response interceptor

// interceptor response : can thiep vao response nhan ve
authorizeAxiosInstance.interceptors.response.use((response) => {
    //Ky thuat chan spam click
    interceptorLoadingElements(false)

    return response
},
    (error) => {


        //Ky thuat chan spam click
        interceptorLoadingElements(false)
        // TH1: Nếu như nhận mã 401 từ backend, thì gọi api đăng xuất luôn
        if (error.response?.status === 401) {
            axiosReduxStore.dispatch(logoutUserAPI(false))
        }

        //TH2 : Nếu như nhận mã 410 từ backend, gọi api refresh token để làm mới accesssToken 
        // Đầu tiên lấy được request api đang bị lỗi thông qua error.config
        const originalRequests = error.config
  
        if (error.response?.status === 410 && !originalRequests._retry) {
            /* Gán thêm một giá trị retry_lần = true trong khoảng thời gian chờ, đảm bảo việc refresh token này
chỉ luân gọi 1 lần tại 1 thời điểm (nhấn lại điều kiện nếu ngay phi thường) */
            originalRequests._retry = true
            /* Kiểm tra xem chưa có refreshTokenPromise thì thực hiện gán giá trị gọi api refresh_token đồng thời
            gán vào chỗ gọi refreshTokenPromise */
            if (!refreshTokenPromise) {
                refreshTokenPromise = refreshTokenAPI()
                    .then(data => {
                        // đồng thời accessToken đã nằm trong httponly cookie (xử lí phía be)
                        return data?.accessToken
                    })
                    .catch((_error) => {
                        // nếu nhận bất kỳ lỗi nào từ api refresh token thì cứ loguot luôn
                        axiosReduxStore.dispatch(logoutUserAPI(false))
                        return Promise.reject(_error)
                    })
                    .finally(() => {
                        // dù api có  ok hay lỗi thì vẫn luôn gán lại refreshTokenPromise về null như ban đầu
                        refreshTokenPromise = null
                    })

            }
            // Có thể return trong hop refreshTokenPromise thay thành cong va xư ly them o day:
            // eslint-disable-next-line no-unused-vars
            return refreshTokenPromise.then(accessToken => {
                /* 
       * Bước 1: Bổ với Trường hợp mới để thêm lưu accessToken vào localStorage hoặc dữ liệu này sẽ viết
       thêm code xử lý ở đây.
       * Hiên tại ở đây không cần bước 1 ngay vì chưa ta dữ dư accessToken vào cookie (xử lý phía BE)
       sau khi api refreshToken dược gọi thành công.
       */

       /* Bước 2: Bước Quan trọng: Return lại axios instance chứa tất cả các originalRequests đã
   gọi lại nhìng api ban đầu bị lỗi */
                return authorizeAxiosInstance(originalRequests)
            })
        }

        // moi ma http status code nam ngoai 200-299 se la error va roi vao day
        // xu ly tap trung phan hien thi thong bao loi va tra ve tu moi api o day(viet code 1 lan clean: code)
        let errorMessage = error?.message
        if (error.response?.data?.message) {
            errorMessage = error.response?.data?.message
        }
        //dung toastify de hien thi bat ke moi ma loi len man hinh - Ngoai tru ma 410 - gone phuc vu viec tu dong refesh lai token
        if (error.response?.status !== 410) {
            toast.error(errorMessage)
        }

        return Promise.reject(error)
    })


export default authorizeAxiosInstance
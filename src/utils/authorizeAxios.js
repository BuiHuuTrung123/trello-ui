import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from '~/utils/formatter'
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
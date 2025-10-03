// let apiRoot = ''
// if (process.env.BUILD_MODE === 'dev') {
//     apiRoot = 'http://localhost:8017'
    
// }
// if (process.env.BUILD_MODE === 'production') {
//     apiRoot = 'https://trello-api-rqlj.onrender.com'
// }
// console.log('adasd',apiRoot)
// export const API_ROOT = apiRoot
export const API_ROOT = import.meta.env.VITE_API_ROOT

console.log('API ROOT đang dùng:', API_ROOT)
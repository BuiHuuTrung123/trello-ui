import React from 'react'
import { useSearchParams, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import PageLoadingSpinner from '~/components/Loading/PageLoadingSpinner'
import { verifyUserAPI } from '~/apis'
import { createNewBoardAPI } from '~/apis'
function AccoutVerification() {
    //Lấy giá trị email và token từ url
    let [searchParams] = useSearchParams()

    const { email, token } = Object.fromEntries([...searchParams])
    //Tạo state để check verifi tk thành công
    const [verified, setVerified] = useState(false)
    // gọi api để verifi tk
    useEffect(() => {
        if (email && token) {
            verifyUserAPI({ email, token }).then(() => setVerified(true))
        }
      
    }, [email, token])
    //Nếu url có vấn đề thì đá sang 404
    if (!email || !token) {
        return <Navigate to='/404' />
    }
    // Nếu chưa verifi xong thì hiện loading
    if (!verified) {
        return <PageLoadingSpinner caption='Verifying your accout ...' />
    }
    return <Navigate to={`/login?verifiedEmail=${email}`} />
}

export default AccoutVerification
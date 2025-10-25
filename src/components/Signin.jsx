import { useState } from "react"

const useSignin = () => {
    const [error, setError] = useState(null)

    const login = async (username, password) => {
        try {
            const response = await fetch('https://checkmate.kimbepo.xyz/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            })

            console.log('response status:',response.status)
            console.log('response ok:',response.ok)

            const data = await response.json().catch(() => null)
            console.log('response body:', data)
    
            if (!response.ok){
                const msg = data?.message||data?.error||'로그인 실패'
                throw new Error(msg)
            }

            localStorage.setItem('token',data.token)
            return data
        } catch (err) {
            console.error('Login 요청 중 에러발생:', err)
            setError(err.message)
            throw err
        }
    }

    return { login, error }
}

export default useSignin
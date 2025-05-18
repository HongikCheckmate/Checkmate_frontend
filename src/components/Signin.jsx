import { useState } from "react"

const Signin=()=>{
    const [error,setError]=useState(null)

    const login = async (username, password) => {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('로그인 실패');
            }

            const data = await response.json();
            return data; //{token, nickname} 같이 받아와야됨됨
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    return { login, error };
};


export default Signin
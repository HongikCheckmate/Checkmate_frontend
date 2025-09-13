import './Login.css'
import Button from './Button'
import Signup from './Signup'
import { useState } from 'react'

const Login=({onLogin})=>{
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [id, setId] = useState('')
    const [password, setPassword] = useState('')


     const mockUser = [
        { id: 'dlxodud', password: '1234', nickname: '이태영' },
        
    ]

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleLogin = () => {
        const foundUser=mockUser.find(
            (user)=>user.id===id&&user.password===password
        )

        if (foundUser){
            onLogin({
                id: foundUser.id,
                nickname: foundUser.nickname})
        } else{
            alert('로그인 정보가 바르지 않습니다')
        }
    }

    const handleenter=(e)=>{
        if (e.key==='Enter'){
            handleLogin()
        }
    }


    return(
        <div className='login'>
            
            <input 
                type='text' 
                placeholder="아이디를 입력해 주세요"
                value={id}
                onChange={(e)=>setId(e.target.value)}
                onKeyDown={handleenter}/>
                <br/>
            <input 
                type='password' 
                placeholder="비밀번호를 입력해 주세요"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                onKeyDown={handleenter}/>
                <br/>
            <Button className='login-button' text='로그인' onClick={handleLogin}  />

            <div className="login-links">
                <a href="/find_id" className="login-link">아이디 찾기</a> 
                <a href="/find_password" className="login-link">비밀번호 찾기</a>   
                <a href="#" onClick={openModal} className="login-link">회원가입</a>
                <Signup isOpen={isModalOpen} onClose={closeModal}/>
            </div>

        </div>
    )
}

export default Login
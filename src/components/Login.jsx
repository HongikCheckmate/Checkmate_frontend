import './Login.css'
import Button from './Button'
import Signup from '../pages/Signup'
import Signin from './Signin'
import { useState } from 'react'
import Loginsuccess from './Loginsuccess'

const Login=()=>{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [logSuccess,setLogSuccess]=useState('');
    const [nickname,setNickname]=useState('');
    const {login,error}= Signin()

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleLogin = async () => {
        try {
            const data = await login(id, password);
            setNickname(data.nickname);
            setLogSuccess(true);
        } catch (err) {
            console.error('로그인 실패:', err.message);
        }
    }

    if (logSuccess){
        return <Loginsuccess nickname={nickname}/>
    }

    return(
        <div className='login'>
            
            <input 
                type='text' 
                placeholder="아이디를 입력해 주세요"
                value={id}
                onChange={(e)=>setId(e.target.value)}/><br/>
            <input 
                type='password' 
                placeholder="비밀번호를 입력해 주세요"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}/><br/>
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
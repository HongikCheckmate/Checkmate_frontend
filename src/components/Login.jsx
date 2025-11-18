import './Login.css'
import Button from './Button'
import Signup from './Signup'
import Sociallogin from './Sociallogin'
import { useState } from 'react'
import useSignin from './Signin'

const Login = ({ onLogin }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { login, error } = useSignin()

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const handleLogin = async () => {
    try {
      const data = await login(username, password)
      onLogin({
        username,
        nickname: data.nickname,
        accessToken: data.accessToken,
      })
      localStorage.setItem('accessToken', data.accessToken)
    } catch (err) {
      alert('로그인 정보가 바르지 않습니다')
    }
  }

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      handleLogin()
    }
  }



  return (
    <div className="login">
      <input
        type="text"
        placeholder="아이디를 입력해 주세요"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={handleEnter}
      />
      <br />

      <input
        type="password"
        placeholder="비밀번호를 입력해 주세요"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={handleEnter}
      />
      <br />

      <Button
        className="login-button"
        text="로그인"
        onClick={handleLogin}
      />

      <Sociallogin />
      <div className="login-links">
        <a href="/find_username" className="login-link">
          아이디 찾기
        </a>
        <a href="/find_password" className="login-link">
          비밀번호 찾기
        </a>
        <a href="#" onClick={openModal} className="login-link">
          회원가입
        </a>
        <div className='social-login-section'>
          
  
        </div>
        <Signup isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </div>
  )
}

export default Login
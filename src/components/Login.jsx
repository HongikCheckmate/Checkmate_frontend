import './Login.css'
import Button from './Button'
const Login=()=>{
    return(
        <div className='login'>
            
            <input type='text' placeholder="아이디를 입력해 주세요"/><br/>
            <input type='password' placeholder="비밀번호를 입력해 주세요"/><br/>
            <Button className='login-button' text='로그인'   />
            
        </div>
    )
}

export default Login
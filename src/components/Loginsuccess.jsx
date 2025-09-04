import { useNavigate } from "react-router-dom"
import Button from "./Button"
import './Loginsuccess.css'

const Loginsuccess=({user,onLogout})=>{
    const nav=useNavigate()

    return(
        
        <div className="loginsuccess">
            <div className='loginsuccess_container'>
                <h4 >{user.nickname}님 안녕하세요!</h4>
                
                <Button
                className='my'
                text = '마이페이지' 
                onClick={()=>nav('/my')}/>
                

                <Button 
                className='alert'
                text = '알림' 
                onClick={()=>nav('/alert')}/>

                <Button
                className='logout'
                type='NEGATIVE'
                text='로그아웃'
                onClick={onLogout}/>
                
            </div>
        </div>
    
    )
}

export default Loginsuccess

//login onclick 
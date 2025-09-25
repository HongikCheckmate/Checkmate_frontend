import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from "./Button"
import './Loginsuccess.css'
import Alert from './Alert'
import Mypage from './Mypage'


const Loginsuccess=({user,onLogout})=>{
    const [isMyOpen,setIsMyOpen]=useState(false)
    const [isAlertOpen,setIsAlertOpen]=useState(false)
    
    const nav=useNavigate()

    const handleLogout=()=>{
        onLogout()
        nav('/')    
    }

    return(
        
        <div className="loginsuccess">
            <div className='loginsuccess_container'>
                <h4 >{user.nickname}님 안녕하세요!</h4>
                
                <Button
                className='my'
                text = '마이페이지' 
                onClick={()=>setIsMyOpen(true)}/>
                

                <Button 
                className='alert'
                text = '알림' 
                onClick={()=>setIsAlertOpen(true)}/>

                <Button
                className='logout'
                type='NEGATIVE'
                text='로그아웃'
                onClick={handleLogout}/>
                
            </div>

            <Mypage
                isOpen={isMyOpen}
                onClose={()=>setIsMyOpen(false)}
                user={user}
            />

            <Alert
                isOpen={isAlertOpen}
                onClose={()=>setIsAlertOpen(false)}
            />
        </div>
    
    )
}

export default Loginsuccess

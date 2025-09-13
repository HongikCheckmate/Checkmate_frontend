import { useState } from 'react'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import Button from "./Button"
import './Loginsuccess.css'

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

            <Modal 
            isOpen={isMyOpen}
            onRequestClose={()=>setIsMyOpen(false)}
            className='mypageModal'
            >
                <h2>마이페이지</h2>
                <Button text='닫기' type='NEGATIVE' onClick={()=>setIsMyOpen(false)}/>
            </Modal>

            <Modal 
            isOpen={isAlertOpen}
            onRequestClose={()=>setIsAlertOpen(false)}
            className='alertModal'
            >
                <h2>알림</h2>
                <Button text='닫기' type='NEGATIVE' onClick={()=>setIsAlertOpen(false)}/>
            </Modal>
        </div>
    
    )
}

export default Loginsuccess

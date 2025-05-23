import { useNavigate } from "react-router-dom"
import Button from "./Button"
import './Login.css'

const Loginsuccess=({nickname})=>{
    const nav=useNavigate()

    const handleLogout = () => {
        window.location.reload();
    };

    return(
        
        <div className="login">
            <h2 style={{margin:'10px 0'}}>{nickname}님 안녕하세요!</h2>
            
            <Button
            className='logsuc button'
            text = '마이페이지' 
            onClick={()=>nav('/my')}/>

            <Button 
            className="logsuc button"
            text = '알림' 
            onClick={()=>nav('/alert')}/>

            <Button
            className='logout button'
            type='NEGATIVE'
            text='로그아웃'
            onClick={handleLogout}
            
            />
        </div>
    
    )
}

export default Loginsuccess

//login onclick 
import './Mainpage.css'
import Header from "../components/Header"
import RoomList from "../components/RoomList"
import Login from '../components/Login'
import Makegroupbutton from '../components/Makegroupbutton'
import Makegroup from './Makegroup'
import { RoomStateContext } from '../App'
import {useState,useContext} from 'react'
import Loginsuccess from '../components/Loginsuccess'



const Mainpage = ({isLoggedIn,user,onLogin,onLogout}) => {
    const [isMakeGroupOpen, setIsMakeGroupOpen] = useState(false)
    const groups=useContext(RoomStateContext)

    const openModal = () => {
      if (!isLoggedIn){
        alert('로그인 후 이용 가능합니다.')
        return
      }
      setIsMakeGroupOpen(true)
    }
    
    const closeModal = () => setIsMakeGroupOpen(false)
    

  
    
    return (
      <div className='mainpage_container'>

        <Header title={"Checkmate"} className='header'/>
        <Makegroup isOpen={isMakeGroupOpen} onClose={closeModal}/>
  
        <div className='content'>
          
          <div className='roomlist'>
            <RoomList data={groups} isLoggedIn={isLoggedIn}/>
          </div>
  
          <div className='mainpage_login'>
            {isLoggedIn?(
              <Loginsuccess user={user} onLogout={onLogout}/>)
              :(<Login onLogin={onLogin}/>
            )}
            <Makegroupbutton open={openModal} isLoggedIn={isLoggedIn}/>
          </div>
        </div>
      </div>
    )
  }
  
export default Mainpage
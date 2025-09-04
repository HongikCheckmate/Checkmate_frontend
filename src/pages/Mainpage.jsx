import axios from 'axios'
import './Mainpage.css'
import Header from "../components/Header"
import RoomList from "../components/RoomList"
import Login from '../components/Login'
import Makegroupbutton from '../components/Makegroupbutton'
import Makegroup from './Makegroup'
import {Link} from "react-router-dom"
import { RoomStateContext } from '../App'
import {useState,useContext} from 'react'
import Loginsuccess from '../components/Loginsuccess'



const Mainpage = ({isLoggedIn,user,onLogin,onLogout}) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const groups=useContext(RoomStateContext)

    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)
  
  //   useEffect(()=>{
  //     const fetchGroups=async()=>{
  //     try{
  //         const response = await axios.get('http://localhost:8080/api/groups')
  //         setGroups(response.data);
  //     } catch (error) {
  //       console.error("그룹 목록 불러오기 실패:", error);
  //     }
  //   }

  //   fetchGroups()
  // }, [])
  //백엔드 연동 시 사용
  
    
    return (
      <div className='mainpage_container'>

        <Header title={"Checkmate"} className='header'/>
        <Makegroup isOpen={isModalOpen} onClose={closeModal}/>
  
        <div className='content'>
          
          <div className='roomlist'>
            <RoomList data={groups} />
          </div>
  
          <div className='mainpage_login'>
            {isLoggedIn?(
              <Loginsuccess user={user} onLogout={onLogout}/>)
              :(<Login onLogin={onLogin}/>
            )}
            <Makegroupbutton open={openModal}/>
          </div>
        </div>
      </div>
    )
  }
  
export default Mainpage
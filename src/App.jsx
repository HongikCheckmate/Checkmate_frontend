import axios from 'axios'
import {useEffect,useState,createContext} from 'react'
import {Routes,Route} from 'react-router-dom'
import Mainpage from './pages/Mainpage'
import Subpage from './pages/Subpage'
import Missionpage from './pages/Missionpage'
import Makegroup from "./pages/Makegroup"
import Signup from "./components/Signup"
import Invite from './pages/Invite'

//id,room_name,room_manager,members,hidden,room_info 받아오기
/*data: 상태 받아옴(useReducer 사용해 방 상태 받아옴)
roomstatecontext로 room의 정보 하위 컴포넌트까지 뿌려줌
*/

export const RoomStateContext=createContext()
export const RoomDispatchContext=createContext()


function App() {

  const [isLoggedIn, setIsLoggedIn]=useState(false)
  const [user,setUser]=useState(null)

  const [groups,setGroups]=useState([]);

  const fetchGroups=async()=>{
    try{
      const token=localStorage.getItem('accessToken')
      const res=await axios.get("https://checkmate.kimbepo.xyz/api/group",{
        headers:{
          Authorization:`Bearer ${token}`,
        },
      }) //서버 api 경로
      setGroups(res.data)
    } catch(err){
      console.error("그룹 불러오기 실패",err)
    }
  }



  useEffect(()=>{
    const savedUser=localStorage.getItem('user')
    const token=localStorage.getItem('accessToken')
    if (savedUser){
      setUser(JSON.parse(savedUser))
      setIsLoggedIn(true)
    }
    if (token){
      fetchGroups()
    }
  },[])

  const handleLogin=(userInfo,token)=>{
    setUser(userInfo)
    setIsLoggedIn(true)
    localStorage.setItem('user',JSON.stringify(userInfo))
    localStorage.setItem('accessToken',token)
    fetchGroups()
  }

  const handleLogout=()=>{
    setUser(null)
    setIsLoggedIn(false)
    localStorage.removeItem('user')
    localStorage.removeItem('accessToken')
  }


  return (
    <RoomDispatchContext.Provider value={fetchGroups}>
      <RoomStateContext.Provider value={groups}>
          
          <Routes>
            <Route path="/" element={<Mainpage isLoggedIn={isLoggedIn} user={user} onLogin={handleLogin} onLogout={handleLogout}/>} />
            <Route path="/sub/:subId" element={<Subpage isLoggedIn={isLoggedIn} user={user} onLogin={handleLogin} onLogout={handleLogout}/>} />
            <Route path="/sub/:subId/mission/:missionId" element={<Missionpage/>}/>
            <Route path="/signup" element={<Signup />} />
            <Route path="/group" element={<Makegroup />} />
            <Route path="/invite" element={<Invite />} />
            {/* <Route path="*" element={<Notfound />}/> */}
          </Routes>
        
      </RoomStateContext.Provider>
    </RoomDispatchContext.Provider>
  )
}
export default App
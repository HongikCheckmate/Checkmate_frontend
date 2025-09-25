//import axios from 'axios'
import {useEffect,useState,createContext} from 'react'
import {Routes,Route} from 'react-router-dom'
import Mainpage from './pages/Mainpage'
import Subpage from './pages/Subpage'
import Missionpage from './pages/Missionpage'
import Makegroup from "./pages/Makegroup"
import Signup from "./components/Signup"
import Invite from './pages/Invite'

//id,room_name,room_manager,members,hiden,room_info 받아오기
/*data: 상태 받아옴(useReducer 사용해 방 상태 받아옴)
roomstatecontext로 room의 정보 하위 컴포넌트까지 뿌려줌
*/

export const RoomStateContext=createContext()
export const RoomDispatchContext=createContext()


function App() {

  const [isLoggedIn, setIsLoggedIn]=useState(false)
  const [user,setUser]=useState(null)

  const [groups]=useState([
    {
    id: 1,
      room_name: "알고리즘 스터디",
      room_manager: "홍길동",
      members: ["홍길동","김철수","이영희"],
      hidden: false,
      room_info: "매주 수요일 저녁 온라인 모임"
    },
    {
      id: 2,
      room_name: "React 프로젝트 팀일수도있고아닐수도",
      room_manager: "이태영",
      members: ["이태영","박민수"],
      hidden: false,
      room_info: "졸업작품 개발을 위한 프로젝트 그룹"
    },
    {
      id: 3,
      room_name: "토익 스터디",
      room_manager: "Alice",
      members: ["Alice","Bob","Charlie"],
      hidden: true,
      room_info: "토요일 오전 오프라인 영어 회화 모임"
    }
    //테스트용 목업데이터
  ])

//   const fetchGroups=async()=>{
//   try{
//     const res=await axios.get("http://localhost:8080/api/groups") //서버 api 경로
//     setGroups(res.data)
//   } catch(err){
//     console.error("그룹 불러오기 실패",err)
//   }
// }

// useEffect(()=>{
//   fetchGroups()
// },[]) 
//백엔드로 api전송

  useEffect(()=>{
    const savedUser=localStorage.getItem('user')
    if (savedUser){
      setUser(JSON.parse(savedUser))
      setIsLoggedIn(true)
    }
  },[])

  const handleLogin=(userInfo)=>{
    setUser(userInfo)
    setIsLoggedIn(true)
    localStorage.setItem('user',JSON.stringify(userInfo))
  }

  const handleLogout=()=>{
    setUser(null)
    setIsLoggedIn(false)
    localStorage.removeItem('user')
  }


  return (
    <>
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
      </>
  )
}
export default App
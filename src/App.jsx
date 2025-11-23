import axios from 'axios'
import { useEffect, useState, createContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Mainpage from './pages/Mainpage'
import Subpage from './pages/Subpage'
import Missionpage from './pages/Missionpage'
import Makegroup from "./pages/Makegroup"
import Signup from "./components/Signup"
import Invite from './pages/Invite'
import Socialsignup from './components/Socialsignup'
import jwtDecode from 'jwt-decode'

export const RoomStateContext = createContext()
export const RoomDispatchContext = createContext()

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [groups, setGroups] = useState([])

  const fetchGroups = async (queryString = '') => {
    try {
      const token = localStorage.getItem('accessToken')
      const config=token?{headers:{Authorization:`Bearer ${token}`}}:{}
      const res = await axios.get("https://checkmate.kimbepo.xyz/api/group/search", {
        params: {query: queryString},
        ...config
      })

      const dataArray = Array.isArray(res.data.content) ? res.data.content : []
      const mapped = dataArray.map(item => ({
        id: item.id,
        room_name: item.name ?? '',
        room_manager: item.leaderNickname ?? '',
        room_info: item.description ?? '',
        members: Array(item.memberCount ?? 0).fill(null),
        hidden: item.hidden ?? false,
        _raw: item,
      }))
      setGroups(mapped)
    } catch (err) {
      console.error("그룹 불러오기 실패", err)
      setGroups([])
    }
  }


  // 초기 로그인 상태 확인
  useEffect(() => {

    const params = new URLSearchParams(window.location.search)
    const urlAccess = params.get("accessToken")
    const urlRefresh = params.get("refreshToken")
    const isGuest = params.get("isGuest")

    if (urlAccess) localStorage.setItem("accessToken", urlAccess)
    if (urlRefresh) localStorage.setItem("refreshToken", urlRefresh)
    if (urlAccess&&isGuest==='false') {
      try {
        const decoded=jwtDecode(urlAccess)
        const userObj={
          id: decoded.userId,
          username: decoded.username,
          nickname: decoded.nickname,
          accessToken: urlAccess
        }
        localStorage.setItem('user', JSON.stringify(userObj))
        setUser(userObj)
        setIsLoggedIn(true)
        window.history.replaceState({},'','/')
      }catch(e){
        console.error("토큰 디코딩 실패",e)
      }
    }

    const savedUser = localStorage.getItem('user')
    const token = localStorage.getItem('accessToken')

    if (savedUser&&token) {
      setUser(JSON.parse(savedUser))
      setIsLoggedIn(true)
    }

    fetchGroups()
  }, [])

  const handleLogin = (userInfo) => {
    const userObject = {
      id: userInfo.id,
      username: userInfo.username,
      nickname: userInfo.nickname,
      accessToken: userInfo.accessToken,
    }
    setUser(userObject)
    setIsLoggedIn(true)
    localStorage.setItem('user', JSON.stringify(userObject))
    localStorage.setItem('accessToken', userObject.accessToken)
    fetchGroups()
  }

  const handleLogout = () => {
    setUser(null)
    setIsLoggedIn(false)
    localStorage.removeItem('user')
    localStorage.removeItem('accessToken')
    fetchGroups()
  }

  return (
    <RoomDispatchContext.Provider value={fetchGroups}>
      <RoomStateContext.Provider value={groups}>
        <Routes>
          <Route path="/" element={<Mainpage isLoggedIn={isLoggedIn} user={user} onLogin={handleLogin} onLogout={handleLogout} />} />
          <Route path="/sub/:subId" element={<Subpage isLoggedIn={isLoggedIn} user={user} onLogin={handleLogin} onLogout={handleLogout} />} />
          <Route path="/sub/:subId/mission/:missionId" element={<Missionpage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/group" element={<Makegroup />} />
          <Route path="/invite" element={<Invite />} />
          {/* <Route path="/oauth/callback" element={<Oauthcallback />} /> */}
          <Route path="/oauth-signup-info" element={<Socialsignup onLogin={handleLogin}/>} />
        </Routes>
      </RoomStateContext.Provider>
    </RoomDispatchContext.Provider>
  )
}

export default App
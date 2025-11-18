import axios from 'axios'
import { useEffect, useState, createContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Mainpage from './pages/Mainpage'
import Subpage from './pages/Subpage'
import Missionpage from './pages/Missionpage'
import Makegroup from "./pages/Makegroup"
import Signup from "./components/Signup"
import Invite from './pages/Invite'
import Oauthcallback from './components/Oauthcallback'
import Socialsignup from './components/Socialsignup'

export const RoomStateContext = createContext()
export const RoomDispatchContext = createContext()

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [groups, setGroups] = useState([])

  const fetchGroups = async (queryString = '') => {
    try {
      const token = localStorage.getItem('accessToken')
      const res = await axios.get("http://13.124.171.54:8080/api/group/search", {
        params: {
          query: queryString
        },
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
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

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    const token = localStorage.getItem('accessToken')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
      setIsLoggedIn(true)
    }

    fetchGroups()

  }, [])

  const handleLogin = (userInfo, token) => {

    const userObject = typeof userInfo === 'string' ? { nickname: userInfo } : userInfo
    setUser(userObject)
    setIsLoggedIn(true)
    localStorage.setItem('user', JSON.stringify(userObject))
    localStorage.setItem('accessToken', token)
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
          <Route path="/oauth/callback" element={<Oauthcallback />} />
          <Route path="/oauth-signup-info" element={<Socialsignup />} />
        </Routes>
      </RoomStateContext.Provider>
    </RoomDispatchContext.Provider>
  )
}

export default App
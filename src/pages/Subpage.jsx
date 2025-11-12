import { useParams, useNavigate } from "react-router-dom"
import { useContext, useState,useEffect } from "react"
import { RoomStateContext } from "../App"
import Loginsuccess from "../components/Loginsuccess"
import Button from "../components/Button"
import Missionlist from "../components/Missionlist"
import Invite from "./Invite"
import axios from "axios"
import "./Subpage.css"

const Subpage = ({ isLoggedIn, user, onLogout }) => {
  const { subId } = useParams()
  const navigate=useNavigate()
  const groups = useContext(RoomStateContext)
  
  const [group,setGroup]=useState(null)
  const [groupMissions, setGroupMissions]=useState([])
  const [IsInviteOpen, setIsInviteOpen]=useState(false)

  // 현재 로그인한 사용자의 닉네임d
  const currentUser = user?.nickname || ""
  const token=localStorage.getItem('accessToken')

  const isManager = group?.room_manager === currentUser 

   useEffect(() => {
    const fetchGroup = async () => {
      try {
        const res = await axios.get(`https://checkmate.kimbepo.xyz/api/groups/${subId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setGroup(res.data)
        setGroupMissions(res.data.missions || [])
      } catch (err) {
        console.error("그룹 정보 불러오기 실패:", err)
      }
    }
    fetchGroup()
  }, [subId, token])

  const handleInviteClick=()=>setIsInviteOpen(true)
  const handleInviteClose=()=>setIsInviteOpen(false)

  return (
    <div className="subpage_container">
      {group &&(
        <>
        <Invite isOpen={IsInviteOpen}
          onClose={handleInviteClose}
          groupId={group.id}
          token={token}
        />

        <div className="subpage_content">
          <div className="subpage_main">
            <div className="group_card">
              <div className="group_info">

                <h2>{group.room_name}</h2>
                <p>
                  <strong>방장:</strong> {group.room_manager}
                </p>
                <p>
                  <strong>인원:</strong> {group.members.length}명
                </p>
                <p className="group_desc">
                  {group.room_info}
                </p>
              </div>

            </div>

            <Missionlist missions={groupMissions} subId={subId}/>

            <div className="subpage_back">
              <Button text='목록으로' onClick={()=>navigate('/')}/>
            </div>

          </div>

          <div className='subpage_login'>
            {isLoggedIn && <Loginsuccess user={user} onLogout={onLogout} />}
            <div className='subpage_button'>
              <Button text="멤버 초대하기" type="POSITIVE" onClick={handleInviteClick}/> <br/>
              {isManager && <Button text="새 미션 만들기" type="POSITIVE"/>} <br/>
              <Button text="그룹 탈퇴하기" type="NEGATIVE" /> <br/>
              {isManager && <Button text="그룹 삭제하기" type="NEGATIVE" />}
            </div>
          </div>
        </div>
      </>
      )}
    </div>
  )
}

export default Subpage
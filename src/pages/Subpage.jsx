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
  const [members, setMembers]=useState([])

  // 현재 로그인한 사용자의 닉네임d
  const currentUser = user?.nickname || ""
  const token=localStorage.getItem('accessToken')
  const isManager = group?.room_manager === currentUser 

   useEffect(() => {
    const fetchGroup = async () => {
      try {
        const res = await axios.get(`https://checkmate.kimbepo.xyz/api/group/${subId}`, {
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

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get(`https://checkmate.kimbepo.xyz/api/group/${subId}/members`, {
          headers: { Authorization: `Bearer ${token}` },
          params:{sort:'join',reverse: false, page:0, size:20},
        })
        setMembers(res.data.users || [])
      } catch (err) {
        console.error("멤버 정보 불러오기 실패:", err)
      }
    }
    fetchMembers()
  }, [subId, token])

  const handleEditGroup= async(newName, newDesc)=>{
    try{
      await axios.put(`https://checkmate.kimbepo.xyz/api/group/${subId}`,{
        name: newName,
        description: newDesc,
      },{ headers: { Authorization: `Bearer ${token}` }})
      alert("그룹 정보가 수정되었습니다.")
      window.location.reload()
    }catch(err){
      console.error("그룹 정보 수정 실패:", err)
      alert("그룹 정보 수정에 실패했습니다.")
    }
  }

  const handleKickMember=async(username, reason)=>{
    if (!window.confirm(`${username}님을 그룹에서 추방하시겠습니까?`)) return
    try{
      await axios.delete(`https://checkmate.kimbepo.xyz/api/group/${subId}/members/${username}`,{
        headers: { Authorization: `Bearer ${token}` },
        data: { reason },
      })
      alert(`${username}님이 그룹에서 추방되었습니다.`)
      setMembers(prev=>prev.filter(m=>m.username!==username))
    }catch(err){
      console.error("멤버 추방 실패:", err)
      alert("멤버 추방에 실패했습니다.")
    }
    
  }

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
                  <strong>인원:</strong> {members.length}명
                </p>
                <p className="group_desc">
                  {group.room_info}
                </p>

                {isManager && (
                  <Button text="그룹 정보 수정" type="POSITIVE" onClick={()=>{
                    const newName=prompt("새 그룹 이름을 입력하세요", group.room_name)
                    const newDesc=prompt("새 그룹 설명을 입력하세요", group.room_info)
                    if(newName) handleEditGroup(newName, newDesc)
                  }}/>
                )}
              </div>
            </div>
            

            <h3>멤버 목록</h3>
            <ul className="member_list">
              {members.map(m=>(
                <li key={m.id} className="member_item">
                  {m.nickname} ({m.username})
                  {isManager && m.username !==user?.username&&(
                    <Button text="강퇴" type="NEGATIVE" onClick={()=>handleKickMember(m.username, "관리자에 의한 강퇴")}/>
                  )}
                </li>
              ))}
            </ul>

            
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
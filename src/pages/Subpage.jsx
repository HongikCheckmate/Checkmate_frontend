import { useParams, useNavigate } from "react-router-dom"
import { useContext, useState,useEffect } from "react"
import { RoomStateContext } from "../App"
import Loginsuccess from "../components/Loginsuccess"
import Button from "../components/Button"
import Missionlist from "../components/Missionlist"
import Invite from "./Invite"
import CreateMissionModal from "../components/CreateMissionModal"
import axios from "axios"
import "./Subpage.css"
import Modal from 'react-modal'

Modal.setAppElement('#root')

const Subpage = ({ isLoggedIn, user, onLogout }) => {
  const { subId } = useParams()
  const navigate=useNavigate()
  const groups = useContext(RoomStateContext)
  
  const [group,setGroup]=useState(null)
  const [groupMissions, setGroupMissions]=useState([])
  const [IsInviteOpen, setIsInviteOpen]=useState(false)
  const [members, setMembers]=useState([])
  const [isMemberModalOpen, setIsMemberModalOpen]=useState(false)
  const [isCreateMissionOpen, setIsCreateMissionOpen]=useState(false)

  const [isEditOpen, setIsEditOpen]=useState(false)
  const [editName, setEditName]=useState("")  
  const [editDesc, setEditDesc]=useState("")
  const [newLeader, setNewLeader]=useState("")

  // 현재 로그인한 사용자의 닉네임d
  const currentUser = user?.nickname || ""
  const token=localStorage.getItem('accessToken')

  const isManager = user&&group?.room_manager_username === user?.username

   useEffect(() => {
    const fetchGroup = async () => {
      try {
        const res = await axios.get(`https://checkmate.kimbepo.xyz/api/group/${subId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        const d = res.data

         
        
        const mapped={
          id: d.id,
          room_name: d.name,
          room_info: d.description,
          room_manager: d.leaderNickname,
          room_manager_username: d.leaderUsername,
          member_count: d.memberCount
        }

        setGroup(mapped)
        setMembers([])
        setGroupMissions([])
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
          params:{sort:'join',reverse: false, page:0},
        })
        setMembers(res.data.users || [])
      } catch (err) {
        console.error("멤버 정보 불러오기 실패:", err)
      }
    }
    fetchMembers()
  }, [subId, token])

  const openEditModal=()=>{
    setEditName(group.room_name)
    setEditDesc(group.room_info)
    setNewLeader(group.room_manager_username)
    setIsEditOpen(true)
  }

  const closeEditModal=()=>{
    setIsEditOpen(false)
  }

  const handleEditGroup= async()=>{
    try{
      const body={}
      if (editName !== group.room_name) body.name = editName
      if (editDesc !== group.room_info) body.description = editDesc
      if (newLeader !== group.room_manager_username) body.leader = newLeader

      console.log("수정 내용:", body)
      await axios.patch(`https://checkmate.kimbepo.xyz/api/group/${subId}`,
        body,
        { headers: { Authorization: `Bearer ${token}` }})
      
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

  useEffect(() => {
  const fetchGoals = async () => {
    try {
      const res = await axios.get(
        `https://checkmate.kimbepo.xyz/api/goals/group/${subId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )


      setGroupMissions(res.data.goals || [])
    } catch (err) {
      console.error("그룹 목표(미션) 조회 실패:", err)
    }
  }
  fetchGoals()
}, [subId, token])

  return (
    <div className="subpage_container">
      {group &&(
        <>
        <Invite isOpen={IsInviteOpen}
          onClose={handleInviteClose}
          groupId={group.id}
          token={token}
          user={user}
        />

        <div className="subpage_content">
          <div className="subpage_main">
            <div className="group_card">
              <div className="group_info">

                <h2>{group.room_name}</h2>
                <p>
                  <strong>ID:</strong> {group.id}
                </p>
                <p>
                  <strong>방장:</strong> {group.room_manager}
                </p>
                <p>
                  <strong>인원:</strong> {group.member_count}명&nbsp;
                  {/* <Button text="상세 보기" onClick={()=>setIsMemberModalOpen(true)}/> */}
                </p>
                <p className="group_desc">
                  {group.room_info}
                </p>

                {isManager && (
                  <Button text="그룹 정보 수정" type="POSITIVE" onClick={openEditModal}/>
                )}
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
              {isManager && <Button text="새 미션 만들기" type="POSITIVE" onClick={()=>setIsCreateMissionOpen(true)}/>} <br/>
              <Button text="그룹 탈퇴하기" type="NEGATIVE" /> <br/>
              {isManager && <Button text="그룹 삭제하기" type="NEGATIVE" />}
            </div>
          </div>
        </div>

        <Modal
            isOpen={isMemberModalOpen}
            onRequestClose={() => setIsMemberModalOpen(false)}
            className="member_modal"
            overlayClassName="modal_overlay"
          >
            <h2>멤버 목록</h2>
            <ul className="member_list_modal">
              {members.map((m) => (
                <li key={m.username} className="member_item_modal">
                  {m.nickname} ({m.username})
                  {isManager && m.username !== user?.username && (
                    <Button
                      text="강퇴"
                      type="NEGATIVE"
                      onClick={() =>
                        handleKickMember(
                          m.username,
                          "관리자에 의한 강퇴"
                        )
                      }
                    />
                  )}
                </li>
              ))}
            </ul>

            <Button
              text="닫기"
              type="NEGATIVE"
              onClick={() => setIsMemberModalOpen(false)}
            />
          </Modal>

          <Modal
            isOpen={isEditOpen}
            onRequestClose={closeEditModal}
            className="edit_modal"
            overlayClassName="modal_overlay"
          >
            <h2>그룹 정보 수정</h2>

            <label>그룹 이름</label>
            <input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />

            <label>그룹 소개</label>
            <textarea
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
            />

            <label>방장 위임</label>
            <select
              value={newLeader}
              onChange={(e) => setNewLeader(e.target.value)}
              className="leader_select"
            >
              <option value={group.room_manager_username}>
                {group.room_manager} ({group.room_manager_username})
              </option>
              {members.map((m) => (
                <option key={m.username} value={m.username}>
                  {m.nickname} ({m.username})
                </option>
              ))}
            </select>

            <div className="modal_buttons">
              <button className="save_btn" onClick={handleEditGroup}>
                저장
              </button>
              <button className="cancel_btn" onClick={closeEditModal}>
                취소
              </button>
            </div>
          </Modal>
          <CreateMissionModal
            isOpen={isCreateMissionOpen}
            onClose={() => setIsCreateMissionOpen(false)}
            groupId={group.id}
            token={token}
            onSuccess={() => {
              setIsCreateMissionOpen(false)
              // 미션 목록 다시 불러오기
              axios
                .get(`https://checkmate.kimbepo.xyz/api/goals/group/${subId}`, {
                  headers: { Authorization: `Bearer ${token}` }
                })
                .then(res => setGroupMissions(res.data || []))
            }}
          />

      </>
      )}
    </div>
  )
}

export default Subpage
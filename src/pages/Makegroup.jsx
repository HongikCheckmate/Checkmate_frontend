import Modal from 'react-modal'
import axios from 'axios'
import Invite from './Invite'
import { useState,useEffect,useContext } from 'react'
import './Makegroup.css'
import Button from '../components/Button'
import {RoomDispatchContext} from '../App'

const Makegroup = ({ isOpen, onClose }) => {
  const [input, setInput] = useState({
    room_Name: '',
    room_info: '',
    hiden: true,
  })


  const [isInviteOpen, setIsInviteOpen] = useState(false) //invite팝업창 관리
  const [selectedMembers, setSelectedMembers] = useState([])  // 

  const refreshGroups=useContext(RoomDispatchContext)
  const token=localStorage.getItem('accessToken')
  const currentUser=JSON.parse(localStorage.getItem('user'))?.nickname||''
  const handleInviteClick = () => {
    setIsInviteOpen(true)
  }

  const handleInviteClose = () => {
    setIsInviteOpen(false)
  }

  const handleMemberSelect = (member) => {
    if (!selectedMembers.includes(member)) {
      setSelectedMembers([...selectedMembers, member])
    }
  }
  
  const handleSubmit=async()=>{

    if(!token){
      alert('로그인 후 이용 가능합니다')
    }

    if(!input.room_name){
      alert('그룹 이름을 입력하세요')
      return
    }

    try{
      await axios.post("http://checkmate.kimbepo.xyz/api/group",{
        room_name: input.room_name,
        room_info:input.room_info,
        hidden:input.hidden,
        members:selectedMembers,//서버에서 members:[String] 형식을 받아야됨
        room_manager:currentUser,
      },
      {
        headers:{Authorization:`Bearer ${token}`}
      }
    )
      refreshGroups?.()
      onClose()
      setInput({room_name:'',room_info:'',hidden:true})
    }catch(err){
      console.error("그룹 생성 실패",err)
      alert('그룹 생성 오류')
    }
  }


   useEffect(()=>{
    if (!isOpen){
      setSelectedMembers([])
      setInput({room_name:'',room_info:'',hidden:true})
    }
  },[isOpen])
  
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}  className="makegroup_modal" overlayClassName="makegroup_overlay">
      <Invite isOpen={isInviteOpen} onClose={handleInviteClose} onSelectMember={handleMemberSelect} selectedMembers={selectedMembers}/>
      <div className="makegroup_container">
        <h2>새 그룹 만들기</h2>

        <div className="makegroup_info">

          <label>그룹 이름</label>
          <input
            type="text"
            value={input.room_name}
            placeholder='그룹 이름을 입력하세요'
            onChange={(e) => setInput({ ...input, room_name: e.target.value })}
          />
        
          <label>공개 여부</label>
          <select
            value={input.hidden}
            onChange={(e) => setInput({ ...input, hidden: e.target.value==='TRUE' })}
          >
            <option value="TRUE">공개</option>
            <option value="FALSE">비공개</option>
          </select>

          
          <label>멤버</label>
          <Button onClick={handleInviteClick} type="POSITIVE" text='멤버 검색'/>
          <div className="member_list">
            {selectedMembers.length === 0 && <p>선택된 멤버 없음</p>}
            {selectedMembers.map((member, idx) => (
              <div key={idx} className="member_item">{member}</div>
            ))}

          </div>
        
          <label>설명</label>
          <textarea
            placeholder='그룹 설명을 입력하세요'
            value={input.room_info}
            onChange={(e) => setInput({ ...input, room_info: e.target.value })}
          />
        </div>
        

        <div className="button_group">
          <Button type="POSITIVE" text='생성하기' onClick={handleSubmit}/>
          <Button type="NEGATIVE" text='닫기' onClick={onClose}/>
        </div>
      </div>
    </Modal>
  )
}

export default Makegroup
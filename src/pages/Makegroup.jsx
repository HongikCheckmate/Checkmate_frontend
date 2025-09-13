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
    hiden: 'TRUE',
  }); 


  const [isInviteOpen, setIsInviteOpen] = useState(false) //invite팝업창 관리
  const [selectedMembers, setSelectedMembers] = useState([])  // 

  const refreshGroups=useContext(RoomDispatchContext)
  const handleInviteClick = () => {
    setIsInviteOpen(true)
  }

  const handleInviteClose = () => {
    setIsInviteOpen(false)
  };

  const handleMemberSelect = (member) => {
    if (!selectedMembers.includes(member)) {
      setSelectedMembers([...selectedMembers, member])
    }
  }
  
  const handleSubmit=async()=>{
    try{
      await axios.post("http://localhost:8080/api/groups",{
        room_Name: input.room_Name,
        room_info:input.room_info,
        hiden:input.hiden==='True',
        members:selectedMembers,//서버에서 members:[String] 형식을 받아야됨
        room_manager:'',
      })
      refreshGroups()
      onClose()
    }catch(err){
      console.error("그룹 생성 실패",err)
    
    }
  }


   useEffect(()=>{
    if (!isOpen){
      setSelectedMembers([])
    }
  },[isOpen])
  
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}  className="Modal" overlayClassName="Overlay">
      <Invite isOpen={isInviteOpen} onClose={handleInviteClose} onSelectMember={handleMemberSelect} selectedMembers={selectedMembers}/>
      <div className="modal-container">
        <h2>새 그룹 만들기</h2>

        <div className="form-group">

          <label>그룹 이름</label>
          <input
            type="text"
            value={input.room_Name}
            placeholder='그룹 이름을 입력하세요'
            onChange={(e) => setInput({ ...input, room_Name: e.target.value })}
          />
        
          <label>공개 여부</label>
          <select
            value={input.hiden}
            onChange={(e) => setInput({ ...input, hiden: e.target.value })}
          >
            <option value="TRUE">공개</option>
            <option value="FALSE">비공개</option>
          </select>

          
          <label>멤버</label>
          <Button onClick={handleInviteClick} type="POSITIVE" text='멤버 검색'/>
          <div className="member-list">
            {selectedMembers.length === 0 && <p>선택된 멤버 없음</p>}
            {selectedMembers.map((member, idx) => (
              <div key={idx} className="member-item">{member}</div>
            ))}

          </div>
        
          <label>설명</label>
          <textarea
            placeholder='그룹 설명을 입력하세요'
            value={input.room_info}
            onChange={(e) => setInput({ ...input, room_info: e.target.value })}
          />
        </div>
        

        <div className="button-group">
          <Button type="POSITIVE" text='생성하기'/>
          <Button onClick={onClose} type="NEGATIVE" text='닫기'/>
        </div>
      </div>
    </Modal>
  )
}

export default Makegroup
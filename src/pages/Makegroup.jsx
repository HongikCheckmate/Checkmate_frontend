import Modal from 'react-modal'
import axios from 'axios'
import { useState,useEffect,useContext } from 'react'
import './Makegroup.css'
import Button from '../components/Button'
import {RoomDispatchContext} from '../App'

const Makegroup = ({ isOpen, onClose }) => {
  const [input, setInput] = useState({
    room_name: '',
    room_info: '',
    hidden: true,
  })

  const refreshGroups=useContext(RoomDispatchContext)
  const token=localStorage.getItem('accessToken')
  const currentUser=JSON.parse(localStorage.getItem('user'))?.nickname||''
  
  const handleSubmit=async()=>{

    if(!token){
      alert('로그인 후 이용 가능합니다')
    }

    if(!input.room_name){
      alert('그룹 이름을 입력하세요')
      return
    }

    try{
      await axios.post("https://checkmate.kimbepo.xyz/api/group/create",{
        room_name: input.room_name,
        room_info:input.room_info,
        hidden:input.hidden,
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
      setInput({room_name:'',room_info:'',hidden:true})
    }
  },[isOpen])
  
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}  className="makegroup_modal" overlayClassName="makegroup_overlay">
      
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
            value={input.hidden?'FALSE':'TRUE'}
            onChange={(e) => setInput({ ...input, hidden: e.target.value==='FALSE' })}
          >
            <option value="TRUE">비공개</option>
            <option value="FALSE">공개</option>
          </select>
        
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
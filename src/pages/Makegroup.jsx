import Modal from 'react-modal'
import axios from 'axios'
import { useState,useEffect,useContext } from 'react'
import './Makegroup.css'
import Button from '../components/Button'
import {RoomDispatchContext} from '../App'

const Makegroup = ({ isOpen, onClose }) => {
  const [input, setInput] = useState({
    name: '',
    description: '',
    hidden: true,
    password:''
  })

  const refreshGroups=useContext(RoomDispatchContext)
  const token=localStorage.getItem('accessToken')
  const currentUser=JSON.parse(localStorage.getItem('user'))?.username||''
  
  const handleSubmit=async()=>{

    if(!token){
      alert('로그인 후 이용 가능합니다')
    }

    if(!input.name.trim()){
      alert('그룹 이름을 입력하세요')
      return
    }

    if(input.hidden && !input.password.trim()){
      alert('비공개 그룹의 경우 비밀번호를 입력하세요')
      return
    }

    try{
      const res = await axios.post("https://checkmate.kimbepo.xyz/group/create",{
        name: input.name,
        description:input.description,
        hidden:input.hidden,
        roomManager:currentUser,
        ...(input.hidden&&{password:input.password})
      },
      {
        headers:{Authorization:`Bearer ${token}`}
      }
    )

      
      refreshGroups?.()
      onClose()
      setInput({name:'',description:'',hidden:true,password:''})
    }catch(err){
      console.error("그룹 생성 실패",err)
      alert('그룹 생성 오류')
    }
  }


   useEffect(()=>{
    if (!isOpen){
      setInput({name:'',description:'',hidden:true,password:''})
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
            value={input.name}
            placeholder='그룹 이름을 입력하세요'
            onChange={(e) => setInput({ ...input, name: e.target.value })}
          />
        
          <label>공개 여부</label>
          <select
            value={input.hidden?'TRUE':'FALSE'}
            onChange={(e) => setInput({ ...input, hidden: e.target.value==='TRUE' })}
          >
            <option value="TRUE">비공개</option>
            <option value="FALSE">공개</option>
          </select>

          {input.hidden && (
            <>
              <label>비밀번호</label>
              <input
                type="password"
                value={input.password}
                placeholder='그룹 비밀번호를 입력하세요'
                onChange={(e) => setInput({ ...input, password: e.target.value })}
              />
            </>
          )}
        
          <label>설명</label>
          <textarea
            placeholder='그룹 설명을 입력하세요'
            value={input.description}
            onChange={(e) => setInput({ ...input, description: e.target.value })}
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
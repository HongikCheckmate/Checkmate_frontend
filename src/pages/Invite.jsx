// alert와 연계되는 기능 확인하기

import Modal from 'react-modal'
import './Invite.css'
import { useState } from 'react'
import Button from '../components/Button'


const Invite = ({ isOpen, onClose, onSelectMember, selectedMembers = [], groupId, token,user }) => {
  const [searchNickname, setSearchNickname] = useState('')
  const [searchNicknameResult, setSearchNicknameResult] = useState([])

  const enterForSearch = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleSearch = async () => {
    if (!searchNickname) return

    try {
      const response = await fetch(`https://checkmate.kimbepo.xyz/api/user/search?query=${searchNickname}`,{
      headers:{
        'Authorization':`Bearer ${token}`,
      },
    })
    if (!response.ok) throw new Error('검색 실패')

    
    const data=await response.json()
    console.log(data)

    if (Array.isArray(data.content)) {
      setSearchNicknameResult(data.content)
    } else {
      setSearchNicknameResult([])
    }
  } catch(err){
    alert('검색 중 오류가 발생했습니다')
  }
}

  const handleInvite = async (inviteeId, nickname) => {
    try {
      const inviterId = user.username
      const response = await fetch(`https://checkmate.kimbepo.xyz/api/invites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':`Bearer ${token}`
        },
        body: JSON.stringify({ inviterId, inviteeId, groupId }),
      })
      console.log({body:{ inviterId, inviteeId, groupId }})

      if (response.ok) {
        alert(`${nickname} 님에게 초대장을 보냈습니다!`)
        onSelectMember?.(inviteeId)
        setSearchNicknameResult((prev) => prev.filter(u=>u.username!==inviteeId))
      } else {
        alert('초대 실패')
      }
    } catch (err) {
      alert('오류가 발생했습니다.')
    }
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="Modal" overlayClassName="Overlay">
      <h3>멤버 초대</h3>
      <input
        type="search"
        placeholder="닉네임을 입력하세요"
        onChange={(e) => setSearchNickname(e.target.value)}
        onKeyDown={enterForSearch}
      />
      &ensp;
      <Button text="검색" onClick={handleSearch} />

      <div className="nicknamelist">
        {Array.isArray(searchNicknameResult)&&searchNicknameResult.length === 0 && (<p>검색 결과가 없습니다.</p>)}
        {searchNicknameResult.map((u) => {
          const alreadyInvited = selectedMembers.includes(u.username)
          return (
            <div key={u.username} className="searchnicknamelist">
              {u.nickname}
              <Button
                text={alreadyInvited ? '초대됨' : '초대하기'}
                type="POSITIVE"
                disabled={alreadyInvited}
                onClick={() => handleInvite(u.username, u.nickname)}
              />
            </div>
          )
        })}
      </div>

      <Button className="closebutton" text="닫기" onClick={onClose} type="NEGATIVE" />
    </Modal>
  )
}
export default Invite
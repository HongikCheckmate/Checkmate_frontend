// alert와 연계되는 기능 확인하기

import Modal from 'react-modal'
import './Invite.css'
import { useState } from 'react'
import Button from '../components/Button'


const Invite = ({ isOpen, onClose, onSelectMember, selectedMembers = [], groupId, token }) => {
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

  const handleInvite = async (nickname) => {
    try {
      const response = await fetch(`https://checkmate.kimbepo.xyz/api/group/${groupId}/invites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':`Bearer ${token}`
        },
        body: JSON.stringify({ nickname }),
      })

      if (response.ok) {
        alert(`${nickname} 님에게 초대장을 보냈습니다!`)
        onSelectMember?.(nickname)
        setSearchNicknameResult((prev) => prev.filter((name) => name !== nickname))
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
        {searchNicknameResult.map((nickname, idx) => {
          const alreadyInvited = selectedMembers.includes(nickname)
          return (
            <div key={idx} className="searchnicknamelist">
              {nickname}
              <Button
                text={alreadyInvited ? '초대됨' : '초대하기'}
                type="POSITIVE"
                disabled={alreadyInvited}
                onClick={() => handleInvite(nickname)}
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
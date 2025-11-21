import { useState, useEffect } from 'react'
import Button from './Button'
import './Socialinfo.css'

const Socialinfo = () => {
  const [info, setInfo] = useState({
    nickname: '',
    email: '',
    phone_number: '',
  })

  const getToken = () => {
    const params = new URLSearchParams(window.location.search)

    const urlAccess = params.get("accessToken")
    const urlRefresh = params.get("refreshToken")

    if (urlAccess) localStorage.setItem("accessToken", urlAccess)
    if (urlRefresh) localStorage.setItem("refreshToken", urlRefresh)

    return urlAccess || localStorage.getItem("accessToken")
  }
  
  useEffect(() => {
    getToken()
  }, [])

  const handleSubmit = async () => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      alert('로그인 정보가 없습니다. 다시 로그인해주세요.')
      return
    }

    try {
      const res = await fetch('https://checkmate.kimbepo.xyz/api/oauth2/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(info),
      })

      const data = await res.json()

      if (res.ok) {
        localStorage.setItem('accessToken', data.accessToken)
        localStorage.setItem('refreshToken', data.refreshToken)
        alert('추가 정보 등록 완료!')
        window.location.href = '/'
      } else {
        alert('등록 실패')
        console.error(data)
      }
    } catch (err) {
      console.error('Error:', err)
      alert('서버 오류 발생')
    }
  }

  return (
    <div className="social-info-container">
      <h2>추가 정보 입력</h2>

      <div className="info-input">
        <label>닉네임</label>
        <input
          type="text"
          value={info.nickname}
          onChange={(e) => setInfo({ ...info, nickname: e.target.value })}
        />
      </div>

      <div className="info-input">
        <label>이메일</label>
        <input
          type="text"
          value={info.email}
          onChange={(e) => setInfo({ ...info, email: e.target.value })}
        />
      </div>

      <div className="info-input">
        <label>전화번호</label>
        <input
          type="text"
          value={info.phone_number}
          onChange={(e) => setInfo({ ...info, phone_number: e.target.value })}
        />
      </div>

      <div className="info-buttons">
        <Button type="POSITIVE" text="등록" onClick={handleSubmit} />
      </div>
    </div>
  )
}

export default Socialinfo

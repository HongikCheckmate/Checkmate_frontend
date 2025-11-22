import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Button from "./Button"
import "./Socialsignup.css"
import {jwtDecode} from 'jwt-decode'

const Socialsignup = ({onLogin}) => {
  const [info, setInfo] = useState({
    nickname: "",
    email: "",
    phone_number: "",
  })

  const navigate = useNavigate()


//token 먼저 처리
  const getToken=() => {
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


  const createUserObject=(accessToken,nickname)=>{
    const decoded=jwtDecode(accessToken)

    return {
      id: decoded.userId,
      username: decoded.username,
      nickname: nickname,
      accessToken
    }
  }

  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async () => {
    const token = getToken()

    if (!token) {
      alert("로그인 정보가 없습니다. 다시 로그인해주세요.")
      navigate("/")
      return
    }

    try {
      const res = await fetch("https://checkmate.kimbepo.xyz/api/oauth2/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(info),
      })

      const data = await res.json()

      if (res.ok) {
        localStorage.setItem("accessToken", data.accessToken)
        localStorage.setItem("refreshToken", data.refreshToken)

        const userObj=createUserObject(data.accessToken, info.nickname)

        localStorage.setItem("user", JSON.stringify(userObj))
        onLogin(userObj)
        alert("회원정보가 등록되었습니다!")
        navigate("/")
      } else {
        alert("등록 실패: " + (data.message || "서버 오류"))
      }
    } catch (err) {
      console.error("오류:", err)
      alert("서버 연결 중 오류 발생")
    }
  }

  return (
    <div className="social-signup-container">
      <h2>소셜 회원가입 추가 정보</h2>
      <div className="social-signup-inputs">
        <label>닉네임</label>
        <input
          name="nickname"
          value={info.nickname}
          onChange={handleChange}
          placeholder="닉네임을 입력하세요"
        />
        <label>이메일</label>
        <input
          name="email"
          value={info.email}
          onChange={handleChange}
          placeholder="이메일을 입력하세요"
        />
        <label>전화번호</label>
        <input
          name="phone_number"
          value={info.phone_number}
          onChange={handleChange}
          placeholder="전화번호를 입력하세요"
        />
      </div>
      <div className="social-signup-buttons">
        <Button type="POSITIVE" text="등록" onClick={handleSubmit} />
        <Button type="NEGATIVE" text="취소" onClick={() => navigate("/")} />
      </div>
    </div>
  )
}

export default Socialsignup

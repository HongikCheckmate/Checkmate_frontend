import { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"

const Oauthcallback = () => {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    console.log("현재 URL:", window.location.href);
    console.log("search params:", location.search);

    const params = new URLSearchParams(location.search)
    const accessToken = params.get("accessToken")
    const refreshToken = params.get("refreshToken")
    const isGuest = params.get("isGuest")

    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken)
      localStorage.setItem("refreshToken", refreshToken)
      

      if (isGuest === "true") {
        navigate("/social-signup") // 추가 정보 입력 페이지로
      } else {
        navigate("/") // 메인페이지로
      }
    } else {
      alert("로그인 실패. 다시 시도해주세요.")
      navigate("/")
    }
  }, [navigate, location])

  return <div>소셜 로그인 중입니다...</div>
}

export default Oauthcallback

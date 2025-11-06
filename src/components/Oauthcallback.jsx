import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");
    const isGuest = params.get("isGuest");

    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      if (isGuest === "true") {
        navigate("/social-signup"); // 추가 정보 입력 페이지로
      } else {
        navigate("/"); // 메인페이지로
      }
    } else {
      alert("로그인 실패. 다시 시도해주세요.");
      navigate("/");
    }
  }, [navigate]);

  return <div>소셜 로그인 중입니다...</div>;
};

export default OAuthCallback;

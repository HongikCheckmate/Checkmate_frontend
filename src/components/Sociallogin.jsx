import './Sociallogin.css'
import { FaGoogle, FaGithub } from 'react-icons/fa'

const Sociallogin = () => {
  const handleSocialLogin = (provider) => {
    console.log("소셜 로그인 시작:", provider)
    const redirectUri = `https://check-mate-web.vercel.app/`
    window.location.href = `https://checkmate.kimbepo.xyz/oauth2/authorization/${provider}/?redirect_uri=${redirectUri}`
  }

  return (
    <div className="social-login-container">
      <div className="social-buttons">
        <button
          className="social-button google"
          onClick={() => handleSocialLogin('google')}
        >
          <FaGoogle className="icon" /> Google 로그인
        </button>
        <button
          className="social-button github"
          onClick={() => handleSocialLogin('github')}
        >
          <FaGithub className="icon" /> GitHub 로그인
        </button>
      </div>
    </div>
  )
}

export default Sociallogin

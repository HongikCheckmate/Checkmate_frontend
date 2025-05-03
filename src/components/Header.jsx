import './Header.css'
import logo from '../assets/checkmate 로고.jpg'

const Header=({title})=>{
    return (
        <header className='Header'>
            <div className='Header_image'>
                <img src={logo}/>
            </div>
            <div className="Header_main">{title}</div>
        </header>
    )
    
}
export default Header
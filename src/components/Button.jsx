import './Button.css'
const Button=({text,type,onClick,className=''})=>{
    return (
        <button 
            onClick={onClick} 
            className={`Button Button_${type} ${className}`}
        >
            {text}
        </button>
    )
}
export default Button
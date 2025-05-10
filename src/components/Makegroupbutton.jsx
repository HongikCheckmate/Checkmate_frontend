import Button from "./Button";
import './Makegroupbutton.css'

const Makegroupbutton=({open})=>{
    return (
    <div className='mgb'>    
        <Button text='그룹 생성하기' type='POSITIVE' className='mgbb'
        onClick={open}/>
    </div>
    )
}

export default Makegroupbutton
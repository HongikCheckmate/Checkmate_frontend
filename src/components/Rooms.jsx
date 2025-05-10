import Button from './Button'
import './Rooms.css'


const Rooms=({id,room_name,room_manager,members,hiden,room_info})=>{
    return (
        
        <div className='Rooms'>
            <div className='room_name'>
                {room_name} 
            </div>
            <div className='room_manager'>
                {room_manager}
            </div>
            <div className='members_num'>
                {members.length}명
            </div>
            <div className='hiden_or_not'>
                {hiden===true? '비공개':'공개'}
            </div>
            <div className='room_info'>
                <Button text={"보기"}/>
            </div>
        </div>
    )
}

export default Rooms
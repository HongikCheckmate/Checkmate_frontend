import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from './Button'
import './Rooms.css'

const Rooms = ({ id, room_name, room_manager, members, hidden, room_info, isLoggedIn}) => {
    const [isOpen, setIsOpen] = useState(false)
    const navigate=useNavigate()
    const handleRoomClick=(e)=>{
        e.preventDefault()
        if(!isLoggedIn){
            alert("로그인 후 이용 가능합니다")
            return
        }
        navigate(`/sub/${id}`)
    }
    return (
        <>
            <div className='Rooms'>
                <div className='room_name'>
                    <a href={`/sub/${id}`} className='room_link' onClick={handleRoomClick}>
                        {room_name}
                    </a>
                </div>

                <div className='room_manager'>
                    {room_manager}
                </div>

                <div className='members_num'>
                    {Array.isArray(members) ? members.length : (typeof members === 'number' ? members : 0)}명
                </div>

                <div className='hidden_or_not'>
                    {hidden === true ? '비공개' : '공개'}
                </div>

                <div className='room_info'>
                    <Button text={"보기"} onClick={() => setIsOpen(true)} />
                </div>
            </div>

            {isOpen && (
                <div className="modal_overlay" onClick={() => setIsOpen(false)}>
                    <div className="modal_content" onClick={(e) => e.stopPropagation()}>
                        <h3>{room_name}</h3>
                        <p>{room_info}</p>
                        <Button text="닫기" onClick={() => setIsOpen(false)} />
                    </div>
                </div>
            )}
        </>
    )
}

export default Rooms

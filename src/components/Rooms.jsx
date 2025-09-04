import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'
import './Rooms.css'

const Rooms = ({ id, room_name, room_manager, members, hiden, room_info }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <div className='Rooms'>
                <div className='room_name'>
                    <Link to={`/sub/${id}`} className="room_link">
                        {room_name}
                    </Link>
                </div>

                <div className='room_manager'>
                    {room_manager}
                </div>

                <div className='members_num'>
                    {members.length}명
                </div>

                <div className='hiden_or_not'>
                    {hiden === true ? '비공개' : '공개'}
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

import RoomHeader from './RoomHeader'
import Rooms from './Rooms'
import { useContext } from 'react'
import { RoomStateContext } from '../App'

const RoomList=({isLoggedIn})=>{
    const groups=useContext(RoomStateContext)
    return (
        <div className='RoomList'>
            <div className='list_wrapper'>
                <RoomHeader />
                {groups.length===0?(
                    <p>그룹이 없습니다</p>
                ):(
                    
                        groups.map((group) => (
                            <Rooms
                                key={group.id}
                                id={group.id}
                                room_name={group.room_name}
                                room_manager={group.room_manager}
                                members={group.members}
                                hidden={group.hidden}  
                                room_info={group.room_info}
                                isLoggedIn={isLoggedIn}
                            />
                    ))
                )}
            </div>
        </div>
        
    )
}
export default RoomList
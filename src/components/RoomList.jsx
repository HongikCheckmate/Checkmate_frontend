import './RoomList.css'
import {Link} from 'react-router-dom'
import RoomHeader from './RoomHeader'
import Rooms from './Rooms'

const RoomList=({data})=>{
    return (
        <div className='RoomList'>
            <div className='list_wrapper'>
                <RoomHeader />
                {data.length===0?(
                    <p>그룹이 없습니다</p>
                ):(
                    
                        data.map((group) => (
                            <Rooms
                                key={group.id}
                                id={group.id}
                                room_name={group.room_name}
                                room_manager={group.room_manager}
                                members={group.members}
                                hiden={group.hidden}  
                                room_info={group.room_info}
                            />
                    ))
                )}
            </div>
        </div>
        
    )
}
export default RoomList
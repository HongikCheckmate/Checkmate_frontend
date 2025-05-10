import './RoomList.css'

import RoomHeader from './RoomHeader'
import Rooms from './Rooms'

const RoomList=({data})=>{
    return (
        <div className='RoomList'>
            <div className='list_wrapper'>
                <RoomHeader />
                {data.map((room)=><Rooms key={room.id} {...room}/>)}
            </div>
        </div>
        
    )
}
export default RoomList
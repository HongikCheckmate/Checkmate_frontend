import './RoomList.css'
import Rooms from './Rooms'

const RoomList=({data})=>{
    return (
        <div className='RoomList'>
            <div className='list_wrapper'>
                {data.map((item)=><Rooms key={item.id} {...item}/>)}
            </div>
        </div>
        
    )
}
export default RoomList
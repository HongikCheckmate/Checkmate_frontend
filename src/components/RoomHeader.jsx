import './Rooms.css'

const RoomHeader=()=>{
    return (
        <div className='Rooms header'>
            <div className='room_name'>그룹 이름</div>
            <div className='room_manager'>방장</div>
            <div className='members_num'>멤버 수</div>
            <div className='hiden_or_not'>공개 여부</div>
            <div className='room_info'>설명</div>
        </div>
    )
}

export default RoomHeader
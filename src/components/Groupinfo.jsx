import './Groupinfo.css'

import Button from "./Button"
import Rooms from "./Rooms"
import { useState } from "react"


const Groupinfo=({data})=>{
    const [input,setInput]=useState()
    return (
        <div className='Groupinfo'>
            {/* {data.map((room)=><Rooms key={room.id} {...room}/>)} } */}
            <section className='room_info'></section>
            <section className='work_list'></section>
            <section className='work_input'>
                <textarea placeholder="과제를 입력하세요"/>
            </section>
            <section className='buttons'>
                <Button text="취소"/>
                <Button text="등록" type={"POSITIVE"}/>
            </section>
            
        </div>
    )
}

export default Groupinfo
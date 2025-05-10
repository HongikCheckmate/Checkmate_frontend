import Groupinfo from "../components/Groupinfo"

import {useState,useContext} from 'react'
import {RoomStateContext} from '../App'


const Subpage=()=>{
    const data = useContext(RoomStateContext);

    return (
    <>
        <div>
            <Groupinfo data={data}/>
        </div>
    </>
    )
}

export default Subpage

//Worklist를 과제 리스트로, works를 각각의 과제로
//works에서 input 시 worklist가 다시 나타나도록
//login_success component 작성

import {Routes,Route,Link,useNavigate} from 'react-router-dom'
import Subpage from './Subpage'
import Makegroup from "./Makegroup"
import Mypage from "./Mypage"
import Alert from "./Alert"
import Makeid from "./Makeid"
import Header from "../components/Header"
import RoomList from "../components/RoomList"

import {useState,useContext} from 'react'
import {RoomStateContext} from '../App'


/*home=mainpage*/

const Mainpage= ()=>{
    const data=useContext(RoomStateContext)
    return (
    <>
        <div>
        <Header title={"Checkmate"}/><br/>
        <Link to ={"/sub"}>Subpage</Link><br/>
        <Link to ={"/my"}>Mypage</Link><br/>
        <Link to ={"/alert"}>Alert</Link><br/>
        <Link to ={"/id"}>Makeid</Link><br/>
        <Link to ={"/group"}>Makegroup</Link>
        <RoomList data={data}/>
        </div>
        
    </>
    )
    
}
export default Mainpage
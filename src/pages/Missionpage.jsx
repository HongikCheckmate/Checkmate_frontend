import {Routes,Route,Link,useParams} from 'react-router-dom'

const Missionpage=()=>{
    const params=useParams()
    return (
    <>
        <div>
            <Link to ={"/invite"}>Invite</Link>
        </div>
        <div>
            그룹 id: {params.id}
        </div>
        
        
    </>
    )
}

export default Missionpage
import Missions from "./Missions"


const Missionlist = ({missions,subId, user, group}) => {

  if(!missions||missions.length===0) {
    return <p>등록된 미션이 없습니다</p>
  }

  return (
            <div className="mission_wrapper">
                <Missions missions={missions} subId={subId} user={user} group={group}/>
            </div>
        )
}

export default Missionlist
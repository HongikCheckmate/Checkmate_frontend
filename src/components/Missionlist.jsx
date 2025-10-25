import Missions from "./Missions"


const Missionlist = ({missions,subId}) => {

  if(!missions||missions.length===0) {
    return <p>등록된 미션이 없습니다</p>
  }

  return (
            <div className="mission_wrapper">
                <Missions missions={missions} subId={subId}/>
            </div>
        )
}

export default Missionlist
import { Link} from "react-router-dom"
import { useState } from "react"
import Button from "./Button"
import Missionstatus from "./Missionstatus"
import "./Missions.css"

const Missions= ({ missions,subId, user, group }) => {

  const [isModalOpen, setIsModalOpen]=useState(false)
  const [selectedMission,setSelectedMission]=useState(null)

  const viewStatus=(mission)=>{
    const mapped={
      id:mission.id,
      name:mission.title,
      start:mission.start,
      end:mission.end,
      certificationType:mission.type,
      cycle:mission.cycle,
      leaderUsername:group?.room_manager_username
    }

    setSelectedMission(mapped)
    setIsModalOpen(true)
  }

  return (
    <div>
    <table className="missions_table">
      <thead>
        <tr>
          <th>미션 제목</th>
          <th>시작 날짜</th>
          <th>마감 날짜</th>
          <th>제출 여부</th>
          <th>진행도</th>
        </tr>
      </thead>
      <tbody>
        {missions.map((mission) => (
          <tr key={mission.id}>
            <td>
              <Link to={`/sub/${subId}/mission/${mission.id}`} className="mission_link">
                {mission.title}
              </Link>
            </td>
            <td>{mission.start}</td>
            <td>{mission.end}</td>
            <td>
              {mission.status ==='submitted'
                    ? '제출 완료'
                    :mission.status==='confirmed'
                    ? '검토 완료'
                    : '미제출'
              }
            </td>
            <td>
              <Button text='보기' onClick={()=>viewStatus(mission)}/>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {selectedMission && (
      <Missionstatus
        isOpen={isModalOpen}
        onClose={()=>setIsModalOpen(false)}
        mission={selectedMission}
        user={user}
      />
    )}
    </div>
    
  )
}

export default Missions
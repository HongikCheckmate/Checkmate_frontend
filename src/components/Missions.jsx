import { Link,useParams} from "react-router-dom"
import "./Missions.css"

const Missions= ({ missions,subId }) => {

  return (
    <table className="missions_table">
      <thead>
        <tr>
          <th>미션 제목</th>
          <th>시작 날짜</th>
          <th>마감 날짜</th>
          <th>제출 여부</th>
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
            <td>{mission.submitted ? "제출 완료" : "미제출"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Missions
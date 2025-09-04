import { useParams, Link } from "react-router-dom"
import { useContext } from "react"
import { RoomStateContext } from "../App"
import Loginsuccess from "../components/Loginsuccess"
import Button from "../components/Button"
import "./Subpage.css";

const Subpage = ({ isLoggedIn, user, onLogout }) => {
  const { id } = useParams()
  const groups = useContext(RoomStateContext)

  // 해당 id에 맞는 그룹 찾기
  const group = groups.find((g) => g.id.toString() === id) || {
    room_name: "알 수 없는 그룹",
    room_manager: "",
    members: [],
    room_info: "",
    missions: [],
  }

  // 현재 로그인한 사용자의 닉네임d
  const currentUser = user?.nickname || ""
  const isManager = currentUser === group.room_manager

  return (
    <div className="subpage_container">

      <div className="subpage_content">
        <div className="subpage_main">

        <div className="group_card">
          <div className="group_info">
            <h2>{group.room_name}</h2>
            <p>
              <strong>방장:</strong> {group.room_manager}
            </p>
            <p>
              <strong>인원:</strong> {group.members.length}명
            </p>
            <p className="group_desc">
              {group.room_info}
            </p>
          </div>

          <div className="group_actions">
            <Button text="멤버 초대" type="POSITIVE" />
            <Button text="그룹 탈퇴" type="NEGATIVE" />
            {isManager && <Button text="그룹 삭제" type="NEGATIVE" />}
          </div>
        </div>

        <div className="missions">
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
              {group.missions && group.missions.length > 0 ? (
                group.missions.map((mission) => (
                  <tr key={mission.id}>
                    <td>
                      <Link to={`/mission/${mission.id}`} className="mission_link">
                        {mission.title}
                      </Link>
                    </td>
                    <td>{mission.start}</td>
                    <td>{mission.end}</td>
                    <td>{mission.submitted ? "제출 완료" : "미제출"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">등록된 미션이 없습니다.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        </div>

         <div className='subpage_login'>
          {isLoggedIn && <Loginsuccess user={user} onLogout={onLogout} />}
        </div>

      </div>
    </div>
  );
};

export default Subpage;

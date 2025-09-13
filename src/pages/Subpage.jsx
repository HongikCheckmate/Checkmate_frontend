import { useParams, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { RoomStateContext } from "../App"
import Loginsuccess from "../components/Loginsuccess"
import Button from "../components/Button"
import Missionlist from "../components/Missionlist"
import "./Subpage.css"

const Subpage = ({ isLoggedIn, user, onLogout }) => {
  const { subId } = useParams()
  const navigate=useNavigate()
  const groups = useContext(RoomStateContext)
  

  // 해당 id에 맞는 그룹 찾기
  const group = groups.find((g) => g.id.toString() === subId) || {
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

          </div>

          <Missionlist missions={group.missions} subId={subId}/>

          <div className="subpage_back">
            <Button text='목록으로' onClick={()=>navigate('/')}/>
          </div>

        </div>

        <div className='subpage_login'>
          {isLoggedIn && <Loginsuccess user={user} onLogout={onLogout} />}
          <div className='subpage_button'>
            <Button text="멤버 초대하기" type="POSITIVE" /> <br/>
            {isManager && <Button text="새 미션 만들기" type="POSITIVE"/>} <br/>
            <Button text="그룹 탈퇴하기" type="NEGATIVE" /> <br/>
            {isManager && <Button text="그룹 삭제하기" type="NEGATIVE" />}
          </div>
        </div>

      </div>

    </div>
  )
}

export default Subpage

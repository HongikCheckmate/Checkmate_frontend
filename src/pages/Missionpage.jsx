import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Button from "../components/Button"
import axios from "axios"
import "./Missionpage.css"

const Missionpage = () => {
  const { subId, missionId } = useParams()
  const navigate = useNavigate()
  const token = localStorage.getItem("accessToken")

  const [mission, setMission] = useState(null)
  const [statusInfo, setStatusInfo] = useState(null)
  const [content, setContent] = useState("")
  const [file, setFile] = useState(null)

  const authHeader = { Authorization: `Bearer ${token}` }

  // 미션 정보 조회
  useEffect(() => {
    const fetchMission = async () => {
      try {
        const res = await axios.get(
          `https://checkmate.kimbepo.xyz/api/goals/group/${subId}`,
          { headers: authHeader }
        )
        const list=res.data.goals || []
        const found=list.find(m=>m.id==missionId)
        if (!found) {
          alert("해당 미션을 찾을 수 없습니다.")
        }

        const mapped={
          id:found.id,
          name:found.name,
          certificationType:found.certificationType,
          externalMethod:found.externalMethod,
          cycle:found.cycle,
          start: found.createdDate,
          createdDate: found.createdDate,
          endDate: found.endDate,
          groupId: found.groupId
        } 

        setMission(mapped)
      } catch (err) {
        console.error("미션 불러오기 실패:", err)
      }
    }
    fetchMission()
  }, [missionId,subId])

  // 인증상태 조회
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get(
          `https://checkmate.kimbepo.xyz/api/certifications/goal/${missionId}/status`,
          { headers: authHeader }
        )

        const currentUser = JSON.parse(localStorage.getItem("user"))
        const mine = res.data.find(
          (s) => s.userId === currentUser?.id
        )

        setStatusInfo(mine || null)
      } catch (err) {
        console.error("미션 상태 조회 실패:", err)
      }
    }

    fetchStatus()
  }, [missionId])

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  // 미션 제출
  const handleSubmit = async () => {
    if (!mission) return
    const type = mission.certificationType

    try {
      if (type === "TEXT") {
        if (!content.trim()) {
          alert("내용을 입력해주세요.")
          return
        }

        await axios.post(
          `https://checkmate.kimbepo.xyz/api/certifications/text?goalId=${missionId}`,
          { content },
          { headers: authHeader },
        )
      }

      else if (type === "IMAGE") {
        if (!file) {
          alert("이미지 파일을 첨부해주세요.")
          return
        }
        const fd = new FormData()
        fd.append("file", file)
        fd.append("goalId", missionId)
        fd.append("groupId", subId)

        await axios.post(
          `https://checkmate.kimbepo.xyz/api/certifications/image`,
          fd,
          { headers: authHeader }
        )
      }

      else if (type === "VIDEO") {
        if (!file) {
          alert("영상 파일을 첨부해주세요.")
          return
        }
        const fd = new FormData()
        fd.append("file", file)
        fd.append("goalId", missionId)
        fd.append("groupId", subId)

        await axios.post(
          `https://checkmate.kimbepo.xyz/api/certifications/video`,
          fd,
          { headers: authHeader }
        )
      }

      else if (type === "EXTERNAL") {
        await axios.post(
          `https://checkmate.kimbepo.xyz/api/certifications/external`,
          {
            goalId: missionId,
            method: mission.externalMethod,
          },
          { headers: authHeader }
        )
      }

      alert("제출되었습니다.")
      window.location.reload()

    } catch (err) {
      console.error("미션 제출 실패:", err)
      alert("미션 제출 중 오류가 발생했습니다.")
    }
  }

  if (!mission) return <p>로딩 중...</p>

  return (
    <div className="missionpage_container">
      <h2>{mission.name}</h2>

      <div className="mission_info">
        <p><strong>인증 타입:</strong> {mission.certificationType}</p>
        <p><strong>주기:</strong> {mission.cycle}일</p>
        <p><strong>시작일:</strong> {mission.createdDate}</p>
        <p><strong>마감일:</strong> {mission.endDate}</p>
        <p><strong>인증 상태:</strong> {statusInfo?.status || "미제출"}</p>
      </div>

      <div className="mission_input">
        {mission.certificationType === "TEXT" && (
          <textarea
            placeholder="미션 내용을 입력하세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        )}

        {(mission.certificationType === "IMAGE" ||
          mission.certificationType === "VIDEO") && (
          <input type="file" onChange={handleFileChange} />
        )}

        {mission.certificationType === "EXTERNAL" && (
          <p>외부 연동 방식으로 인증됩니다.</p>
        )}
      </div>

      <div className="mission_actions">
        <Button text="제출하기" type="POSITIVE" onClick={handleSubmit} />
        <Button text="목록으로" onClick={() => navigate(`/sub/${subId}`)} />
      </div>
    </div>
  )
}

export default Missionpage

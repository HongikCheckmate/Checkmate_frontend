import { useState } from "react"
import { useParams,useNavigate } from "react-router-dom"
import "./Missionpage.css"
import Button from "../components/Button"

const Missionpage = () => {
  const { subId, missionId } = useParams()
  const navigate=useNavigate()

  const mockMission = {
    id:missionId,
    title: "백준 100문제 풀기",
    description: "백준을 100문제 풀어오세요",
    start: "2025-08-01",
    end: "2025-08-10",
    submitted: false, 
  }

  const [content, setContent] = useState("")
  const [file, setFile] = useState(null)
  const [submitted, setSubmitted] = useState(mockMission.submitted)

  const handleFileChange = (e) => setFile(e.target.files[0])

  const handleSubmit = () => {
    if (!content && !file) {
      alert("내용 또는 파일을 첨부해야 합니다.")
      return
    }
    setSubmitted(true)
    alert("제출 완료!")
  }

  const handleEdit = () => {
    alert("수정 완료!")
  }

  return (
    <div className="missionpage_container">
      <h2>{mockMission.title}</h2>

      <div className="mission_info">
        <p><strong>설명:</strong> {mockMission.description}</p>
        <p><strong>시작일:</strong> {mockMission.start}</p>
        <p><strong>마감일:</strong> {mockMission.end}</p>
        <p><strong>제출 여부:</strong> {submitted ? "제출 완료" : "미제출"}</p>
      </div>

      <div className="mission_input">
        <textarea
          placeholder="미션 내용을 입력하세요..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input type="file" onChange={handleFileChange} />
      </div>

      <div className="mission_actions">
        {!submitted ? (
          <Button type='POSITIVE' text='제출하기' onClick={handleSubmit}/>
        ) : (
          <Button type='NEGATIVE' text='수정하기' onClick={handleEdit}/>
        )}
        <Button text='목록으로' onClick={()=>navigate(`/sub/${subId}`)}/> 
      </div>
    </div>
  )
}

export default Missionpage
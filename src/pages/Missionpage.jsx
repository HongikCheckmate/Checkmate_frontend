import { useState,useEffect } from "react"
import { useParams,useNavigate } from "react-router-dom"
import Button from "../components/Button"
import axios from "axios"
import "./Missionpage.css"


const Missionpage = () => {
  const { subId, missionId } = useParams()
  const navigate=useNavigate()
  const token=localStorage.getItem('accessToken')

  const [mission,setMission]=useState(null)
  const [content, setContent] = useState("")
  const [file, setFile] = useState(null)
  const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
    const fetchMission = async () => {
      try {
        const res = await axios.get(
          `http://checkmate.kimbepo.xyz/api/groups/${subId}/missions/${missionId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        setMission(res.data)
        setSubmitted(res.data.submitted)
      } catch (err) {
        console.error("미션 불러오기 실패:", err)
      }
    }
    fetchMission()
  }, [subId, missionId, token])

  const handleFileChange = (e) => setFile(e.target.files[0])

  const handleSubmit = async()=>{
    if(!content&&!file){
      alert('내용 또는 파일을 첨부하세요')
      return
    }

    const formData=new FormData()
    formData.append('content',content)
    if (file) formData.append('file',file)
      try{
        await axios.post(
          `http://checkmate.kimbepo.xyz/api/groups/${subId}/missions/${missionId}/submit`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        alert("제출 완료!")
        setSubmitted(true)
        } catch (err) {
          console.error("미션 제출 실패:", err)
        }
      }

  const handleEdit = async () => {
    if (!content && !file) {
      alert("내용 또는 파일을 첨부해야 합니다.")
      return
    }

    const formData = new FormData()
    formData.append('content', content)
    if (file) formData.append('file', file)

    try {
      await axios.put(
        `http://checkmate.kimbepo.xyz/api/groups/${subId}/missions/${missionId}/submit`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      alert("수정 완료!")
      setSubmitted(true)
    } catch (err) {
      alert("수정 중 오류가 발생했습니다.")
    }
  }

  return (
    <div className="missionpage_container">
      <h2>{mission.title}</h2>

      <div className="mission_info">
        <p><strong>설명:</strong> {mission.description}</p>
        <p><strong>시작일:</strong> {mission.start}</p>
        <p><strong>마감일:</strong> {mission.end}</p>
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
          <Button type='POSITIVE' text='수정하기' onClick={handleEdit}/>
        )}
        <Button text='목록으로' onClick={()=>navigate(`/sub/${subId}`)}/> 
      </div>
    </div>
  )
}

export default Missionpage
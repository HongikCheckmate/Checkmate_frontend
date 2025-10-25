import Modal from "react-modal"
import { useEffect,useState } from "react"
import Button from "./Button"
import axios from "axios"
import './Missionstatus.css'

const MissionStatus = ({ isOpen, onClose, mission,groupId }) => {
  const [members,setMembers]=useState([])
  const token=localStorage.getItem('accessToken')

  useEffect(() => {
    if (!isOpen) return
    const fetchStatus = async () => {
      try {
        const res = await axios.get(
          `http://checkmate.kimbepo.xyz/api/groups/${groupId}/missions/${mission.id}/status`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        setMembers(res.data)
      } catch (err) {
        console.error("미션 상태 조회 실패:", err)
      }
    }
    fetchStatus()
  }, [isOpen, mission.id, groupId, token])

  const viewStatus=(status)=>{
    switch(status){
        case 'submitted':
            return '제출 완료'
        case 'confirmed':
            return '검토 완료'
        default:
            return '미제출'
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="missionstatus_modal"
      overlayClassName="missionstatus_overlay"
    >
      <h2 className="missionstatus_header">{mission.title} - 미션 진행 현황</h2>
      <table className="missionstatus_table">
        <thead>
            <tr>
                <th>닉네임</th>
                <th>상태</th>
            </tr>
        </thead>
        <tbody>
            {members.map((m, idx) => (
                <tr key={idx}>
                    <td>{m.nickname}</td> 
                    <td>{viewStatus(m.status)}</td>
                </tr>
            ))}
        </tbody>
        
      </table>
      <div className="missionstatus_button">
        <Button text="닫기" type="NEGATIVE" onClick={onClose} />
      </div>
    </Modal>
  )
}

export default MissionStatus

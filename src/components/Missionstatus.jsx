import Modal from "react-modal"
import Button from "./Button"
import './Missionstatus.css'

const MissionStatus = ({ isOpen, onClose, mission }) => {
  const mockMembers = [
    { nickname: "1", status: "none" },
    { nickname: "2", status: "submitted" },
    { nickname: "3", status: 'confirmed' },
  ]

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
            {mockMembers.map((m, idx) => (
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

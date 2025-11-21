import Modal from "react-modal"
import { useEffect,useState } from "react"
import Button from "./Button"
import axios from "axios"
import './Missionstatus.css'

const MissionStatus = ({ isOpen, onClose, mission, user }) => {
  const [members,setMembers]=useState([])
  const token=localStorage.getItem('accessToken')

  const isManager=user?.username === mission?.leaderUsername

  useEffect(() => {
    if (!isOpen) return

    const fetchStatus = async () => {
      try {
        const res = await axios.get(
          `https://checkmate.kimbepo.xyz/api/certifications/goal/${mission.id}/status`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        setMembers(res.data || [])
        console.log('미션 현황', res.data)
      } catch (err) {
        console.error("미션 상태 조회 실패:", err)
      }
    }
    fetchStatus()
  }, [isOpen, mission.id])

  const [selectedStatus,setSelectedStatus]=useState({})
  const [rejectReason,setRejectReason]=useState('')

  const viewStatus=(code)=>{
    switch(code){
      case 'PENDING':
        return '미제출'
      case 'SUBMITTED':
        return '제출 완료'
      case 'APPROVED':
        return '검토 완료'
      case 'REJECTED':
        return '거절됨'
      default:
        return '미제출'
    }
  }

  const handleApprove=(certId)=>{
    setSelectedStatus((prev)=>({
      ...prev,
      [certId]: {newStatus:'APPROVED', rejectReason:''}
    }))
  }

  const handleReject=(certId)=>{
    setSelectedStatus((prev)=>({
      ...prev,
      [certId]: {newStatus:'REJECTED', rejectReason:''}
    }))
  }

  const handleRejectReasonChange=(certId,reason)=>{
    setSelectedStatus((prev)=>({
      ...prev,
      [certId]: { ...prev[certId], rejectReason:reason }
    }))
  }

  const handleSubmit=async(certId)=>{
    const info=selectedStatus[certId]
    if (!info.newStatus) {
      alert("승인 또는 거절을 선택하세요.")
      return
    }

    if (info.newStatus==='REJECTED' && !info.rejectReason.trim()) {
      alert("거절 사유를 입력하세요.")
      return
    }

    try {
      await axios.post(
        `https://checkmate.kimbepo.xyz/api/certifications/goal/${mission.id}/manager/${certId}/status`,
        {
          newStatus: info.newStatus,
          rejectReason: info.rejectReason || null
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      alert("상태가 성공적으로 업데이트되었습니다.")

      setMembers((prevMembers) =>
        prevMembers.map((m) =>
          m.certificationId === certId? {
            ...m,
            status: info.newStatus,
            rejectReason: info.rejectReason,
            certifiedAt: new Date().toISOString()
          } : m
        )
      )
    } catch (err) {
      console.error("상태 업데이트 실패:", err)
      alert("상태 업데이트에 실패했습니다")
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="missionstatus_modal"
      overlayClassName="missionstatus_overlay"
    >
      <h2 className="missionstatus_header">{mission.name} - 미션 진행 현황</h2>
      <table className="missionstatus_table">
        <thead>
            <tr>
                <th>닉네임</th>
                <th>상태</th>
                {isManager && <th>관리</th>}
            </tr>
        </thead>

        <tbody>
            {members.map((m) => (
                <tr key={m.certificationId}>
                    <td>{m.userNickname}</td> 
                    <td>{viewStatus(m.status)}</td>
                    {isManager && (
                      <td className="manager_column">
                        <Button text="승인" type="POSITIVE" onClick={() => handleApprove(m.certificationId)} />
                        <Button text="거절" type="NEGATIVE" onClick={() => handleReject(m.certificationId)} />
                        {selectedStatus[m.certificationId]?.newStatus === 'REJECTED' && (
                          <input
                            className="reject_input"
                            placeholder="거절 사유 입력"
                            value={selectedStatus[m.certificationId]?.rejectReason || ''}
                            onChange={(e) => handleRejectReasonChange(m.certificationId, e.target.value)}
                          />
                        )}
                        {selectedStatus[m.certificationId]?.newStatus && (
                          <Button
                            text="저장"
                            type="POSITIVE "
                            onClick={() => handleSubmit(m.certificationId)}
                          />
                        )}
                      </td>
                    )}
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

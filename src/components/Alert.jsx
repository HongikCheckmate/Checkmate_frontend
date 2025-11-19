import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import Button from './Button'
import axios from 'axios'
import './Alert.css'

const Alert = ({ isOpen, onClose, user }) => {
  const [alerts, setAlerts] = useState([])
  const token = localStorage.getItem('accessToken')

  const userId = user?.id  

  useEffect(() => {
    if (isOpen) fetchAlerts()
  }, [isOpen])

  // 초대 목록 가져오기
  const fetchAlerts = async () => {
    try {
      const res = await axios.get(
        `https://checkmate.kimbepo.xyz/api/invites/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      setAlerts(res.data)
    } catch (err) {
      console.error(err)
      alert('알림을 불러오지 못했습니다.')
    }
  }

  // 초대 수락
  const handleAccept = async (alert) => {
    try {
      await axios.post(
        `https://checkmate.kimbepo.xyz/api/invites/action`,
        {
          inviteId: alert.id,
          action: "ACCEPT"
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      setAlerts(prev => prev.filter(a => a.id !== alert.id))
      alert('그룹 초대를 수락했습니다.')
    } catch (err) {
      alert('수락 실패')
    }
  }

  // 초대 거절
  const handleDecline = async (alert) => {
    try {
      await axios.post(
        `https://checkmate.kimbepo.xyz/api/invites/action`,
        {
          inviteId: alert.id,
          action: "REJECT"
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      setAlerts(prev => prev.filter(a => a.id !== alert.id))
      alert('초대를 거절했습니다.')
    } catch (err) {
      alert('거절 실패')
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className='alert_modal'
      overlayClassName='alert_overlay'
    >
      <div className='alert_container'>
        <h2>알림</h2>

        <div className='alert_list'>
          {alerts?.length === 0 ? (
            <p>새로운 알림이 없습니다.</p>
          ) : (
            alerts.map(alert => (
              <div key={alert.id} className='alert_item'>
                <p>
                  <strong>{alert.inviterName}</strong> 님이
                  <br />
                  <strong>{alert.invitedGroupId}</strong>번 그룹에 초대했습니다.
                </p>

                <div className="alert_buttons">
                  <Button
                    text="수락"
                    type="POSITIVE"
                    onClick={() => handleAccept(alert)}
                  />
                  <Button
                    text="거절"
                    type="NEGATIVE"
                    onClick={() => handleDecline(alert)}
                  />
                </div>
              </div>
            ))
          )}
        </div>

        <Button text="닫기" type="NEGATIVE" onClick={onClose} />
      </div>
    </Modal>
  )
}

export default Alert

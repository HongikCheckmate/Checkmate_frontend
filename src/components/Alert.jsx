import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import Button from './Button'
import './Alert.css'

const Alert=({isOpen, onClose, onAccept, onDecline})=>{

    const [alerts,setAlerts]=useState([])

    useEffect(()=>{
        if(isOpen){
            const mockData=[
                {id: 1, message: "새로운 그룹 초대가 있습니다.", type: "invite" },
                { id: 2, message: "오늘까지 미션을 제출하세요.", type: "info" },
                { id: 3, message: "그룹에서 강퇴되었습니다.", type: "info" }
            ]
            setAlerts(mockData)
        }
    },[isOpen])

    const handleAccept = (alert) => {
        console.log("수락:", alert)
        setAlerts(prev => prev.filter(a => a.id !== alert.id))
        if (onAccept) onAccept(alert)
    }

    const handleDecline = (alert) => {
        console.log("거절:", alert)
        setAlerts(prev => prev.filter(a => a.id !== alert.id))
        if (onDecline) onDecline(alert)
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
                    {alerts?.length===0?(
                        <p>새로운 알림이 없습니다.</p>
                    ):(
                        alerts.map((alert,idx)=>(
                            <div key={idx} className='alert_item'>
                                <p>{alert.message}</p>
                                {alert.type==='invite'?(
                                    <div className='alert_buttons'>
                                        <Button text='수락' type='POSITIVE' onClick={()=>onAccept(alert)}/>
                                        <Button text='거절' type='NEGATIVE' onClick={()=>onDecline(alert)}/>
                                    </div>
                                ):(
                                    <div className='alert_buttons'>
                                        <Button text='닫기' type='POSITIVE' onClick={()=>onClose(alert)}/>
                                    </div>
                                )}
                            </div>

                        ))
                    )
                    }
                </div>
                <div>
                    <Button text='닫기' type='NEGATIVE' onClick={onClose}/>
                </div>
            </div>
        </Modal>
    )
}

export default Alert
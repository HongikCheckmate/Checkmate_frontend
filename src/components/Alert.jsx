import Modal from 'react-modal'
import Button from './Button'
import './Alert.css'

const Alert=({isOpen, onClose, alerts, onAccept, onDecline})=>{
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
                    {alerts.length===0?(
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
                                        <Button text='확인' type='POSITIVE' onClick={()=>onClose(alert)}/>
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
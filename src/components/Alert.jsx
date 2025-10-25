import { useEffect, useState } from 'react'
import Modal from 'react-modal'
import Button from './Button'
import axios from 'axios'
import './Alert.css'

const Alert=({isOpen, onClose})=>{

    const [alerts,setAlerts]=useState([])
    const token=localStorage.getItem('accessToken')

    useEffect(()=>{
        if(isOpen) fetchAlerts()
    },[isOpen])

    const fetchAlerts=async()=>{
        try{
            const res=await axios.get('http://checkmate.kimbepo.xyz/api/alert',{
                headers:{Authorization:`Bearer ${token}`}
            })
            setAlerts(res.data)
        } catch (err){
            alert('알림 오류')
        }
    }

    const handleAccept = async(alert) => {
        try{
            await axios.post(
                `http://checkmate.kimbepo.xyz/api/alerts/${alert.id}/accept`,
                {},
                { headers:{Authorization: `Bearer ${token}`}}
            )
            setAlerts((prev)=>prev.filter((a)=>a.id!==alert.id))
        } catch (err){
            alert('수락 실패')
        }
    }

    const handleDecline = async(alert) => {
        try{
            await axios.post(
                `http://checkmate.kimbepo.xyz/api/alerts/${alert.id}/decline`,
                {},
                {headers:{Authorization: `Bearer ${token}`}}
            )
            setAlerts(prev=>prev.filter(a=>a.id !== alert.id))
        } catch (err){
            alert('거절 실패')
        }
    }

    const handleCloseAlert = async(alert)=>{
        try{
            await axios.delete(
                `http://chechmate.kimbepo.xyz/api/alerts/${alert.id}`,
                {headers:{Authorization:`Bearer ${token}`}}
            )
            setAlerts((prev)=>prev.filter((a)=>a.id !== alert.id))
        } catch (err){
            alert('알림 닫기 실패')
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
                    {alerts?.length===0?(
                        <p>새로운 알림이 없습니다.</p>
                    ):(
                        alerts.map((alert)=>(
                            <div key={alert.id} className='alert_item'>
                                <p>{alert.message}</p>
                                {alert.type==='invite'?(
                                    <div className='alert_buttons'>
                                        <Button text='수락' type='POSITIVE' onClick={()=>handleAccept(alert)}/>
                                        <Button text='거절' type='NEGATIVE' onClick={()=>handleDecline(alert)}/>
                                    </div>
                                ):(
                                    <div className='alert_buttons'>
                                        <Button text='닫기' type='NEGATIVE' onClick={()=>handleCloseAlert(alert)}/>
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
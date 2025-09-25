import {useState,useEffect} from 'react'
import Modal from 'react-modal'
import Button from './Button'
import './Mypage.css'

//백엔드 수정할 때 변수 맞추기

const Mypage=({isOpen, onClose, user})=>{
    const [isEditing,setIsEditing]=useState(false)
    const [userData, setUserData]=useState({
        id:'',
        password:'',
        email:'',
        phone:'',
        nickname:'',
        groups:[]
    })
    const [tempData,setTempData]=useState(userData)
    useEffect(()=>{
        if (user) {
            setUserData(user)
            setTempData(user)
        }
    },[user])

    const handleEdit=()=>{
        if (isEditing){
            setUserData(tempData)
            //연동시 axios로 수정
        }
        setIsEditing((!isEditing))
    }

    const handleChange=(field,value)=>{
        setTempData(prev=>({...prev,[field]:value}))
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className='mypage_modal'
            overlayClassName='mypage_overlay'
            >
                <div className='mypage_container'>
                    <h2>마이페이지</h2>

                    <div className='mypage_info'>

                        <label>아이디: </label>
                        {isEditing?(
                            <input
                                value={tempData.id}
                                onChange={(e)=>handleChange('id',e.target.value)}
                                readOnly
                            />
                        ):(
                            <span>{userData.id}</span>
                        )}
                        
                        <label>비밀번호:</label>
                        {isEditing?(
                            <input
                                type='password'
                                value={tempData.password}
                                onChange={(e)=>handleChange('password',e.target.value)}
                            />
                        ):(
                            <span>*********</span>
                        )}

                        <label>전화번호: </label>
                        {isEditing?(
                            <input
                                value={tempData.phone}
                                onChange={(e)=>handleChange('phone',e.target.value)}
                            />
                        ):(
                            <span>{userData.phone}</span>
                        )}

                        <label>닉네임: </label>
                        {isEditing?(
                            <input
                                value={tempData.nickname}
                                onChange={(e)=>handleChange('nickname',e.target.value)}
                            />
                        ):(
                            <span>{userData.nickname}</span>
                        )}
                    
                        <label>내 그룹</label>
                        {userData.groups&&userData.groups.length>0?(
                            <ul>
                                {userData.groups.map((group,idx)=>(
                                    <li key={idx}>{group}</li>
                                ))}
                            </ul>
                        ): (
                            <p>가입된 그룹이 없습니다</p>
                        )}
                    </div>

                    <div className='button_group'>
                        <Button
                            type='POSITIVE'
                            text={isEditing?'수정 완료': '수정하기'}
                            onClick={handleEdit}
                        />

                        <Button type='NEGATIVE' text='닫기' onClick={onClose} />

                    </div>
                </div>
            </Modal>
    )
}

export default Mypage
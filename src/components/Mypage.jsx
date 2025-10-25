import {useState,useEffect} from 'react'
import Modal from 'react-modal'
import Button from './Button'
import axios from 'axios'
import './Mypage.css'

//백엔드 수정할 때 변수 맞추기

const Mypage=({isOpen, onClose})=>{
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
    const token=localStorage.getItem('accessToken')

    useEffect(()=>{
        if (isOpen) {
            const fetchUserData=async()=>{
                try{
                    const res=await axios.get('http://checkmate.kimbepo.xyz/api/user/me',{
                        headers: {Authorization: `Bearer ${token}`}
                    })
                    setUserData(res.data)
                    setTempData(res.data)
                } catch (err){
                    alert('사용자 정보 불러오기 실패')
                }
            }
            fetchUserData()
        }
    },[isOpen,token])

    const handleChange=(field,value)=>{
        setTempData((prev)=>({...prev,[field]:value}))
    }

    const handleEdit=async()=>{
        if (isEditing) {
            try{
                await axios.put(
                    'http://checkmate.kimbepo.xyz/api/user/me',
                    {
                        password: tempData.password || undefined,
                        phone: tempData.phone,
                        nickname:tempData.nickname
                    },
                    {
                        headers:{Authorization:`Bearer $${token}`}
                    }
                )
                setUserData(tempData)
                alert('수정이 완료되었습니다')
            } catch(err){
                alert('수정 중 오류 발생')
            }
        }
        setIsEditing(!isEditing)
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

                    <div className="mypage_info">
                    <label>아이디: </label>
                    <span>{userData.id}</span>

                    <label>이메일: </label>
                    <span>{userData.email}</span>

                    <label>비밀번호:</label>
                    {isEditing ? (
                        <input
                        type="password"
                        value={tempData.password || ""}
                        placeholder="새 비밀번호를 입력하세요"
                        onChange={(e) => handleChange("password", e.target.value)}
                        />
                    ) : (
                        <span>*********</span>
                    )}

                    <label>전화번호: </label>
                    {isEditing ? (
                        <input
                        value={tempData.phone || ""}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        />
                    ) : (
                        <span>{userData.phone}</span>
                    )}

                    <label>닉네임: </label>
                    {isEditing ? (
                        <input
                        value={tempData.nickname || ""}
                        onChange={(e) => handleChange("nickname", e.target.value)}
                        />
                    ) : (
                        <span>{userData.nickname}</span>
                    )}

                    <label>내 그룹:</label>
                    {userData.groups && userData.groups.length > 0 ? (
                        <ul>
                        {userData.groups.map((group, idx) => (
                            <li key={idx}>{group}</li>
                        ))}
                        </ul>
                    ) : (
                        <p>가입된 그룹이 없습니다.</p>
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
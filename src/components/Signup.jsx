import Modal from 'react-modal'
import { useState, useEffect } from 'react'
import './Signup.css'
import Button from './Button'



const Signup=({isOpen,onClose})=>{

    const handleSignup = async () => {
    
    if(input.password!==input.passwordConfirm){
        alert('비밀번호가 일치하지 않습니다.')
        return
    }

    try {
            const res = await fetch('http://localhost:8080/api/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id:input.id,
                password:input.password,
                email:input.email,
                phone:input.phone,
                nickname: input.nickname
            }),
        });

        if (res.ok) {
        alert('회원가입 성공!');
        onClose();
        } else {
        alert('회원가입 실패');
        }
        } catch (err) {
            console.error(err);
            alert('오류 발생');
        }
    };

    const [input,setInput]=useState({
        id:'',
        password:'',
        passwordConfirm:'',
        email:'',
        phone:'',
        nickname:''
    })
    //backend랑 변수이름 맞추기
    useEffect(()=>{
    if (!isOpen){
      setInput({
        id:'',
        password:'',
        passwordConfirm:'',
        email:'',
        phone:'',
        nickname:''
      })
    }
  },[isOpen])

    return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className='signupmodal' overlayClassName='Overlay'>
        <div className='signup'>
            <h2>계정 만들기</h2>

            <div className='inputs'>

                <div className="input-row">
                <label>아이디: </label>
                <input 
                    type='text'
                    value={input.id}
                    placeholder='아이디를 입력하세요'
                    onChange={(e)=>setInput({...input,id:e.target.value})}
                 />
                </div>

                <div className="input-row">
                <label>비밀번호: </label>
                 <input 
                    type='password'
                    value={input.password}
                    placeholder='비밀번호를 입력하세요'
                    onChange={(e)=>setInput({...input, password:e.target.value})}
                 />
                 </div>

                 <div className='input-row'>
                    <label>비밀번호 확인: </label>
                    <input
                        type='password'
                        value={input.passwordConfirm}
                        placeholder='비밀번호를 다시 입력하세요'
                        onChange={(e)=>setInput({...input,passwordConfirm:e.target.value})}
                    />
                </div>

                <div className="input-row">
                 <label>이메일: </label>
                 <input 
                    type='text'
                    value={input.email}
                    placeholder='이메일을 입력하세요'
                    onChange={(e)=>setInput({...input, email:e.target.value})}
                 />
                 </div>

                <div className="input-row">
                 <label>전화번호: </label>
                 <input 
                    type='text'
                    value={input.phone}
                    placeholder='핸드폰 번호를 입력하세요'
                    onChange={(e)=>setInput({...input, phone:e.target.value})}
                 />
                 </div>

                <div className="input-row">
                 <label>닉네임: </label>
                 <input 
                    type='text'
                    value={input.nickname}
                    placeholder='닉네임을 입력하세요'
                    onChange={(e)=>setInput({...input, nickname:e.target.value})}
                 />
                 </div>
            </div>

            <div className='button-group'> 
                <Button type='POSITIVE' text='등록' onClick={handleSignup}/>
                <Button onClick={onClose} type='NEGATIVE' text='취소' />
            </div>

        </div>
    </Modal>    
    )
}

export default Signup
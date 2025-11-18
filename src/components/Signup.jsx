import Modal from 'react-modal'
import { useState, useEffect } from 'react'
import './Signup.css'
import Button from './Button'
import Sociallogin from './Sociallogin'
Modal.setAppElement('#root');


const Signup=({isOpen,onClose})=>{

    const handleSignup = async () => {
        if (input.password !== input.check_password) {
            alert('비밀번호가 일치하지 않습니다.')
            return
        }

        try {
            const res = await fetch('http://13.124.171.54:8080/api/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: input.username,
                    password: input.password,
                    check_password: input.check_password,
                    nickname: input.nickname,
                    email: input.email,
                    phone_number: input.phone_number,
                }),
            })

            // 응답 본문을 JSON으로 시도, 실패하면 텍스트로 읽음
            let responseBody = null
            try {
                responseBody = await res.json()
            } catch {
                try {
                    responseBody = await res.text()
                } catch (e) {
                    responseBody = null
                }
            }

            console.log('Signup response:', { status: res.status, ok: res.ok, body: responseBody })

            if (res.ok) {
                alert('회원가입 성공!')
                onClose()
            } else {
                alert('회원가입 실패')
                // 추가 디버깅 출력
                console.log('Signup failed input:', input)
            }
        } catch (err) {
            console.error('Signup error:', err)
            alert('오류 발생')
        }
    }

    const [input,setInput]=useState({
        username:'',
        password:'',
        check_password:'',
        email:'',
        phone_number:'',
        nickname:''
    })
    useEffect(()=>{
    if (!isOpen){
      setInput({
        username:'',
        password:'',
        check_password:'',
        email:'',
        phone_number:'',
        nickname:''
      })
    }
  },[isOpen])

    return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className='signupmodal' overlayClassName='Overlay'>
        <div className='signup'>
            <h2>계정 만들기</h2>

            <div className='inputs'>

                <Sociallogin />

                <br/>
                <div className="input-row">
                <label>아이디: </label>
                <input 
                    type='text'
                    value={input.username}
                    placeholder='아이디를 입력하세요'
                    onChange={(e)=>setInput({...input,username:e.target.value})}
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
                        value={input.check_password}
                        placeholder='비밀번호를 다시 입력하세요'
                        onChange={(e)=>setInput({...input,check_password:e.target.value})}
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
                    value={input.phone_number}
                    placeholder='핸드폰 번호를 입력하세요'
                    onChange={(e)=>setInput({...input, phone_number:e.target.value})}
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
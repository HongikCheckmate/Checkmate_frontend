import Modal from "react-modal"
import { useState } from "react"
import axios from "axios"
import Button from "./Button"
import "./CreateMissionModal.css"

const CreateMissionModal = ({ isOpen, onClose, groupId, token, onSuccess }) => {
  const [name, setName] = useState("")
  const [cycle, setCycle] = useState(1)
  const [endDate, setEndDate] = useState("")

  const [certificationType, setCertificationType] = useState("TEXT")
  const [externalMethod, setExternalMethod] = useState("")

  const [problemGoalType, setProblemGoalType] = useState("")
  const [targetProblems, setTargetProblems] = useState("")
  const [problemCount, setProblemCount] = useState(0)
  const [targetRepository, setTargetRepository] = useState("")

  const resetState = () => {
    setName("")
    setCycle(1)
    setEndDate("")
    setCertificationType("TEXT")
    setExternalMethod("")
    setProblemGoalType("")
    setTargetProblems("")
    setProblemCount(0)
    setTargetRepository("")
  }

  const handleSubmit = async () => {
      const body = {
        name,
        cycle,
        endDate,
        groupId,
        certificationType
      }

      

      if (certificationType === "EXTERNAL") {
        if (!externalMethod) {
          alert("외부 인증 방식을 선택하세요")
          return
        }
        body.externalMethod = externalMethod

        if (externalMethod === "SOLVED_AC") {
          if (!problemGoalType) {
            alert("문제 인증 방식을 선택하세요")
            return
          }

          body.problemGoalType = problemGoalType

          if (problemGoalType === "SPECIFIC") {
            if (!targetProblems.trim()) {
              alert("인증할 문제 번호를 입력하세요")
              return
            }
            body.targetProblems = targetProblems
              .split(",")
              .map(v => Number(v.trim()))
          }

          if (problemGoalType === "COUNT") {
            if (!problemCount) {
              alert("문제 개수를 입력하세요")
              return
            }

            body.problemCount = Number(problemCount)
          }
        }

        if (externalMethod === "GITHUB") {
          if (!targetRepository.trim()) {
            alert("깃허브 레포지토리 주소를 입력하세요")
            return
          }

          body.targetRepository = targetRepository
        }
      }


      try{
        Object.keys(body).forEach(key => {
  if (body[key] === "" || body[key] === null || body[key] === undefined) {
    delete body[key]
  }
})
                console.log("미션 생성 요청 본문:", body)
                console.log("토큰", token)
                console.log("미션 생성 요청 헤더:", {
  Authorization: `Bearer ${token}`
})

        const res = await axios.post(
          "https://checkmate.kimbepo.xyz/api/goals",
          body,
          { headers: { Authorization: `Bearer ${token}` } }
        )

        alert(res.data.message || "미션이 생성되었습니다")

        resetState()
        onClose()
        onSuccess()
      } catch (err) {
        console.error("미션 생성 실패", err)
        console.log("서버 응답:", err.response?.data)
        alert("미션 생성 중 오류가 발생했습니다")
      }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="createmission_modal"
      overlayClassName="createmission_overlay"
    >
      <h2>새 미션 만들기</h2>

      <label>미션 이름</label>
      <input value={name} onChange={e => setName(e.target.value)} />

      <label>주기</label>
      <input
        type="number"
        value={cycle}
        onChange={e => setCycle(Number(e.target.value))}
      />

      <label>종료 날짜</label>
      <input
        type="date"
        value={endDate}
        onChange={e => setEndDate(e.target.value)}
      />

      <label>인증 방식</label>
      <select
        value={certificationType}
        onChange={e => {
          setCertificationType(e.target.value)
          setExternalMethod("")
          setProblemGoalType("")
        }}
      >
        <option value="TEXT">텍스트 인증</option>
        <option value="IMAGE">사진 인증</option>
        <option value="VIDEO">영상 인증</option>
        <option value="EXTERNAL">외부 인증</option>
      </select>

      {certificationType === "EXTERNAL" && (
        <>
          <label>외부 인증 방식</label>
          <select
            value={externalMethod}
            onChange={e => {
              setExternalMethod(e.target.value)
              setProblemGoalType("")
            }}
          >
            <option value="">선택</option>
            <option value="SOLVED_AC">solved.ac</option>
            <option value="GITHUB">GitHub</option>
          </select>

          {externalMethod === "SOLVED_AC" && (
            <>
              <label>문제 인증 방식</label>
              <select
                value={problemGoalType}
                onChange={e => setProblemGoalType(e.target.value)}
              >
                <option value="">선택</option>
                <option value="SPECIFIC">특정 문제 풀기</option>
                <option value="COUNT">문제 수 채우기</option>
              </select>

              {problemGoalType === "SPECIFIC" && (
                <>
                  <label>문제 번호 (쉼표로 구분)</label>
                  <input
                    value={targetProblems}
                    onChange={e => setTargetProblems(e.target.value)}
                  />
                </>
              )}

              {problemGoalType === "COUNT" && (
                <>
                  <label>문제 개수</label>
                  <input
                    type="number"
                    value={problemCount}
                    onChange={e => setProblemCount(Number(e.target.value))}
                  />
                </>
              )}
            </>
          )}

          {externalMethod === "GITHUB" && (
            <>
              <label>깃허브 레포지토리 주소</label>
              <input
                value={targetRepository}
                onChange={e => setTargetRepository(e.target.value)}
              />
            </>
          )}
        </>
      )}

      <div className="createmission_buttons">
        <Button text="생성" type="POSITIVE" onClick={handleSubmit} />
        <Button text="취소" type="NEGATIVE" onClick={onClose} />
      </div>
    </Modal>
  )
}

export default CreateMissionModal

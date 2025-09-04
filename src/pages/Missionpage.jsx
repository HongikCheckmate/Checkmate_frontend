import { useParams } from "react-router-dom"

const MissionPage = () => {
    const { id } = useParams()

    // 예시: 미션 상세 정보
    const mission = {
        id,
        title: "DP 문제 풀기",
        description: "Dynamic Programming 기본 문제 풀이 후 리뷰",
        start: "2025-08-01",
        end: "2025-08-07",
        submitted: true
    }

    return (
        <div style={{ padding: "20px" }}>
            <h2>{mission.title}</h2>
            <p><strong>설명:</strong> {mission.description}</p>
            <p><strong>시작일:</strong> {mission.start}</p>
            <p><strong>마감일:</strong> {mission.end}</p>
            <p><strong>제출 여부:</strong> {mission.submitted ? "제출 완료" : "미제출"}</p>
        </div>
    )
}

export default MissionPage

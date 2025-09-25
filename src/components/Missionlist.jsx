import Missions from "./Missions"

// const Missionlist=({missions})=>{
//     return(
//         <div className='missionlist'>
//             {missions && missions.length > 0 ? (
//             <Missions missions={missions} />
//             ) : (
//                 <p>등록된 미션이 없습니다.</p>
//             )}
//         </div>
//     )
// }

const Missionlist = ({missions,subId}) => {

  const mockMissions = [
    {
      id: 1,
      title: "백준 100문제 풀기",
      start: "2025-08-01",
      end: "2025-08-10",
      status:'confirmed'
    },
    {
      id: 2,
      title: "React 미니 프로젝트 만들기",
      start: "2025-09-05",
      end: "2025-09-20",
      status: 'none'
    },
  ]

  const data=missions&&missions.length>0?missions:mockMissions
  return (
            <div className="mission_wrapper">
                <Missions missions={data} subId={subId}/>
            </div>
        )
}

export default Missionlist
import './App.css'
import {useReducer,useRef,createContext} from 'react'
import {Routes,Route,Link,useNavigate} from 'react-router-dom'
import Mainpage from './pages/Mainpage'
import Subpage from './pages/Subpage'
import Missionpage from './pages/Missionpage'
import Makegroup from "./pages/Makegroup"
import Mypage from "./pages/Mypage"
import Alert from "./pages/Alert"
import Signup from "./pages/Signup"
import Invite from './pages/Invite'
import Notfound from './pages/Notfound'

import Button from "./components/Button"
import Header from './components/Header'

//그룹 데이터에 인원 배열로 추가하고, 받아올 때 속해 있는 그룹 나오도록 getPerson 함수 만들어서 데이터 거르기
//id,room_name,room_manager,members,hiden,room_info 받아오기
/*data: 상태 받아옴(useReducer 사용해 방 상태 받아옴)
roomstatecontext로 room의 정보 하위 컴포넌트까지 뿌려줌
*/


const mockData=[
  {
    id:1,
    room_name:'실랜디합시다',
    room_manager:'김현의',
    members:['이태영','김현의','전은서'],
    hiden: true,
    room_info: 3
  },
  {
    id:2,
    room_name:'졸업프로젝트',
    room_manager:'전은서',
    members:['이태영','김현의','전은서'],
    hiden: false,
    room_info: 3
  },
  {
    id:4,
    room_name:'안녕하세요',
    room_manager:'이태영',
    members:['이태영','외로워','김현의','전은서'],
    hiden: false,
    room_info: 3
  },
  {
    id:5,
    room_name:'프론트엔드',
    room_manager:'배성일',
    members:['이태영','l','ㅣ','외로워','김현의','전은서'],
    hiden: true,
    room_info: 3
  },
]
function reducer(state,action){
  switch(action.type){
    case 'CREATE':return [action.data,...state]
    case 'UPDATE':return state.map((item)=>
      String(item.id)===String(action.data.id)? action.data:item)
  }
}

export const RoomStateContext=createContext()
export const RoomDispatchContext=createContext()

function App() {
  const [data,dispatch]=useReducer(reducer,mockData)
  const idRef=useRef(1000)

  //mission proof 생성
  const onCreate=(content)=>{
    dispatch({
      type:"CREATE",
      data:{
        id:idRef.current++,
        content
      }
    })
  }
  //mission proof 수정
  const onUpdate=(id,content)=>{
    dispatch(
      {
        type:"UPDATE", 
        data:{
          id,
          content
        }
      }
    )
  }

  return (
    <>
<RoomStateContext.Provider value={data}>
  <RoomDispatchContext.Provider value={{onCreate,onUpdate}}>
    <Routes>
      <Route path="/" element={<Mainpage />} />
      <Route path="/sub" element={<Subpage />} />
      <Route path="/mission" delement={<Missionpage/>}/>
      <Route path="/my" element={<Mypage />} />
      <Route path="/alert" element={<Alert />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/group" element={<Makegroup />} />
      <Route path="/invite" element={<Invite />} />
      {/* <Route path="*" element={<Notfound />}/> */}
    </Routes>
  </RoomDispatchContext.Provider>
</RoomStateContext.Provider>
  </>
  )
}
export default App
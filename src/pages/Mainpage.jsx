import {Routes,Route,Link,useNavigate} from 'react-router-dom'

import Header from "../components/Header"
import RoomList from "../components/RoomList"
import Login from '../components/Login'
import Makegroupbutton from '../components/Makegroupbutton'
import Makegroup from './Makegroup'

import {useState,useContext} from 'react'
import {RoomStateContext} from '../App'



const Mainpage = () => {
    const data = useContext(RoomStateContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
  
    return (
      <div
        style={{
          width: '1300px',           
          minHeight: '100vh',
          overflow: 'auto',
          padding: '20px',
        }}
      >
        <Header title={"Checkmate"} />
        <Link to="/sub">subpage</Link>
        <Makegroup isOpen={isModalOpen} onClose={closeModal}/>
  
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <div style={{ width: '800px' }}>
            <RoomList data={data} />
          </div>
  
          <div style={{ width: '316px' }}>
            <Login />
            <Makegroupbutton open={openModal}/>
          </div>
        </div>
      </div>
    );
  };
  
export default Mainpage
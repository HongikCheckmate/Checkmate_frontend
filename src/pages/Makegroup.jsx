import Modal from 'react-modal';
import { useState } from 'react';
import './Makegroup.css';
import Button from '../components/Button';

const Makegroup = ({ isOpen, onClose }) => {
  const [input, setInput] = useState({
    room_Name: '',
    room_info: '',
    hiden: 'TRUE',
  });

  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const handleInviteClick = () => {
    setIsInviteOpen(true);
  };

  const handleInviteClose = () => {
    setIsInviteOpen(false);
  };

  const handleMemberSelect = (member) => {
    if (!selectedMembers.includes(member)) {
      setSelectedMembers([...selectedMembers, member]);
    }
  };
  
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="그룹 생성 모달" className="Modal" overlayClassName="Overlay">
      <div className="modal-container">
        <h2>새 그룹 만들기</h2>

        <div className="form-group">

          <label>그룹 이름</label>
          <input
            type="text"
            value={input.room_Name}
            onChange={(e) => setInput({ ...input, room_Name: e.target.value })}
          />
        
          <label>공개 여부</label>
          <select
            value={input.hiden}
            onChange={(e) => setInput({ ...input, hiden: e.target.value })}
          >
            <option value="TRUE">공개</option>
            <option value="FALSE">비공개</option>
          </select>

          
          <label>멤버</label>
          <Button onClick={handleInviteClick} type="POSITIVE" text='멤버 검색'/>
          <div className="member-list">
            {selectedMembers.length === 0 && <p>선택된 멤버 없음</p>}
            {selectedMembers.map((member, idx) => (
              <div key={idx} className="member-item">{member}</div>
            ))}
          </div>
        
          <label>설명</label>
          <textarea
            value={input.room_info}
            onChange={(e) => setInput({ ...input, room_info: e.target.value })}
          />
        </div>
        

        <div className="button-group">
          <Button type="POSITIVE" text='생성하기'/>
          <Button onClick={onClose} type="NEGATIVE" text='닫기'/>
        </div>
      </div>
    </Modal>
  );
};

export default Makegroup;

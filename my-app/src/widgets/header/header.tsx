import React, { useState } from 'react';
import { Modal } from 'antd';

interface HeaderProps {
  onAddUser: (user: { name: string; email: string; status: string }) => void;
}

const Header: React.FC<HeaderProps> = ({ onAddUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [status, setStatus] = useState('active');

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleSave = () => {
    onAddUser({ name: newName, email: newEmail, status });
    setIsOpen(false);
    setNewName('');
    setNewEmail('');
    setStatus('active');
  };

  return (
    <header className='header'>
      <h1>User Table with <span className='header__text--blue'> FSD </span></h1>
      <button onClick={handleOpen} className='button'>Add +</button>

      <Modal open={isOpen} onCancel={() => setIsOpen(false)} footer={null}>
        <div className='modal__interface'>
          <input type="text" placeholder='Name' value={newName} onChange={(e) => setNewName(e.target.value)} />
          <input type="text" placeholder='Email' value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <button className='button' onClick={handleSave}>Save</button>
        </div>
      </Modal>
    </header>
  );
};

export default Header;
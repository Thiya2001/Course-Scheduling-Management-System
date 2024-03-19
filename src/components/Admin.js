import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/admin.css'; // Import the CSS file

export const Admin = () => {
  const [users, setUsers] = useState([]);
  const [img, setImg] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, 
  []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/users2');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedUserId) {
      // Update existing user
      try {
        await axios.put(`http://localhost:3001/users2/${selectedUserId}`, { image: img, name: name, age: age });
        const updatedUsers = users.map(user => {
          if (user.id === selectedUserId) {
            return { ...user, image: img, name: name, age: age };
          }
          return user;
        });
        setUsers(updatedUsers);
        setSelectedUserId(null);
      } catch (error) {
        console.error('Error updating user:', error);
      }
    } else {
      // Add new user
      try {
        const response = await axios.post('http://localhost:3001/users2', { image: img, name: name, age: age });
        setUsers([...users, response.data]);
      } catch (error) {
        console.error('Error adding user:', error);
      }
    }
    // Clear form inputs
    setImg('');
    setName('');
    setAge('');
  };

  const handleEdit = (userId) => {
    const userToEdit = users.find(user => user.id === userId);
    setImg(userToEdit.image);
    setName(userToEdit.name);
    setAge(userToEdit.age);
    setSelectedUserId(userId);
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:3001/users1/${userId}`);
      const updatedUsers = users.filter(user => user.id !== userId);
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-container">
        <label>Staff Profile</label>
        <input type="text" value={img} onChange={(e) => setImg(e.target.value)} required /><br />
        <label>Staff Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required /><br />
        <label>Staff Age</label>
        <input type="text" value={age} onChange={(e) => setAge(e.target.value)} required /><br />
        <button type='submit'>Add</button>
      </form>
      <div>
        <ul>
          {users.map(user => (
            <li key={user.id}>
              <div>
                <span>{user.name}, {user.age}</span>
                <button onClick={() => handleEdit(user.id)}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

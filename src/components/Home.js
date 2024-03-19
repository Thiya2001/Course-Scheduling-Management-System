import React, { useState } from 'react';
import '../styles/home.css';

export const Home = () => {
  const [courseName, setCourseName] = useState('');
  const [instructor, setInstructor] = useState('');
  const [time, setTime] = useState('');
  const [courseSchedule, setCourseSchedule] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newCourse = { courseName, instructor, time };
    setCourseSchedule([...courseSchedule, newCourse]);
    setCourseName('');
    setInstructor('');
    setTime('');
  };

  const handleDelete = (index) => {
    const updatedSchedule = [...courseSchedule];
    updatedSchedule.splice(index, 1);
    setCourseSchedule(updatedSchedule);
  };

  return (
    <div>
      <h1>Course Scheduling Management System</h1>
      <br />
      <form id="courseForm" onSubmit={handleSubmit}>
        <label htmlFor="courseName">Course Name:</label>
        <input
          type="text"
          id="courseName"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          required
        />
        <br />
        <label htmlFor="instructor">Instructor:</label>
        <input
          type="text"
          id="instructor"
          value={instructor}
          onChange={(e) => setInstructor(e.target.value)}
          required
        />
        <br />
        <label htmlFor="time">Time:</label>
        <input
          type="text"
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <br />
        <input type="submit" value="Add Course" />
      </form>
      <h2>Course Schedule</h2>
      <table id="schedule">
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Instructor</th>
            <th>Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody id="scheduleBody">
          {courseSchedule.map((course, index) => (
            <tr key={index}>
              <td>{course.courseName}</td>
              <td>{course.instructor}</td>
              <td>{course.time}</td>
              <td>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
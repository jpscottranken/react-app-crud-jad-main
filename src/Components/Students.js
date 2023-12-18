import {useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWarning, faMagicWandSparkles } from '@fortawesome/free-solid-svg-icons'

import './Students.css';

function Student(props){

    const[firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [gradYear, setGradYear] = useState("");
    const[editMode, setEditMode] = useState(false);

    useEffect(() => {
     setFirstName(props.student.firstName);
     setLastName(props.student.lastName);
     setEmail(props.student.email);
     setGradYear(props.student.gradYear);
   },[]);

   const saveStudent = () => {
    setEditMode(false);
    const updatedStudent = {firstName:firstName, lastName:lastName, email:email, gradYear:gradYear, id:props.student.id, image:props.student.image}; 
    props.updateStudent(updatedStudent);
   }

  return(
    <div className="card">
    <img className="card-img-top mx-auto" 
    src={props.student.image}
    alt="Student Image"/>
    {!editMode && <ul className="list-group List-group-flush">
     {/* <li className="list-group-item">{student.id}</li>*/}
      <li className="list-group-item text-center fw-bold">{props.student.firstName}</li>
      <li className="list-group-item text-center fw-bold">{props.student.lastName}</li>
      <li className="list-group-item text-center fw-bold">{props.student.email}</li>
      <li className="list-group-item text-center fw-bold">{props.student.gradYear}</li>
      <button type='button' className="btn btn-danger" onClick={() => props.removeStudent(props.student)}>Delete Student<FontAwesomeIcon icon={faWarning}/></button>
      <button type='button' className='btn btn-warning' onClick={()=> setEditMode(true)} >Edit <FontAwesomeIcon icon={faMagicWandSparkles}/></button>
      </ul>
    } 
    {editMode &&
    <ul className="list-group List-group-flush">
    {/* <li className="list-group-item">{student.id}</li>*/}
     <li className="list-group-item text-center fw-bold">{props.student.firstName}<input type="text" className="form-control" value={firstName} onChange={(evt) => setFirstName(evt.currentTarget.value)}/></li>
     <li className="list-group-item text-center fw-bold">{props.student.lastName}<input type="text" className="form-control" value={lastName} onChange={(evt) => setLastName(evt.currentTarget.value)}/></li>
     <li className="list-group-item text-center fw-bold">{props.student.email}<input type="email" className="form-control" value={email} onChange={(evt) => setEmail(evt.currentTarget.value)}/></li>
     <li className="list-group-item text-center fw-bold">{props.student.gradYear}<input type="text" className="form-control" value={gradYear} onChange={(evt) => setGradYear(evt.currentTarget.value)}/></li>
     <li className="list-group-item"><button id='btnSave' className="btn btn-secondary" onClick={saveStudent}>Save</button></li>
     </ul>
    
    }
  </div>
   
)};

export default Student;
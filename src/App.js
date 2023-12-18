import 'bootstrap/dist/css/bootstrap.min.css'
import {nanoid} from 'nanoid';
import React, { useState, useEffect } from 'react';
import './App.css';
import AddStudent from './Components/AddStudent'
import _ from 'lodash';
import Student from './Components/Students';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch} from '@fortawesome/free-solid-svg-icons';

function App() {
  const [allStudents, setAllStudents] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [keywords, setKeyWords] = useState("");
  const [gradYear, setGradYear] = useState("");


  useEffect(() => {
    if(localStorage){
      const studentsLocalStorage = JSON.parse(localStorage.getItem('students'));
      if(studentsLocalStorage){
        saveStudents(studentsLocalStorage);
       
        }
        else{
          saveStudents(students)
      }
    }
   
 },[]);


 const removeStudent = (studentToDelete) => {
    console.table(studentToDelete);
    const updatedStudentsArray = allStudents.filter(students => students.id !== studentToDelete.id)
    saveStudents(updatedStudentsArray);
 }

 const updateStudent = (updatedStudent) => {
  //console.table(updatedStudent);
  const updatedStudentArray = allStudents.map(student => student.id === updatedStudent.id ? {...student,...updatedStudent} : student);
  saveStudents(updatedStudentArray);
 }

  const students =
  [
    {
    id:nanoid(),
    "firstName": "Kaitlynn",
    "lastName": "Revie",
    "email": "krevie0@amazon.co.uk",
    image: 'images/student1.jpg',
    gradYear: 2020,
  }, 
  {
    id:nanoid(),
    "firstName": "Corabelle",
    "lastName": "Cobain",
    "email": "ccobain1@blogspot.com",
    image: 'images/student2.jpg',
    gradYear: 2021,
  }, 
  {
    id:nanoid(),
    "firstName": "Teresa",
    "lastName": "Elvidge",
    "email": "telvidge2@engadget.com",
    image: 'images/student3.jpg',
    gradYear: 2020,
  }, 
  {
    id:nanoid(),
    "ffirstName": "Enrico",
    "lastName": "Cockerill",
    "email": "ecockerill3@huffingtonpost.com",
    image: 'images/student4.jpg',
    gradYear: 2023,
  }, 
  {
    id:nanoid(),
    "firstName": "Saba",
    "lastName": "Mantrip",
    "email": "smantrip4@ucoz.ru",
    image: 'images/student5.jpg',
    gradYear: 2020,
  }, 
  {
    id:nanoid(),
    "firstName": "Barbabra",
    "lastName": "Petrik",
    "email": "bpetrik5@apache.org",
    image: 'images/student6.jpg',
    gradYear: 2023,
  }, 
  {
    id:nanoid(),
    "firstName": "Madelon",
    "lastName": "Kincey",
    "email": "mkincey6@furl.net",
    image: 'images/student7.jpg',
    gradYear: 2020,
  }, 
  {
    id:nanoid(),
    "firstName": "Andrey",
    "lastName": "Zanazzi",
    "email": "azanazzi7@github.com",
    image: 'images/student8.jpg',
    gradYear: 2020,
  }, 
  {
    id:nanoid(),
    "firstName": "Rockey",
    "lastName": "Birtwisle",
    "email": "rbirtwisle8@chron.com",
    image: 'images/student9.jpg',
    gradYear: 2020,
  }, 
  {
    id:nanoid(),
    "firstName": "Phylys",
    "lastName": "Charrette",
    "email": "pcharrette9@vinaora.com",
    image: 'images/student10.jpg',
    gradYear: 2020,
  },
];



const saveStudents = (students) =>
{
  setAllStudents(students);
  setSearchResults(students);
  if(localStorage){
    localStorage.setItem('students', JSON.stringify(students));
    console.log('save to local storage');
  }
}

const searchStudents = () =>
{
  let keyWordsArray = [];
  if (keywords)
  {
    keyWordsArray = keywords.toLowerCase().split(' ');
  }

  if (gradYear)
  {
    keyWordsArray.push(gradYear.toString());
  }

  if (keyWordsArray.length > 0)
  {
    const searchResults = allStudents.filter((student) =>
      {
        for(const word of keyWordsArray)
        {
          if 
            (students.firstName.toLowerCase().includes(word) ||
             student.lastName.toLowerCase().includes(word) ||
             student.gradYear === parseInt(word)
            )
          {
            return true;
          }
        }
        return false;
      });
      setSearchResults(searchResults);
  }
  else{
    setSearchResults(allStudents);
  }
}
const addStudent = (newStudent) =>
{
  const updatedStudents = [...allStudents, newStudent];
  saveStudents(updatedStudents);
}


  return (

    <div className='container'>
      
      <div className='row' id="allStudents">
        <h3>Current Students</h3>
        {searchResults &&
        searchResults.map((student) => (
          <div className="col-lg-2" key={student.id}>
           <Student student={student} removeStudent={removeStudent} updateStudent={updateStudent} />
        
          </div>
        
          ))}
        </div>
         
        
      
      


    <div className='container'>
     {!allStudents && (<button
     type="button"
     className="btn btn-lg btn-success"
     onClick={ () => saveStudents(students)}>
     Save students
     </button>
     
     )}
     <div className="row mt-4" id="searchStudents">
      <h3>Student Search</h3>
      <div className="col-md-4">
        <label htmlFor="txtKeyWords">
          Search by First Name or Last name
        </label>
        <input type="text"
        className="form-control"
        placeholder="name here"
        onChange= {evt =>
          setKeyWords(evt.currentTarget.value)}
        value={keywords} />
      </div>
      <div className="col-md-4">
        <selct value={gradYear}  onChange={evt =>
          setGradYear(evt.currentTarget.value)} className="form-select">
         
          <option value="">Select Grad Year</option>
          {_(allStudents).map(student => student.gradYear).sort().uniq().map(year =><option key={year} value={year}>{year}</option>).value()
          
              }
        </selct>
      </div>
      <div className="col-md-4">
      <label htmlFor="txtKeyWords">
          Search by Graduation Year
        </label>
        <buttonn type="button"
          className="btn btn-primary"
          onClick={searchStudents}>
            Search Students <FontAwesomeIcon icon={faSearch} />
          </buttonn>
      </div>
     </div>
     </div>
     <AddStudent addStudent={addStudent}/>
     </div>
  );
    
     }


  export default App;
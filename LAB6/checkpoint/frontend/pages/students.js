import React, { useState, useEffect } from 'react'
import axios from 'axios'

import useSWR, { mutate } from 'swr'
 
const URL = `http://localhost/api/students`
const fetcher = (url) => axios.get(url).then(res => res.data)

export default function Home() {

  const [student, setStudent] = useState([])
  const [name , setname] = useState('')
  const [surname , setsurname] = useState('')
  const [major , setmajor] = useState('')
  const [GPA , setGPA] = useState(0)

  const {data,error} = useSWR(URL,fetcher)
  if(!data)
  {
      return <div>Loading ...</div>
  }

//   useEffect( () => {
//     getStudents()
//   },[])

  const getStudents = async () => {
    let student = await axios.get(URL)
    setStudents(student.data)
  }

  const getStudent = async (id) => {        
    let student = await axios.get(`${URL}/${id}`)
    setStudent({
      name: student.data.name,
      surname: student.data.surname,
      major: student.data.major,
      GPA: student.data.GPA
    })
  }

  const updateStudent = async (id) => {
    let student = await axios.put(`${URL}/${id}`,{name,surname,major,GPA})
    // setStudents(student.data)
    mutate(URL)
  }

  const addStudent = async (name,surname,major,GPA) => {
    let student = await axios.post(URL,{name,surname,major,GPA})
    // setStudents(student.data)
    mutate(URL)
  }

  const deleteStudent = async (id) => {
    let student = await axios.delete(`${URL}/${id}`)
    // setStudents(student.data)
    mutate(URL)
  }

  const printStudents = (students) => {
    if(students && students.length)
    return (students.map((item,index) =>
    (
      <li key = {index}>
        Id: {item.id} <br/>
        Name: {item.name} <br/>
        Surname: {item.surname} <br/>
        Major: {item.major} <br/>
        GPA: {item.GPA}
        <div >
            <button onClick = {() => getStudent(item.id)}>GET</button>
            <button onClick = {() => updateStudent(item.id)}>UPDATE</button>
            <button onClick = {() => deleteStudent(item.id)}>DELETE</button>
        </div>
      </li>
    )
    ))
  }

  return (
    <div>
        <div>
            <h1 >Student</h1>
        </div>
     
        <ul>
            {printStudents(data.list)} 
        </ul>

        <div >
            <div >
                <h1 >Show Student</h1>
                Name: {student.name} <br/>
                Surname: {student.surname} <br/>
                Major: {student.major} <br/>
                GPA: {student.GPA} <br/>
            </div>
            <div >
                <h1 >Add Student</h1>
                Name: <input type = "text" onChange = {(e) => setname(e.target.value)}></input>
                Surname: <input type = "text" onChange = {(e) => setsurname(e.target.value)}></input>
                Major: <input type = "text" onChange = {(e) => setmajor(e.target.value)}></input>
                GPA: <input type = "text" onChange = {(e) => setGPA(e.target.value)}></input><br/>
                <button onClick = {() => addStudent(name,surname,major,GPA)}>ADD</button>
            </div>
        </div>
    </div>
  )
  }
import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'

import axios from 'axios'
import stdAuth from '../components/studentAuth'
import config from '../config/config'

const URL = `${config.URL}/students`
const editStudents = ({ token }) => {

    const [students, setStudents] = useState({
        list:
            [
                { id: "060", name: 'Natthanon', surname: 'Narit', major: "CoE", GPA: 3.50 },
            ]
    })
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [major, setMajor] = useState('')
    const [GPA, setGPA] = useState(0)

    useEffect(() => {
        getStudents()
    }, [])

    const getStudents = async () => {
        let student = await axios.get(URL)
        setStudents(student.data)
    }
    const printStudents = () => {
        console.log('Students:', students)
        if (students.list && students.list.length)
            return (students.list.map((student, index) =>
            (<li key={index}>
                <div>
                    Name : {student.name} <br></br>
                    Surname : {student.surname}  <br></br>
                    Major : {student.major}  <br></br>
                    GPA :  {student.GPA}<br></br> </div>
                <br></br>
                <button className="mr-4 p-2 bg-blue-400 hover:text-[#EEEEEE] rounded-lg drop-shadow-lg font-bold transition motion-reduce:transition-none motion-reduce:hover:transform-none" onClick={() => updateStudent(student.id)} >Update</button>
                <button className="mr-4 p-2 bg-red-400 hover:text-[#EEEEEE] rounded-lg drop-shadow-lg font-bold transition motion-reduce:transition-none motion-reduce:hover:transform-none" onClick={() => deleteStudent(student.id)} > Delete </button>
            </li>)
            ))
        else {
            return (<h2>No students</h2>)
        }
    }

    const addStudent = async (name, surname, major, GPA) => {
        let result = await axios.post(URL, { name, surname, major, GPA })
        console.log(result.data)
        setStudents(result.data)
    }

    const deleteStudent = async (id) => {
        const result = await axios.delete(`${URL}/${id}`)
        console.log(result.data)
        setStudents(result.data)
    }
    const updateStudent = async (id) => {
        const result = await axios.put(`${URL}/${id}`, {
            name,
            surname,
            major,
            GPA
        })
        console.log('student id update: ', result.data)
        setStudents(result.data)
    }

    return (
        <Layout>
            <Head>
                <title>Student</title>
            </Head>
            <div className="flex flex-col justify-start items-center h-full w-full bg-[#393E46] text-[#EEEEEE] text-2xl font-bold uppercase">
                <br />
                <Navbar /><br />
                <div />
                {JSON.stringify(students.students)}
                <h1 className=" text-[#00ADB5] text-6xl flex flex-col items-center">Show student</h1>
                <div className=" = flex flex-row justify-start">
                    <ul >
                        {printStudents()}<br/><br/>
                    </ul>
                </div>
                <h1 className=" text-[#00ADB5] text-6xl flex flex-col  items-center">Add student</h1>
                <div className="flex flex-col text-3xl text-[#EEE] font-bold font-display rounded-lg mt-2 ">
                    Name : <input className="text-[#00ADB5] bg-[#EEEEEE] rounded-lg mx-2 pl-4 font-bold outline-[#00ADB5]" type="text" onChange={(e) => setName(e.target.value)} />
                    Surname : <input className="text-[#00ADB5] bg-[#EEEEEE] rounded-lg mx-2 pl-4 font-bold outline-[#00ADB5]" onChange={(e) => setSurname(e.target.value)} />
                    Major : <input className="text-[#00ADB5] bg-[#EEEEEE] rounded-lg mx-2 pl-4 font-bold outline-[#00ADB5]" type="text" onChange={(e) => setMajor(e.target.value)} />
                    GPA : <input className="text-[#00ADB5] bg-[#EEEEEE] rounded-lg mx-2 pl-4 font-bold outline-[#00ADB5]" type="number" onChange={(e) => setGPA(e.target.value)} />
                    <br />
                    <button className="flex flex-col items-center text-2xl bg-[#00ADB5] font-bold text-[#222831] hover:text-[#00ADB5] dark:md:hover:bg-[#222831] rounded-lg font-display" onClick={() => addStudent(name, surname, major, GPA)}>Add Student</button>
                </div>
                <br />
            </div>
        </Layout>
    )
}

export default stdAuth(editStudents)

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}

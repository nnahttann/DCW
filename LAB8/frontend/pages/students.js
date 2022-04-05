import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import axios from 'axios'
import stdAuth from '../components/studentAuth'
import config from '../config/config'


const URL = `${config.URL}/students`

const showStudents = ({ token }) => {

    const [students, setStudents] = useState({
        list:
            [
                { id: 6135512060, name: 'Natthanon', surname: 'Narit', major: "CoE", GPA: "4.00" },
            ]
    })
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
            (<li key={index} >
                Name : {(student) ? student.name : '-'} <br></br>
                Surname : {(student) ? student.surname : '-'}  <br></br>
                Major : {(student) ? student.major : '-'}  <br></br>
                GPA : {(student) ? student.GPA : '-'}  <br></br>
            </li>)
            ))
        else {
            return (<h2>No students</h2>)
        }
    }
    return (
        <Layout>
         <Head>
                <title>Student</title>
            </Head>
            <div className="flex flex-col justify-start w3/4 items-center h-screen w-screen bg-[#393E46] text-[#EEEEEE] text-2xl font-bold w3/4 uppercase">
                <br />
                <Navbar /><br />
                <div/>
                <h1 className=" text-[#00ADB5] text-6xl flex flex-col items-center" >Show Student</h1>
                {JSON.stringify(students.students)}
                <ul>
                    {printStudents()}
                </ul>

            </div>
        </Layout>
    )
}
export default stdAuth(showStudents)

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}

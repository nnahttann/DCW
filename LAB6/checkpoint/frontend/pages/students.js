import React, { useState, useEffect } from 'react'
import axios from 'axios'

import useSWR, { mutate } from 'swr'

const URL = `http://localhost/api/students`
const fetcher = (url) => axios.get(url).then(res => res.data)

export default function Home() {

    const [student, setStudent] = useState([])
    const [name, setname] = useState('')
    const [surname, setsurname] = useState('')
    const [major, setmajor] = useState('')
    const [GPA, setGPA] = useState(0)

    const { data, error } = useSWR(URL, fetcher)
    if (!data) {
        return <div>Loading ...</div>
    }
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
        let student = await axios.put(`${URL}/${id}`, { name, surname, major, GPA })
        mutate(URL)
    }

    const addStudent = async (name, surname, major, GPA) => {
        let student = await axios.post(URL, { name, surname, major, GPA })
        mutate(URL)
    }

    const deleteStudent = async (id) => {
        let student = await axios.delete(`${URL}/${id}`)
        mutate(URL)
    }

    const printStudents = (students) => {
        if (students && students.length)
            return (students.map((item, index) =>
            (

                <li key={index}>
                    <div >
                        Id: {item.id} <br />
                        Name: {item.name} <br />
                        Surname: {item.surname} <br />
                        Major: {item.major} <br />
                        GPA: {item.GPA}
                        <div className="text-[#EEEEEE] font-bold pl-4 mt-2 mb-2 font-display text-xl ">
                            <button className="mr-4 p-2 bg-yellow-400 hover:text-[#EEEEEE] rounded-lg drop-shadow-lg font-bold font-display transition motion-reduce:transition-none motion-reduce:hover:transform-none" onClick={() => getStudent(item.id)}>GET</button>
                            <button className="mr-4 p-2 bg-blue-400 hover:text-[#EEEEEE] rounded-lg drop-shadow-lg font-bold font-display transition motion-reduce:transition-none motion-reduce:hover:transform-none" onClick={() => updateStudent(item.id)}>UPDATE</button>
                            <button className="mr-4 p-2 bg-red-400 hover:text-[#EEEEEE] rounded-lg drop-shadow-lg font-bold font-display transition motion-reduce:transition-none motion-reduce:hover:transform-none" onClick={() => deleteStudent(item.id)}>DELETE</button>
                        </div>
                    </div>

                </li>
            )
            ))
    }
    return (
        <div className="bg-[#393E46] w-full max-w-full h-full max-h-full">
            <h1 className=" flex flex-col items-center text-[#00ADB5] text-6xl font-bold italic uppercase font-display">Add Student</h1>
            <div className="flex flex-col text-3xl text-[#00ADB5] font-bold font-display flex flex-col items-center mt-2 ">
                <div className="flex flex-col w-1/4">
                    Name: <input className="text-2xl text-[#00ADB5]  bg-[#EEEEEE] rounded-lg mx-2 pl-4 font-bold outline-[#00ADB5] font-display" type="text" onChange={(e) => setname(e.target.value)}></input>
                    Surname: <input className="text-xl text-[#00ADB5] bg-[#EEEEEE] rounded-lg mx-2 pl-4 mt-2 mb-2 font-bold outline-[#00ADB5] font-display" type="text" onChange={(e) => setsurname(e.target.value)}></input>
                    Major: <input className="text-xl text-[#00ADB5] bg-[#EEEEEE] rounded-lg  mx-2 pl-4 mt-2 mb-2 font-bold outline-[#00ADB5] font-display" type="text" onChange={(e) => setmajor(e.target.value)}></input>
                    GPA: <input className="text-xl text-[#00ADB5] bg-[#EEEEEE] rounded-lg mx-2 pl-4 mt-2 mb-2 font-bold outline-[#00ADB5] font-display" type="number" onChange={(e) => setGPA(e.target.value)}></input><br />
                </div> <button className="flex flex-col items-center w-1/4 text-2xl bg-[#00ADB5] font-bold text-[#222831] hover:text-[#00ADB5] dark:md:hover:bg-[#222831] rounded-lg font-display" onClick={() => addStudent(name, surname, major, GPA)}>ADD</button>
            </div>

            <h1 className="pl-11 text-[#00ADB5] text-6xl font-bold italic uppercase font-display" >Student</h1>
            <div className="flex flex-col text-3xl text-[#00ADB5] font-bold font-display items-center">
                <div className="relative m-4 p-4 flex flex-row-reverse">
                    {printStudents(data.list)}
                </div>
            </div>

            <h1 className="pl-11 text-[#00ADB5] text-6xl font-bold italic uppercase font-display" >Show Student</h1>
            <div className="flex flex-col items-center text-3xl text-[#00ADB5] font-bold font-display">
                <div className="relative m-4 p-4 flex flex-colflex-col items-center">
                    Name: {student.name} <br />
                    Surname: {student.surname} <br />
                    Major: {student.major} <br />
                    GPA: {student.GPA} <br />
                </div>
            </div>
        </div>
    )
}
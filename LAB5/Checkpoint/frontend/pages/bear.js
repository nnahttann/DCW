import { useEffect, useState } from "react";
const Bear = ({ avatar_url, login }) => {

  const [name, setName] = useState("");
  const [weight, setWeight] = useState(0);
  const [picture, setPicture] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [idEdit, setidEdit] = useState(0);

  useEffect( async () => {
    let ts = await getBear();
    console.log(ts)
    setTasks(ts)
    }, [] )

  const addTask = () => {
    console.log("add");
    if (tasks.length > 9) {
      alert(' Task name can not exceed 10 Tasks');
    }
    else if (name.trim() !== '') {
      const id = [tasks.length - 1] < 0 ? 1 : tasks[tasks.length - 1].id + 1;
      setTasks([...tasks, { id: id, name: name, weight: weight, picture: picture }]);
    }
    console.log('Tasks:', tasks);
  }

  const deleteTask = (id) => {
    console.log("Delete", id);
    const newTasks = tasks.filter((item) => +item.id !== +id);
    setTasks(newTasks);
  };

  const editTask = (id) => {
    console.log('Edit Task', id);
    setidEdit(id)
    let t = tasks.find((task) => +task.id === +id)
    setName(t.name)
    setWeight(t.weight)
    setPicture(t.picture)
    if (+idEdit === +id) { //Press Edit again
      let newTasks = tasks.map((task, index) => {
        if (+task.id === +id) {
          tasks[index].name = name
          tasks[index].weight = weight
          tasks[index].picture = picture
        }
        return task
      })
      setTasks(newTasks)
      setidEdit(0)
    }
  };

  const renderTask = () => {
    return tasks.map((item, index) => (
      <li key={index} className="relative m-4 border-double border-8 p-8 flex flex-col mt-2 mb-2 backdrop-blur-xl">
        <div className="absolute bottom-0 right-0 text-xl mr-2 text-[#00ADB5] font-bold">
          {index + 1}
        </div>{+idEdit !== +item.id ? (
          <div className="text-4xl text-[#00ADB5] font-bold drop-shadow-lg drop-shadow-lg max-w-xs ">{item.name}</div>) : (
          <input className="text-3xl rounded-lg text-[#00ADB5] bg-[#EEEEEE] font-bold pl-4 mt-2 mb-2 outline-[#00ADB5]" type="task" value={name} onChange={(e) => setName(e.target.value)} />
        )
        }
        {+idEdit !== +item.id ? (
          <div className="text-4xl text-[#00ADB5] font-bold drop-shadow-lg drop-shadow-lg max-w-xs">{item.weight}</div>) : (
          <input className="text-3xl rounded-lg text-[#00ADB5] bg-[#EEEEEE] font-bold pl-4 mt-2 mb-2 outline-[#00ADB5]" type="task" value={weight} onChange={(e) => setWeight(e.target.value)} />
        )
        }
        <div className="mt-8 flex justify-center">
          <button className="mr-4 p-2 bg-red-400 hover:text-[#EEEEEE] rounded-lg drop-shadow-lg font-bold transition transform hover:-translate-y-2 motion-reduce:transition-none motion-reduce:hover:transform-none" onClick={() => deleteTask(item.id)}>Delete</button>
          <button className="p-2 bg-yellow-500 hover:text-[#EEEEEE] rounded-lg drop-shadow-lg font-bold transition transform hover:-translate-y-2 motion-reduce:transition-none motion-reduce:hover:transform-none"
            onClick={() => editTask(item.id)}
          > Edit</button>
        </div>
      </li>
    ));
  };
  return (
    <div className="h-screen bg-[#393E46] border-4 flex flex-col items-center">
      <h1 className="m-5 text-[#00ADB5] text-8xl font-bold italic uppercase ">Bear</h1>
      <h1 className="text-[#EEEEEE] text-1xl font-bold uppercase"><img src={avatar_url} width="40" /> Power by <span >{login} </span> </h1>
      <div className="flex flex-col w-5/6 justify-around items-center mt-2 mb-2 ">
        <input className="text-3xl text-[#00ADB5] w-1/3 bg-[#EEEEEE] rounded-lg pl-4 mt-2 mb-2 font-bold outline-[#00ADB5]" type="text" name="task" onChange={(e) => setName(e.target.value)} />
        <input className="text-3xl text-[#00ADB5] w-1/3 bg-[#EEEEEE] rounded-lg pl-4 mt-2 mb-2 font-bold outline-[#00ADB5]" type="number" name="task" onChange={(e) => setWeight(e.target.value)} />
        <input className="text-3xl text-[#00ADB5] w-1/3 bg-[#EEEEEE] rounded-lg pl-4 mt-2 mb-2 font-bold outline-[#00ADB5]" type="text" name="task" onChange={(e) => setPicture(e.target.value)} />
        <button className="text-2xl w-1/3 bg-[#00ADB5] font-bold text-[#222831] hover:text-[#00ADB5] dark:md:hover:bg-[#222831] rounded-lg mt-2 mb-2" onClick={addTask}>Add</button>
      </div>
      <ul className="flex flex-wrap mb-8">{renderTask()}</ul>
    </div>
  );
};

const getBear = async () => {
  const res = await fetch('http://localhost:8000/')
  const json = await res.json()
  console.log(json)
  return json;
}

Bear.getInitialProps = async (ctx) => {
  const res = await fetch('https://api.github.com/users/nnahttan')
  const json = await res.json()
  return { login: json.login, avatar_url: json.avatar_url }
}

export default Bear;
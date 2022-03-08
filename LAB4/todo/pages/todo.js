import { useEffect, useState } from "react";
const Todo = () => {
  let initTasks = [
    // { id: 1, name: "Do homework" },
    // { id: 2, name: "Read a book" },
  ];

  const [name, setName] = useState("");
  const [tasks, setTasks] = useState(initTasks);
  const [idEdit, setIdEdit] = useState(-1);

  const addTask = () => {
    console.log("add");
    if (tasks.length > 9) {
        alert(' Task name can not exceed 10 Tasks');
    }
    else if (name.trim() !== '') {
        const id = [tasks.length - 1] < 0 ? 1 : tasks[tasks.length - 1].id + 1;
        setTasks([...tasks, { id: id, name: name}])
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
    if (+idEdit === +id) { //Press Edit again
        let newTasks = tasks.map((task, index) => {
            if (+task.id === +id){
                tasks[index].name = name
            }
            return task
        })
        setTasks(newTasks)
        setidEdit(0)
    }
  };

  const renderTask = () => {
    // if( tasks !== null)
    console.log(idEdit);
    return tasks.map((item, index) => (
      <li key={index} className="relative m-4 border-2 border-dashed p-8">
        <div className="absolute bottom-0 right-0 text-xl mr-2 text-indigo-500">
        {index + 1}
        </div>{+idEdit !== +item.id ? (
          <div className="text-3xl text-indigo-800 drop-shadow-lg drop-shadow-lg max-w-xs">{item.name}</div>) : (
          <input className="text-3xl text-indigo-800" type="task" value={name} onChange={(e) => setName(e.target.value)}/>
        )}
        <div className="mt-8 flex justify-center">
          <button className="mr-4 p-2 bg-red-400 hover:text-indigo-500 rounded-lg drop-shadow-lg" onClick={() => deleteTask(item.id)}>Delete</button>
          <button className="p-2 bg-yellow-500 hover:text-indigo-500 rounded-lg drop-shadow-lg"
            onClick={() => editTask(item.id)}
          > Edit</button>
        </div>
      </li>
    ));
  };
  return (
    <div className="h-screen bg-blue-300 border-2 flex flex-col items-center">
      <h1 className="m-8 text-black text-8xl drop-shadow-lg">Todo</h1>
      <div className="flex w-2/3 justify-center mb-8">
        <input
          className="w-1/3 rounded-lg pl-2 ml-2 mr-4"
          type="text"
          name="task"
          onChange={(e) => setName(e.target.value)}
        />
        <button className="bg-green-600 text-indigo-200 hover:text-indigo-500 p-2 rounded-lg" onClick={addTask}>Add</button>
      </div>
      <ul className="flex flex-wrap mb-8">{renderTask()}</ul>
    </div>
  );
};

Todo.getInitialProps = async (ctx) => {
  const res = await fetch('https://api.github.com/users/nnahttan')
  const json = await res.json()
  return { login: json.login, avatar_url: json.avatar_url }
  }

export default Todo;
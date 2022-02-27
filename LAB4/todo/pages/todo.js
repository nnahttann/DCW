import { useEffect, useState } from "react";
const Todo = () => {
  let initTasks = [
    { id: 1, name: "Do homework" },
    { id: 2, name: "Read a book" },
  ];
  const [name, setName] = useState("");
  const [tasks, setTasks] = useState(initTasks);
  const [idEdit, setIdEdit] = useState(-1);
  const addTask = () => {
    console.log("add");
    if (name == "") return;
    if (tasks.length == 0) setTasks([{ id: 1, name }]);
    else setTasks([...tasks, { id: tasks[tasks.length - 1].id + 1, name }]);
    console.log("new task: ", tasks);
  };
  const deleteTask = (id) => {
    console.log("Delete", id);
    const newTasks = tasks.filter((item) => +item.id !== +id);
    setTasks(newTasks);
  };
  const editTask = (id) => {
    setIdEdit(id);
    const task = tasks.find((item) => +item.id === +id);
    setName(task.name);
    if (+idEdit === +id) {
      // press edit again
      // set new tasks
      const newTasks = tasks.map((task, index) => {
        if (+task.id === +id) task.name = name;
        return task;
      });
      setTasks(newTasks); // re-render
      setIdEdit(0); // re init idEdited
    }
  };
  const renderTask = () => {
    // if( tasks !== null)
    console.log(idEdit);
    return tasks.map((item, index) => (
      <li key={index} className="relative m-4 border-2 border-dashed p-8">
        <div className="absolute bottom-0 right-0 text-xl mr-2 text-indigo-500">
          {item.id}
        </div>
        {+idEdit !== +item.id ? (
          <div
            className="text-3xl text-indigo-800 drop-shadow-lg
drop-shadow-lg max-w-xs"
          >
            {item.name}
          </div>
        ) : (
          <input
            className="text-3xl text-indigo-800"
            type="task"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <div className="mt-8 flex justify-center">
          <button
            className="mr-4 p-2 bg-red-400 hover:text-indigo-500
rounded-lg drop-shadow-lg"
            onClick={() => deleteTask(item.id)}
          >
            Delete
          </button>
          <button
            className="p-2 bg-yellow-500 hover:text-indigo-500 rounded-lg
drop-shadow-lg"
            onClick={() => editTask(item.id)}
          >
            Edit
          </button>
        </div>
      </li>
    ));
  };
  return (
    <div
      className="h-screen bg-indigo-300 border-2 flex flex-col
items-center"
    >
      <h1 className="m-8 text-indigo-800 text-4xl drop-shadow-lg">Todo</h1>
      <div className="flex w-2/3 justify-center mb-8">
        <input
          className="w-1/3 rounded-lg pl-2 ml-2 mr-4"
          type="text"
          name="task"
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className="bg-green-600 text-indigo-200 hover:text-indigo-500 p-2
rounded-lg"
          onClick={addTask}
        >
          Add
        </button>
      </div>
      <ul className="flex flex-wrap mb-8">{renderTask()}</ul>
    </div>
  );
};
export default Todo;

import React, { useState, useEffect } from "react";
import { List } from "./list";
import { Footer } from "./footer";

export function TodoList() {
	const [list, setList] = useState([]);
	const [task, setTask] = useState("");
	const [error, setError] = useState(false);

	useEffect(() => {
        const getList = async () => {
            const response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/samvalvi")
            const data = await response.json();
            setList(data)
        }
        getList().catch(error => console.error(error));
	}, []);

	const handleChange = e => {
		if (error) {
			setError(false);
		}

		setTask(e.target.value);
	};

	//Delete the task
	const deleteTask = () => {
		/*const newTasks = list.filter((task, index) => index !== key);
        setList(newTasks);*/
		
	};

	const handleSubmit = e => {
		e.preventDefault();

		if (task === "") {
			setError("A task name is required");
		} else {
			setList([...list, { label: task, done: false }]);
		}

		setTask("");

		
	};

	return (
		<div className="w-50 mx-auto shadow">
			<h6 className="w-50 mx-auto fw-light text-danger">
				{error ? error : null}
			</h6>

			<form onSubmit={handleSubmit}>
				<input
					className="list-group-item w-100"
					type="text"
					placeholder="What needs to be done?"
					name="taskName"
					value={task}
					onChange={handleChange}
				/>
			</form>

			<div className="bg-white">
				<List list={list} deleteTask={deleteTask} />
			</div>
			<div className="footer bg-secondary">
				<Footer list={list} />
			</div>
		</div>
	);
}

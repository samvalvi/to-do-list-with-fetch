import React, { useState, useEffect } from "react";
import { List } from "./list";
import { Footer } from "./footer";

export function TodoList() {
	const [list, setList] = useState([]);
	const [task, setTask] = useState("");
	const [error, setError] = useState(false);
	const url = "https://assets.breatheco.de/apis/fake/todos/user/samvalvi";

	const getList = () => {
		fetch(url, {
			method: "GET",
			headers: { "Content-Type": "application/json" }
		})
			.then(resp => resp.json())
			.then(data => setList(data))
			.catch(error => console.error(error));
	};

	const newList = () => {
		let list = [];
		fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(list)
		})
			.then(response => response.json())
			.then(data => {
				console.log(data);
				getList();
			})
			.catch(error => console.error(error));
	};

	const updateList = () => {
		fetch(url, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(list)
		})
			.then(resp => resp.json())
			.then(data => console.log(data))
			.catch(error => console.error(error));
	};

	useEffect(() => {
		getList();
	}, []);

	useEffect(() => {
		updateList();
	}, []);

	const handleChange = e => {
		if (error) {
			setError(false);
		}

		setTask(e.target.value);
	};

	//Delete the task
	const deleteTask = key => {
		const newTasks = list.filter((task, index) => index !== key);
		setList(newTasks);
		updateList();
	};

	//Delete all tasks
	const deleteTasks = () => {
		fetch(url, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" }
		})
			.then(response => response.json())
			.then(data => {
				console.log(data);
				newList();
			})
			.catch(error => console.error(error));
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
		<div className="container">
			<div className="w-50 mx-auto shadow">
				<h6 className="w-50 mx-auto fw-light text-danger">
					{error ? error : null}
				</h6>

				<form onSubmit={handleSubmit}>
					<input
						className="col list-group-item w-100"
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

			<div
				className="d-flex justify-content-center mt-3"
				id="btn-container">
				<button
					className="btn btn-secondary"
					onClick={() => deleteTasks()}>
					Delete All Tasks
				</button>
			</div>
		</div>
	);
}

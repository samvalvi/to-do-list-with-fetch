import React from "react";
import { Header } from "./component/header";
import { TodoList } from "./component/to-do-list";

//create your first component
export function App() {
	return (
		<div className="container">
			<Header />
			<TodoList />
		</div>
	);
}

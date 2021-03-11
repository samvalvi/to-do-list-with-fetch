import React from "react";
import PropTypes from "prop-types";

export function Footer({ list }) {
	return (
		<small className="text-break text-white p-1">
			{list.length !== 0 ? `${list.length} task left` : "no tasks to do"}
		</small>
	);
}

Footer.propTypes = {
	list: PropTypes.array,
	deleteTask: PropTypes.func
};

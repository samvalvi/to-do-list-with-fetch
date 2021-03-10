import React from "react";
import PropTypes from "prop-types";

export function Footer({ list }) {
	return (
		<small className="text-break text-secondary">
			{list.length !== 0 ? `${list.length} task left` : "no tasks to do"}
		</small>
	);
}

Footer.propTypes = {
	list: PropTypes.array,
	deleteTask: PropTypes.func
};

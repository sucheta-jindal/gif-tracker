import React from "react";
import { SEARCH_SVG } from "../../constants";

const SearchBar = ({ onSubmit }) => (
	<div className="search-bar">
		<input
			className="search"
			type="text"
			name="name"
			id="name"
			placeholder="Search GIF"
			autoComplete="off"
		/>
		<button type="button">
			<img
				src={SEARCH_SVG}
				width="26"
				alt="search"
				onClick={() => {
					if (document.getElementById("name").value) {
						onSubmit(document.getElementById("name").value);
					}
				}}
			/>
		</button>
	</div>
);

export default SearchBar;

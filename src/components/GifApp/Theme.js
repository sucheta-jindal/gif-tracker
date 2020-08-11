import React from "react";

class Theme extends React.Component {
	state = {
		theme: "dark",
	};

	toggleTheme() {
		const theme = this.state.theme === "dark" ? "light" : "dark";
		this.setState({ theme });
		document.documentElement.setAttribute("data-theme", theme);
	}

	render() {
		return (
			<button className="toggle" onClick={() => this.toggleTheme()}>
				Change Theme
			</button>
		);
	}
}

export default Theme;

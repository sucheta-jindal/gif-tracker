import React from "react";

const GifCards = ({ url, idx }) => (
	<div key={idx} className="article">
		<img className="article-img" src={url} alt="gif" />
	</div>
);

export default GifCards;

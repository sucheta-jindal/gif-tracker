import React from "react";
import { fetchRelatedGifs, fetchTrendingGifs } from "./actions";
import SearchBar from "../../components/GifApp/SearchBar";
import GifCards from "../../components/GifApp/GifCard";
import Theme from "../../components/GifApp/Theme";

class GifApp extends React.Component {
	state = {
		gifList: null,
		isLoading: true,
		limit: 25,
		offset: 0,
		totalCount: 0,
	};

	async componentDidMount() {
		const gifData = await fetchTrendingGifs({
			limit: this.state.limit,
			offset: this.state.offset,
		});
		this.setState(
			{
				isLoading: false,
				gifList: gifData.data,
				offset: this.state.limit + this.state.offset,
				totalCount: gifData.pagination.total_count,
			},
			() => {
				this.refs.myscroll.addEventListener("scroll", () => {
					if (
						this.refs.myscroll.scrollTop + this.refs.myscroll.offsetHeight >=
							this.refs.myscroll.scrollHeight &&
						this.state.totalCount > this.state.offset
					) {
						this.loadMore();
					}
				});
			}
		);
	}

	async loadMore() {
		if (this.state.searchQuery) {
			const gifData = await fetchRelatedGifs({
				q: this.state.searchQuery,
				limit: this.state.limit,
				offset: this.state.offset,
			});
			this.setState({
				gifList: [...this.state.gifList, ...gifData.data],
				offset: this.state.limit + this.state.offset,
			});
		} else {
			const gifData = await fetchTrendingGifs({
				limit: this.state.limit,
				offset: this.state.offset,
			});
			this.setState({
				gifList: [...this.state.gifList, ...gifData.data],
				offset: this.state.limit + this.state.offset,
			});
		}
	}

	relatedGifs(data) {
		this.setState(
			{
				searchQuery: data,
				gifList: null,
				isLoading: true,
				limit: 25,
				offset: 0,
				totalCount: 0,
			},
			async () => {
				const gifData = await fetchRelatedGifs({
					q: this.state.searchQuery,
					limit: this.state.limit,
					offset: this.state.offset,
				});
				this.setState({
					isLoading: false,
					gifList: gifData.data,
					offset: this.state.limit + this.state.offset,
					totalCount: gifData.pagination.total_count,
				});
			}
		);
	}

	renderLoading() {
		return (
			<div className="container">
				<div className="loader"></div>
			</div>
		);
	}

	render() {
		return (
			<div className="GifApp">
				<div className="container">
					<SearchBar onSubmit={(data) => this.relatedGifs(data)} />
					<Theme />
				</div>
				{this.state.isLoading ? (
					this.renderLoading()
				) : (
					<div ref="myscroll" className="grid">
						<div className="cards">
							{this.state.gifList.length ? (
								this.state.gifList
									.filter((x) => x.images.fixed_height_downsampled.webp)
									.map((x, idx) => (
										<GifCards
											url={x.images.fixed_height_downsampled.webp}
											idx={idx}
										/>
									))
							) : (
								<div className="container">No result found</div>
							)}
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default GifApp;

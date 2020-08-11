import axios from "../../api/axios";
import { apiSearchGif, apiTrendingGif } from "../../api/urls";

export const fetchRelatedGifs = async (params) => {
	const url = apiSearchGif;
	try {
		const response = await axios.get(url, {
			params: { ...params },
		});
		return response.data;
	} catch (e) {
		console.log(e);
		return null;
	}
};

export const fetchTrendingGifs = async (params) => {
	const url = apiTrendingGif;
	try {
		const response = await axios.get(url, {
			params: { ...params },
		});
		return response.data;
	} catch (e) {
		console.log(e);
		return null;
	}
};

import axios from "axios";
import { GIF_BASE_URL } from "../constants";

export default axios.create({
	baseURL: GIF_BASE_URL,
	headers: {},
});

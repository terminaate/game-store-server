import axios from 'axios';

export const isImageUrl = async (url: string) => {
	try {
		const response = await axios.get(url);
		const contentType =
			response.headers['content-type'] ?? response.headers['Content-Type'];
		return contentType.toLowerCase().includes('image');
	} catch (e) {
		return false;
	}
};

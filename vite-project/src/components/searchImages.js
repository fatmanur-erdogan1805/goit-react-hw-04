import axios from "axios";

const API_PATH_SEARCH = "https://api.unsplash.com/search/photos/";
const API_KEY = "IXkW2N2BTcvh7OAdB0zb8i5BzV5wA7E99f3MNE2sIRw";

const searchImages = async (query = "nature", page = 1, perPage = 30) => {
  const response = await axios.get(`${API_PATH_SEARCH}`, {
    params: {
      client_id: API_KEY,
      query: query,
      page: page,
      per_page: perPage,
    },
  });

  // console.log("Searched Images:", response.data.results);
  return response.data.results;
};

export default searchImages;
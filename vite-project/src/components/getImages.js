import axios from "axios";

const API_PATH = "https://api.unsplash.com/photos/";
const API_KEY = "IXkW2N2BTcvh7OAdB0zb8i5BzV5wA7E99f3MNE2sIRw";

const fetchRandomImages = async () => {
  const response = await axios.get(`${API_PATH}`, {
    params: {
      client_id: API_KEY,
    },
  });
  return response.data;
};

export default fetchRandomImages;
// This function fetches random images from the Unsplash API.
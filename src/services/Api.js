import axios from 'axios';
const API_KEY = '27686313-742ded8f698756fd4afe04a50';

async function fetchImages(query, page) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export default fetchImages;

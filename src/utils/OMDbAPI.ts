import axios from 'axios';
import env from 'react-dotenv';

/** OMDb API
 *  The Open Movie Database
 *  http://www.omdbapi.com/#parameters
 **/
export const API_KEY = '&apikey=' + env.API_KEY;
export const API_ENDPOINT = 'https://www.omdbapi.com/?s=';

export function getMovieByTitle(title: string) {
  // handle promise response at the corresponding component
  return axios.get(`${API_ENDPOINT}${title}${API_KEY}`);
}

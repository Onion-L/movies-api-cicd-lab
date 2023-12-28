import fetch from "node-fetch";

export const fetchData = async (endpoint) => {
  const url = `https://api.themoviedb.org/3/${endpoint}?api_key=${process.env.TMDB_KEY}`;

  const response = await fetch(url);

  if (response.ok) {
    return await response.json();
  } else {
    return null;
  }
};

export const fetchPageData = async (endpoint, page = 1) => {
  const url = `https://api.themoviedb.org/3/${endpoint}?api_key=${process.env.TMDB_KEY}&language=en-US&page=${page}`;

  const response = await fetch(url);

  if (response.ok) {
    return await response.json();
  } else {
    return null;
  }
};

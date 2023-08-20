import axios from "axios"

const url = 'https://newsapi.org/v2/top-headlines?country=in&apiKey='

export const getNews = async () => {
    const res = await axios.get(`${url}${process.env.REACT_APP_NEWS_APP_KEY}`)
    return  res.data;
}
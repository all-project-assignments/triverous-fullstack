import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Card from "../components/card";
import Navbar from "../components/navbar";

type Props = {};
export type OptionalString = string | null;

type ArticleType = {
  author: OptionalString;
  content: OptionalString;
  description: OptionalString;
  title: OptionalString;
  url: string;
  urlToImage: string;
  source: {
    id: string | null;
    name: string | null;
  };
};

const Newsapp = (props: Props) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["top-healines"],
    queryFn: async () => {
      const res = await axios.get(`https://newsapi.org/v2/top-headlines?country=in&apiKey=${process.env.REACT_APP_API_KEY}`)
      // const res = await axios.get(
      //   `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=7e58f1b053844f898508985173fb61ce`
      // );
      return res.data;
    },
  });

  console.log("key", process.env.NODE_ENV);
  // console.log("key", process.env.REACT_APP_API_KEY)
  console.log("key", process.env.REACT_APP_API_KEY);
  if (!isLoading) {
    console.log("data", data);
  }

  return <React.Fragment>
    <Navbar />
    {
      isLoading ? (
        <div>isLoading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-4 mt-4 mx-4">
          {data.articles.map((article: ArticleType, index : number) => (
            <Card
              key={index}
              author={article.author}
              content={article.content}
              description={article.description}
              title={article.title}
              url={article.url}
              urlToImage={article.urlToImage}
              source={article.source}
            />
          ))}
        </div>
      )
    }
  </React.Fragment>
};

export default Newsapp;

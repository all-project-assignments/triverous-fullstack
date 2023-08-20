import React, { useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Card from "../components/card";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";

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
  const navigate = useNavigate()

  const [user, loading, error] = useAuthState(auth);
  console.log("user", user)
  const { data, isLoading, isError } = useQuery({
    queryKey: ["top-healines"],
    queryFn: async () => {
      const res = await axios.get(`https://newsapi.org/v2/top-headlines?country=in&apiKey=${process.env.REACT_APP_API_KEY}`)
      return res.data;
    },
  });

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (!user) navigate("/");
  }, [user, loading]);

  console.log("key", process.env.NODE_ENV);
  // console.log("key", process.env.REACT_APP_API_KEY)
  console.log("key", process.env.REACT_APP_API_KEY);
  if (!isLoading) {
    console.log("data", data);
  }

  return <React.Fragment>
    <Navbar />
    {
      isLoading || loading ? (
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

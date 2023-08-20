import React, { useState } from "react";
import Heart from "react-animated-heart";
import { OptionalString } from "../containers/newsapp";

type Props = {
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

const Card = (props: Props) => {
  const [isClick, setClick] = useState(false);
  return (
    <div className="card-side w-84 bg-base-100 shadow-xl">
      <figure className="relative z-0">
        <div className="badge absolute right-2 top-2 ">{props.source.name}</div>
        <div className="absolute w-16 h-16 right-2 bottom-2 ">
          <Heart isClick={isClick} onClick={() => setClick(!isClick)} />
        </div>

        <img src={props.urlToImage} alt="article" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{props.title}</h2>
        <p>{props.description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">
            <a href={props.url} target="_black">
              Read More...
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;

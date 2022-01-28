import FavoriteIcon from "@mui/icons-material/Favorite";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import React, { useState, useEffect } from "react";
import "./Lists.css";
import trailer from "./trailer.mp4";
import { useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import poster from './poster.jfif'

const ListsItems = ({ id }) => {
  const [isHovered, setIsHovered] = useState(false);

  const [mylist, setMylist] = useState([]);

  useEffect(() => {
    localStorage.setItem("myList", JSON.stringify(mylist));
  }, [mylist]);

  const navigate = useNavigate();

  return (
    <>
      <div
        className="listsItem_container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Tooltip title="Click To Watch">
          <OpenInNewIcon
            className="watch_item"
            onClick={() => navigate(`/watch/${id}`)}
          />
        </Tooltip>

        {isHovered ? (
          <>
            <video src={trailer} controls />
            <div className="itemInfo">
              <div className="icons">
                <div className="genre">Horror</div>
                <Tooltip title="Add To My List" >
                <FavoriteIcon className="icon" />
                </Tooltip>
              </div>
              <div className="itemInfoTop">
                <span>1 hour 45 min</span>
                <span>2017</span>
                <span className="age_limit">+18</span>
              </div>
              <div className="desc">
                Samuel and Elle embed their daughter's spirit into a doll, only
                to realise it is a demon. Years later, they open their home to a
                nun and six orphan girls, one of whom finds the doll.{" "}
              </div>
            </div>
          </>
        ) : (
          <img
            src={poster}
            alt="movie image"
            className="item_image"
          />
        )}
      </div>
    </>
  );
};

export default ListsItems;

import React from "react";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import './MyListItem.css'

const MyListItem = ({ item }) => {
    const navigate = useNavigate();
  return (
    <>
      <div className="mylistsItem_container">
        <Tooltip title="Click To Watch">
          <OpenInNewIcon
            className="watch_item"
            onClick={() => navigate(`/watch/${item._id}`)}
            style={{marginTop:'-7px'}}
          />
        </Tooltip>
        <h3 className="movie_head">{item.title}</h3>
        <img src={item.img} alt="movie image" className="item_image" />
      </div>
    </>
  );
};

export default MyListItem;

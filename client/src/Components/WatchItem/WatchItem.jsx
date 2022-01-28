import React,{useEffect} from "react";
import "./WatchItem.css";
import { useNavigate } from "react-router-dom";
import { ArrowBackOutlined } from "@mui/icons-material";
import trailer from "../Lists/trailer.mp4";

const WatchItem = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    document.documentElement.scrollTop = 0;
  },[])

  return (
    <>
    <div className="watch_container">
    <div className="back" onClick={() => navigate(-1)}>
        <ArrowBackOutlined />
        Go Back
      </div>
      <video className="watch_video" controls progres src={trailer} />
    </div>
      
    </>
  );
};

export default WatchItem;

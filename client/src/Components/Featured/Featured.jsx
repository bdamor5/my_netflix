import React, { useEffect, useState } from "react";
import "./Featured.css";
import { PlayArrow } from "@mui/icons-material";
import title from "./title.png";
import series from "./series.png";
import { useDispatch } from "react-redux";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useLocation } from "react-router-dom";

const Featured = ({ type }) => {
  const [randomMedia, setRandomMedia] = useState();
  const [genre, setGenre] = useState("");
  const location = useLocation();

  useEffect(() => {
    const randomMediaFeatured = async () => {
      try {
        if(genre === "Genre") setGenre("")
        const { data } = await axios.get(
          `/api/movies/random?type=${type}&genre=${genre}`
        );
        setRandomMedia(data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    randomMediaFeatured();
  }, [type, genre]);

  return (
    <>
      {!randomMedia ? (
        <Loader />
      ) : (
        <div className="featured">
          {location.pathname !== "/" && (
            <div className="category">
              <span>{type === "movies" ? "Movies " : "Series "}</span>
              &nbsp;
              <select
                name="genre"
                id="genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              >
                <option>Genre</option>
                <option className="genre_option" value="action">Action</option>
                <option className="genre_option" value="comedy">Comedy</option>
                <option className="genre_option" value="horror">Horror</option>
                <option className="genre_option" value="romance">Romance</option>
                <option className="genre_option" value="sci-fi">Sci-fi</option>
              </select>
            </div>
          )}

          <img src={randomMedia && randomMedia.img} alt="movie image" />
          <div className="f_info">
            {randomMedia.imgTitle && (
              <img
                src={randomMedia && randomMedia.imgTitle}
                alt="title image"
              />
            )}
            <span className="desc">{randomMedia && randomMedia.desc}</span>{" "}
            <div className="f_buttons">
              <button className="play">
                <PlayArrow />
                <span style={{ paddingLeft: "5px" }}>Play</span>
              </button>
              <button className="more">
                <span>More Info</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Featured;

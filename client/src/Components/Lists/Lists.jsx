import React from "react";
import "./Lists.css";
import ListsItems from "./ListsItems.jsx";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Lists = ({ title }) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1200 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1200, min: 800 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 800, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <div className="list_container">
        <div className="l_title">{title}</div>
        <Carousel
          swipeable={true}
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={2000}
          keyBoardControl={true}
          transitionDuration={500}
          removeArrowOnDeviceType={["desktop","tablet", "mobile"]}
          className="carousel_container"
        >
          <ListsItems id={0}/>
          <ListsItems id={1}/>
          <ListsItems id={2}/>
          <ListsItems id={3}/>
          <ListsItems id={4}/>
          <ListsItems id={5}/>
          <ListsItems id={6}/>
          <ListsItems id={7}/>
          <ListsItems id={8}/>
          <ListsItems id={9}/>
          <ListsItems id={10}/>
        </Carousel>
      </div>
    </>
  );
};

export default Lists;

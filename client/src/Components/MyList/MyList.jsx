import React,{useEffect, useState} from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MyListItem from './MyListItem.jsx'
import axios from 'axios'
import './MyListItem.css'

const MyList = () => {
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

  const [lists,setLists] = useState([])

  useEffect(()=>{
    const getLists = async() =>{
        const {data} = await axios.get('/api/movies/all');

        setLists(data)
        console.log(data)
    }

    getLists()
  },[])

  return (
    <>
    <div className="mylist_wrapper">
    <h3 className="mylist">My List</h3>
      <Carousel
        swipeable={true}
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={2000}
        keyBoardControl={true}
        transitionDuration={500}
        removeArrowOnDeviceType={["desktop", "tablet", "mobile"]}
        className="carousel_container"
      >
        {
            lists.map((item,key)=>(
                <MyListItem key={key} item={item} />
            ))
        }
      </Carousel>
    </div>
    </>
  );
};

export default MyList;

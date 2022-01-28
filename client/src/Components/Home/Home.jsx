import React from 'react';
import Featured from '../Featured/Featured';
import Lists from '../Lists/Lists';
import './Home.css'

const Home = ({type}) => {

  return <>
  <Featured type={type}/>   
  <Lists title="More Like This"/>
  </>;
};

export default Home;

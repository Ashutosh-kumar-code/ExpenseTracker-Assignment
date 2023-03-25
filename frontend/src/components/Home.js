import React from 'react';
import Graph from './Graph';
import Form from './Form';
import List from './List';

const Home = () => {
  return (
    <>
     <div className="container mx-auto max-w-6xl text-center drop-shadow-lg text-gray-800">

    <br /> <br /> <br />
   
      <div className="grid md:grid-cols-2 gap-4">
      
          <Graph></Graph>
          <Form></Form>
        
      </div>
      <List></List>
    </div> 
    </>
  )
}

export default Home;

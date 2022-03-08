import axios from "axios";
import React, { useState } from "react";
import { Link } from 'react-router-dom';


function Home(props) {
    return <div>
  <Link to="/today" className="link">Cегодня</Link>
  <Link to="/animals" className="link">Животные</Link>
  </div>
  }
  export default Home;
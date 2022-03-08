import axios from "axios";
import React, { useState, useEffect } from "react";

const Animals = () => {
  const [limit] = useState(5);
  const [offset, setoffset] = useState(0);
  const [dataName, setDataName] = useState();
  const [dataSpecName, setDataSpecName] = useState();
  const [dataAge, setDataAge] = useState();
  const [dataHeight, setDataHeight] = useState();
  const [dataWeight, setDataWeight] = useState();

  const [animalsToday, setAnimalsToday] = useState([]);
  const token = localStorage.getItem("token");
  const url = "https://acits-test-back.herokuapp.com/api/animals";

  useEffect(() => {
    loadAnimals();
    
  }, [offset]);

  function loadAnimals() {
    axios
      .get(url, {
        params: {
          limit,
          offset,
        },
        headers: {
          Authorization: "Bearer " + token,
          dataType: "json",
          "Access-Control-Allow-Origin": url,
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        },
      })
      .then((res) => setAnimalsToday(res.data.results));

   
    
  }
  function callCardsAnimals(e, item){
    setDataName(item.name)
    setDataSpecName(item.spec.name)
    setDataAge(item.age)
    setDataHeight(item.height+item.heightUnit)
    setDataWeight(item.weight+item.weightUnit)
    let form = document.querySelector(".dataAnimal")
    form.style.display="block";
  }
  function closeForm(){
    let form = document.querySelector(".dataAnimal")
    form.style.display="none";
  }
  return (
    <div>
      <h1 className="title">Животные</h1>

      <button onClick={() => setoffset((offset) => (offset - limit > 0 ? offset - limit : 0))}>
        Предыдущая
      </button>
      <button onClick={() => setoffset((offset) => offset + limit)} >
        Следующая
      </button>

      {animalsToday.map((item) => (
        <div key={item.id} value={item.name} onClick={(e) => callCardsAnimals(e, item)}>{item.name}-{item.spec.name}</div>
      ))}
     <div className="dataAnimal">
       <div className="close" onClick={closeForm}>x</div>
       <h2 className="title">Данные о животном</h2>
       {dataName}-{dataSpecName}-{dataAge}-{dataHeight}-{dataWeight}
      </div>


    </div>



  );
};

export default Animals;

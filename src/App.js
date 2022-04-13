import React, { useState, useEffect } from "react";
import "./styles.css";
import patients from "./api.js";



export default function App() {
  const mapTest = patients.patients.map((item, idx) => {
    var d = new Date(item.birthdate);
    let timeStampCon = d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear();
    return { ...item, birthdate: timeStampCon };
  });

  const [data, setData] = useState(mapTest);
  const [searchText,setSearchText] = useState("")
  const [order, setOrder] = useState('');
  const [orderBy, setOrderBy] = useState('firstName');

//Single source of truth
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function getOrder (buttonClicked) {
   if(orderBy !== buttonClicked ){
     return 'asc'
   }
   return order === 'asc' ? 'desc' :'asc'
  }

  function filterBySearchText (i) {
    if(searchText.length === 0) {
      return true
    }
   if(searchText.length >0) {
     const jsonified = JSON.stringify(Object.values(i)).toLowerCase()
     return jsonified.includes(searchText)
   }
   return false
  }

  const cardElements = data
  .filter((i)=>filterBySearchText(i))
  .sort(getComparator(order,orderBy))
  .map((item, idx) => (
    <div className="card" key={idx}>
      <p>
        <b>First Name:</b> {item.firstName}
      </p>
      <p>
        <b>Last Name:</b> {item.lastName}
      </p>
      <p>
        <b>Sex:</b> {item.sex}
      </p>
      <p>
        <b>Date of Birth: </b>
        {item.birthdate}
      </p>
      <span>
        <b>Conditions:</b> {item.conditions.join(", ")}
      </span>
    </div>
  ));

  return (
    <div className="App">
      <h1>Hello World</h1>

      <input
        
        type="text"
        placeholder="Search"
        name="searchTxt"
        onChange={(e) => {
          setSearchText(e.target.value.toLowerCase());
        }}
      />
      {/* <button name="searchBtn" value="searchBtn" onClick={handleSearch}>
        Search
      </button> */}
      <div className="box-container">
        <button
          className={orderBy === "firstName" ? "lighted" :null }
          value="firstName"
          name="firstName"
          onClick={(e) => {
          setOrderBy("firstName")
          setOrder(getOrder("firstName"))
          }}
        >
         {`First Name -Sorted ${order}` }
        </button>
        <button
          value="lastName"
          className={orderBy === "lastName" ? "lighted" :null }
          name="lastName"
          onClick={(e) => {
            setOrderBy("lastName")
            setOrder(getOrder("lastName"))
            }}
        >
          Last Name
        </button>
        <button
          value="sex"
          name="sex"
          onClick={(e) => setSortType(e.target.value)}
          onClick={(e) => {
            setOrderBy("sex")
            setOrder(getOrder("sex"))
            }}
        >
          Sex
        </button>
        <button
          label="birthdate"
          name="birthdate"
          onClick={(e) => new Date (setSortType(e.target.value))}
        >
          Date of Birth
        </button>

        {cardElements}
      </div>
    </div>
  );
}

// let keys=Object.keys(el)
// console.log(Object.keys(el), "key")
// for(let i=0; i<keys.length;i++){
//   let keyFilter=(el[keys[i]]).toLowerCase().includes(searchText.toLowerCase());
//   console.log(keys[i], "keyFilter")
// }

//  return console.log(data[0], "el val");

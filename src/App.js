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
  const [sortType, setSortType] = useState("");

  const cardElements = data.map((item, idx) => (
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

  useEffect(() => {
    // const sortArray = type => {
    const sorted = mapTest.sort((a, b) =>
      `${a[sortType]}`.toString().localeCompare(`${b[sortType]}`.toString())
    );
    setData(sorted);
    // }
    // sortArray(sortType);
  }, [sortType]);

  const Search = function (searchText) {
    // console.log(data[0], "el val");
    // console.log(Object.keys(data[0]), "key")
    let filterVal = data.filter(
      (el) => {
        return el.firstName.toLowerCase().includes(searchText.toLowerCase());
      } // el.firstName.toLowerCase().includes(searchText.toLowerCase())
    );

    setData(filterVal);
    console.log(searchText);
  };

  return (
    <div className="App">
      <h1>Hello World</h1>

      <input
        type="text"
        placeholder="Search"
        name="searchTxt"
        onChange={(e) => {
          Search(e.target.value);
        }}
      />
      {/* <button name="searchBtn" value="searchBtn" onClick={handleSearch}>
        Search
      </button> */}
      <div className="box-container">
        <button
          value="firstName"
          name="firstName"
          onClick={(e) => setSortType(e.target.value)}
        >
          First Name
        </button>
        <button
          value="lastName"
          name="lastName"
          onClick={(e) => setSortType(e.target.value)}
        >
          Last Name
        </button>
        <button
          value="sex"
          name="sex"
          onClick={(e) => setSortType(e.target.value)}
        >
          Sex
        </button>
        <button
          label="birthdate"
          name="birthdate"
          onClick={(e) => setSortType(e.target.value)}
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

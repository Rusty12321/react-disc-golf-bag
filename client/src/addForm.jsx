import React, { useState } from "react";
import Data from "./data";

const addForm = (props) => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState(Data());
  const searchBar = document.querySelector("#searchBar");
  const dropDown = document.querySelector(".dropDown");
  const nameEl = document.getElementById("name");
  const plasticTypeEl = document.getElementById("plastic-type");
  const discTypeEl = document.getElementById("disc-type");
  const colorEl = document.getElementById("color");
  const weightEl = document.getElementById("weight");
  const speedEl = document.getElementById("speed");
  const glideEl = document.getElementById("glide");
  const turnEl = document.getElementById("turn");
  const fadeEl = document.getElementById("fade");
  const manufacturerEl = document.getElementById("manufacturer");

  function addOrEditDisc() {
    if (!props.addOrEdit) {
      if (validInputs()) {
        fetch("http://localhost:3000/api/discs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(getValues()),
        }).then(() => {
          props.setPage("main");
          props.getBag();
          props.getStorage();
        });
      }
    } else {
      fetch(`http://localhost:3000/api/discs/${props.addOrEdit}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(getValues()),
      }).then(() => {
        props.setPage("main");
        props.getBag();
        props.getStorage();
      });
    }
  }

  function validInputs() {
    let isValid = true;
    let inputs = document.querySelectorAll(".add-inputs");
    inputs.forEach((input) => {
      if (!input.value) {
        input.placeholder = "Please Fill Out This Field!";
        isValid = false;
      }
    });
    return isValid;
  }

  function getValues() {
    return {
      name: nameEl.value,
      type_of_plastic: plasticTypeEl.value,
      type_of_disc: discTypeEl.value,
      color: colorEl.value,
      weight_in_grams: weightEl.value,
      speed: speedEl.value,
      glide: glideEl.value,
      turn: turnEl.value,
      fade: fadeEl.value,
      company_name: manufacturerEl.value,
      bag_or_storage: props.page,
    };
  }  

  function handleClick(name) {
    fetch(`https://discit-api.fly.dev/disc/${name}`)
      .then((result) => result.json())
      .then((data) => {
        nameEl.value = data.name;
        discTypeEl.value = data.category;
        speedEl.value = data.speed;
        glideEl.value = data.glide;
        turnEl.value = data.turn;
        fadeEl.value = data.fade;
        manufacturerEl.value = data.brand;
      });
  }

  document.addEventListener("click", function (e) {
    if (e.target !== searchBar) {
      dropDown.style.display = "none";
    } else {
      dropDown.style.display = "block";
    }
  });

  if (props.addOrEdit) {
    fetch(`http://localhost:3000/api/discs/${props.addOrEdit}`)
      .then((result) => result.json())
      .then((data) => {
        document.getElementById("name").value = data[0].name;
        document.getElementById("plastic-type").value = data[0].type_of_plastic;
        document.getElementById("disc-type").value = data[0].type_of_disc;
        document.getElementById("color").value = data[0].color;
        document.getElementById("weight").value = data[0].weight_in_grams;
        document.getElementById("speed").value = data[0].speed;
        document.getElementById("glide").value = data[0].glide;
        document.getElementById("turn").value = data[0].turn;
        document.getElementById("fade").value = data[0].fade;
        document.getElementById("manufacturer").value = data[0].company_name;
      });
  }

  return (
    <div>
      <div className="navBar">
        <button
          id="homeBtn"
          className="button"
          onClick={() => props.setPage("main")}
        >
          Home
        </button>
        <div className="searchContainer">
          <input
            type="text"
            id="searchBar"
            placeholder="Enter Disc Name"
            autoComplete="off"
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="dropDown">
            {data
              .filter((disc) => {
                if (query === "") {
                  return;
                } else if (
                  disc.name.toLowerCase().includes(query.toLowerCase()) || disc.brand.toLowerCase().includes(query.toLowerCase())
                ) {
                  return disc;
                }
              })
              .map((disc) => (
                <div
                  key={disc.id}
                  className="searchedDisc"
                  onClick={() => handleClick(disc.name.toLowerCase())}
                >
                  <p>{disc.brand}: {disc.name}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="addForm">
        <div>
          <div>Disc Name:</div>
          <input type="text" id="name" className="add-inputs" />
        </div>
        <div>
          <div>Manufacturer:</div>
          <input type="text" id="manufacturer" className="add-inputs" />
        </div>
        <div>
          <div>Type of Plastic:</div>
          <input type="text" id="plastic-type" className="add-inputs" />
        </div>
        <div>
          <div>Color:</div>
          <input type="text" id="color" className="add-inputs" />
        </div>
        <div>
          <div>Type of Disc (ie. Driver, Mid-Range, Putter):</div>
          <input type="text" id="disc-type" className="add-inputs" />
        </div>
        <div>
          <div>Weight in Grams:</div>
          <input type="text" id="weight" className="add-inputs" />
        </div>
        <div>
          <div>Speed:</div>
          <input type="text" id="speed" className="add-inputs" />
        </div>
        <div>
          <div>Glide:</div>
          <input type="text" id="glide" className="add-inputs" />
        </div>
        <div>
          <div>Turn:</div>
          <input type="text" id="turn" className="add-inputs" />
        </div>
        <div>
          <div>Fade:</div>
          <input type="text" id="fade" className="add-inputs" />
        </div>
      </div>
      <button id="submitBtn" className="button" onClick={addOrEditDisc}>
        submit
      </button>
    </div>
  );
};

export default addForm;

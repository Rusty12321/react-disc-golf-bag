import React from "react";

const addForm = (props) => {
  function addOrEditDisc() {
    if (!props.addOrEdit) {
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

  function getValues() {
    return {
      name: document.getElementById("name").value,
      type_of_plastic: document.getElementById("plastic-type").value,
      type_of_disc: document.getElementById("disc-type").value,
      color: document.getElementById("color").value,
      weight_in_grams: document.getElementById("weight").value,
      speed: document.getElementById("speed").value,
      glide: document.getElementById("glide").value,
      turn: document.getElementById("turn").value,
      fade: document.getElementById("fade").value,
      company_name: document.getElementById("manufacturer").value,
      bag_or_storage: props.page,
    };
  }

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
      <button
        id="homeBtn"
        className="button"
        onClick={() => props.setPage("main")}
      >
        Home
      </button>
      <div className="addForm">
        <div>
          <div>Manufacturer:</div>
          <input type="text" id="manufacturer" className="add-inputs" />
        </div>
        <div>
          <div>Disc Name:</div>
          <input type="text" id="name" className="add-inputs" />
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

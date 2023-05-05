import React from "react";

const Bag = (props) => {

  const drop = (id) => {
    if (props.dragOverItem.current.includes("storage")) {
        fetch(`/api/discs/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                bag_or_storage: "storage"
            })
        })
        .then(() => {
            props.getBag();
            props.getStorage();
        })
    }
  }

  function removeDisc(id) {
    fetch(`/api/discs/${id}`, {
        method: "DELETE",
    }).then(() => {
        props.getBag();
    })
  }

  return (
    <div className="bag" >
      {props.bag.map((disc, index) => (
        <div
          className="bagDisc"
          id={disc.id}
          key={disc.id}
          onDragEnd={() => drop(disc.id)}
          draggable
        >
          {index + 1}: {disc.company_name} {disc.name} - {disc.type_of_plastic}{" "}
          - {disc.color} - Weight: {disc.weight_in_grams}g. - Speed:{" "}
          {disc.speed}, Glide: {disc.glide}, Turn: {disc.turn}, Fade:{" "}
          {disc.fade}
          <div className="discButtons">
            <button id={"editBtn_"+disc.id} className="button" onClick={() => props.changePage("bag", disc.id)}>Edit</button>
            <button id={"deleteBtn_"+disc.id} className="button" onClick={() => removeDisc(disc.id)}>Remove</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Bag;

import React from "react";

const Storage = (props) => {

  const drop = (id) => {
    if (props.dragOverItem.current.includes("bag")) {
        fetch(`/api/discs/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                bag_or_storage: "bag"
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
        props.getStorage();
    })
  }

  return (
    <div className="storage">
      {props.storage.map((disc, index) => (
        <div
          className="storageDisc"
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
            <button id={"editBtn_"+disc.id} className="button" onClick={() => props.changePage("storage", disc.id)}>Edit</button>
            <button id={"deleteBtn_"+disc.id} className="button" onClick={() => removeDisc(disc.id)}>Remove</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Storage;

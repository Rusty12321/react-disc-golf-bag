import React from "react";

const data =() => {
    let discs = [];
    fetch("https://discit-api.fly.dev/disc")
        .then(result => result.json())
        .then(data => {
            data.map((disc) => {
                discs.push({name: disc.name, brand: disc.brand})
            })
        })
    return discs;
}

export default data;
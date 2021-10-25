import React from "react";
import style from "./Image.module.css";
const image = (props) => (
  <div
    className={style.image}
    style={{
      backgroundImage: `url('${props.imageUrl}')`,
      backgroundSize: props.contain ? "contain" : "cover",
      backgroundPosition: props.left ? "left" : "center",
    }}
  />
);
export default image;

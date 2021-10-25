import React from "react";
import Button from "../../Button/Button_page";
import style from "./post.module.css";

const post = (props) => {
  console.log(props);
  return (
    <article className={style.post}>
      <header className={style.post__header}>
        <h3 className={style.post__meta}>Posted on {props.date}</h3>
        <h1 className={style.post__title}>{props.title}</h1>
      </header>
      <div className={style.post__actions}>
        <Button mode="flat" link={props.id}>
          View
        </Button>

        <Button
          mode="flat"
          onClick={() => {
            props.onStartEdit(props);
          }}
        >
          Edit
        </Button>
        <Button mode="flat" design="danger" onClick={props.onDelete}>
          Delete
        </Button>
      </div>
    </article>
  );
};

export default post;

import React from "react";
import style from "./Paginator.module.css";
const Paginator = (props) => {
  console.log("---" + props.currentPage);
  console.log("--pp-" + props.lastPage);
  return (
    <div className={style.paginator}>
      {props.children}
      <div className={style.paginator__controls}>
        {props.currentPage > 1 && (
          <button
            onClick={props.onPrevious}
            className={style.paginator__control}
          >
            Previous
          </button>
        )}
        {props.currentPage < props.lastPage && (
          <button onClick={props.onNext} className={style.paginator__control}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Paginator;

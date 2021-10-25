import React, { useEffect, useState } from "react";
import Image from "../Image/Image";
import style from "./SinglePostView.module.css";
import axios from "axios";
import Navbar from "../nav/nav";

const SinglePostView = (props) => {
  const [state, setState] = useState({
    title: "",
    author: "",
    date: "",
    image: "",
    content: "",
    productStatus: true,
  });
  useEffect(() => {
    const postId = props.match.params.postId;
    console.log(postId);

    const token = localStorage.getItem("token");

    axios({
      url: "https://productmanger.herokuapp.com/feed/post/" + postId,
      method: "get",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch status");
        }
        return res;
      })
      .then((res) => {
        console.log(res);
        let a = res.data.post.productImage.split("\\");
        let b = a.join("/");
        setState((prev) => ({
          ...prev,
          title: res.data.post.productName,
          author: res.data.post.creator,
          image: "https://productmanger.herokuapp.com/" + b,
          date: new Date(res.data.post.createdAt).toLocaleDateString("en-US"),
          content: res.data.post.productDescription,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Navbar productStatus={state.productStatus} />
      <section className={style.single_post}>
        <h1>{state.title}</h1>
        <h2>{state.author}</h2>
        <div className={style.single_post__image}>
          <Image contain imageUrl={state.image}></Image>
        </div>
        <p>{state.content}</p>
      </section>
    </>
  );
};

export default SinglePostView;

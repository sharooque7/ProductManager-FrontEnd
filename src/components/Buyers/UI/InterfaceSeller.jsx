import React, { useEffect, useContext, useState } from "react";
import Navbar from "../../nav/nav";
import Button from "../../Button/Button_General";
import style from "./InterfaceSeller.module.css";
import Modal from "../../Model/Model";
import { AuthContext } from "../../store/auth";

import axios from "axios";
import Paginator from "../../Buyers/Paginator/Paginator";
import Post from "../../Buyers/post/post";

const InterfaceSeller = () => {
  const [Edit, setisEdit] = useState(false);

  const {
    open,

    onhandleOpen,
    onhandleClose,

    setpostsLoading,
    postPage,
    setpostPage,
    post,
    setposts,
    totalPosts,
    settotalPosts,
    postsLoading,

    setEditState,
  } = useContext(AuthContext);
  let page = postPage;

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios({
      method: "get",
      url: "https://productmanger.herokuapp.com/feed/posts?page=" + page,
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch user status");
        }
        return res;
      })
      .then((resData) => {
        console.log(resData);
        let arr = resData.data.posts.map((post) => {
          let a = post.productImage.split("\\");
          let b = a.join("/");
          return {
            ...post,
            imagePath: b,
          };
        });
        console.log(arr);
        setposts(arr);
        settotalPosts(resData.data.totalItems);
        setpostsLoading(false);

        console.log(post, postsLoading, totalPosts);
      })
      .catch((err) => console.log(err));
  }, []);

  const loadProduct = (direction) => {
    const token = localStorage.getItem("token");

    console.log(post, postsLoading, totalPosts);
    if (direction === "next") {
      page++;
      setpostPage(page);
      setpostsLoading(true);
    }
    if (direction === "previous") {
      page--;
      setpostPage(page);
    }

    console.log("page---" + page);
    console.log("postPage---" + postPage);
    console.log("totalPosts---" + totalPosts);

    console.log("totalPosts---" + Math.ceil(totalPosts / 2));
    axios({
      method: "get",
      url: "http://localhost:4000/feed/posts?page=" + page,
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch posts");
        }
        return res;
      })
      .then((resData) => {
        let arr = resData.data.posts.map((post) => {
          let a = post.productImage.split("\\");
          let b = a.join("/");
          return {
            ...post,
            imagePath: b,
          };
        });
        setposts(arr);
        setpostsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const EditProduct = (post) => {
    console.log(post);
    onhandleOpen();
    setisEdit(true);
    console.log(post._id);
    setEditState((prev) => ({
      ...prev,
      title: post.productName,
      image: post.productImage.split("\\").join("/"),
      content: post.productDescription,
      price: post.price,
      id: post._id,
    }));
  };
  const deleteProduct = (id) => {
    const token = localStorage.getItem("token");
    console.log(id);
    setpostsLoading(true);
    axios({
      url: "http://localhost:4000/feed/post/" + id,
      method: "delete",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Deletin a post failed");
        }
        return res;
      })
      .then((res) => {
        console.log(res);
        const updatedPost = post.filter((post) => post._id !== id);
        setposts(updatedPost);
        setpostsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setpostsLoading(false);
      });

    console.log("Hi");
    loadProduct();
  };

  return (
    <>
      <Navbar />
      <section className={style.Post_button}>
        <Button
          color="secondary"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "secondary",
          }}
          handleStatus={onhandleOpen}
          label="Post your product"
        >
          Post Your Product
        </Button>
      </section>
      {open && (
        <Modal
          loadProduct={loadProduct}
          Edit={Edit}
          setisEdit={setisEdit}
          open={open}
          handleOpen={onhandleOpen}
          handleClose={onhandleClose}
        />
      )}
      <section className={style.Post_content}>
        {postsLoading && (
          <div>
            <p>Loading...</p>
          </div>
        )}
        {post.length <= 0 && !postsLoading ? <p>No Post found</p> : null}
        {!postsLoading && !Edit && (
          <Paginator
            onPrevious={() => {
              loadProduct("previous");
            }}
            onNext={() => {
              loadProduct("next");
            }}
            lastPage={Math.ceil(totalPosts / 2)}
            currentPage={postPage}
          >
            {post.map((post) => (
              <Post
                key={post._id}
                id={post._id}
                // author={post.email}
                date={new Date(post.createdAt).toLocaleDateString("en-US")}
                title={post.productName}
                image={post.productImage}
                price={post.price}
                content={post.productDescription}
                onStartEdit={() => {
                  EditProduct(post);
                }}
                onDelete={() => {
                  deleteProduct(post._id);
                }}
              />
            ))}
          </Paginator>
        )}
      </section>
    </>
  );
};

export default InterfaceSeller;

import React, { createContext, useState } from "react";
import { useHistory } from "react-router-dom";

export const AuthContext = createContext({
  //Model States
  open: false,
  handleOpen: () => {},
  handleClose: () => {},
  logoutHandler: () => {},

  //Genral Auth states
  token: "",
  userId: "",
  isAuth: "",

  //Fetch Product states
  productStatus: "",
  isEditing: false,
  totalPosts: 0,
  editPost: null,
  postPage: 1,
  postsLoading: false,
  editLoading: false,
  post: [],
  EditState: {
    title: "ggg",
    date: "",
    image: "",
    content: "",
    price: "",
    id: "",
  },
  isEdit: false,
});

// const [state,setState] = useState({
//   toke:'',
//   status:'',
//   userId:'',
//   isauth:"",
//   open:'',
// })

// setState(prev=>({...prev,token:'token'})

export const Auth = (props) => {
  let history = useHistory();
  const [token, setToken] = useState("");
  const [userId, setuserId] = useState("");
  const [isauth, setisAuth] = useState(false);
  const [open, setOpen] = useState(false);

  //Fetch States
  const [productStatus, setproductStatus] = useState("");
  const [isEditing, setisEditing] = useState(false);
  const [totalPosts, settotalPosts] = useState(0);
  const [post, setposts] = useState([]);
  const [editPost, seteditPost] = useState(null);
  const [postPage, setpostPage] = useState(1);
  const [postsLoading, setpostsLoading] = useState(true);
  const [editLoading, seteditLoading] = useState(false);
  const [EditState, setEditState] = useState({
    title: "",
    date: "",
    image: "",
    content: "",
    price: "",
    id: "",
  });
  const [isEdit, setisEdit] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
    history.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        userId,
        setuserId,
        isauth,
        setisAuth,
        productStatus,
        setproductStatus,
        postPage,
        setpostPage,
        post,
        setposts,
        editPost,
        seteditPost,
        isEditing,
        setisEditing,
        totalPosts,
        settotalPosts,
        postsLoading,
        setpostsLoading,
        editLoading,
        seteditLoading,
        open,
        setOpen,
        onhandleOpen: handleOpen,
        onhandleClose: handleClose,
        logoutHandler,
        EditState,
        setEditState,
        isEdit,
        setisEdit,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

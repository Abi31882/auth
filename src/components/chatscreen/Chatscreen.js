import React, { useState, useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import {
  BsTelephone,
  BsFillCameraVideoFill,
  BsSearch,
  BsCheck2All,
  BsMic,
} from "react-icons/bs";
import { MdAttachFile } from "react-icons/md";
import "./chatscreen.css";
import profile from "../../assets/bgimg.svg";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { auth, db } from "../../Services/firebase";
import { App } from "../videocall/video";

const Chatscreen = () => {
  // const [users, setUsers] = useState([])

  // const [message, setMessage] = useState("")

  // const user1 = auth.currentUser.uid
  // console.log("user1",user1);

  // const uid = useParams();
  // console.log("userid",uid);

  // const location = useLocation();
  // // console.log(location.state.from.name);

  // const {from} = location.state
  // // console.log(from.name)

  // const navigate = useNavigate();
  // const today = new Date();

  // const [input, setInput] = useState("");

  // const sendMessage = (e) =>{
  //   e.preventDefault();
  //   setInput("");
  // }

  // const handleSubmit = async e =>{
  //   e.preventDefault();

  //   const user2 = uid;
  //   const id = user1>user2 ? `$(user1+user2)` : `$(user2+user1)`;
  //   await addDoc(collection(db,'messages',id,'chats'),{
  //     message,
  //     from: user1,
  //     to: user2,
  //     createdAt: Timestamp.fromDate(new Date())
  //   })
  //   setMessage("")

  // }

  return (
    <div className="chatscreen_container">
      <div className="chatscreen_topbar">
        <div className="chatscreen_back-btn chatscreen_btns">
          <BiArrowBack
            onClick={() => {
              // navigate('/chatlist')
            }}
          />
        </div>

        <div className="chatscreen_photo_name">
          <img src={profile} alt="" />
          {/* <p>{from.name}</p>*/}
        </div>

        <div className="chatscreen_call-btns">
          <div className="chatscreen_btns">
            <BsTelephone />
          </div>

          <Link to={"/video"} className="chatscreen_btns">
            <BsFillCameraVideoFill />
          </Link>
          <div className="chatscreen_p chatscreen_btns">
            <p>Tele</p>
          </div>
        </div>

        <div className="chatscreen_searchbar">
          <input type="search" name="" placeholder="Search" id="" />
          <BsSearch />
        </div>
      </div>
      <div className="chatscreen_chats">
        <div className="chatscreen_recieved_msg">
          <p>Recieved Msg</p>
          <span> time </span>
        </div>
        <div className="chatscreen_sent_msg">
          <p>message</p>
          <span> time </span>
          <BsCheck2All />
        </div>
      </div>
      <div className="chat_input">
        <div className="chat_input-msg">
          <input type="text" name="" placeholder="Your Message here!" id="" />
          <button hidden>Send msg</button>
          <MdAttachFile />
        </div>
        <div className="chat_mic">
          <BsMic />
        </div>
      </div>
    </div>
  );
};

export default Chatscreen;

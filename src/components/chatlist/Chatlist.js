import React, { useState, useContext, useEffect } from "react";
import "./chatlist.css";
import { BsSearch } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import Chat from "../../containers/chats/Chat";
import profImg from "../../assets/bgimg.svg";
import { auth, db } from "../../Services/firebase";
import { signOut } from "firebase/auth";
import {
  updateDoc,
  doc,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/Auth";

const Chatlist = ({ navigation }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const usersRef = collection(db, "users");

    const q = query(usersRef, where("uid", "not-in", [auth.currentUser.uid]));
    const unsub = onSnapshot(q, (querySnapshot) => {
      const allUsers = [];
      querySnapshot.forEach((doc) => {
        allUsers.push(doc.data());
      });
      setUsers(allUsers);
      // console.log(users);
    });

    return () => {
      unsub();
    };
  }, []);
  //    console.log(users)

  const { user } = useContext(AuthContext);
  console.log(user);

  const navigate = useNavigate();

  const handleSignout = async () => {
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      isOnline: false,
    });
    await signOut(auth);
    navigate("/login");
  };

  // const selectUser = (user) =>{
  //     navigate(`/chatscreen/${user.uid}`)
  //     // navigate("/chatscreen",{state:{user}})

  // }

  return (
    <div className="chatlist_container">
      <div className="chatlist_container-topbar">
        <div className="chatlist_img">
          <img src={profImg} alt="" />
        </div>
        <div className="chatlist_chats-calls">
          <div className="chats-calls">
            <p>Chats</p>
          </div>
          <div className="chats-calls">
            <p>Calls</p>
          </div>
        </div>

        {user ? (
          <div
            className="chats-calls chatlist_chats-calls"
            onClick={handleSignout}
          >
            <BiLogOut />
          </div>
        ) : (
          <p></p>
        )}

        <div className="chatlist_search">
          <input type="search" name="" placeholder="Search" id="" />
          <BsSearch />
        </div>
      </div>
      <div className="chatlist-names_container">
        {users.map((user) => (
          <Chat key={user.uid} user={user} />
        ))}
      </div>
      <div className="chatlist_chats-calls-mobile">
        <div className="chats-calls-mobile">
          <p>Chats</p>
        </div>
        <div className="chats-calls-mobile">
          <p>Calls</p>
        </div>
        {user ? (
          <div className="chats-calls-mobile" onClick={handleSignout}>
            <BiLogOut />
          </div>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default Chatlist;

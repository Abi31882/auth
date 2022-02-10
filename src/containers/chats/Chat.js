import React from 'react';
import { BsCheck2All} from "react-icons/bs";
import "./chat.css"
import profile from "../../assets/bgimg.svg"
import { HiStatusOnline } from "react-icons/hi";
import { Link } from 'react-router-dom';

const Chat = ({user}) => {

  return (
      <div className="chat_container" >
        <div className="user_img-name-msg">
            <img src={profile} alt="s" />
            <div className="user_name-msg">
            <div className="user_name">

            <Link to={`/chatscreen/${user.uid}`} state={{from:user}} className='link'  >
                <p>{user.name}</p>
                </Link>
            </div>
            <div className="msg">
                <span></span>
            </div>
        </div>
        </div>

        

        <div className="msg_time-ticks">
            <div className="msg_time">
                <p></p>
            </div>
            <div className="msg_ticks">
            {
                user.isOnline ? <HiStatusOnline /> : <p></p>
            }
                <BsCheck2All/>
            </div>
            <div className={`status ${
                user.isOnline ? "online" : "offline"
            }`}>
                
            </div>
        </div>
      </div>
  )
};

export default Chat;

import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/Auth";
// import Agora from "agora-access-token";
import {
  AgoraVideoPlayer,
  createClient,
  createMicrophoneAndCameraTracks,
} from "agora-rtc-react";
import { BiArrowBack } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
// import { RtcTokenBuilder, RtcRole } from "agora-access-token";
import "./video.css";
const config = {
  mode: "rtc",
  codec: "vp8",
};

const appId = "591354bb82c3409b8138dea658429bf6"; //ENTER APP ID HERE
const appCertificate = "8f01b293add14ea8b3e7363752f56003";
// const role = Agora.RtmRole.Rtm_User;

// const token = Agora.RtmTokenBuilder.buildToken(appId, appCertificate, user, role, privilegeExpiredTs);
const useClient = createClient(config);
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

export const Video = () => {
  const [inCall, setInCall] = useState(false);
  const [channelName, setChannelName] = useState("");

  return (
    <div>
      {/* <Link onClick={Controls} to={"/chatlist"}>
        <BiArrowBack />
      </Link> */}
      <h1 className="heading">Agora RTC NG SDK React Wrapper</h1>
      {inCall ? (
        <VideoCall setInCall={setInCall} channelName={channelName} />
      ) : (
        <ChannelForm setInCall={setInCall} setChannelName={setChannelName} />
      )}
    </div>
  );
};

const VideoCall = (props) => {
  const { user } = useContext(AuthContext);
  const { setInCall, channelName } = props;
  const [users, setUsers] = useState([]);
  const [start, setStart] = useState(false);
  const client = useClient();
  // const generateAccessToken = () => {
  //   const channelName = "hell";
  //   const uid = user.uid;
  //   // let role = RtcRole.SUBSCRIBER;
  //   let expireTime = 3600;
  //   const currentTime = Math.floor(Date.now() / 1000);
  //   const privilegeExpiredTs = currentTime + expireTime;

  //   return RtcTokenBuilder.buildTokenWithUid(
  //     appId,
  //     appCertificate,
  //     channelName,
  //     uid,
  //     role,
  //     privilegeExpiredTs
  //   );
  // };
  const { ready, tracks } = useMicrophoneAndCameraTracks();
  // const token = Agora.RtcTokenBuilder.buildTokenWithUid(
  //   appId,
  //   appCertificate,
  //   channelName,
  //   uid,
  //   role,
  //   privilegeExpiredTs
  // );
  console.log(user);
  const token =
    "006591354bb82c3409b8138dea658429bf6IAAQgEROmB+NLdf1LIktjvcvKj8UU/CMkoP6onCZebWtneMAhhwAAAAAEADL5xHfVd8FYgEAAQBU3wVi";

  useEffect(() => {
    // function to initialise the SDK
    let init = async (name) => {
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        console.log("subscribe success");
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return [...prevUsers, user];
          });
        }
        if (mediaType === "audio") {
          user.audioTrack?.play();
        }
      });

      client.on("user-unpublished", (user, type) => {
        console.log("unpublished", user, type);
        if (type === "audio") {
          user.audioTrack?.stop();
        }
        if (type === "video") {
          setUsers((prevUsers) => {
            return prevUsers.filter((User) => User.uid !== user.uid);
          });
        }
      });

      client.on("user-left", (user) => {
        console.log("leaving", user);
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });

      await client.join(appId, name, token, null);
      if (tracks) await client.publish([tracks[0], tracks[1]]);
      setStart(true);
    };

    if (ready && tracks) {
      console.log("init ready");
      init(channelName);
    }
  }, [channelName, client, ready, tracks]);

  return (
    <div className="Video">
      {ready && tracks && (
        <Controls tracks={tracks} setStart={setStart} setInCall={setInCall} />
      )}
      {start && tracks && <Videos users={users} tracks={tracks} />}
    </div>
  );
};

const Videos = (props) => {
  const { users, tracks } = props;

  return (
    <div>
      <div id="videos">
        <AgoraVideoPlayer className="vid" videoTrack={tracks[1]} />
        {users.length > 0 &&
          users.map((user) => {
            if (user.videoTrack) {
              return (
                <AgoraVideoPlayer
                  className="vid"
                  videoTrack={user.videoTrack}
                  key={user.uid}
                />
              );
            } else return null;
          })}
      </div>
    </div>
  );
};

export const Controls = (props) => {
  const navigate = useNavigate();
  const client = useClient();
  const { tracks, setStart, setInCall } = props;
  const [trackState, setTrackState] = useState({ video: true, audio: true });

  const mute = async (type) => {
    if (type === "audio") {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === "video") {
      await tracks[1].setEnabled(!trackState.video);
      setTrackState((ps) => {
        return { ...ps, video: !ps.video };
      });
    }
  };

  const leaveChannel = async () => {
    await client.leave();
    client.removeAllListeners();
    tracks[0].close();
    tracks[1].close();
    setStart(false);
    setInCall(false);
  };

  return (
    <div className="controls">
      <p className={trackState.audio ? "on" : ""} onClick={() => mute("audio")}>
        {trackState.audio ? "MuteAudio" : "UnmuteAudio"}
      </p>
      <p className={trackState.video ? "on" : ""} onClick={() => mute("video")}>
        {trackState.video ? "MuteVideo" : "UnmuteVideo"}
      </p>
      {<p onClick={() => leaveChannel()}>Leave</p>}

      {
        <p
          onClick={() => {
            new Promise((res, rej) => {
              res(leaveChannel());
            }).then((r) => {
              navigate("/chatlist");
            });
          }}
        >
          Go Back
        </p>
      }
    </div>
  );
};

const ChannelForm = (props) => {
  const { setInCall, setChannelName } = props;

  return (
    <form className="join">
      {appId === "" && (
        <p style={{ color: "red" }}>
          Please enter your Agora Video ID in Video.tsx and refresh the page
        </p>
      )}
      <input
        type="text"
        placeholder="Enter Channel Name"
        onChange={(e) => setChannelName(e.target.value)}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          setInCall(true);
        }}
      >
        Join
      </button>
    </form>
  );
};

export default Video;

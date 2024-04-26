/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useUserContext } from "../../hooks/useUserContext";
import { toast } from "react-hot-toast";
import MessageInput from "./MessageInput";

const MyChatCom = () => {
  const location = useLocation();
  const data = new URLSearchParams(location.search).get("with");
  const friend = JSON.parse(data);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const user = useUserContext().user;


  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:8080/chat/" + friend.id);
        const data = await res.json();

        if (data.error) {
          throw new Error(data.error);
        }
        setMessages(data);
        console.log("message", data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, [user._id, friend.id]);
  return (
    <>
      <div className="m-auto py-10 relative h-3/4 sm:w-3/5 items-center ">
        <div className="bg-slate-500 sm:rounded-lg px-4 py-2 mb-2 ">
          <span className="label-text">To:</span>{" "}
          <span className="text-gray-900 font-bold">{friend?.name}</span>
        </div>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : messages.length === 0 ? (
          <div className="text-center">No messages found</div>
        ) : (
          messages.map((message, index) => (
            <div key={index} className="chat">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src={friend.picture}
                  />
                </div>
              </div>
              <div
                className={`chat-bubble text-white ${
                  message.senderId._id === user._id ? "bg-blue-500" : ""
                } pb-2`}
              >
                {message.message}
              </div>
              <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
                {message.createdAt}
              </div>
            </div>
          ))
        )}
        <MessageInput prop={friend} />
      </div>
    </>
  );
};

export default MyChatCom;

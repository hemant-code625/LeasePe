import { useEffect, useState } from "react";
import { useSocketContext } from "../context/SocketContext.jsx"

const useListenRequest = () => {
    const [messages, setMessages] = useState([]);
    const {socket} = useSocketContext();

    useEffect(() => {
        socket?.on("getMessages", (message) => {
            setMessages(message);
        })
    },[socket,messages,setMessages])


    return {messages}
}

export default useListenRequest

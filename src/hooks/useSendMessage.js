import { useEffect, useState } from "react";
import {useSocketContext} from  "../context/SocketContext.jsx"

const useListenRequest = () => {
    const [sendMessage,setSendMessage ] = useState([]);
    const {socket} = useSocketContext();

    useEffect(() => {
        socket?.on("sendMessage", (requests) => {
            setSendMessage(requests);
        })
    },[socket,sendMessage,setSendMessage])


    return {sendMessage}
}

export default useListenRequest

import { useEffect, useState } from "react";
import { useSocketContext } from "../../context/SocketContext"

const useListenRequest = () => {
    const [requests, setRequests] = useState([]);
    const {socket} = useSocketContext();

    useEffect(() => {
        socket?.on("getRequests", (requests) => {
            setRequests(requests);
        })
    },[socket,requests,setRequests])


    return {requests}
}

export default useListenRequest

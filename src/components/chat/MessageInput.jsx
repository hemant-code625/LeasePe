/* eslint-disable react/prop-types */
import {  useState } from "react";
import { BsSend } from "react-icons/bs";
// import useSendMessage from "../../hooks/useSendMessage.js";
import { useUserContext } from "../../hooks/useUserContext.js";

const MessageInput = ({prop}) => {
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const friend = prop;
	const user = useUserContext().user;
	
	const sendMessage = async () => {
		setLoading(true);
		const res = await fetch("http://localhost:8080/chat", {
            method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message }),
        });
		const data = await res.json();
		console.log("message sent sucessfully",data)
		if (data.error) {
			throw new Error("Error in sending Message from MessageInput.jsx: ",data.error);
		}
		setLoading(false);
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!message) return;
		await sendMessage(message,user._id,friend.id);
		setMessage("");
	};

	return (
		<form className='absolute bottom-0  w-full px-4 my-3' onSubmit={handleSubmit}>
			<div className='relative'>
				<input
					type='text'
					className='border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white'
					placeholder='Send a message'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
					{loading ? <div className='loading loading-spinner'></div> : <BsSend />}
				</button>
			</div>
		</form>
	);
};
export default MessageInput;
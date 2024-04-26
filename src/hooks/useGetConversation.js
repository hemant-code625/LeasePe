import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useUserContext } from "./useUserContext";

const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);
	const user = useUserContext().user;
	const friendId = useUserContext().friendId;
	useEffect(() => {
		const getConversations = async (friendId) => {
			setLoading(true);
			try {
				const res = await fetch("http://localhost:8080/chat",{
					body: JSON.stringify({
						yourId: user._id,
						friendId,
					}),
				});
				const data = await res.json();
				if (data.error) {
					throw new Error(data.error);
				}
				setConversations(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getConversations(friendId);
	}, [ friendId, user._id]);

	return { loading, conversations };
};
export default useGetConversations;
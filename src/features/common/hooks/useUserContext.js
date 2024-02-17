import { useContext } from "react"
import { UserContext } from "../context"

export const useUserContext = () => {
    const userObject = useContext(UserContext);
    if(!userObject) {
        throw new Error('useUserContext must be used within a UserProvider')
    }
    
    return userObject;
}
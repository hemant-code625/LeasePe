import { useUserContext } from "./hooks/useUserContext";

const Profile = () => {
  const userObj = useUserContext();
  const user = userObj.user;
  console.log("user in profile: ", userObj.user);

  // we need to wrap UserContext.Provider around the App.jsx so that the user object is available to all the components
  
  return (
    <div>
      <h3> Welcome {user.name}</h3>
    </div>
  )
}

export default Profile

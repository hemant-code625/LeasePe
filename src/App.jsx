import Home from './pages/Home.jsx'
import {BrowserRouter as Router, Routes , Route} from 'react-router-dom'

import './index.css'

import PageNotFound from './pages/PageNotFound.jsx';
import AboutUsPage from './pages/AboutUsPage.jsx';
import ZonePage from './pages/ZonePage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import { useEffect, useState } from 'react';
import { UserContext } from './features/context/context.js';
import { SocketContextProvider } from './features/context/SocketContext.jsx';
import useGetRequest from './features/common/hooks/useGetRequest.js';
function App() {

  const [user, setUser] = useState(null);
  const requests = useGetRequest({ proximity: 100});       // proximity set to 100 m for now
  const handleLogin = () => {
    try {
      window.location.href = `${
        import.meta.env.VITE_REACT_APP_API_HOST
      }/auth/google`;
    } catch (error) {
      console.error("Error during redirect:", error);
    }
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_REACT_APP_API_HOST}/getUser`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
    {
      user ? <UserContext.Provider value={{user}}> 
      <SocketContextProvider requests={requests}> 
      <Router>
        <Routes>
          <Route path='/' element={< > <Home /> </> } /> 
          <Route path='/about-us' element={< > <AboutUsPage/> </> } /> 
          <Route path='/zone' element={< > <ZonePage/> </> } /> 
          <Route path='/profile' element={< > <ProfilePage /> </> } /> 
          <Route path='*' element={ <PageNotFound/> } />
        </Routes>
      </Router>
      </SocketContextProvider>
      </UserContext.Provider> : 
      <div className='flex flex-row items-center justify-center h-screen'> 
         <div className="flex flex-col my-4 justify-centre items-center">
            <button
              className="relative py-2 px-8 text-black text-base font-bold nded-full overflow-hidden bg-white rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-900 before:to-blue-600 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
              onClick={handleLogin}
            >
              Login with Google
            </button>
          </div>
      </div>

    }
    </>
  )
}

export default App

/* eslint-disable react/no-unknown-property */

// 1.test api 2.add reduxToolkit  3. add chat 4. notification 5. feedback 6. admin (can see all req and status) 7. error

import { useEffect, useState } from "react";
import Footer from "../features/common/Footer";
import Navbar from "../features/common/Navbar";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
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
      <Navbar />
      <div>
        <div className=" flex align-top justify-center h-fit">
          <h1 className="font-bold text-3xl font-mono whitespace-nowrap mt-16">
            Welcome to LeasePe
          </h1>
        </div>
        <p className="whitespace no wrap  flex align-middle justify-center">
          A platform to effectively lease out stuff near you{" "}
        </p>
        <div className="flex align-middle justify-center mt-20">
          <h3>
            NOTE: We are not responsible for the good and services shared over
            this platform. Use on your own discretion.
          </h3>
        </div>
      </div>
      {user ? (
        <div className="flex align-middle my-16 justify-center cursor-pointer ">
          <div className="w-full h-40 flex items-center justify-center cursor-pointer">
            <div className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold shadow text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 dark:bg-gray-700 dark:text-white dark:hover:text-gray-200 dark:shadow-none group">
              <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full"></span>
              <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  fill="none"
                  className="w-5 h-5 text-green-400"
                >
                  <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="2"></path>
                </svg>
              </span>
              <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  fill="none"
                  className="w-5 h-5 text-green-400"
                >
                  <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="2"></path>
                </svg>
              </span>
              <span
                className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white dark:group-hover:text-gray-200"
                onClick={() => navigate("/zone")}
              >
                Get started
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div id="login">
          <div className="flex flex-col my-4 justify-centre items-center">
            <button
              className="relative py-2 px-8 text-black text-base font-bold nded-full overflow-hidden bg-white rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-900 before:to-blue-600 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
              onClick={handleLogin}
            >
              Login with Google
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default Home;

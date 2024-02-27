/* eslint-disable react/no-unknown-property */

// 1.test api 2.add React Context API  3. add chat 4. notification 5. feedback 6. admin (can see all req and status) 7. error

import Footer from "../features/common/Footer";
import Navbar from "../features/common/Navbar";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../features/common/hooks/useUserContext";


function Home() {
  const navigate = useNavigate();
  const user = useUserContext().user;

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
      {user ?
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
        </div> : null
      }
      <Footer />
    </>
  );
}

export default Home;

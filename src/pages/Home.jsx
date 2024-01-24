import Footer from "../features/common/Footer"
import Navbar from "../features/common/Navbar"

function Home() {

  return (
    <>
     <Navbar/>
     <div>
     <div className=" flex align-top justify-center h-fit">
        <h1 className="font-bold text-3xl font-mono whitespace-nowrap mt-16">Welcome to LeasePe</h1>
      </div>
      <p className="whitespace-nowrap  flex align-middle justify-center">A platform to effectively lease out stuff near you </p>
      
     </div>
  
      <Footer />
      
     </>
  )
}

export default Home

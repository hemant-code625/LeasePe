import Home from './pages/Home.jsx'
import {BrowserRouter as Router, Routes , Route} from 'react-router-dom'

import './index.css'

import { GoogleOAuthProvider } from '@react-oauth/google';
import PageNotFound from './pages/PageNotFound.jsx';
import AboutUsPage from './pages/AboutUsPage.jsx';
import ZonePage from './pages/ZonePage.jsx';



const VITE_GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function App() {
  return (
    <>
    
    <GoogleOAuthProvider clientId={`${VITE_GOOGLE_CLIENT_ID}`}>
      <Router>
        <Routes>
          <Route path='/' element={< > <Home/> </> } /> 
          <Route path='/about-us' element={< > <AboutUsPage/> </> } /> 
          <Route path='/zone' element={< > <ZonePage/> </> } /> 
          <Route path='*' element={ <PageNotFound/> } />
        </Routes>
      </Router>
      </GoogleOAuthProvider>

    </>
  )
}

export default App

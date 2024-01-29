import Home from './pages/Home.jsx'
import {BrowserRouter as Router, Routes , Route} from 'react-router-dom'

import './index.css'

import PageNotFound from './pages/PageNotFound.jsx';
import AboutUsPage from './pages/AboutUsPage.jsx';
import ZonePage from './pages/ZonePage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={< > <Home /> </> } /> 
          <Route path='/about-us' element={< > <AboutUsPage/> </> } /> 
          <Route path='/zone' element={< > <ZonePage/> </> } /> 
          <Route path='/profile' element={< > <ProfilePage /> </> } /> 
          <Route path='*' element={ <PageNotFound/> } />
        </Routes>
      </Router>

    </>
  )
}

export default App

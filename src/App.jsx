// Import stylesheet - Temporary sheet used yet !!!!!!!!
import "./App.css"
// Import Node modules
import { useState } from "react"
// Import functions
import postUser from "./api/postUser.js"
// Import components
import Navbar from "./components/Navbar.jsx"
import LandingPage from "./components/LandingPage.jsx"
import SignupModal from "./components/SignupModal.jsx"
import LoginModal from "./components/LoginModal.jsx"
import ImageGrid from "./components/ImageGrid.jsx"
import UserArea from "./components/UserArea.jsx"
import { useEffect } from "react"

// Set backend IP here
export const backendApi = "http://3.124.138.66"
// Backend API's endpoints
const signupEndpoint = "/api/signup"
const loginEndpoint = "/api/login"
const uploadEndpoint = "/api/artwork"

function App() {

  // ! STATES
  // Search input states
  const [searchVal, setSearchVal] = useState("")
  // Login state for conditional rendering
  const [isSignup, setIsSignup] = useState(false)
  // Signup state for conditional rendering
  const [isLogin, setIsLogin] = useState(false)
  // User logged in state
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  // NAV Items' states
  const [isHome, setIsHome] = useState(true)
  const [isCollections, setIsCollections] = useState(false)
  const [isMyGallery, setIsMyGallery] = useState(false)

useEffect( ()=> {
  console.log(isMyGallery)
}, [isMyGallery])

  // ! UTIL FUNCTIONS
  // Search handler
  const onSearch = (search) => {
    setSearchVal(search)
    window.scrollTo(0, window.innerHeight)
  }


  // ! Backend IP: backendApi
  // Signup handler
  const signupHandler = async (email, password, endpoint) => {
    const response = await postUser(email, password, endpoint) // ! 415-ös válasz jön vissza
    if (response.status === 200) {
      alert("You are successfully signed up. Please log in page.")
      setIsSignup(false)
    }
    // if (responseStatus === 409) { alert("This e-mail address is already registered to our system.") }
  }

  // Login handler
  const loginHandler = async (email, password, endpoint) => {
    const response = await postUser(email, password, endpoint)
    if (response.status === 200) {
      alert("Welcome back!")
      console.log(response.status)
      console.log(response.accessToken)
      localStorage.setItem("accessToken", response.accessToken)
      console.log(localStorage)
      setIsLoggedIn(true)
      setIsLogin(false)
    } // * Ez a rész működik
    if (response.status === 403) { alert("Wrong e-mail or password.") }
  } // ! Ez a rész nem működik. Az error lehet, hogy a catch ágba fut



  return (
    <div className="App">

      <Navbar
        onSignup={setIsSignup}
        onLogin={setIsLogin}
        onLoggedIn={isLoggedIn}
        onLogout={setIsLoggedIn}
        onSearch={onSearch}

        onHome={setIsHome}
        onCollection={setIsCollections}
        onMyGallery={setIsMyGallery}
      />

      <main>
        <div id="background">
          <div id="mainframe">

            {isHome &&
              <>
                <LandingPage />
                <ImageGrid
                  searchVal={searchVal}
                  isMyGallery={isMyGallery}
                />
              </>
            }

            {isCollections &&
              <>
                <LandingPage />
                <ImageGrid
                  searchVal={searchVal}
                  isMyGallery={isMyGallery}
                />
              </>
            }

            {(isLoggedIn && isMyGallery) &&
              <UserArea
              uploadEndpoint={uploadEndpoint}
              />}
          </div>

          {isSignup &&
            <SignupModal
              endpoint={signupEndpoint}
              onSignup={signupHandler}
              onClose={setIsSignup}
            />}
          {isLogin &&
            <LoginModal
              endpoint={loginEndpoint}
              onLogin={loginHandler}
              onClose={setIsLogin}
            />}

        </div>
      </main >

    </div >
  )
}

export default App

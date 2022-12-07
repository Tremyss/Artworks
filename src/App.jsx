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

// Set backend IP here
export const backendApi = "http://3.66.103.135:80"
// Backend API's endpoints
const signupEndpoint = "/api/signup"
const loginEndpoint = "/api/login"

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



  // ! UTIL FUNCTIONS
  // Search handler
  const onSearch = (search) => {
    setSearchVal(search)
    window.scrollTo(0, window.innerHeight)
  }


  // ! Backend IP: backendApi
  // Signup handler
  const signupHandler = async (email, password, endpoint) => {
    const response = await postUser(email, password, endpoint)
    if (response.status === 200) {
      alert("You are successfully signed up. Please log in page.")
      setIsSignup(false)
    }
    if (responseStatus === 409) { alert("This e-mail address is already registered to our system.") }
  }

  // Login handler
  const loginHandler = async (email, password, endpoint) => {
    const response = await postUser(email, password, endpoint)
    if (response.status === 200) {
      alert("Welcome back!")
      // localStorage.setItem("accessToken", "response.accessToken")
      setIsLoggedIn(true)
    }
    if (responseStatus === 401) { alert("Wrong e-mail or password.") }
  }



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
                />
              </>
            }

            {isCollections &&
              <>
                <LandingPage />
                <ImageGrid
                  searchVal={searchVal}
                />
              </>
            }

            {/* 
            {!isLoggedIn &&
              <ImageGrid
                searchVal={searchVal}
              />} */}


            {(isLoggedIn && isMyGallery) &&
              <UserArea
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

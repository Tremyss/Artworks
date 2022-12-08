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
const usersDataEndpoint = "/api/artwork"

function App() {

  // ! STATES
  // Search input states
  const [searchVal, setSearchVal] = useState("")
  // Login state for conditional rendering
  const [isSignup, setIsSignup] = useState(false)
  // Signup state for conditional rendering
  const [isLogin, setIsLogin] = useState(false)
  const [signUpMessage, setSignUpMessage] = useState("")
  // User logged in state
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  // NAV Items' states
  const [isHome, setIsHome] = useState(true)
  const [isCollections, setIsCollections] = useState(false)
  const [isMyGallery, setIsMyGallery] = useState(false)  // ! *****






// const loadUsersData = async () => {
//   const accessToken = localStorage.getItem("accessToken")
//   console.log(accessToken)
//   const url = backendApi + usersDataEndpoint
//   const responseJson = await fetch (url, {
//     method: "GET",
//     headers: {
//       "Authorization": `Bearer ${accessToken}`
//     }
//   })
//   const responseObject = await responseJson.json()
//   console.log(responseJson)
//   console.log(responseObject)
// }


// useEffect ( () => {
//   loadUsersData()
// }, [isLoggedIn])



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
      setSignUpMessage("Sign up successfull. Please log in.")
    }
    if (response.status === 409) setSignUpMessage("E-mail address already exists.")
  }

  // Login handler
  const loginHandler = async (email, password, endpoint) => {
    const response = await postUser(email, password, endpoint)
    if (response.status === 200) {
      const responseObject = await response.json()
      localStorage.setItem("accessToken", responseObject.accessToken)
      setIsLoggedIn(true)
      setIsLogin(false)
      setIsHome(false)
      setIsCollections(false)
      setIsMyGallery(true)
    }
    if (response.status === 403) { alert("Wrong e-mail or password.") }
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
              signUpMessage={signUpMessage}
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

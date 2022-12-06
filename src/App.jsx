// Import stylesheet - Temporary sheet used yet !!!!!!!!
import "./App.css"
// Import Node modules
import { useEffect, useState } from "react"
import { saveAs } from "file-saver"
// Import functions
import getData from "./api/getData.js"
import postUser from "./api/postUser.js"
// Import components
import ImageCard from "./components/ImageCard.jsx"
import Navbar from "./components/Navbar.jsx"
import ImageDetails from "./components/ImageDetails.jsx"
import LandingPage from "./components/LandingPage.jsx"
import SignupModal from "./components/SignupModal.jsx"
import LoginModal from "./components/LoginModal.jsx"
import Pager from "./components/Pager.jsx"

// Set backend IP here
export const backendApi = "http://3.66.103.135:80"
// Backend API's endpoints
const signupEndpoint = "/api/signup"
const loginEndpoint = "/api/login"

function App() {

  // ! STATES
  // App state
  const [images, setImages] = useState([])
  // Search input states
  const [searchVal, setSearchVal] = useState("")
  // ImageDetails - Single Image Card state
  const [selectedImageId, setSelectedImageId] = useState(null)
  // Pager states
  const [page, setPage] = useState(1)
  const [totalPageCount, setTotalPageCount] = useState(null)
  // Login state for conditional rendering
  const [isSignup, setIsSignup] = useState(false)
  // Signup state for conditional rendering
  const [isLogin, setIsLogin] = useState(false)
  // User logged in state
  const [isLoggedIn, setIsLoggedIn] = useState(false)


  // ! START: On Window Load - set App state
  const loadData = async () => {
    const [images, totalPage] = await getData(searchVal, page)
    setImages(images)
    setTotalPageCount(totalPage)
  }

  useEffect(() => {
    loadData()
  }, [searchVal, page])


  // ! UTIL FUNCTIONS
  // Search handler
  const onSearch = (search) => {
    setSearchVal(search)
    setImages([])
    setPage(1)
    window.scrollTo(0, window.innerHeight)
  }

  // Grid page handler
  const onPageChange = (newPage) => {
    setPage(newPage)
  }

  // Show more handler: Select image to render more details
  const selectedImage = images.find(img => img.id === selectedImageId)

  // Download handler
  const downloadImage = (imgId) => {
    console.log(imgId)
    saveAs(`https://www.artic.edu/iiif/2/${imgId}/full/843,/0/default.jpg`, `${imgId}.jpg`)
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
      />

      <main>
        <div id="background">

          <div id="mainframe">
            {!isLoggedIn &&
              <LandingPage />
            }

            {!isLoggedIn &&
              <div id="image-grid">
                {images.length === 0 ?
                  <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div> :
                  images.map(image => (
                    <ImageCard
                      key={image.id}
                      image={image}
                      onDownloadImage={imgId => downloadImage(imgId)}
                      onShowDetails={id => setSelectedImageId(id)}
                    />
                  ))}
                <Pager
                  page={page}
                  totalPageCount={totalPageCount}
                  onPageChange={onPageChange}
                />
              </div>
            }


            {isLoggedIn &&
              <div>
                <h1>
                  Hey, this is user page
                </h1>
              </div>
            }

          </div>


          {selectedImageId !== null &&
            <ImageDetails
              selectedImage={selectedImage}
              onDownloadImage={imgId => downloadImage(imgId)}
              onClose={() => setSelectedImageId(null)} />}
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
      </main>

    </div>
  )
}

export default App

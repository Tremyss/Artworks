// Import stylesheet - Temporary sheet used yet !!!!!!!!
import "./App.css"
// Import Node modules
import { useEffect, useState } from "react"
import { saveAs } from "file-saver"
// Import functions
import getData from "./api/GetData.js"
// Import components
import ImageCard from "./components/ImageCard.jsx"
import Navbar from "./components/Navbar.jsx"
import ImageDetails from "./components/ImageDetails.jsx"
import LandingPage from "./components/LandingPage.jsx"
import SignupModal from "./components/SignupModal.jsx"
import LoginModal from "./components/LoginModal.jsx"
import Pager from "./components/Pager.jsx"

// Set backend IP here
const backendApi = "http://3.66.103.135:80"
// Backend API's endpoints
export const signupEndpoint = "/api/signup"
export const loginEndpoint = "/api/login"

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
  // * Signup handler + api request: /api/signup Body (JSON): { "email": "useremail@example.com", "password": "userpassword" }
  const signupHandler = async (email, password, endpoint) => {
    const bodyOject = { email, password }
    const url = backendApi + endpoint
    console.log(url) // eddig jó
    console.log(bodyOject) // eddig jó
    console.log(JSON.stringify(bodyOject)) // eddig jó
    try {
      const response = await fetch(url, { method: "POST", body: JSON.stringify(bodyOject) })
      if (response.status === 200) {alert("You are successfully signed up. Please log in page.")}
      if (response.status === 409) {alert("This e-mail address is already registered to our system.")}
      return response.status
    }
    catch (error) {
      console.error(error)
      return error
    }
  }

  // * Login handler + api request: /api/signup Body (JSON): { "email": "useremail@example.com", "password": "userpassword" }






  return (
    <div className="App">

      <Navbar
        onSignup={setIsSignup}
        onLogin={setIsLogin}
        onSearch={onSearch}
      />

      <main>
        <div id="background">

          <div id="mainframe">
            <LandingPage />
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
            </div>
            <Pager
              page={page}
              totalPageCount={totalPageCount}
              onPageChange={onPageChange} />
          </div>

          {selectedImageId !== null &&
            <ImageDetails
              selectedImage={selectedImage}
              onDownloadImage={imgId => downloadImage(imgId)}
              onClose={() => setSelectedImageId(null)} />}

          {isSignup &&
            <SignupModal
              onClose={setIsSignup}
              onSignup={signupHandler}
            />}

          {isLogin &&
            <LoginModal
              onClose={setIsLogin}
            // onLogin={ loginHandler fc }
            />}

        </div>
      </main>

    </div>
  )
}

export default App

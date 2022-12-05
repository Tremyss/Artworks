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


function App() {

  // ! STATES
  // App state
  const [images, setImages] = useState([])
  // Search input states
  const [searchVal, setSearchVal] = useState("")
  // ImageDetails - Single Image Card state
  const [selectedImageId, setSelectedImageId] = useState(null)
  const [page, setPage] = useState(1)
  // Login state for conditional rendering
  const [isSignup, setIsSignup] = useState(false)
  // Signup state for conditional rendering
  const [isLogin, setIsLogin] = useState(false)


  // ! START: On Window Load - set App state
  const loadData = async () => {
    const results = await getData(searchVal, page)
    setImages(results)
  }

  useEffect(() => {
    loadData()
  }, [searchVal, page])


  // ! UTIL FUNCTIONS
  // Show more handler: Select image to render more details
  const selectedImage = images.find(img => img.id === selectedImageId)

  // Download handler
  const downloadImage = (imgId) => {
    console.log(imgId)
    saveAs(`https://www.artic.edu/iiif/2/${imgId}/full/843,/0/default.jpg`, `${imgId}.jpg`)
  }

  // Search handler
  const onSearch = (search) => {
    setSearchVal(search);
    setImages([]);
    window.scrollTo(0, window.innerHeight);
  }

  // * Backend IP: http://3.66.103.135:80
  // Signup handler + api request: /api/signup Body (JSON): { "email": "useremail@example.com", "password": "userpassword" }

  // Login handler + api request: /api/login Body (JSON): { "email": "useremail@example.com", "password": "userpassword" }


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
            <button id="show-more-button"
              onClick={() => setPage(page + 1)}
            >Show more</button>
          </div>

          {selectedImageId !== null &&
            <ImageDetails
              selectedImage={selectedImage}
              onDownloadImage={imgId => downloadImage(imgId)}
              onClose={() => setSelectedImageId(null)} />}

          {isSignup &&
            <SignupModal
              onClose={setIsSignup}
            // onSignup={ signupHandler fc }
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

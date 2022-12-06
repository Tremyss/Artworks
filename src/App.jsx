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
  // User area upload section toggle and inputs
  const [uploadToggle, setUploadToggle] = useState(false)
  const [uploadTitleInput, setUploadTitleInput] = useState("")
  const [uploadDescriptionInput, setUploadDescriptionInput] = useState("")
  const [uploadFileInputValue, setUploadFileInputValue] = useState("")
  const [uploadSelectedFile, setUploadSelectedFile] = useState({})
  const [uploadServerMessage, setUploadServerMessage] = useState("Upload response here")

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








  // ! Search handler for user's database (title, desc?)
  // ? Ezt majd implementálni kell a museum api search handlerből.
  // *Lilla? :)

  // Upload Handler - Hozom: Gábor

  // Delete Handler - Hozom: Gábor

  // Edit handler - Ez még kicsit homály, talán modalban kellene...









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
                <div id="user-section-container">

                  <div id="user-header-section">
                    <div id="user-header-greeting-container">
                      <p id="user-greeting">Your Gallery</p>
                    </div>
                    <div id="user-header-button-container">
                      <button
                        id="user-header-upload-button"
                        onClick={() => {
                          setUploadToggle(!uploadToggle)
                        }}>
                        {(!uploadToggle) ? "Open upload panel" : "Close upload panel"}
                        <span className="material-symbols-outlined">upload</span>
                      </button>
                    </div>
                    <div id="user-header-search-container">
                      <div className="tooltip">
                        <input
                          className="search-input"
                          type="search"
                          name="search-users"
                          id="search-users"
                          placeholder="search my gallery"
                          spellCheck="false"
                        // onKeyDown={(event) => {
                        //   if (event.key === "Enter") {
                        //     onSearch(event.target.value)
                        //     // document.getElementById("image-grid").scrollIntoView();
                        //   }
                        // }}
                        />
                        <span className="tooltiptext">
                          Search among your saved pictures:
                          Type keyword than press Enter.
                        </span>
                      </div>
                    </div>
                  </div>

                  {uploadToggle &&
                    <div id="user-upload-section">

                      <div id="user-upload-input-container">
                        <input
                          type="text"
                          className="user-upload-input"
                          placeholder="title"
                          maxLength="40"
                          value={uploadTitleInput}
                          onChange={event => setUploadTitleInput(event.target.value)}
                        />

                        <input
                          type="text"
                          className="user-upload-input"
                          placeholder="description"
                          maxLength="40"
                          value={uploadDescriptionInput}
                          onChange={event => setUploadDescriptionInput(event.target.value)}
                        />

                        <input
                          type="file"
                          id="user-upload-file-input"
                          className="user-upload-input"
                          value={uploadFileInputValue}
                          onChange={(event) => {
                            setUploadSelectedFile(event.target.files[0])
                            setUploadFileInputValue(event.target.value)
                          }}
                        />

                        <div id="user-upload-message-container">
                          <p id="user-upload-message">
                            {uploadServerMessage}
                          </p>
                        </div>
                      </div>

                      <div id="user-upload-button-container">
                        <input
                          type="submit"
                          id="user-upload-button"
                          value="Upload!"
                        // onClick={uploadHandler}
                        />
                      </div>
                    </div>
                  }

                  <div id="user-image-grid-section">

                    // ! image grid component ???

                  </div>
                  
                </div>

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
      </main >

    </div >
  )
}

export default App

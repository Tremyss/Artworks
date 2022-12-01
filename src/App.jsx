import { useEffect, useState } from "react"
import "./App.css"
// Import functions
import getData from "./api/GetData.js"
import getDataLoop from "./api/GetDataLoop.js"
// Import components
import ImageCard from "./components/ImageCard.jsx"
import Navbar from "./components/Navbar.jsx"
import ImageDetails from "./components/ImageDetails.jsx"

// SET API URL-s here (burned in query params)
const apiSearchUrl = "https://collectionapi.metmuseum.org/public/collection/v1/search?q=van%20gogh&hasImages=true&isHighlight=true"
// Resturns 20 pcs: const apiSearchUrl = "https://collectionapi.metmuseum.org/public/collection/v1/search?q=van%20gogh&medium=Paintings&hasImages=true&isHighlight=true"
// Resturns 75 pcs: const apiSearchUrl = "https://collectionapi.metmuseum.org/public/collection/v1/search?q=van%20gogh&hasImages=true"
const apiObjectUrl = "https://collectionapi.metmuseum.org/public/collection/v1/objects/"


function App() {

  // ! STATES
  // App state
  const [searchResults, setSearchResults] = useState([])
  const [images, setImages] = useState([])
  // Input state
  const [inputVal, setInputVal] = useState("")
  // More info state
  const [selectedImageId, setSelectedImageId] = useState(null);

  // ! INIT FUNCTIONS
  // Call Fetch function and set App state
  const initPage = async () => {
    const searchResults = await getData(apiSearchUrl)
    setSearchResults(searchResults)
    const searchedImages = await getDataLoop(apiObjectUrl, searchResults)
    setImages(searchedImages) // * Itt megvan az App state :D
  }

  // Kick in window:onLoad
  useEffect(() => {
    initPage()
  }, [])


  // ! UTIL FUNCTIONS
  // Download handler

  // Search handler
  const onSearch = (search) => {
    setInputVal(search)
  }
  const filteredImages = images.filter(img => (img.title.startsWith(inputVal))) //itt kell majd felhasználni a search input valuet

  // Select image to render more details
  console.log(images)
  const selectedImage = images.find(img => img.objectID === selectedImageId)
  console.log(selectedImage)

  return (
    <div className="App">
      <nav>
        <Navbar
          onSearch={onSearch}
        />
      </nav>

      <main>
        <div id="background">
          <div id="mainframe">
            <div id="image-grid">
              {images.length === 0 ?
                <p className="image-card-title">Loading...</p> :
                filteredImages.map(image => (
                  <ImageCard
                    key={image.objectID}
                    image={image}
                    onShowDetails={id => setSelectedImageId(id)}
                  />
                ))}
            </div>
          </div>
          {selectedImageId !== null &&
            <ImageDetails
              selectedImage={selectedImage}
              onClose={() => setSelectedImageId(null)} />}
        </div>
      </main>

    </div>
  )
}

export default App

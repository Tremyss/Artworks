import { useEffect, useState } from "react"
import "./App.css"
// Import functions
import getData from "./api/GetData.js"
import getDataLoop from "./api/GetDataLoop.js"
import urlAssembler from "./api/urlAssembler.js"
// Import components
import ImageCard from "./components/ImageCard.jsx"
import Navbar from "./components/Navbar.jsx"
import ImageDetails from "./components/ImageDetails.jsx"

// SET API URL-s here (burned in query params) 
const apiObjectUrl = "https://collectionapi.metmuseum.org/public/collection/v1/objects/"
// Resturns 14 pcs: const apiSearchUrl = "https://collectionapi.metmuseum.org/public/collection/v1/search?q=van%20gogh&hasImages=true&isHighlight=true"
// Resturns 20 pcs: const apiSearchUrl = "https://collectionapi.metmuseum.org/public/collection/v1/search?q=van%20gogh&medium=Paintings&hasImages=true&isHighlight=true"
// Resturns 75 pcs: const apiSearchUrl = "https://collectionapi.metmuseum.org/public/collection/v1/search?q=van%20gogh&hasImages=true"


function App() {

  // ! STATES
  // App state
  const [searchResults, setSearchResults] = useState([])
  const [images, setImages] = useState([])
  // Search API URL state
  const [apiSearchUrl, setApiSearchUrl] = useState("https://collectionapi.metmuseum.org/public/collection/v1/search?q=van%20gogh&hasImages=true&isHighlight=true")
  // Search input states
  const [inputVal, setInputVal] = useState("")
  const [searchHighlighted, setSearchHighlighted] = useState(false)
  const [searchTitle, setSearchTitle] = useState(false)
  // ImageDetails - Single Image Card state
  const [selectedImageId, setSelectedImageId] = useState(null);

/*   // ? SEARCH INPUT ASSEMBLY  törölni
  useEffect(() => console.log(searchHighlighted), [searchHighlighted])
  useEffect(() => console.log(searchTitle), [searchTitle]) */
  
  
/*   //Search and render when input fields changing
  useEffect(()=> {
    const searchUrl = urlAssembler(inputVal, searchTitle, searchHighlighted)
    setApiSearchUrl(searchUrl)
    console.log(apiSearchUrl) //valamiért undefined jön vissza
    initPage()
  },[inputVal, searchHighlighted, searchTitle]) */


  // ! INIT FUNCTIONS
  // Call Fetch function and set App state
  const initPage = async () => {
    const searchResults = await getData(apiSearchUrl)
    setSearchResults(searchResults)
    const searchedImages = await getDataLoop(apiObjectUrl, searchResults)
    setImages(searchedImages)
  }

  // Kick in window:onLoad
  useEffect(() => {
    initPage()
  }, [])


  // ! UTIL FUNCTIONS
  // Select image to render more details
  const selectedImage = images.find(img => img.objectID === selectedImageId)

  // Download handler

  // Search handlers
  const onSearch = (search) => {
    setInputVal(search)
  }


  return (
    <div className="App">
      <nav>
        <Navbar
          onSearch={onSearch}
          searchTitle={searchTitle}
          searchHighlighted={searchHighlighted}
          onClickHighlight={setSearchHighlighted}
          onClickTitle={setSearchTitle}
        />
      </nav>

      <main>
        <div id="background">
          <div id="mainframe">
          <div class="noise"></div>
            <div id="image-grid">
              {images.length === 0 ?
                <p className="image-card-title">Loading...</p> :
                images.map(image => (
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

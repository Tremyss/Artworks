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



function App() {

  // ! STATES
  // App state
  const [images, setImages] = useState([])
  // Search API URL state
  const [apiSearchUrl, setApiSearchUrl] = useState("https://collectionapi.metmuseum.org/public/collection/v1/search?q=van%20gogh&hasImages=true&isHighlight=true")
  // Search input states
  const [inputVal, setInputVal] = useState("")
  const [searchHighlighted, setSearchHighlighted] = useState(false)
  const [searchTitle, setSearchTitle] = useState(false)
  // ImageDetails - Single Image Card state
  const [selectedImageId, setSelectedImageId] = useState(null);

  console.log(images)
  


  // ! INIT FUNCTIONS
  // Call Fetch function and set App state
  const initPage = async () => {
    const results = await getData()
    setImages(results)
  }

  // Kick in window:onLoad
  useEffect(() => {
    initPage()
  }, [])


  // ! UTIL FUNCTIONS
  // Select image to render more details
  const selectedImage = images.find(img => img.id === selectedImageId)

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
          <div className="noise"></div>
            <div id="image-grid">
              {images.length === 0 ?
                <p className="image-card-title">Loading...</p> :
                images.map(image => (
                  <ImageCard
                    key={image.id}
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

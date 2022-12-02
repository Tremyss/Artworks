import { useEffect, useState } from "react"
import "./App.css"
// Import functions
import getData from "./api/GetData.js"
// Import components
import ImageCard from "./components/ImageCard.jsx"
import Navbar from "./components/Navbar.jsx"
import ImageDetails from "./components/ImageDetails.jsx"



function App() {

  // ! STATES
  // App state
  const [images, setImages] = useState([])
  
  // Search input states
  const [searchVal, setSearchVal] = useState("")
  // ImageDetails - Single Image Card state
  const [selectedImageId, setSelectedImageId] = useState(null);



  // Call Fetch function and set App state
  const loadData = async () => {
    const results = await getData(searchVal)
    console.log(results)
    setImages(results)
  }

  useEffect(() => {
    loadData()
  }, [searchVal])


  // ! UTIL FUNCTIONS
  // Select image to render more details
  const selectedImage = images.find(img => img.id === selectedImageId)

  // Download handler

  // Search handlers
  const onSearch = (search) => {
    setSearchVal(search)
  }


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

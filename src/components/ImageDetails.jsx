const ImageDetails = ({ selectedImage, onDownloadImage, onClose }) => {
  console.log(selectedImage)
  return (
    <div id="single-card-blur">
      <div id="single-card-background">
        <button id="single-card-close-button" onClick={onClose}>
          <span className="material-symbols-outlined">close</span>
        </button>
        <div id="single-card-img-container">
          <img
            id="single-card-img-img"
            src={`https://www.artic.edu/iiif/2/${selectedImage.image_id}/full/800,/0/default.jpg`}
            alt={selectedImage.title}
            style={{
              backgroundImage: `url(https://www.artic.edu/iiif/2/${selectedImage.image_id}/full/300,/0/default.jpg)`,
              aspectRatio: `${selectedImage.thumbnail.width}/${selectedImage.thumbnail.height}`
            }}
          />
        </div>
        <div id="single-card-text-container">
          <div id="single-card-main-info">
            <p id="single-card-title">
              <span className="single-card-title-span">Title: </span>{" "}
              {selectedImage.title}
            </p>
            <p id="single-card-author">
              <span className="single-card-title-span">Artist: </span>
              {selectedImage.artist_display}
            </p>
            <p id="single-card-classification">
              <span className="single-card-title-span">Classification: </span>
              {selectedImage.artwork_type_title}
            </p>
          </div>
          <div id="single-card-details-container">
            <div id="single-card-details-text-container">
              <p className="single-card-details-text">
                {selectedImage.date_display}
              </p>
              <p className="single-card-details-text">
                {selectedImage.style_title}
              </p>
            </div>
            <div id="single-card-button-container">
              <div className="tooltip">
                <span className="tooltiptext">
                  download
                </span>
                <button className="single-card-download-button" onClick={() => onDownloadImage(selectedImage.image_id)}>
                  <span className="material-symbols-outlined">download</span>
                </button>
                <a href={`https://www.artic.edu/artworks/${selectedImage.image_id}`} 
                  target="_blank"
                  >link</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageDetails

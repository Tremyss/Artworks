function ImageCard({ image, onShowDetails }) {
  return (
    <div className="image-card">
      <img
        className="image-card-image"
        src={`https://www.artic.edu/iiif/2/${image.image_id}/full/300,/0/default.jpg`}
        alt={image.title}
      />
      <div className="image-card-middle">
        <div className="image-card-maininfo">
          <p className="image-card-title">{image.title}</p>
          <p className="image-card-author">{image.artist_title}</p>
        </div>
        <div className="image-card-download-button">
          <span className="material-symbols-outlined">download</span>
        </div>
      </div>
      <div className="image-card-text-holder">
        <p className="image-card-details">
          <button
            className="image-card-details-btn"
            onClick={() => onShowDetails(image.id)}
          >
            More info
          </button>
        </p>
      </div>
    </div>
  )
}

export default ImageCard

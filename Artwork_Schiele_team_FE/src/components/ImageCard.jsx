
function ImageCard({ image }) {

  return (
    <div className="image-card">
      <img className="image-card-image" src={image.primaryImageSmall} alt={image.title} />
      <div className="image-card-middle">
        <div className="image-card-maininfo">
          <p className="image-card-title">{image.title}</p>
          <p className="image-card-author">{image.artistDisplayName}</p>
        </div>
        <div className="image-card-download-button">
          <span className="material-symbols-outlined">download</span>
        </div>
      </div>
      <div className="image-card-text-holder">
        <p className="image-card-details">
          <a target="_blank" href={image.objectURL}>
            More info about artwork
          </a>
        </p>
      </div>
    </div>
  )
}

export default ImageCard
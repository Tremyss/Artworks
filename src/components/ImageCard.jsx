
function ImageCard(props) {

  return (
    <div className="image-card">
      <img className="image-card-image" src={props.image.primaryImageSmall} alt={props.image.title} />
      <div className="image-card-middle">
        <div className="image-card-maininfo">
          <p className="image-card-title">{props.image.title}</p>
          <p className="image-card-author">{props.image.artistDisplayName}</p>
        </div>
        <div className="image-card-download-button">
          <span className="material-symbols-outlined">download</span>
        </div>
      </div>
      <div className="image-card-text-holder">
        <p className="image-card-details">
          <button
            onClick={() => props.onShowDetails(props.image.objectID)}
          >
            More info
          </button>
        </p>
      </div>
    </div>
  )
}

export default ImageCard
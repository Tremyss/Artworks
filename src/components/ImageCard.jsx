function ImageCard({ image, onDownloadImage, onShowDetails, onEditDetails, isMyGallery }) {
  return (
    <div className="image-card">
      <img
        className="image-card-image"
        src={`https://www.artic.edu/iiif/2/${image.image_id}/full/300,/0/default.jpg`}
        alt={image.title}
        style={{
          backgroundImage: `url(${image.thumbnail.lqip})`,
          aspectRatio: `${image.thumbnail.width}/${image.thumbnail.height}`
        }}
      />
      <div className="image-card-middle">
        <div className="image-card-maininfo">
          <p className="image-card-title">{image.title.length < 35 ? image.title : `${image.title.slice(0, 35)}....`}</p>
          <p className="image-card-author">{image.artist_title}</p>
        </div>
        <div className="image-card-buttons">

          <div className="tooltip">
            <span className="tooltiptext">
              download
            </span>
            <button className="image-card-download-button" onClick={() => onDownloadImage(image.image_id)}>
              <span className="material-symbols-outlined">download</span>
            </button>
          </div>

          {(isMyGallery == undefined) &&
            <div className="tooltip">
              <span className="tooltiptext">
                delete image
              </span>
              <button className="image-card-download-button"
              // onClick={() => onDownloadImage(image.image_id)}
              >
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          }

          {(isMyGallery == undefined) &&
            <div className="tooltip">
              <span className="tooltiptext">
                edit image's data
              </span>
              <button className="image-card-download-button"
                onClick={
                  () => {onEditDetails(image.id)
                }}
              >
                <span className="material-symbols-outlined">edit</span>
              </button>
            </div>
          }

          <div className="tooltip">
            <span className="tooltiptext">
              more info
            </span>
            <button className="image-card-details-button" onClick={() => onShowDetails(image.id)}>
              <span className="material-symbols-outlined">info</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ImageCard

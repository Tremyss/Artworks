const ImageDetails = (props) => {

  return (
    <div id="ImageDetails-container">
      <div id="ImageDetails">
        <button id="closingButton" onClick={props.onClose}>X</button>
        <img src={props.selectedImage.primaryImageSmall} alt="" />
        <div><strong>Title: </strong> {props.selectedImage.title}</div>
        <div><strong>Artist: </strong>{props.selectedImage.artistDisplayName} ({props.selectedImage.artistDisplayBio})</div>
        <div><strong>Date: </strong> {props.selectedImage.objectDate    }</div>
        <div><strong>Classification: </strong> {props.selectedImage.classification}</div>
        <div><strong>Medium: </strong> {props.selectedImage.medium}</div>
        <div><strong>Dimensions: </strong> {props.selectedImage.dimensions}</div>
        <div><strong>Location: </strong> {props.selectedImage.repository}</div>
        <a href={props.selectedImage.objectURL}>The Met</a>
      </div>

    </div>
  )
}

export default ImageDetails;
import { useState } from "react"

const EditImageModal = ({ onClose }) => {

    return (
        <div>
            <div id="edit-card-blur">
                <div id="edit-card-background" >
                    <button id="edit-card-close-button" 
                    onClick={() => onClose(false)}
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                    <div id="edit-card-content" >
                        <div id="edit-card-content-title" >
                            <p className="edit-card-content-title-p">Edit data than press save</p>
                        </div>
                        <div id="edit-card-content-mid-section">
                            <div id="edit-card-content-img-container">
                                <img id="edit-card-content-img" src="/atrwork_gallery_logo.png" alt="edited picture" />
                            </div>
                        </div>
                        <div id="edit-card-content-inputs-container" >
                            <input type="text"
                                className="edit-card-content-input"
                                name="title"
                                placeholder="title"
                                required
                                defaultValue="original title from DB"
                            // onChange={(event) => setTitleInput(event.target.value)}
                            />
                            <input
                                type="text"
                                className="edit-card-content-input"
                                name="description"
                                placeholder="description"
                                required
                                defaultValue="original description from DB"
                            // onChange={(event) => setDescriptionInput(event.target.value)}
                            />
                        </div>
                        <div id="edit-card-content-button-container" >
                            <button
                                className="edit-card-button"
                                onClick={() => onClose(false)}
                                >
                                Save
                                <span className="material-symbols-outlined">check_circle</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditImageModal
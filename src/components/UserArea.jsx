import { useState } from "react"

const UserArea = ({ nemtommi }) => {
    
// STATES: User area upload section toggle and inputs
const [uploadToggle, setUploadToggle] = useState(false)
const [uploadTitleInput, setUploadTitleInput] = useState("")
const [uploadDescriptionInput, setUploadDescriptionInput] = useState("")
const [uploadFileInputValue, setUploadFileInputValue] = useState("")
const [uploadServerMessage, setUploadServerMessage] = useState("Upload response here")
const [uploadSelectedFile, setUploadSelectedFile] = useState({})


// ! Search handler for user's database (title, desc?)
// ? Ezt majd implementálni kell a museum api search handlerből.
// *Lilla? :)
/* Minta a database-ről
[
    {
        "id": "2465500f-ff23-4b44-88ea-99fbb8272a62",
        "title": "Schiele_3",
        "description": "kép",
        "url": "localhost:8080/api/artwork/2465500f-ff23-4b44-88ea-99fbb8272a62.jpg"
    }
]

{
    "email": "test4@test.com",
        "password": "1234"
}
 */


// Upload Handler - Hozom: Gábor

// Delete Handler - Hozom: Gábor

// Edit handler - Ez még kicsit homály, talán modalban kellene...



    return (
        <div>
            <div id="user-section-container">

                <div id="user-header-section">
                    <div id="user-header-greeting-container">
                        <p id="user-greeting">My Gallery</p>
                    </div>
                    <div id="user-header-button-container">
                        <button
                            id="user-header-upload-button"
                            onClick={() => {
                                setUploadToggle(!uploadToggle)
                            }}>
                            {(!uploadToggle) ? "Upload" : "Close"}
                            <span className="material-symbols-outlined">upload</span>
                        </button>
                    </div>
                    <div id="user-header-search-container">
                        <div className="tooltip">
                            <input
                                className="search-input"
                                type="search"
                                name="search-users"
                                id="search-users"
                                placeholder="search my gallery"
                                spellCheck="false"
                            // onKeyDown={(event) => {
                            //   if (event.key === "Enter") {
                            //     onSearch(event.target.value)
                            //     // document.getElementById("image-grid").scrollIntoView();
                            //   }
                            // }}
                            />
                            <span className="tooltiptext">
                                Search among your saved pictures:
                                Type keyword than press Enter.
                            </span>
                        </div>
                    </div>
                </div>

                {uploadToggle &&
                    <div id="user-upload-section">

                        <div id="user-upload-input-container">
                            <input
                                type="text"
                                className="user-upload-input"
                                placeholder="title"
                                maxLength="40"
                                value={uploadTitleInput}
                                onChange={event => setUploadTitleInput(event.target.value)}
                            />

                            <input
                                type="text"
                                className="user-upload-input"
                                placeholder="description"
                                maxLength="40"
                                value={uploadDescriptionInput}
                                onChange={event => setUploadDescriptionInput(event.target.value)}
                            />

                            <input
                                type="file"
                                id="user-upload-file-input"
                                className="user-upload-input"
                                value={uploadFileInputValue}
                                onChange={(event) => {
                                    setUploadSelectedFile(event.target.files[0])
                                    setUploadFileInputValue(event.target.value)
                                }}
                            />

                            <div id="user-upload-message-container">
                                <p id="user-upload-message">
                                    {uploadServerMessage}
                                </p>
                            </div>
                        </div>

                        <div id="user-upload-button-container">
                            <input
                                type="submit"
                                id="user-upload-button"
                                value="Save file"
                            // onClick={uploadHandler}
                            />
                        </div>
                    </div>
                }

                <div id="user-image-grid-section">

      // ! image grid component ???

                </div>

            </div>

        </div>
    )
}

export default UserArea
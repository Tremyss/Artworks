
const Navbar = ({ onSignup, onLogin, onLoggedIn, onLogout, onSearch }) => {

  return (
    <div className="nav-bar">
      <ul className="nav-list">
        <li className="nav-item">
          {/* <a href="#top"> */}
          <img src="/atrwork_gallery_logo.png" alt="Artwork Gallery logo" />
          {/* </a> */}
        </li>
        <li className="nav-item">
          <a href="#top">Home</a>
        </li>
        <li className="nav-item">
          <a href="#image-grid">Collection</a>
        </li>
        {(onLoggedIn) ||
          <li className="nav-item">
            <a href="#top" onClick={() => {
              onSignup(true)
              onLogin(false)
            }}>Signup</a>
          </li>
        }
        {onLoggedIn ||
          <li className="nav-item">
            <a href="#top" onClick={() => {
              onLogin(true)
              onSignup(false)
            }}>Login</a>
          </li>
        }
        {(!onLoggedIn) ||
          <li className="nav-item">
            <a href="#top">My Gallery</a>
          </li>
        }
        {(!onLoggedIn) ||
          <li className="nav-item">
            <a href="#top"
            onClick={() => {
              onLogout(false)
              // localStorage.removeItem("accessToken")
            }}>Log Out</a>
          </li>
        }

        {/* IDEIGLENES SZAKASZ */}
        <li className="nav-item">
          <a href="#top"
            onClick={() => {
              onLogout(!onLoggedIn)
            }}>#switch login#</a>
        </li>

        <li className="nav-item">
          <div className="tooltip">
            <input
              className="search-input"
              type="search"
              name="search-api"
              id="search-api"
              placeholder="search"
              spellCheck="false"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  onSearch(event.target.value)
                  // document.getElementById("image-grid").scrollIntoView();
                }
              }}
            />
            <span className="tooltiptext">
              Search among Art Institue of Chicago's artworks:
              Type keyword than press Enter.
            </span>
          </div>
        </li>


      </ul>
    </div>
  )
}

export default Navbar


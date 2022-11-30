
const Navbar = (props) => {

  return (
    <div>
      <div className="nav-bar">
        <ul className="nav-list">
          <li className="nav-item">
            <a href="#top">Home</a>
          </li>
          <li className="nav-item">
            <a href="#top">Collection</a>
          </li>
          <li className="nav-item">
            <a href="#top">Logo</a>
          </li>
          <li className="nav-item">
            <a href="#top">Login</a>
          </li>
          <li className="nav-item">
          <div className="tooltip">
            <input 
            className="search-input" 
            type="search" 
            name="search-api" 
            id="search-api"
            placeholder="search MET database"
            onKeyUp={(event) => props.onSearch(event.target.value)} />
            <span className="tooltiptext">
                Search for artist or title
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar



const Navbar = ({ onSearch }) => {

  return (
    <div className="nav-bar">
      <ul className="nav-list">
        <li className="nav-item">
          <a href="#top">Home</a>
        </li>
        <li className="nav-item">
          <a href="#image-grid">Collection</a>
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
              placeholder="search"
              spellCheck="false"
              onKeyDown={(event) => { if (event.key === "Enter") { 
                onSearch(event.target.value)
                document.getElementById("image-grid").scrollIntoView();
              } }}
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


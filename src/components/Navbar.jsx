
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
            <a href="#top">MUSEUM LOGO</a>
          </li>
          <li className="nav-item">
            <a href="#top">Login | Register</a>
          </li>
          <li className="nav-item">
            <input 
            className="search-input" 
            type="search" 
            name="search-api" 
            id="search-api"
            placeholder="search MET database"
            onKeyUp={(event) => props.onSearch(event.target.value)} />
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar


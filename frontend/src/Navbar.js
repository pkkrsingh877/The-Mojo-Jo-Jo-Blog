import { Link } from 'react-router-dom';

const Navbar = () => {
    return ( 
        <nav className="navbar">
            <h1>The Mojo Jo Jo Blog</h1>
            <div className="nav-links">
                <Link className="nav-link" to="/">Home</Link>
                <Link className="nav-link" to="/create">New Blog</Link>
                <Link className="nav-link" to="/about">About</Link>
            </div>
        </nav>
    );
}
 
export default Navbar;
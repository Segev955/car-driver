import './NavBar.css';

const NavBar = () => {
    return (
        <nav className="navbar">
            <h1>Driver Identification System</h1>
            <div className="links">
                <a href="/">Home</a>
                <a href="/add">Add Driver</a>
            </div>
        </nav>
    );
}

export default NavBar;
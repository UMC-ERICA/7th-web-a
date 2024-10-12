// navbar.jsx
import {Link} from "react-router-dom";
import './Nav.css';
import { RiFindReplaceLine } from "react-icons/ri";
import { GoFileDirectory } from "react-icons/go";


const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="nav-item a">
                <h3><Link to={'/'}>YONGCHA</Link></h3>
            </div>
            <br/>
            <div className="nav-item a">
                <Link to={'/search'}><RiFindReplaceLine />&nbsp;&nbsp;찾기</Link>
            </div>
            <br/>
            <div className="nav-item a">
                <Link to='/moviecategory'><GoFileDirectory />&nbsp;&nbsp;영화</Link>
            </div>
        </nav>
    );
};

export default Navbar;

import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import NavbarItem from "./ButtonV2/NavbarItem";
import { AiOutlineHome } from "react-icons/ai";
import { SiFireship } from "react-icons/si";
import { MdExplore } from "react-icons/md";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa";



function Header() {
    return (
        <header>    
        <div className="nav container w-[1060px]">   
            <Link className="logo" to={`/CV-homework`}>Box<span>Cinema</span></Link>     
            <div className="search-box h-10">
                <input type="search" name="" id="search-input" placeholder="Search Movie"/>
                <IoSearch className="text-xl"/>
            </div>
            
            <a href="#" className="user">
                <img src="https://pbs.twimg.com/media/FoUoGo3XsAMEPFr?format=jpg&name=4096x4096" alt="" className="user-img"/>
            </a>

            <div className="navbar">
                <Link to={`/CV-homework`}><NavbarItem type="nav-active" icon={<AiOutlineHome />} label="Home" /></Link>
                <Link to={`/CV-homework/popular`}><NavbarItem icon={<SiFireship />} label="Popular" /></Link>
                <Link to={`/CV-homework/now_playing`}><NavbarItem icon={<MdExplore />} label="Now Playing" /></Link>
                <Link to={`/CV-homework/movies`}><NavbarItem icon={<PiTelevisionSimpleBold />} label="Movies" /></Link>
                <Link to={`/CV-homework/favourite`}><NavbarItem icon={<FaRegHeart />} label="Favourite" /></Link>             
            </div>
        </div>
    </header>
    );
}

export default Header;
import React from "react";
import {Link} from "react-router-dom";

export const Header = () => {
    return (
        <header>
            <nav>
                <Link to={"/national"}>National</Link>
                <Link to={"/local"}>Local</Link>
                <Link to={"/regions-of-interest"}>Regions of Interest</Link>
                <Link to={"/find-a-region"}>Find a Region</Link>
            </nav>
        </header>
    );  
};
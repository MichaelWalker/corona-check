import React, {FunctionComponent} from "react";
import {NavLink} from "react-router-dom";

export const SubNav: FunctionComponent = () => {
    return (
        <nav>
            <NavLink to={"/uk"} >UK</NavLink>
            <NavLink to={"/devon"} >Devon</NavLink>
            <NavLink to={"/favourites"} >Favourites</NavLink>
        </nav>
    );  
};
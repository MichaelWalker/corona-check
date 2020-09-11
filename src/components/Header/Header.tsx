import React, {FormEvent, useState} from "react";
import {Link, useHistory} from "react-router-dom";

export const Header = () => {
    const history = useHistory();
    const [search, setSearch] = useState("");
    
    const searchAreas = (event: FormEvent) => {
        event.preventDefault();
        history.push(`/areas/${search}`)
    };
    
    return (
        <header>
            <nav>
                <Link to={"/"}>CoronaCheck</Link>
                <Link to={"/"}>Home</Link>
                <Link to={"/areas"}>Areas</Link>
                <form onSubmit={searchAreas}>
                    <label>Search
                        <input type="text" value={search} onChange={event => setSearch(event.target.value)}/>
                    </label>
                </form>
            </nav>
        </header>
    );  
};
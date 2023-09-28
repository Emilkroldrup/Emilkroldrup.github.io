import React, { useState, useCallback } from "react";
import "./Searchbar.css";

const SearchBar = (props) => {
    const [term, setTerm] = useState("");

    const handleTermChange = useCallback((event) => {
        setTerm(event.target.value);
    }, []);

    const search = useCallback(() => {
        props.onSearch(term);
    }, [props.onSearch, term]);

    return (
        <div className="SearchBar">
            <input
                placeholder="Enter A Song, Album, or Artist"
                onChange={handleTermChange}
            />
            <button className="SearchButton" onClick={search}>
                SEARCH
            </button>
        </div>
    );
};

export default SearchBar;
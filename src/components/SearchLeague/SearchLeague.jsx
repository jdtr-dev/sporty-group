import React from "react";

function SearchLeague({ value, onChange }) {

    const handleKeyUp = (event) => {
        console.log(event.target.value);
    }

    return (
        <input 
            className="input is-danger" 
            type="text" 
            placeholder="Text input" 
            value={value} 
            onChange={onChange} />
    )
}

export default SearchLeague;

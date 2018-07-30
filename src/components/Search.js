import React from 'react'

const Search = ({
    value, 
    onChange,
    onSubmit, 
    children}) => 
        <form onSubmit={onSubmit} >
            {children}
            <input 
                type='text' 
                onChange={onChange}  
                value={value}
            />
            <button type="submit" >
                {children}
            </button>
        </form>

    
export default Search;

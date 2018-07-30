import React from 'react'
import PropTypes from 'prop-types'

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


Search.propTypes = {
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    value: PropTypes.string,
    children: PropTypes.node.isRequired,
};
    
export default Search;

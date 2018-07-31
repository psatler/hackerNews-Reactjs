import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Search extends Component {

    componentDidMount(){
        if(this.input){
            this.input.focus(); //focusing the search bar using refs
        }
    }

    render(){
        const {
            value,
            onChange,
            onSubmit,
            children,
        } = this.props;

        return (
            <form onSubmit={onSubmit} >
             <input 
                type='text' 
                onChange={onChange}  
                value={value}
                ref={(node) => { this.input = node }}
            />
            <button type="submit" >
                {children}
            </button>
        </form>
        )
    }
}

// const Search = ({
//     value, 
//     onChange,
//     onSubmit, 
//     children}) => 
//         <form onSubmit={onSubmit} >
//             {children}
//             <input 
//                 type='text' 
//                 onChange={onChange}  
//                 value={value}
//             />
//             <button type="submit" >
//                 {children}
//             </button>
//         </form>


Search.propTypes = {
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    value: PropTypes.string,
    children: PropTypes.node.isRequired,
};
    
export default Search;

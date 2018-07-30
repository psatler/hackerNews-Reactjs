import React from 'react'
import Button from './Button'
import PropTypes from 'prop-types'

// function isSearched(searchTerm) {
//   return function (item) {
//     return item.title.toLowerCase().includes(searchTerm.toLowerCase());
//   }
// }
// const isSearched = (searchTerm) => item => {
//   return item.title.toLowerCase().includes(searchTerm.toLowerCase())
// }
// const isSearched = (searchTerm) => item => 
//    item.title.toLowerCase().includes(searchTerm.toLowerCase())

const Table = (props) => {
    const { list, onDismiss } = props;

    return (
        <div className="table">
            {/* {list.filter(isSearched(pattern)).map( item =>  */}
            {list.map( item => 
            <div key={item.objectID} className="table-row" >
                <span style={{width: '40%'}} >
                    <a href={item.url}>{item.title}</a>
                </span>
                <span style={{width: '30%'}} >{item.author}</span>
                <span style={{width: '10%'}} >{item.num_comments}</span>
                <span style={{width: '10%'}} >{item.points}</span>

                <span >
                    <Button 
                        onClick={() => onDismiss(item.objectID)}
                        className="button-inline"
                    >
                        Dismiss
                    </Button>
                </span>


            </div>
            )}
            
        </div>
    )
}

Table.propTypes = {
    list: PropTypes.arrayOf( //defining the content of the array in a more explicit way
        PropTypes.shape({
            objectID: PropTypes.string.isRequired,
            author: PropTypes.string,
            url: PropTypes.string,
            num_comments: PropTypes.number,
            points: PropTypes.number,
        })
    ).isRequired,
    onDismiss: PropTypes.func.isRequired,
};

export default Table;

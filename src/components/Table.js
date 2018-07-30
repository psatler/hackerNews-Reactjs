import React from 'react'
import Button from './Button'

// function isSearched(searchTerm) {
//   return function (item) {
//     return item.title.toLowerCase().includes(searchTerm.toLowerCase());
//   }
// }
// const isSearched = (searchTerm) => item => {
//   return item.title.toLowerCase().includes(searchTerm.toLowerCase())
// }
const isSearched = (searchTerm) => item => 
   item.title.toLowerCase().includes(searchTerm.toLowerCase())

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


export default Table;

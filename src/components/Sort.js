import React from 'react'
import Button from './Button'
import classNames from 'classnames'

const Sort = ({ sortKey, activeSortKey, onSort, children }) => {
    // const sortClass = ['button-inline'];
    // if(sortKey === activeSortKey){ //adding another class if sort is active
    //     sortClass.push('button-active');
    // }
    const sortClass = classNames(
        'button-inline',
        {'button-active': sortKey === activeSortKey }
    );

    return (
        <Button 
            onClick={() => onSort(sortKey)}
            className={sortClass}
            // className={sortClass.join(' ')}
        >
            {children}
        </Button>
    );
}
    
export default Sort;
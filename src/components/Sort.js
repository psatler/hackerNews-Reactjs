import React from 'react'
import Button from './Button'

const Sort = ({ sortKey, onSort, children }) =>
    <Button 
        onClick={() => onSort(sortKey)}
        className="button-inline"
    >
        {children}
    </Button>

export default Sort;
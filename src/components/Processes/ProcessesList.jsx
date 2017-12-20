import React from 'react'
import Card from '../Card/Card'
import PaginatedTable from '../PaginatedTable/PaginatedTable'
import ProcessListItem from './ProcessListItem'

function titleRow() {
  return <ProcessListItem header item={{code: "ID", name: "Name", unit: "Unit"}} />
}

export default function ProcessesList(props) {
	return (
     <div className="nav-section-list">
      <Card>
        <PaginatedTable 
          {...props}
          onClick={props.onSelect} 
          onPagination={props.onPagination} 
          Row={ProcessListItem}
          TitleRow={titleRow}
        />
    	</Card>
    </div>
	)
}
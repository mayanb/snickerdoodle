import React from 'react'
import TaskAttribute from './TaskAttribute'

let data = {
"attribute_values": [
        {
            "id": 17667,
            "attribute": 148,
            "task": 5931,
            "value": "15:12",
            "att_name": "Start Time"
        },
        {
            "id": 17666,
            "attribute": 114,
            "task": 5931,
            "value": "Elman and Cat",
            "att_name": "Operator"
        },
        {
            "id": 17668,
            "attribute": 158,
            "task": 5931,
            "value": "15:07",
            "att_name": "End Time"
        },
        {
            "id": 17672,
            "attribute": 173,
            "task": 5931,
            "value": "",
            "att_name": "3rd stage temp"
        },
        {
            "id": 17675,
            "attribute": 115,
            "task": 5931,
            "value": "29.8",
            "att_name": "UNICA Temp"
        },
        {
            "id": 17679,
            "attribute": 121,
            "task": 5931,
            "value": "20",
            "att_name": "# of Bins"
        },
        {
            "id": 17669,
            "attribute": 158,
            "task": 5931,
            "value": "15:07",
            "att_name": "End Time"
        },
        {
            "id": 17670,
            "attribute": 120,
            "task": 5931,
            "value": "7",
            "att_name": "Av. Tasting Score"
        },
        {
            "id": 17671,
            "attribute": 173,
            "task": 5931,
            "value": "",
            "att_name": "3rd stage temp"
        },
        {
            "id": 17673,
            "attribute": 119,
            "task": 5931,
            "value": "78.3",
            "att_name": "Factory Temp"
        },
        {
            "id": 17674,
            "attribute": 155,
            "task": 5931,
            "value": "37",
            "att_name": "Factory Humidity"
        },
        {
            "id": 17676,
            "attribute": 115,
            "task": 5931,
            "value": "29.8",
            "att_name": "UNICA Temp"
        },
        {
            "id": 17677,
            "attribute": 116,
            "task": 5931,
            "value": "20",
            "att_name": "Auger Speed"
        }
    ]
}

export default function TaskAttributeTest(props) {
	return (
	<div className="task-attribute-test">
	{
		data.attribute_values.map(function (a, i) {
            if (i === 2)
                return <TaskAttribute key={i} name={a.att_name} value={a.value} isEditable={true} isEditing={true}/>
			return <TaskAttribute key={i} name={a.att_name} value={a.value} isEditable={true}/>
		})
	}
	</div>
	)
}
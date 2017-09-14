import request from 'superagent'

let host = 'https://eszlr18ifi.execute-api.us-west-1.amazonaws.com/staging/ics/users/'

function get(path) {
	let url = host + path
	let team = window.localStorage.getItem("team") || "1"

	return request
		.get(url)
		.query({team: team})
}

let mockJSON = { ok: true, body: [
    {
        "id": 4,
        "name": "Sugar",
        "code": "S"
    },
    {
        "id": 7,
        "name": "Cahabon",
        "code": "BON"
    },
    {
        "id": 8,
        "name": "Liberia",
        "code": "LIB"
    },
    {
        "id": 9,
        "name": "Esmereldas",
        "code": "ESM"
    },
    {
        "id": 10,
        "name": "Camino Verde 2",
        "code": "CV2"
    },
    {
        "id": 11,
        "name": "San Juan Estate",
        "code": "SJE"
    },
    {
        "id": 6,
        "name": "Mantuano",
        "code": "MT"
    },
    {
        "id": 5,
        "name": "Kokoa Kamili",
        "code": "KAM"
    },
    {
        "id": 3,
        "name": "Zorzal",
        "code": "ZZ"
    },
    {
        "id": 2,
        "name": "Camino Verde B",
        "code": "CVB"
    },
    {
        "id": 1,
        "name": "Madagascar",
        "code": "MD"
    },
    {
        "id": 12,
        "name": "Maya Mountain",
        "code": "MM"
    },
    {
        "id": 13,
        "name": "Alto Beni",
        "code": "ALT"
    },
    {
        "id": 14,
        "name": "Piura Blanco",
        "code": "PB"
    },
    {
        "id": 15,
        "name": "Turrialba",
        "code": "CRT"
    },
    {
        "id": 16,
        "name": "Zorzal Estate",
        "code": "ZZE"
    },
    {
        "id": 17,
        "name": "Zorzal Communitario",
        "code": "ZZC"
    },
    {
        "id": 19,
        "name": "Mixed",
        "code": "X"
    },
    {
        "id": 20,
        "name": "House Blend",
        "code": "HB"
    },
    {
        "id": 22,
        "name": "Camino Verde B- 100%",
        "code": "CVB-100%"
    },
    {
        "id": 21,
        "name": "Camino Verde B - 85%",
        "code": "CVB-85%"
    },
    {
        "id": 24,
        "name": "Camino Verde 100%",
        "code": "CV-100%"
    },
    {
        "id": 23,
        "name": "Camino Verde 85%",
        "code": "CV-85%"
    },
    {
        "id": 18,
        "name": "Madagascar 2016",
        "code": "MD16"
    },
    {
        "id": 25,
        "name": "Papua New Guinea",
        "code": "PNG"
    },
    {
        "id": 27,
        "name": "Piura Blanco",
        "code": "PB"
    },
    {
        "id": 30,
        "name": "Esmereldas",
        "code": "ESM"
    },
    {
        "id": 31,
        "name": "Mantuano",
        "code": "MT"
    },
    {
        "id": 32,
        "name": "Maya Mountain 2016",
        "code": "MM16"
    },
    {
        "id": 33,
        "name": "Kokoa Kamili",
        "code": "KAM"
    },
    {
        "id": 34,
        "name": "Cahabon",
        "code": "BON"
    },
    {
        "id": 36,
        "name": "San Juan Estate",
        "code": "SJE"
    },
    {
        "id": 37,
        "name": "Liberia",
        "code": "LIB"
    },
    {
        "id": 39,
        "name": "Zorzal Communitario",
        "code": "ZZC"
    },
    {
        "id": 38,
        "name": "Maya Mountain 2016",
        "code": "MM16"
    },
    {
        "id": 28,
        "name": "Maya Mountain 2015",
        "code": "MM15"
    },
    {
        "id": 43,
        "name": "Maya Mountain 85%",
        "code": "MM85%"
    },
    {
        "id": 35,
        "name": "CVB 100%",
        "code": "100%"
    },
    {
        "id": 40,
        "name": "CV-2",
        "code": "CV2"
    },
    {
        "id": 41,
        "name": "CVB",
        "code": "CVB"
    },
    {
        "id": 42,
        "name": "Costa Rica Turialba",
        "code": "CRT"
    }
]
}

function mockget(path) {
	let p = new Promise(function (resolve, reject) {
		setTimeout(function () {
			resolve(mockJSON)
		}, 250)
	})
	return p
}

export default {mockget, get}


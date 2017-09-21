import React from 'react' 
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Products from '../Products/Products'
import Processes from '../Processes/Processes'
import Navbar from '../Navbar/Navbar'
import GoogleConnect from '../GoogleConnect/GoogleConnect'
import Movements from '../Movements/Movements'

export default function ApplicationLayout(props) {
	return (
		<Router>
			<div className="layout">
				<Navbar />
				<div className="application-content">
					<Route path='/products' component={Products} />
					<Route path='/processes' component={Processes} />
					<Route path='/movements' component={Movements} />
					<Route path='/googleconnect/:ext?' component={GoogleConnect} />
				</div>
			</div>
		</Router>
	)
}

/*

12px - 15px

8px - 10px;
10px - 12.5px
12px - 15px;
14px - 17.5px;
16px - 20px;
18px - 

*/

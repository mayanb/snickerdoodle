import React from 'react' 
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Activity from '../Activity/Activity'
import Processes from '../Processes/Processes'
import Products from '../Products/Products'

//import Navbar from '../Navbar/Navbar'
import GoogleConnect from '../GoogleConnect/GoogleConnect'
import Movements from '../Movements/Movements'

import ZebraPrinter from '../OldComponents/ZebraPrinter.jsx'
import Navbar from '../OldComponents/Layout.jsx'
import FactoryMap from '../OldComponents/FactoryMap.jsx'
import LabelPrinter from '../OldComponents/LabelPrinter.jsx'
import Inventory from '../OldComponents/Inventory2.jsx'
import Task from '../Task/Task.jsx'

// import Task from '../OldComponents/Task-2.jsx'
import Dash from '../OldComponents/Dash.jsx'

import PrivateRoute from '../Router/PrivateRoute'
import Login from '../Login/Login'
import Topbar from '../Topbar/Topbar'

function ApplicationLayoutDev(props) {
	return (
		<Router>
			<div className="layout">
				<Navbar />
				<div className="application-content">
					<Route path='/products' component={ZebraPrinter} />
					<Route path='/processes' component={Processes} />
					<Route path='/movements' component={Movements} />
					<Route path='/googleconnect/:ext?' component={GoogleConnect} />
				</div>
			</div>
		</Router>
	)
}

export default class ApplicationLayoutStable extends React.Component {

  render () {
    return (
      <Router>

          <Switch>
          	<Route path="/login" component={Login} />
          	<Route component={App}/>
          </Switch>
      </Router>
    )
  }
}


function App(props) {
	return (
		<div className="layout">
    	<Route path="/:section?/:id?" component={Navbar} />

 		 <div className="application-content">
	    <PrivateRoute exact path={"/"} component={Activity} />
	    <PrivateRoute path={"/inventory/:id?"} component={Inventory} />
	    <PrivateRoute path={"/products/:id?"} component={Products} />
	    <PrivateRoute path={"/processes/:id?"} component={Processes} />

	    <PrivateRoute path={"/labels/"} component={ZebraPrinter} />
	    <PrivateRoute path={"/zebra/"} component={ZebraPrinter} />
	    <PrivateRoute path={"/dymo/"} component={LabelPrinter} />
	    <PrivateRoute path={"/task/:id?"} component={Task} />
	  </div>

	  <Route path="/:section?/:id?" component={Topbar} />
		</div>
	)
}

	// render () {
	// 	return (
	// 		<Router>

	// 		</Router>
	// 	)
	// }


/*

12px - 15px

8px - 10px;
10px - 12.5px
12px - 15px;
14px - 17.5px;
16px - 20px;
18px - 

*/

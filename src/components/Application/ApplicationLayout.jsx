import React from 'react' 
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Activity from '../Activity/Activity'
import Processes from '../Processes/Processes'
import Products from '../Products/Products'

//import Navbar from '../Navbar/Navbar'
import GoogleConnect from '../GoogleConnect/GoogleConnect'
import Movements from '../Movements/Movements'

import ZebraPrinter from '../OldComponents/ZebraPrinter.jsx'
import Navbar from '../Navbar/Navbar.jsx'
import FactoryMap from '../OldComponents/FactoryMap.jsx'
import LabelPrinter from '../OldComponents/LabelPrinter.jsx'
import Inventory from '../Inventory/Inventory.jsx'
import Task from '../Task/Task.jsx'
import Dash from '../OldComponents/Dash.jsx'
import Goals from '../Goals/Goals'

import PrivateRoute from '../Router/PrivateRoute'
import Login from '../Login/Login'
import Topbar from '../Topbar/Topbar'
import TeamSettings from '../TeamSettings/TeamSettings'

import TaskAttributeTest from '../TaskAttribute/TaskAttributeTest'

export default class ApplicationLayoutStable extends React.Component {

  render () {
    return (
      <Router>

          <Switch>
          	<Route path="/login" component={Login} />
          	<PrivateRoute component={App}/>
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
 		 		<Route path="/:section?/:id?" component={Topbar} />
		    <Route exact path={"/"} component={Activity} />
		    <Route exact path={"/inventory/:id?"} component={Inventory} />
		    <Route exact path={"/labels/"} component={ZebraPrinter} />
		    <Route path={"/zebra/"} component={ZebraPrinter} />
		    <Route path={"/dymo/"} component={LabelPrinter} />
		    <Route path={"/task/:id?"} component={Task} />
		    <Route path={"/processes/:id?"} component={Processes} />
		    <Route path={"/products/:id?"} component={Products} />
		    <Route path={"/attributetest"} component={TaskAttributeTest} />
		    <Route path={"/team"} component={TeamSettings} />
		    <Route path={"/goals"} component={Goals} />
	  	</div>
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

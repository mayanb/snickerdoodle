import React from 'react' 
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Activity from '../Activity/Activity'
import Home from '../Home/Home'
import Processes from '../Processes/Processes'
import Products from '../Products/Products'

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
import Account from '../Account/Account'

import TaskAttributeTest from '../TaskAttribute/TaskAttributeTest'
import BarChartTest from '../D3BarChart/BarChartTest'
import BCWrapper from '../D3BarChart/BCWrapper'

import PackingOrders from '../PackingOrders/PackingOrders'
// import OrderDetail from '../OrderDetail/OrderDetail'
import Sortable from '../Sortable/Index'


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
			<Route path="/:section?/:id?" component={Topbar} />

 		 	<div className="application-content">
		    <Route exact path={"/"} component={Home} />
		    <Route exact path={"/inventory/:id?"} component={Inventory} />
		    <Route exact path={"/labels/"} component={ZebraPrinter} />
		    <Route path={"/zebra/"} component={ZebraPrinter} />
		    <Route path={"/dymo/"} component={LabelPrinter} />
		    <Route path={"/task/:id?"} component={Task} />
		    <Route path={"/processes/:id?"} component={Processes} />
		    <Route path={"/products/:id?"} component={Products} />
		    <Route path={"/attributetest"} component={TaskAttributeTest} />
		    <Route path={"/team/:ext?"} component={TeamSettings} />
		    <Route path={"/goals"} component={Goals} />
		    <Route path={"/account"} component={Account} />
		    <Route path={"/googleconnect/:ext?"} component={Account} />
		    <Route path={"/bc/"} component={BCWrapper} />
		    <Route path={"/packingorders/"} component={PackingOrders} />
		    <Route path={"/barcharttest/"} component={Sortable} />
	  	</div>
		</div>
	)
}



		    
	// <Route path={"/orders/:id"} component={OrderDetail} />
	
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

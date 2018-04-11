import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './styles/layout.css'
import Walkthrough from '../Walkthrough/Walkthrough'
import CreateTeam from '../Walkthrough/CreateTeam'
import Home from '../Home/Home'
import Activity from '../Activity/Activity'

import Processes from '../Processes/Processes'
import Products from '../Products/Products'

import ZebraPrinter from '../OldComponents/ZebraPrinter.jsx'
import Navbar from '../Navbar/Navbar.jsx'
import LabelPrinter from '../OldComponents/LabelPrinter.jsx'
import Inventory from '../Inventory/Inventory.jsx'
import Task from '../TaskPage/TaskPage.jsx'
import Goals from '../Goals/Goals'

import PrivateRoute from '../Router/PrivateRoute'
import Login from '../Login/Login'
import Topbar from '../Topbar/Topbar'
import TeamSettings from '../TeamSettings/TeamSettings'
import Account from '../Account/Account'

import TaskAttributeTest from '../TaskAttribute/TaskAttributeTest'
import BCWrapper from '../D3BarChart/BCWrapper'

import Sortable from '../Sortable/Index'
import ProcessPage from '../ProcessPage/ProcessPage'

import Registration from '../Registration/Registration'

import Modal from '../Modal/Modal'
import NewFeatures from '../NewFeatures/NewFeatures'

import Inventory2 from '../Inventory2/Inventory'
import ProductRecipe from '../RecipeList/ProductRecipeList'
import NewUserChecklist from '../NewUserChecklist/NewUserChecklist'

export default class ApplicationLayoutStable extends React.Component {

  render () {
    return (
      <Router>

          <Switch>
            <Route path="/create/:code?" component={CreateTeam} />
            <Route path={"/introduction"} component={Walkthrough} />
          	<Route path="/login" component={Login} />
            <Route path={"/join/:userprofile_id?"} component={Registration} />
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

      <Modal />
	    <NewFeatures />
      <div className="application-content">
        <Route exact path={"/"} component={Home} />
	      <Route exact path={"/activity-log"} component={Activity} />
	      <Route path="/inventory" component={Inventory2} />
	      <Route exact path={"/old-inventory/:id?"} component={Inventory} />
        <Route exact path={"/labels/"} component={ZebraPrinter} />
        <Route path={"/zebra/"} component={ZebraPrinter} />
        <Route path={"/dymo/"} component={LabelPrinter} />
        <Route path={"/task/:id?"} component={Task} />
        <Route exact path={"/processes"} component={Processes} />
        <Route exact path={"/products"} component={Products} />
	      <Route path={"/processes/:id"} component={ProcessPage} />
        <Route path={"/davidstest"} component={ProductRecipe} />
        <Route path={"/team/:ext?"} component={TeamSettings} />
        <Route path={"/goals"} component={Goals} />
        <Route path={"/account"} component={Account} />
        <Route path={"/googleconnect/:ext?"} component={Account} />
        <Route path={"/bc/"} component={BCWrapper} />
        <Route path={"/barcharttest/"} component={Sortable} />
        <Route path={"/checklist/"} component={NewUserChecklist} />
      </div>
    </div>
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

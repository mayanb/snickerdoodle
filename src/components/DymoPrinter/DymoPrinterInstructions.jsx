import React from 'react'
import Dialog from '../Card/Dialog'
import Button from '../Card/Button'

export default function DymoPrinterInstructions(props) {
	return (
		<Dialog onToggle={props.onToggle}>
			<h1>Troubleshooting</h1>
			<div className="trouble">
	      <p> You need to run the Dymo toolbar app to make this work.</p>
	      <ul style={{}}>
	        <li>Find the little <b>Dymo icon on the top toolbar</b> of your Mac. Click on it and make sure it's been "Started on port XXX", otherwise start it.</li>
	        <li>If you can't find the Dymo Service icon, open <b>/Library/Frameworks/DYMO/SDK/Dymo.DLS.Printing.Host</b> from Finder. That should give you the dymo toolbar app. Make sure it's been "started," too.</li>
	        <li>If that folder doesn't exist, make sure you have the latest version of the <a href="http://developers.dymo.com/2017/06/13/new-dls-update-released-this-fixes-issues-on-mac-os-x/">dymo software installed.</a> Once you do, you should have that folder. </li>
	        <li>If you're still having problems, tell whoever is running the site!</li>
	      </ul>
	    </div>
		</Dialog>
	)
}
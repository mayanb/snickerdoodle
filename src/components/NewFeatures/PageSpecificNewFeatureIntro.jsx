import React from 'react'
import Dialog from '../Card/Dialog'
import Button from '../Card/Button'
import Img from '../Img/Img'
import './styles/pagespecificnewfeatureinfo.css'


export default function PageSpecificNewFeatureIntro({ onClose, content, title, finalCallToAction, imgSrc, imgHeightWithUnits, link, localStorageVarName }) {
	const modalPreviouslySeen = window.localStorage.getItem(localStorageVarName)
	if (modalPreviouslySeen) {
		return null
	}
	
	function handleClose() {
		window.localStorage.setItem(localStorageVarName, true)
		onClose()
	}
	
	return (
		<Dialog onToggle={handleClose} className="specific-page-new-features-card">
			<div style={{margin: "-16px"}}>
				<div className="new-feature">
					<div className="new-feature-header">{title}</div>
					<div style={{display: "flex", alignItems: "flex-end", "justifyContent": "center"}}>
						<Img src={imgSrc} height={imgHeightWithUnits}/>
					</div>
					<div className="new-feature-text">{content}</div>
					<div>
						<Button link onClick={() => window.open(link, "_blank")}>
							<span className="learn-how">{finalCallToAction}</span>
						</Button>
					</div>
				</div>
			</div>
		</Dialog>
	)
}

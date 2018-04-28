import React from 'react'
import { CSSTransitionGroup } from 'react-transition-group'
import './styles/animations.css'

export function Slide({children}) {
	return (
		<CSSTransitionGroup 
			transitionName="slide" 
			transitionEnterTimeout={300} 
			transitionLeaveTimeout={200}
		>
			 {children}
		</CSSTransitionGroup>
	)
}
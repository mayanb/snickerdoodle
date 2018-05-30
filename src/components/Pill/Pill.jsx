import React from 'react'
import './styles/pill.css'

export default function Pill({ children, color, ...rest }) {
	return <span className={`pill ${color}`}>{children}</span>
}

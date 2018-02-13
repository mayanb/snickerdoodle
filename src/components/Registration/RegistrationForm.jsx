import React from 'react'
import WalkthroughFrame from '../Walkthrough/WalkthroughFrame'
import Card from '../Card/Card'
import FormGroup from '../Inputs/FormGroup'
import FormErrors from '../Inputs/FormErrors'
import Input from '../Inputs/Input'
import Loading from '../Loading/Loading'
import Spinner from 'react-spinkit'

export default function RegistrationForm(props) {
	let { 
		isFetchingInitialData,
		isSubmitting,
		username, 
		password, 
		retyped_password, 
		userprofile,
		onChange,
		errors,
		onSubmit,
	} = props

	let teamName = userprofile && <span style={{fontWeight: 'bold'}}>{userprofile.team_name}</span>

	return (
		<WalkthroughFrame>
			<Loading isFetchingData={isFetchingInitialData} spinnerProps={{color: "#aaaaaa"}}>
			<Card>
				<form className="registration-form">
					<div className="walkthrough-header">
						{`Hi ${userprofile && userprofile.first_name}! Welcome to team `}
						{ teamName }
						{'!'}
					</div>
					<div className="subtitle">Finish setting up your account by choosing a username and password.</div>
					<FormGroup label="Username">
						<Input
							className="username"
							placeholder="letters & numbers only"
							value={username}
							onChange={(e) => onChange(e.target.value, "username")}
						/>
					</FormGroup>
					<FormGroup label="Password">
						<Input
							type="password"
							placeholder="***"
							value={password}
							onChange={(e) => onChange(e.target.value, "password")}
						/>
					</FormGroup>
					<FormGroup label="Retype password">
						<Input
							type="password"
							placeholder="***"
							value={retyped_password}
							onChange={(e) => onChange(e.target.value, "retyped_password")}
						/>
					</FormGroup>
					{ errors && <FormErrors errors={errors}/> }
					<button onClick={onSubmit}>
						{isSubmitting ? <Spinner name="three-bounce" fadeIn='quarter' style={{height: '20px'}}color="white" /> : 'Submit'}
					</button>
				</form>
			</Card>
			</Loading>
		</WalkthroughFrame>
	)
}
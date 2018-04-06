
//From http://emailregex.com/
//eslint-disable-next-line no-useless-escape
export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const USERNAME_REGEX= /^[a-z0-9]+$/i

export const ATTRIBUTE_TYPES = [
	{ value: "TEXT", label: "Text" },
	{ value: "NUMB", label: "Number" },
	{ value: "TIME", label: "Time" },
	{ value: 'BOOL', label: 'Toggle (Yes/No)' },
	{ value: "USER", label: "User" },
]


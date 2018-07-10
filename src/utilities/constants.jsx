
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

export const TEXT = 'TEXT'
export const NUMB = 'NUMB'
export const TIME = 'TIME'
export const BOOL = 'BOOL'
export const USER = 'USER'

export const ATTRIBUTE_NAME_MAX_LENGTH = 20

export const ICONS = [
	'prep-process-icon@3x.png', 
	'breakandwinnow-process-icon@3x.png', 
	'ingredient-process-icon@3x.png', 
	'prerefine-process-icon@3x.png', 
	'label-process-icon@3x.png', 
	'pack-process-icon@3x.png', 
	'pasteurize-process-icon@3x.png', 
	'package-process-icon@3x.png', 
	'ballmill-process-icon@3x.png', 
	'default-process-icon@3x.png', 
	'roast-process-icon@3x.png', 
	'lid-process-icon@3x.png', 
	'hold-process-icon@3x.png', 
	'rotaryconchepull-process-icon@3x.png', 
	'box-process-icon@3x.png', 
	'conche-process-icon@3x.png', 
	'grind-process-icon@3x.png', 
	'temper-process-icon@3x.png', 
	'melangerpull-process-icon@3x.png', 
	'melange-process-icon@3x.png', 
	'ship-process-icon@3x.png', 
	'foil-process-icon@3x.png', 
	'jar-process-icon@3x.png',
	'cut-process-icon@3x.png',
	'freeze-process-icon@3x.png',
	'hocho-process-icon@3x.png',
	'tank-process-icon@3x.png',
	'qualitycheck-process-icon@3x.png',
	'trash-process-icon@3x.png',
	'weigh-process-icon@3x.png',
	'time-process-icon@3x.png',
	'lab-process-icon@3x.png',
	'temp-process-icon@3x.png',
]

export const GOALS = 'GOALS'
export const PINS = 'PINS'

import math from 'mathjs'

export function validateFormula(expression, allowedAttributeIds) {
	const pattern = /^[\d|\(|\)|\*|\+|\-|\/|\^|\{|\}]+$/;
	let match = new RegExp(pattern).test(expression)
	let result = 0
	if (match) {
		try {
			expression = expression.replace(/[\{\}]+/g, '');
			result = math.eval(expression)
			if (!isNaN(result)) {
				const forwardPattern = /\{(?=([\d]+(?=\})))/g;
				const backwardPattern = /\}(?=([\d]+(?=\{)))/g;
				const startIndexes = []
				let endIndexes = []
				let match
				do {
					match = forwardPattern.exec(expression);
					if (match) {
						startIndexes.push(match.index)
					}
				} while (match);
				const reversedExpression = expression.split("").reverse().join("")
				do {
					match = backwardPattern.exec(reversedExpression);
					if (match) {
						const correctIndex = expression.length - 1 - match.index
						endIndexes.push(correctIndex)
					}
				} while (match);
				endIndexes = endIndexes.reverse()
				if (startIndexes.length === endIndexes.length) {
					for (let i = 0; i < startIndexes.length; i++) {
						const attribute = parseInt(expression.substring(startIndexes[i] + 1, endIndexes[i]))
						if (!allowedAttributeIds.includes(attribute)) {
							return false
						}
					}
				} else {
					return false
				}
				return true
			}
		}
		catch (err) {
			return false
		}
	} else {
		return false
	}
}

import { colors } from './colors'

export function pluralize(number, noun) {
	if (parseInt(number, 10) !== 1) {
    let re = /([szx]|sh|ch)$/
    if (re.test(noun))
		  return noun + 'es'
    else return noun + 's'
	} else {
		return noun
	}
}

export function gerund(infinitive) {
  if (infinitive.endsWith('e')) {
    return infinitive.substring(0, infinitive.length-1) + 'ing'
  }
  return infinitive + 'ing'
}
    
export function colorHash(str) {
    return colors[Math.abs(str.hashCode() % colors.length)]
}

export function formatNumber(amount) {
  return parseInt(amount, 10).toLocaleString()
}

export function formatAmount(amount, unit) {
	return `${formatNumber(amount)} ${pluralize(amount, unit)}`
}

//eslint-disable-next-line
String.prototype.hashCode = function() {
  let h = 0, l = this.length, i = 0;
  if ( l > 0 )
    while (i < l)
      h = (h << 5) - h + this.charCodeAt(i++) | 0;
  return h;
};

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
  return Number(amount).toLocaleString()
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


export function getGreetingTime(m) {
  var g = null; //return g
  
  if(!m || !m.isValid()) { return; } //if we can't find a valid or filled moment, we return.
  
  var split_afternoon = 12 //24hr time to split the afternoon
  var split_evening = 17 //24hr time to split the evening
  var currentHour = parseFloat(m.format("HH"));
  
  if(currentHour >= split_afternoon && currentHour <= split_evening) {
    g = "afternoon";
  } else if(currentHour >= split_evening) {
    g = "evening";
  } else {
    g = "morning";
  }
  
  return g;
}

export function getProcessIcon(dbIcon) {
  return `process-icons/${dbIcon.split('.png')[0]}-process-icon@3x`
}
import moment from 'moment';

function display(task) {
	return words(task).toUpperCase()
}

function words(task) {
  if (!task || task === undefined || task.label === undefined) {
  	return ""
  }

  if (task.custom_display && task.custom_display !== "")
    return task.custom_display
  else if (task.label_index > 0)
    return task.label + "-" + task.label_index
  else
    return task.label
}

function icon(k) {
	var i = k.substr(0, k.length-4)
	return process.env.PUBLIC_URL + "/img/" + i + "@3x.png"
}

export { display, icon }
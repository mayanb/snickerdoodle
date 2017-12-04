import * as types from './ReducerTypes'
import * as ranges from '../components/Goals/GoalTypes'

export function weeklyGoalPredicate(action) {
	return action.name === types.GOALS && (!action.timerange || action.timerange === ranges.WEEKLY)
}

export function monthlyGoalPredicate(action) {
	return action.name === types.GOALS && (!action.timerange || action.timerange === ranges.MONTHLY)
}
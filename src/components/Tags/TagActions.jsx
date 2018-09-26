import * as actions from '../../reducers/APIDataActions'
import { TAGS } from '../../reducers/ReducerTypes'

const BASE_ENDPOINT = '/ics/tags'

export function fetchTags(query) {
    let request = { 
      url: `${BASE_ENDPOINT}/`, 
      query: query,
    }
    return actions.fetch(TAGS, request, null, res => res.body)
}
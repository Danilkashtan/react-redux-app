import {CREATE_POST} from "../redux/types";
import {showAlert} from "../redux/actions";

const forbidden = ['fuck', 'spam', 'php']
export function forbiddenWordsMiddleware({ dispatch }) {
  return function(next) {
    return function(action) {
      if (action.type === CREATE_POST) {
        const found = forbidden.filter(w => action.payload.title.includes(w))
        if (found.length) {
          return dispatch(showAlert("Найдены запрещенные слова"))
        }
      }
      return next(action)
    }
  }
}
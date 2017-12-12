import { createAction, NavigationActions } from '../utils'
import * as authService from '../services/auth'

export default {
  namespace: 'app',
  state: {
    fetching: false,
    login: false,
    quotationList: [],
    bingList: [],
    articleList:[],
    articleIndex:1,
    articleTotal:0,
    articleContent:{},
  },
  reducers: {
    loginStart(state, { payload }) {
      return { ...state, ...payload, fetching: true }
    },
    loginEnd(state, { payload }) {
      return { ...state, ...payload, fetching: false }
    },
    changeQuotation(state, { payload }) {
      return { ...state, quotationList: payload.quotationList }
    },
    changeBing(state, { payload }) {
      return { ...state, bingList: payload.bingList }
    },
    changeArticleList(state,{payload}){
      return {...state, articleList:payload.articleList }
    },
    changeArticleTotal(state,{payload}){
      return {...state, articleTotal:payload.articleTotal }
    },
    changeArticleIndex(state,{payload}){
      return {...state, articleIndex:payload.articleIndex }
    },
    changeArticleContent(state,{payload}){
      return {...state, articleContent:payload.articleContent }
    }
  },
  effects: {
    *login({ payload }, { call, put }) {
      yield put(createAction('loginStart')())
      const login = yield call(authService.login, payload)
      if (login) {
        yield put(
          NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Main' })],
          })
        )
      }
      yield put(createAction('loginEnd')({ login }))
    },
  },
}

import { createStore } from 'vuex'
import state from './state'
import actions from './actions'
import mutations from './mutations'
import demoStore from './demoStore'

export default createStore({
  state,
  mutations,
  actions,
  modules: {
    demoStore
  }
})
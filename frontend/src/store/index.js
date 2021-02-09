import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    companyName : "Groupomania"
  },
  getters: {
		copyright: (state) => {
			const currentYear = new Date().getFullYear()

			return `Copyright ${state.companyName} ${currentYear}`
		}
	},
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})

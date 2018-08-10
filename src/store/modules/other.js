const state = {
  modal: false,
};

const getters = {
  getModalStatus: state => state.modal
};

const actions = {
  OPEN_POPUP({ commit, state }) {
    if (!state.modal) commit('SET_POPUP', true)
  },
  CLOSE_POPUP({ commit, state }) {
    if (state.modal) {
      commit('SET_POPUP', false)
    }
  },
};

const mutations = {
  SET_POPUP(state, status) {
    state.modal = status
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
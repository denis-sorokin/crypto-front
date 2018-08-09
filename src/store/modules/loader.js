const state = {
  loading: false,
};

const getters = {
  getLoaderStatus: state => state.loading
};

const actions = {
  START_LOADER({ commit, state }) {
    if (!state.loading) commit('SET_LOADER', true)
  },
  STOP_LOADER({ commit, state }) {
    if (state.loading) {
      const timer = setTimeout(function () {
        if (state.loading) commit('SET_LOADER', false)
      }, 1500);

      if (!state.loading) clearTimeout(timer);
    }
  },
};

const mutations = {
  SET_LOADER(state, status) {
    state.loading = status
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
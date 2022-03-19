import { createStore } from "vuex";

const createVuexStore = (initialState) => {
  const state = Object.assign(
    {
      test: "test",
    },
    initialState
  );

  const mutations = {};

  const actions = {};

  const store = {
    modules: {},
    state,
    mutations,
    actions,
  };

  return createStore(store);
};

export default createVuexStore();
export { createVuexStore };

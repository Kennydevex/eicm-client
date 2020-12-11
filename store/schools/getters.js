export default {
  schools(state) {
    return state.schools;
  },
  name(state) {
    if (state.schools.length > 0) {
      return state.schools[0].name;
    }
    return;
  },

  slogan(state) {
    if (state.schools.length > 0) {
      return state.schools[0].slogan;
    }
    return;
  },
  abbr(state) {
    if (state.schools.length > 0) {
      return state.schools[0].abbr;
    }
    return;
  },
  about(state) {
    if (state.schools.length > 0) {
      return state.schools[0].about;
    }
    return;
  },
  history(state) {
    if (state.schools.length > 0) {
      return state.schools[0].history;
    }
    return;
  },
  marks(state) {
    if (state.schools.length > 0) {
      return state.schools[0].marks;
    }
    return;
  },
  contacts(state) {
    if (state.schools.length > 0) {
      return state.schools[0].contacts;
    }
    return;
  },
  location(state) {
    if (state.schools.length > 0) {
      return state.schools[0].location;
    }
    return;
  }
};

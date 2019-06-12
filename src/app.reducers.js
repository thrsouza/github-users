class User {
  constructor(id, name, login, avatar, bio, url, repos, followers) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.avatar = avatar;
    this.bio = bio;
    this.url = url;
    this.repos = repos;
    this.followers = followers;
  }
}

class Users {
  constructor() {
    this.data = [];
  }

  get storageId() {
    return '@app/users';
  }

  static ADD_USER(state, payload) {
    const data = [
      new User(
        payload.id,
        payload.name,
        payload.login,
        payload.avatar_url,
        payload.bio,
        payload.html_url,
        payload.public_repos,
        payload.followers,
      ),
      ...state.data,
    ];

    localStorage.setItem(state.storageId, JSON.stringify(data));
    return Object.assign(new Users(), state, { data });
  }

  static DELETE_USER(state, payload) {
    const data = state.data.filter(item => item.id !== payload.id);

    localStorage.setItem(state.storageId, JSON.stringify(data));
    return Object.assign(new Users(), state, { data });
  }
}

function getState(state) {
  const data = JSON.parse(localStorage.getItem(state.storageId));
  if (data) {
    return Object.assign(state, { data });
  }
  return state;
}

function createReducer(StateClass) {
  return (state, action) => {
    if (!state) return getState(new StateClass());

    if (action.type in StateClass) {
      return StateClass[action.type](state, action.data);
    }
    return state;
  };
}

const usersReducer = createReducer(Users);

export { usersReducer };

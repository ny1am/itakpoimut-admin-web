const AUTH = 'itp_auth';

export const loadAuth = () => {
  try {
    const serializedState = localStorage.getItem(AUTH);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveAuth = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    if (serializedState) {
      localStorage.setItem(AUTH, serializedState);
    } else {
      localStorage.removeItem(AUTH);
    }
  } catch (err) {
    //ignore this
  }
};


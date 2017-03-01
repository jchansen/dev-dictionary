/**
 * This is a utility file you can use to store and retrieve the user token
 * if your app is using a token-based authentication strategy.
 **/

export default {

  saveToken(token) {
    localStorage.loggedInUser = token;
  },

  hasToken() {
    return !!localStorage.loggedInUser;
  },

  getToken() {
    return localStorage.loggedInUser;
  },

  deleteToken() {
    delete localStorage.loggedInUser;
  }

}

// undici crashes on electron 22, and we only need rest for oauth
class REST {
  options = {};

  setToken() {
    return this;
  }
}

module.exports = {
  REST,
};

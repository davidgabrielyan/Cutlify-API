export default class UserMistakeError extends Error {
  constructor(props) {
    super(props);
    this.code = 400;
  }
}

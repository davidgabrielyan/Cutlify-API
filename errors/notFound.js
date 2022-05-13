export default class NotFoundError extends Error {
  constructor(props) {
    super(props);
    this.code = 404;
  }
}

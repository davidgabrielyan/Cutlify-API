export default class ForbiddenError extends Error {
  constructor(props) {
    super(props);
    this.code = 403;
  }
}

export default class UnprocessableEntity extends Error {
  constructor(props) {
    super(props);
    this.code = 422;
  }
}

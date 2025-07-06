class ErrorRepository {
  constructor() {
    this.errors = new Map();
  }

  addError(code, description) {
    this.errors.set(code, description);
  }

  translate(code) {
    return this.errors.has(code) ? this.errors.get(code) : 'Unknown error';
  }
}

export default ErrorRepository
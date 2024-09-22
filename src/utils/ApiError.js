class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.data = null;
    this.statusCode = statusCode;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  toJSON() {
    return {
      statusCode: this.statusCode,
      data: this.data,
      success: this.success,
      message: this.message,
    };
  }
}

export default ApiError;
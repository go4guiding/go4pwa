function notImplemented(functionName: string) {
  return function () {
    throw new Error(`Function '${functionName}' has not yet been implemented!`);
  };
}

export default notImplemented;

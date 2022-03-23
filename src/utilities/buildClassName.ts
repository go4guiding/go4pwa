type BuildClassNameArgs = (string | undefined | null)[];

function buildClassName(...args: BuildClassNameArgs) {
  return args.filter((arg) => !!arg).join(' ');
}

export default buildClassName;

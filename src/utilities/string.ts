type BuildClassNameArgs = (string | undefined | null)[];

export function buildClassName(...args: BuildClassNameArgs) {
  return args.filter((arg) => !!arg).join(' ');
}

export function randomString(length: number = 8) {
  return (Math.random() + 1).toString(36).substring(length);
}

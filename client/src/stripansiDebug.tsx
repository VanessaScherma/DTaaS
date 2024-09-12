import stripAnsi from 'strip-ansi';

export const cleanLog = (log: string) => {
  return stripAnsi(log);
};

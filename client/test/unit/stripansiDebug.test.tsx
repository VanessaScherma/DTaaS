import { cleanLog } from '../../src/stripansiDebug';
import stripAnsi from 'strip-ansi';

jest.mock('strip-ansi');

describe('cleanLog', () => {
  it('should call stripAnsi and return the cleaned log', () => {
    const log = '\u001b[4mThis is a test log\u001b[0m';
    const cleanedLog = 'This is a test log';
    
    (stripAnsi as jest.Mock).mockReturnValue(cleanedLog);
    
    const result = cleanLog(log);
    
    expect(stripAnsi).toHaveBeenCalledWith(log);
    expect(result).toBe(cleanedLog);
  });
});

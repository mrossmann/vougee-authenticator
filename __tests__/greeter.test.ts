import { greeter } from '../src/index';

test('VouGee Greeter', () => {
  expect(greeter()).toBe('### VouGee Authenticator ###');
});
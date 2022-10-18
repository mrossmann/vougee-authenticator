import { generateRequestUrl } from "../src/index";

test('generate request URL basic', () => {
  const url = generateRequestUrl();
  console.log('generated request url');
  console.log(JSON.stringify(url));
})
import { join } from 'path';
import { register } from 'tsconfig-paths';

import { compilerOptions } from './tsconfig.json';

const baseUrl = join(__dirname, 'build'); // This will get the absolute path for the build folder

register({
  baseUrl, // We're setting the base url
  paths: compilerOptions.paths, // Here we're calling for the paths in our tsconfig.json
});

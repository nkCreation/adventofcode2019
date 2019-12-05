import { IntCodeProgram } from '../utils/utils';
import { data } from './input.json';

console.log(IntCodeProgram([...data], 1));
console.log(IntCodeProgram([...data], 5));

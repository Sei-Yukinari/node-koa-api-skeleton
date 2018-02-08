import EventEmitter from 'events';

const define = Object.defineProperty;

const createOutputs = outputsArray => (
  outputsArray.reduce((obj, output) => {
    const result = obj;
    result[output] = output;
    return result;
  }, Object.create(null))
);


export default class Operation extends EventEmitter {
  static setOutputs(outputs) {
    define(this.prototype, 'outputs', {
      value: createOutputs(outputs),
    });
  }

  on(output, handler) {
    if (this.outputs[output]) {
      return this.addListener(output, handler);
    }

    throw new Error(`Invalid output "${output}" to operation ${this.constructor.name}.`);
  }
}

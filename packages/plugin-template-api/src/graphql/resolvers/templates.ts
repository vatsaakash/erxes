import { addAbortSignal } from 'stream';

const tags = {
  async jishee(template) {
    if (template.name === 'bla1') {
      return 'jishee';
    }
    return 'gomboo';
  }
};

export default tags;

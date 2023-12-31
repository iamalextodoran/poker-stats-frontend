import { produce } from 'immer';

export const reset = (initialState = {}) => initialState;

export const setProp = (state, { key = '', payload = undefined }) =>
  produce(state, (draft = {}) => {
    if (typeof key !== 'string') {
      const message = 'First argument in setProps needs to be a string, currently is';
      // eslint-disable-next-line
      return console.error(message, typeof key, key);
    }

    if (key.includes('?')) {
      // eslint-disable-next-line
      console.warn("Key may include unsafe characters ('?')", key);
    }

    const keys = key.split('.');

    for (let i = 0; i < keys.length - 1; i++) {
      const currentKey = keys[i];

      if (draft[currentKey] === undefined || draft[currentKey] === null) {
        draft[currentKey] = {};
      } else if (Array.isArray(draft[currentKey]) || typeof draft[currentKey] !== 'object') {
        const typeOf = Array.isArray(draft[currentKey]) ? 'array' : typeof draft[currentKey];
        const message = 'State value needs to be an object, currently is';
        // eslint-disable-next-line
        console.error(message, typeOf);
        break;
      }

      draft = draft[currentKey];
    }

    draft[keys[keys.length - 1]] = payload;
  });

export const updateProps = (state, { props = {} }) =>
  produce(state, (draft = {}) => {
    if (Array.isArray(props) || typeof props !== 'object') {
      const typeOf = Array.isArray(props) ? 'array' : typeof props;
      const message = 'First (and only) argument in updateProps needs to be an object, currently is';
      // eslint-disable-next-line
      return console.error(message, typeOf, props);
    }

    for (const [prop, value] of Object.entries(props)) {
      // TODO: warn when this contains unsanitized keys
      if (prop.includes('?')) {
        // eslint-disable-next-line
        console.warn("Prop key may include unsafe characters ('?')", props);
      }

      const keys = prop.split('.');

      for (let i = 0; i < keys.length - 1; i++) {
        const currentKey = keys[i];

        if (draft[currentKey] === undefined || draft[currentKey] === null) {
          draft[currentKey] = {};
        } else if (Array.isArray(draft[currentKey]) || typeof draft[currentKey] !== 'object') {
          const typeOf = Array.isArray(draft[currentKey]) ? 'array' : typeof draft[currentKey];
          const message = 'State value needs to be an object, currently is';
          // eslint-disable-next-line
          console.error(message, typeOf);
          break;
        }

        draft = draft[currentKey];
      }

      draft[keys[keys.length - 1]] = value;
    }
  });

export { produce };

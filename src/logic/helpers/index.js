export const mock = () => {};

export const generateRandomKey = () =>
  Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '');

export const getInitials = (string = '') =>
  string
    .trim()
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();

export const getKey = (key = '', option = {}) => option?.[key];

export const keyEqualToValue = (key = '', value = '', item = {}) => item?.[key] === value;

export const keyNotEqualToValue = (key = '', value = '', item = {}) => item?.[key] !== value;

export const classNames = (...classes) => classes.filter(Boolean).join(' ');

export const copyToClipboard = (content = '', cb = mock) => navigator.clipboard.writeText(content).then(cb);

export const oneOfEachKey = (key = '', acc, item = {}) => {
  if (!acc?.some(keyEqualToValue.bind(null, key, item[key]))) {
    acc.push(item);
  }

  return acc;
};

export const onFieldChange = (updateTransientProps = mock, key = '', e = {}) => {
  updateTransientProps({ [key]: e.target.value });
};

export const onDateChange = (updateTransientProps = mock, key = '', value = '') => {
  updateTransientProps({ [key]: value });
};

export const onKeyChange = (updateTransientProps = mock, key = '', valueKey = '', option = {}) => {
  updateTransientProps({ [key]: option?.[valueKey] });
};

export const removeWhiteSpace = (string = '') => string.replace(/\s/g, '');

export const uuid = () =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });

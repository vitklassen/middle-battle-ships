export const queryStringify = (data: { [key: string]: unknown }) => {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  // Здесь достаточно и [object Object] для объекта
  const keys = Object.keys(data);
  return keys.reduce(
    (result, key, index) => `${result}${key}=${encodeURIComponent(data[key] as string)}${
      index < keys.length - 1 ? '&' : ''
    }`,
    '?',
  );
};

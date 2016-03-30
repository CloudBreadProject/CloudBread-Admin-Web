export function queryToObject(query) {
  const splitedQuery = query.split('?');
  const search = splitedQuery[splitedQuery.length - 1];
  const params = search.split('&');
  const obj = {};
  params.forEach(param => {
    const [key, value] = param.split('=');
    if (!key) return;
    obj[key] = decodeURIComponent(value);
  });
  return obj;
}

export function objectToQuery(query) {
  let string = '';
  for (const key in query) {
    if (typeof(query[key]) === 'string') {
      string += `${key}=${encodeURIComponent(query[key])}`;
    }
  }
  return string;
}

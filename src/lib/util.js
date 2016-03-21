export function queryToObject(query) {
  const splitedQuery = query.split('?');
  const search = splitedQuery[splitedQuery.length - 1];
  const params = search.split('&');
  const obj = {};
  params.forEach(param => {
    const [key, value] = param.split('=');
    obj[key] = value;
  });
  return obj;
}

export function objectToQuery(query) {
  let string = '';
  for (const key in query) {
    if (typeof(query[key]) === 'string') {
      string += `${key}=${query[key]}`;
    }
  }
  return string;
}

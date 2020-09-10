const DEFAULT_HEADER = { 'Content-Type': 'application/json' };

const checkStatus = (res) => {
  if (res.ok) {
    return res;
  }
  const err = new Error(res.statusText);
  err.response = res;
  throw err;
};

const callApi = (url, requestOptions = { headers: DEFAULT_HEADER }) => {
  const { body, method, headers } = requestOptions;

  return fetch(url, {
    ...requestOptions,
    headers: { ...DEFAULT_HEADER, ...headers },
    body: JSON.stringify(body),
    method,
  })
    .then(checkStatus)
    .then((res) => (res.status === 204 ? '' : res.json()));
};

export default callApi;

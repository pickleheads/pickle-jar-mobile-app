const BASE_URL = 'https://us-central1-pickle-jar-1fb9f.cloudfunctions.net';

const target = {
  addIdea: {
    endpoint: '/addIdea',
    method: 'POST',
  },
  archiveIdea: {
    endpoint: '/archiveIdea',
    method: 'PUT',
  },
  deleteIdea: {
    endpoint: '/deleteIdea',
    method: 'DELETE',
  },
  listIdeas: {
    endpoint: '/listIdeas',
    method: 'GET',
  },
};

const api = new Proxy(target, {
  get: (obj, prop) => {
    const config = obj[prop];
    if (!config) {
      throw new Error(`Invalid API endpoint "${prop}"`);
    }
    let url = `${BASE_URL}${config.endpoint}`;
    return async (options = {}) => {
      const { body, query } = options;
      const querystring = Object.entries(query).map(([key, value]) => `${key}=${value}`).join('&');
      if (querystring) {
        url += `?${querystring}`
      }
      const response = await fetch(url, {
        body: JSON.stringify(body),
        method: config.method,
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error.message);
      }
      return data;
    };
  },
});

export { api };

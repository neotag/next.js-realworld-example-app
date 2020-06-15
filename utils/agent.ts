import _superagent from "superagent";
const superagent = require("superagent-promise")(_superagent, global.Promise);

const API_ROOT: string = "https://conduit.productionready.io/api";
//const encode = encodeURIComponent;
const responseBody = (res: { body: {} }) => res.body;

interface Requests {
  del(url: string): Promise<{}>;
  get(url: string): Promise<{}>;
  put(url: string, body: object): Promise<{}>;
  post(url: string, body: object): Promise<{}>;
}

interface Request {
  set(key: string, value: string): void;
}

interface Auth {
  current(): Promise<{}>;
  login(email: string, password: string): Promise<{}>;
  register(username: string, email: string, password: string): Promise<{}>;
  save(user: {}): Promise<{}>;
}

let token: null | string = null;
const tokenPlugin = (req: Request) => {
  if (token) {
    req.set("authorization", `Token ${token}`);
  }
};

const requests: Requests = {
  del: (url): Promise<{}> =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: (url) =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent
      .put(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
  post: (url, body) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
};

const Auth: Auth = {
  current: () => requests.get("/user"),
  login: (email, password) =>
    requests.post("/users/login", { user: { email, password } }),
  register: (username, email, password) =>
    requests.post("/users", { user: { username, email, password } }),
  save: (user) => requests.put("/user", { user }),
};

export default {
  Auth,
  setToken: (_token: string | null) => {
    token = _token;
  },
};

declare namespace Express {
  // eslint-disable-next-line @typescript-eslint/interface-name-prefix
  export interface User {
    _id: string;
    email: string;
    role: string;
    requests: string[];
  }
}

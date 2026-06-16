export const environment = {
  production: false,
  /**
   * Local dev (proxy): '/api' + proxy.conf.json me apna backend URL
   * Production: 'https://api.yourdomain.com/api'
   */
  apiUrl: '/api',

  /** Backend ready hone tak true rakho — CORS / failed requests nahi aayenge */
  useMockApi: true,
};

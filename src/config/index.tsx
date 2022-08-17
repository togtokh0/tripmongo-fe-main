const config = {
  APP_URL: process.env.REACT_APP_URL || `http://localhost:3000`,
  BACK_END_URL:
    process.env.REACT_APP_BACK_END_URL || `http://localhost:5000/api/v1/`,
  REACT_APP_CDN_URL: process.env.REACT_APP_CDN_URL || `http://localhost:5000`,
};
export default config;

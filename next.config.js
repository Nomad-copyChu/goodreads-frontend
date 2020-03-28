require("dotenv").config();

module.exports = {
  env: {
    END_POINT: process.env.END_POINT,
    GOOGLE_ANALYTIC_ID: process.env.GOOGLE_ANALYTIC_ID,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID
  }
};

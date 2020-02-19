require("dotenv").config();

module.exports = {
  env: {
    END_POINT: process.env.END_POINT,
    GOOGLE_TAG_MANAGER_ID: process.env.GOOGLE_TAG_MANAGER_ID,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID
  }
};

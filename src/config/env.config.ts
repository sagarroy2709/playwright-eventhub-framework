import * as dotenv from 'dotenv';
// import * as path from 'path';

// // Reads ENV variable (defaults to 'dev' if not set)
// const environment = process.env.ENV || 'dev';

// // Loads the matching .env file
// dotenv.config({
//   path: path.resolve(__dirname, `../.env.${environment}`)
// });

export const ENV = {
  BASE_URL: process.env.BASE_URL ??  "https://eventhub.rahulshettyacademy.com",
  USER_ONE: {
    USERNAME: process.env.USER_ONE_USERNAME ??  "roy.sagar.1989@gmail.com",
    PASSWORD: process.env.USER_ONE_PASSWORD ?? "strongP@ssw0rd"
  },
};
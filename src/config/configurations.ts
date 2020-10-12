export default () => ({
  environment: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 3000,
  db: {
    uri: process.env.MONGO_DB_URI || 'localhost:27017',
    name: process.env.MONGO_DB_NAME || 'hacker-news-app',
    user: process.env.MONGO_DB_USER,
    password: process.env.MONGO_DB_PASSWORD
  },
  apiUrl: process.env.HACKER_NEWS_URL,
});
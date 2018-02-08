module.exports = {
  "development": {
    "username": "hoge",
    "password": "password",
    "database": "postgres",
    "host": "postgresql",
    "dialect": "postgres",
  },
  "development": {
    "username": "hoge",
    "password": "password",
    "database": "postgres",
    "host": "postgresql",
    "dialect": "postgres",
  },
  "production": {
    "use_env_variable": "DATABASE_URL",
    "dialectOptions": {
      "ssl": {
        "require": true
      }
    }
  }
}

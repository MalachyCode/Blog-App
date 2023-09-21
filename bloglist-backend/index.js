const app = require('./app');
const config = require('./utils/config');
const logger = require('./utils/logger');
const express = require('express');

app.use(express.urlencoded({ extended: true }));

// const PORT = process.env.PORT || 3003;
app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});

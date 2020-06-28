import app from "./app";
import logger from "./config/logger";

const PORT = 3000;

app.listen(PORT, () => {
  logger.info(`App is listening on port ${PORT}`);
});

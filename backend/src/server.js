import app from "./app.js";
import { env } from "./config/env.js";

app.listen(env.PORT, () => {
  console.log(`Vibe Coffee API dang chay tai http://localhost:${env.PORT}`);
});

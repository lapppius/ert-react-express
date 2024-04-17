import express from "express";
import cors from "cors";
import apiRoutes from "./src/routes/index.js";

const port = 3001;

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

//mount apiRoutes on the "/api" path
app.use("/api", apiRoutes);

// Start the server.
app.listen(port, () => {
  console.log(`Server listening on port ${port}.`, `http://localhost:${port}/`);
});

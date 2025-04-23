const express = require("express");
const trafficRoutes = require("./routes/trafficRoutes");
const mappingRoutes = require("./routes/mappingRoutes");

const app = express();
app.use(express.json());

app.use("/", trafficRoutes);
app.use("/mapping", mappingRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

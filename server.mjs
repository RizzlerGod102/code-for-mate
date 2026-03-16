import express from "express";
import { HouseListController } from "./controllers/HouseListController.mjs";
import { HouseBuilderController } from "./public/controllers/HouseBuilderController.mjs";
import { ShowcaseController } from "./controllers/ShowcaseController.mjs";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for form submissions

// ----------------------------
// API Routes
// ----------------------------

// House List routes
app.get("/api/houses", HouseListController.getAll);
app.post("/api/houses", HouseListController.create);
app.put("/api/houses/:id", HouseListController.update);
app.delete("/api/houses/:id", HouseListController.delete);

// House Builder routes (optional if different from HouseList)
app.get("/api/housebuilder/:id", HouseBuilderController.getById);
app.post("/api/housebuilder", HouseBuilderController.createOrUpdate);

// Showcase routes
app.get("/api/showcase", ShowcaseController.getAll);
app.post("/api/showcase", ShowcaseController.create);
app.delete("/api/showcase/:id", ShowcaseController.delete);

// ----------------------------
// Serve frontend
// ----------------------------
app.use(express.static("public")); // serves your HTML, JS, CSS in public folder

// ----------------------------
// Start server
// ----------------------------
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
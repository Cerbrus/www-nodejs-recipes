import express, { Request, Response } from "express";
import { engine } from "express-handlebars";
import path from "path";
import recipes from "./recipes.json";

const app = express();
const PORT = 3000;

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname));

app.get("/", (_req: Request, res: Response) => {
  res.render("index", { title: "Simple Recipes", recipes });
});

app.get("/recipe/:slug", (req: Request, res: Response) => {
  const recipe = recipes.find((r) => r.slug === req.params.slug);
  if (!recipe) {
    res.status(404).send("Recipe not found");
    return;
  }
  res.render("recipe", { title: recipe.title, recipe });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

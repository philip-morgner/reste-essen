const https = require("https");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");

const recipes = require("./recipes.json");
const config = require("./config.json");

const options = {
  key: fs.readFileSync(config.ssl.key),
  cert: fs.readFileSync(config.ssl.cert),
};

const app = express();

app.use(cors());
app.use(bodyParser.json());

let uniqueIngredientsArray = [];

recipes.forEach(({ ingredients }) => {
  ingredients.forEach((ingredient) => {
    // search if ingredient already exists, if it finds, stop searching
    if (uniqueIngredientsArray.some(({ name }) => name === ingredient.name))
      return;
    // else add to uniqueIngredientsArray
    uniqueIngredientsArray.push({
      name: ingredient.name,
      measure: ingredient.measure,
    });
  });
});

app.get("/", function (req, res) {
  res.send(uniqueIngredientsArray);
});

// find all recipes with available or LESS ingredients
const findExactRecipes = (availableIngr) => {
  return recipes.filter(({ ingredients }) =>
    ingredients.every(({ name, amount }) =>
      // every ingredient must be available in sufficient amount
      availableIngr.some((elem) => elem.name === name && elem.amount >= amount)
    )
  );
};

// find all recipes with available or MORE ingredients
const exploreRecipes = (availableIngr) => {
  return recipes.filter(({ ingredients }) =>
    ingredients.some(({ name }) =>
      availableIngr.some((elem) => elem.name === name)
    )
  );
};

app.post("/", function (req, res) {
  const { ingredients, mode = "exact" } = req.body;
  let filteredRecipes;
  if (mode === "exact") {
    filteredRecipes = findExactRecipes(ingredients);
  }
  if (mode === "explore") {
    filteredRecipes = exploreRecipes(ingredients);
  }

  res.send(filteredRecipes);
});

const getRecipe = (recipeId) => {
  return recipes.find(({ recipe_id }) => recipe_id === recipeId);
};

app.get("/:recipeId", (req, res) => {
  const { recipeId } = req.params;
  const recipe = getRecipe(recipeId);

  res.send(recipe);
});

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(config.server.port);

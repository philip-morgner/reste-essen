import { css, media } from "glamor";

// Layout

export const titleStyle = css({
  display: "flex",
  justifyContent: "center",
  margin: "5vw",
});

// IngredientComponent

export const ingredientListCellStyle = css({
  display: "grid",
  gridTemplateColumns: "10fr 6fr 4fr 1fr",
  alignItems: "center",
});

export const inputStyle = css({
  justifySelf: "center",
  display: "inline",
  width: "80%",
});

export const overflowStyle = css({
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap",
});

// IngredientsDropdownComponent
// RecipeListComponent
// ListCellComponent

export const adjustWidth = css({
  width: "30vw",
});

export const hoverStyle = css({
  cursor: "pointer",
  ":hover": { backgroundColor: "#EEEEEE" },
});

// IngredientsListComponent

export const flexStyleIngredientsList = css(
  {
    display: "flex",
    justifyContent: "space-between",
  },
  media("(max-width: 1250px)", {
    flexDirection: "column",
    alignItems: "center",
  })
);

// ListCellComponent

export const adjustHeight = css({
  fontSize: "2.5em",
});

export const flexStyleWithColor = css({
  display: "flex",
  justifyContent: "space-between",
  color: "black",
});

export const disableLinkStyle = css({
  pointerEvents: "none",
});

// FindRecipesPage

export const gridStyleFindRecipesPage = css({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  justifyItems: "center",
});

export const errorStyle = css({ alignSelf: "start" });

// Home

export const flexStyleWithButton = css({
  display: "flex",
  justifyContent: "center",
  "& button": {
    margin: "80px 20px",
  },
});

// RecipePage

export const centerStyle = css({
  display: "flex",
  justifyContent: "center",
});

export const gridStyleRecipePage = css({
  display: "grid",
  gridTemplateColumns: "1fr 2fr",
  gridColumnGap: 8,
  alignItems: "start",
  margin: 32,
});

export const flexColumnStyle = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "sapce-evenly",
});

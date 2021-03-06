# Recipe Project

## Purpose
The purpose of the recipe app would be to show the user different recipes based a survey they could take. After trying the recipe the user could rate it out of 5 stars.

## Detailed Sketch
This is the detailed sketch

https://www.figma.com/file/lY1uYWeWLJp8aHqPVEvo60/Recipe-App-Wireframe?node-id=1%3A98

## Features

### Priorities
1, 2, 3, 4, 5, (6 & 7 down the road features)

 1. Survey Page
  - Select diet section (paleo, keto, etc...)
    - Picker for each diet option on Spoonacular
  - Add ingredients section
    - Search bar with ingredients
    - They can add multiple ingredients from the result to a stack
    - Continue button

  Pseudocode:
  ```js
  # select diet section

  # ingredient search
  search (input) {
    # send request to api to search for ingredients
    # save results to object array
    # display results of object array
  }

  select (ingredientName) {
    # send request to api to search for recipe by list of ingredients using the object array
    # save results to object array
  }

  continue () {
    # redirect to recipe result page passing recipe object array via state
  }
  ```
  2. Recipe result page
  - At the top, some sort of carousel with top 3 recipes matching the diet
  - Grid of cards with recipe image, name, ingredients, nutritional facts, and complimentary drink
  3. View single recipe page
  - Displays recipe information on a single page so it's not cluttered in a card and easier to view. Would just display in a container
  - Page section with ability to rate the recipe
  - Page section with similar recipe suggestions (limit to 3) 

  Pseudocode:
  ```js
  # getting similar recipes
  getSimilarRecipes (recipeId) {
    # send request to api to get 3 similar recipes
    # save results to an object array
  }

  # rating a recipe
  rateRecipe (recipeId) {
    # send request to node server with recipeId and rating (1-5)
    # display success/error message
  }
  ```
  4. User sign up page/ User login page
  - After they login, take them to Survey page

  - After they sign up, take them to Survey page
  5. Saved recipes page
  - Grid of cards with recipe image, name, ingredients, nutritional facts, and complimentary drink
  - Gets data from node server endpoint (/saved-recipes) which returns JSON of saved recipes

  Pseudocode:
  ```js
  getSavedRecipes () {
    # sends a request to node server endpoint
    # sets state with object array of saved recipes
    # display saved recipes 
  }
  ```
  6. Get grocery stores near with selected ingredients *
  - Based on your location, get the grocery stores near you 
  that have the ingredients
  - Could use browser api or manual input
  - Add option to filter by grocery stores that do walk-in or delivery
  7.   Ability to comment on recipes *

## Resources
### API: Spoonacular
Ingredient Search:

We can also search by diet by providing a `diet` query parameter

https://spoonacular.com/food-api/docs#Ingredient-Search

Search Recipes by Ingredients:

https://spoonacular.com/food-api docs#Search-Recipes-by-Ingredients

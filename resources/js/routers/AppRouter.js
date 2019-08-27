import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import CategoriesPage from '../views/CategoriesPage';
import CuisinesPage from '../views/CuisinesPage';
import EditRecipePage from '../views/EditRecipePage';
import FavoritesPage from '../views/FavoritesPage';
import ImportExportPage from '../views/ImportExportPage';
import IngredientsPage from '../views/IngredientsPage';
import MealPlannerPage from '../views/MealPlannerPage';
import MyRecipesPage from '../views/MyRecipesPage';
import NotFoundPage from '../views/NotFoundPage';
import RecipeBookPage from '../views/RecipeBookPage';
import SettingsPage from '../views/SettingsPage';
import ShoppingListPage from '../views/ShoppingListPage';
import ViewIngredientPage from '../views/ViewIngredientPage';
import ViewRecipePage from '../views/ViewRecipePage';

export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PrivateRoute path="/home" component={MyRecipesPage} exact={true} />
        <PrivateRoute path="/recipes" component={MyRecipesPage} exact={true} />
        <PrivateRoute path="/recipes/create" component={ViewRecipePage} exact={true} />
        <PrivateRoute path="/recipes/:id" component={ViewRecipePage} exact={true} />
        <PrivateRoute path="/recipes/:id/edit" component={EditRecipePage} exact={true} />
        <PrivateRoute path="/categories" component={CategoriesPage} exact={true} />
        <PrivateRoute path="/cuisines" component={CuisinesPage} exact={true} />
        <PrivateRoute path="/favorites" component={FavoritesPage} exact={true} />
        <PrivateRoute path="/import-export" component={ImportExportPage} exact={true} />
        <PrivateRoute path="/ingredients" component={IngredientsPage} exact={true} />
        <PrivateRoute path="/ingredients/:id" component={ViewIngredientPage} exact={true} />
        <PrivateRoute path="/ingredients/:id/edit" component={ViewIngredientPage} exact={true} />
        <PrivateRoute path="/meal-planner" component={MealPlannerPage} exact={true} />
        <PrivateRoute path="/recipe-book" component={RecipeBookPage} exact={true} />
        <PrivateRoute path="/settings" component={SettingsPage} exact={true} />
        <PrivateRoute path="/shopping-list" component={ShoppingListPage} exact={true} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;

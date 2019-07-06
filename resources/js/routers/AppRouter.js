import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import CategoriesPage from '../views/CategoriesPage';
import CuisinesPage from '../views/CuisinesPage';
import FavoritesPage from '../views/FavoritesPage';
import ImportExportPage from '../views/ImportExportPage';
import MealPlannerPage from '../views/MealPlannerPage';
import MyRecipesPage from '../views/MyRecipesPage';
import NotFoundPage from '../views/NotFoundPage';
import RecipeBookPage from '../views/RecipeBookPage';
import SettingsPage from '../views/SettingsPage';
import ShoppingListPage from '../views/ShoppingListPage';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PrivateRoute path="/home" component={MyRecipesPage} exact={true} />
        <PrivateRoute path="/favorites" component={FavoritesPage} exact={true} />
        <PrivateRoute path="/categories" component={CategoriesPage} exact={true} />
        <PrivateRoute path="/cuisines" component={CuisinesPage} exact={true} />
        <PrivateRoute path="/shopping-list" component={ShoppingListPage} exact={true} />
        <PrivateRoute path="/meal-planner" component={MealPlannerPage} exact={true} />
        <PrivateRoute path="/recipe-book" component={RecipeBookPage} exact={true} />
        <PrivateRoute path="/import-export" component={ImportExportPage} exact={true} />
        <PrivateRoute path="/settings" component={SettingsPage} exact={true} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;

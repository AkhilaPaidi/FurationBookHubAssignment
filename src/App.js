import { Component } from "react";
import { Switch, Route } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";
import Login from "./Components/Login";
import Home from "./Components/Home";
import BookShelves from "./Components/BookShelves";
import MyFavorites from "./Components/MyFavourites";
import BookItemDetails from "./Components/BookItemDetails";
import FavoriteContext from "./Context/FavoriteContext";
import NotFound from "./Components/NotFound";
import "./App.css";

class App extends Component {
  state = { favoriteList: [] };

  onToggleFavorite = (bookDetails) => {
    const { favoriteList } = this.state;
    const isAlreadyExist = favoriteList.some(
      (eachItem) => eachItem.id === bookDetails.id
    );

    if (isAlreadyExist === true) {
      this.setState((prevState) => ({
        favoriteList: prevState.favoriteList.filter(
          (eachBook) => eachBook.id !== bookDetails.id
        )
      }));
    } else {
      this.setState((prevState) => ({
        favoriteList: [...prevState.favoriteList, bookDetails]
      }));
    }
  };

  render() {
    const { favoriteList } = this.state;

    return (
      <FavoriteContext.Provider
        value={{
          favoriteList,
          onToggleFavorite: this.onToggleFavorite
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/shelf" component={BookShelves} />
          <ProtectedRoute exact path="/favorite" component={MyFavorites} />
          <ProtectedRoute exact path="/books/:id" component={BookItemDetails} />
          <Route component={NotFound} />
        </Switch>
      </FavoriteContext.Provider>
    );
  }
}

export default App;
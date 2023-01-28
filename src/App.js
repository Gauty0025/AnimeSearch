import SearchPage from "./searchbox";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./styles.css";
import AnimeInfo from "./anime-info";
import React from "react";

function App() {
  return (
    <div className="App">
      <h1>Search Anime Characters </h1>
      {/* <Router>
        <Switch>
          <Route path="/" exact component={SearchPage} />
          <Route path="/anime-info" component={AnimeInfo} />
        </Switch>
        </Router> */}

      <SearchPage />
    </div>
  );
}

export default App;

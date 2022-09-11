import React from "react";
import { connect } from "react-redux";
import CocktailList from "./CocktailList";
import CocktailFilter from "./CocktailFilter";
import ScrollTopButton from "./ScrollTopButton";
import { filteredCocktailsSelector } from "../selectors";

const CocktailBrowser = ({ filteredCocktails }) => {
  return (
    <div>
      <CocktailFilter filteredCocktails={filteredCocktails} />
      <CocktailList cocktails={filteredCocktails} />
      <ScrollTopButton />
    </div>
  );
};

const mapStateToProps = state => ({
  filteredCocktails: filteredCocktailsSelector(state)
});

export default connect(mapStateToProps)(CocktailBrowser);

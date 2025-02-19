import Filter from "./Filter";
import Search from "./Search";
import CardsContainer from "./CardsContainer";
import { useState } from "react";
import GoToTop from "./GoToTop";
import { useTheme } from "../hooks/useTheme";

const Home = () => {
  const [query, setQuery] = useState("");
  const [isDark] = useTheme();

  return (
    <>
      <div className={`search-filter-container ${isDark ? "dark" : ""}`}>
        <div className="search-filter-container-content max-width px">
          <Search setQuery={setQuery} />
          <Filter setQuery={setQuery} />
        </div>
      </div>
      <CardsContainer query={query} />
      <GoToTop />
    </>
  );
};

export default Home;

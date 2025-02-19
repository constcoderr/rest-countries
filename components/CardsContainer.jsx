import { useContext, useEffect, useState } from "react";
import Card from "./Card";
import CardsContainerShimmer from "./CardsContainerShimmer";
import { ThemeContext } from "../contexts/ThemeContext";
import { useTheme } from "../hooks/useTheme";

const CardsContainer = ({query}) => {
  const [cardsData, setCardsData] = useState("");
  const [isDark] = useTheme();

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => setCardsData(data));
  }, []);

  return (
    <main className={isDark ? 'dark' : ''}>
      <div className="container max-width px">
        {cardsData ? (
          cardsData
            .filter((cardData) => {
              return cardData.name.common.toLowerCase().includes(query) || cardData.region.toLowerCase().includes(query)
            })
            .map((cardData) => {
              return (
                <Card
                  key={cardData.name.common}
                  flag={cardData.flags.svg}
                  name={cardData.name.common}
                  population={cardData.population}
                  region={cardData.region}
                  capital={cardData.capital}
                  data={cardData}
                />
              );
            })
        ) : (
          <CardsContainerShimmer />
        )}
      </div>
    </main>
  );
};

export default CardsContainer;

import "./CardsContainerShimmer.css";

const CardsContainerShimmer = () => {
  return Array.from({ length: 10 }).map((_, index) => {
    return <div key={index} className="country-card shimmer-card"></div>;
  });
};

export default CardsContainerShimmer;

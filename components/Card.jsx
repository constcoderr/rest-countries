import { Link } from "react-router";

const Card = ({ flag, name, population, region, capital, data }) => {
  return (
    <Link to={name} state={data}>
      <div className="country-card">
        <img src={flag} alt={name} />
        <div className="country-card-content">
          <h3 className="country-name">{name}</h3>
          <p className="country-population-para">
            Population:{" "}
            <span className="country-population">
              {population.toLocaleString("en-PK")}
            </span>
          </p>
          <p className="country-region-para">
            Region: <span className="country-region">{region}</span>
          </p>
          <p className="country-capital-para">
            Capital: <span className="country-capital">{capital}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Card;

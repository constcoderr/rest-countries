import { useContext, useEffect, useState } from "react";
import "./CountryDetails.css";
import { Link, useLocation, useParams } from "react-router";
import { ThemeContext } from "../contexts/ThemeContext";

const CountryDetails = () => {
  const { country } = useParams();
  const [countryDetail, setCountryDetail] = useState(null);
  const [isDark] = useContext(ThemeContext);

  let { state } = useLocation();

  function updateData(data) {
    setCountryDetail({
      flag: data.flags.svg,
      name: data.name.common || data.name,
      nativeName: data.name.nativeName
        ? Object.values(data.name.nativeName)[0].common
        : data.name.common,
      population: data.population,
      region: data.region,
      subregion: data.subregion ? data.subregion : "no subregion",
      capital: data.capital[0],
      tld: data.tld?.[0],
      currencies: Object.values(data.currencies || {})
        .map((currencyObj) => {
          return currencyObj.name;
        })
        .join(", "),
      languages: Object.values(data.languages || {}).join(", "),
      borders: [],
    });

    if (!data.borders) {
      data.borders = [];
    }

    Promise.all(
      data.borders.map((border) => {
        return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([data]) => data.name.common);
      })
    ).then((borderData) => {
      setTimeout(() => {
        setCountryDetail((prevState) => ({
          ...prevState,
          borders: [...borderData],
        }));
      });
    });
  }

  useEffect(() => {
    if (state) {
      updateData(state);
      return;
    }

    fetch(`https://restcountries.com/v3.1/name/${country}`)
      .then((res) => res.json())
      .then((countryData) => {
        if (Array.isArray(countryData) && countryData.length > 0) {
          let [data] = countryData;
          updateData(data);
        }
      });
  }, [country]);

  return countryDetail === null ? (
    "loading..."
  ) : (
    <>
      <div className={`btn-container max-width px ${isDark ? "dark" : ""}`}>
        <button
          className="back-btn"
          onClick={() => {
            history.back();
          }}
        >
          <span>
            <svg
              className="black-arrow-svg"
              fill="#000000"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="15px"
              height="15px"
              viewBox="0 0 400.004 400.004"
              xmlSpace="preserve"
            >
              <g>
                <path
                  d="M382.688,182.686H59.116l77.209-77.214c6.764-6.76,6.764-17.726,0-24.485c-6.764-6.764-17.73-6.764-24.484,0L5.073,187.757
      c-6.764,6.76-6.764,17.727,0,24.485l106.768,106.775c3.381,3.383,7.812,5.072,12.242,5.072c4.43,0,8.861-1.689,12.242-5.072
      c6.764-6.76,6.764-17.726,0-24.484l-77.209-77.218h323.572c9.562,0,17.316-7.753,17.316-17.315
      C400.004,190.438,392.251,182.686,382.688,182.686z"
                />
              </g>
            </svg>
            <svg
              className="white-arrow-svg hidden"
              fill="#ffffff"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="15px"
              height="15px"
              viewBox="0 0 400.004 400.004"
              xmlSpace="preserve"
            >
              <g>
                <path
                  d="M382.688,182.686H59.116l77.209-77.214c6.764-6.76,6.764-17.726,0-24.485c-6.764-6.764-17.73-6.764-24.484,0L5.073,187.757
      c-6.764,6.76-6.764,17.727,0,24.485l106.768,106.775c3.381,3.383,7.812,5.072,12.242,5.072c4.43,0,8.861-1.689,12.242-5.072
      c6.764-6.76,6.764-17.726,0-24.484l-77.209-77.218h323.572c9.562,0,17.316-7.753,17.316-17.315
      C400.004,190.438,392.251,182.686,382.688,182.686z"
                />
              </g>
            </svg>
          </span>
          Back
        </button>
      </div>
      <main className={isDark ? "dark" : ""}>
        <section className="country-details-wrapper max-width px">
          <div className="frame">
            <img src={countryDetail.flag} alt={`${countryDetail.name} flag`} />
          </div>
          {/* frame ends here */}
          <div className="country-details-container">
            <h3 className="country-name">{countryDetail.name}</h3>
            <div className="paras-wrapper">
              <span>
                <p className="native-name-para">
                  Native Name:
                  <span className="native-name">
                    {countryDetail.nativeName}
                  </span>
                </p>
                <p className="population-para">
                  Population:
                  <span className="population">
                    {countryDetail.population.toLocaleString("en-PK")}
                  </span>
                </p>
                <p className="region-para">
                  Region:<span className="region">{countryDetail.region}</span>
                </p>
                <p className="sub-region-para">
                  Sub Region:
                  <span className="sub-region">{countryDetail.subregion}</span>
                </p>
                <p className="capital-para">
                  Capital:
                  <span className="capital">{countryDetail.capital}</span>
                </p>
              </span>
              <span>
                <p className="top-level-domain-para">
                  Top Level Domain:
                  <span className="top-level-domain">{countryDetail.tld}</span>
                </p>
                <p className="curriencies-para">
                  Currencies:
                  <span className="currencies">{countryDetail.currencies}</span>
                </p>
                <p className="languages-para">
                  Languages:
                  <span className="languages">{countryDetail.languages}</span>
                </p>
              </span>
            </div>
            <div className="border-countries-wrapper">
              <p>Border Countries:</p>
              <div className="btns-container">
                {countryDetail.borders.map((border) => {
                  return (
                    <Link className="border-btn" key={border} to={`/${border}`}>
                      {border}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          {/* country details container ends here */}
        </section>
      </main>
    </>
  );
};

export default CountryDetails;

import { useContext } from "react";
import { CityContext } from "../../providers/CityProvider";
import useDailyForecasts from "../../hooks/useDailyForecasts";
import DailyForecastList from "../DailyForecastList";
import { StatusOperation } from "../../@types/apiTypes";

export default function DailyForecastSection() {
  const { cityName, city } = useContext(CityContext);
  const { forecasts, statusForecasts, errorMessageForecasts } =
    useDailyForecasts(city);

  if (statusForecasts === StatusOperation.PENDING) {
    return <div>Loading daily forecasts...</div>;
  }

  if (statusForecasts === StatusOperation.ERROR) {
    return <div>{errorMessageForecasts}</div>;
  }

  if (!city || !forecasts) {
    return null;
  }

  return (
    <section className="forecasts">
      <h2 className="forecasts__city">{cityName}</h2>
      <DailyForecastList dailyForecasts={forecasts} />
    </section>
  );
}

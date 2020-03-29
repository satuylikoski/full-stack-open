import React, { useState } from 'react';

import countryService from '../services/countries';

import Button from '../common/Button';
import Input from '../common/Input';
import Notification from '../components/Notification';

export default function Countries() {
  const [countries, setCountries] = useState('');
  const [selectedInfo, setSelectInfo] = useState('');

  const findCountry = value => {
    setSelectInfo(value);

    countryService
      .findCountries(value)
      .then(response => setCountries(response));
  };

  const hasSeveralCountries = countries.length <= 10 && countries.length > 1;

  return (
    <div style={{ paddingBottom: '100px' }}>
      <Input
        onChange={e => findCountry(e.target.value)}
        placeholder="Country"
        value={selectedInfo}
      />

      {countries.length > 10 && (
        <Notification text="Could you specify a bit :)" />
      )}

      {hasSeveralCountries &&
        countries.map((country, i) => (
          <Button onClick={() => findCountry(country.name)} key={i}>
            {country.name}
          </Button>
        ))}

      {countries.length === 1 &&
        countries.map((country, i) => (
          <div key={i}>
            <p>Country name: {country.name}</p>
            <p>Population: {country.population}</p>
            <img
              alt="country-flag"
              src={country.flag}
              style={{ width: '100px' }}
            />

            <p>Weather</p>
          </div>
        ))}
    </div>
  );
}

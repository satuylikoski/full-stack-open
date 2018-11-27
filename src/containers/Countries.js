import React, { Component, Fragment } from 'react';

import countryService from '../services/countries';

import Input from '../common/Input';

class Countries extends Component {
  constructor(props) {
    super(props);
    this.state = { countries: [], selectedInfo: '' };
  }

  findCountry = e => {
    this.setState({ selectedInfo: ''});

    countryService
      .findCountries(e.target.value)
      .then(response =>
        this.setState({ countries: response }));
  }

  openDetails = country => () => {
    this.setState({ selectedInfo: country })
  }

  render() {
    return (
      <Fragment>
        <Input 
          onChange={this.findCountry}
          placeholder="Country"
        />
        {this.state.countries.length > 10 && 'liikaa hakuja'}
        <ul>
          {this.state.countries.length <= 10 && this.state.countries.length > 1 && this.state.countries.map((country, i) =>
              <li key={i}><button onClick={this.openDetails(country)}>{country.name}</button></li>
          )}
        </ul>
        {this.state.countries.length === 1 && this.state.countries.map((country, i) =>
          <div key={i}>
            <li>{country.name}</li>
            <li>{country.population}</li>
            <div style={{ height: '10px'}}>
              <object aria-label="flag" data={country.flag}></object>
            </div>
          </div>
        )}
        {this.state.selectedInfo !== '' && (
         <div>
          <li>{this.state.selectedInfo.name}</li>
          <li>{this.state.selectedInfo.population}</li>
         </div>
        )}
      </Fragment>
    );
  }
}

export default Countries;
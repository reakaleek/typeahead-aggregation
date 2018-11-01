import React, { Component } from 'react';
import GoogleAdwordsService from "./services/GoogleAdwordsService";
import AsyncSelect from 'react-select/lib/Async';
import ClicksAndImpressions from "./components/ClicksAndImmpressions";
import CustomOption from "./components/CustomOption";
import Hero from "./components/Hero";

const service = new GoogleAdwordsService();
const promiseOptions = inputValue => service.getData(inputValue);

class App extends Component {

  state = {
    selectedOption: null,
    inputText: ''
  };

  handleChange = (selectedOption) => {
      this.setState({ selectedOption: selectedOption.constructor === Array ? null : selectedOption });
  };

  handleInputChange = (inputText) => {
      this.setState({ inputText });
  };

  render = () => (
        <div className="app">
          <Hero title={'adverity'} subtitle={'Programming Challenge'}/>
          <div className="section">
            <div className="container">
              <div className="columns is-centered">
                <div className="column is-6">
                    <AsyncSelect value={this.state.selectedOption}
                                 onInputChange={this.handleInputChange}
                                 loadOptions={promiseOptions}
                                 onChange={this.handleChange}

                                 getOptionLabel={(option) => option['channel']}
                                 getOptionValue={(option) => option}
                                 components={{ Option: CustomOption(this.state.inputText) }}
                    />
                    { <ClicksAndImpressions adword={this.state.selectedOption}/> }
                </div>
              </div>
            </div>
          </div>
        </div>
    );
}

export default App;

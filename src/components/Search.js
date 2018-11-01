import React, { Component } from 'react';
import AsyncSelect from 'react-select/lib/Async';
import GoogleAdwordsService from "../services/GoogleAdwordsService";
import CustomOption from "./CustomOption";
import ClicksAndImpressions from "./ClicksAndImmpressions";

const service = new GoogleAdwordsService();
const promiseOptions = inputValue => service.getData(inputValue);
class Search extends Component {

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
        <React.Fragment>
            <AsyncSelect value={this.state.selectedOption}
                         onInputChange={this.handleInputChange}
                         loadOptions={promiseOptions}
                         onChange={this.handleChange}
                         getOptionLabel={(option) => option['channel']}
                         getOptionValue={(option) => option}
                         components={{ Option: CustomOption(this.state.inputText) }}
            />
            { <ClicksAndImpressions adword={this.state.selectedOption}/> }
        </React.Fragment>
    );
}

export default Search;

import Highlighter from "react-highlight-words";
import React from "react";

const CustomOption = (inputValue) => ({ innerRef, innerProps, isDisabled, isSelected, isFocused, data: { campaign, channel } }) => {
    return !isDisabled ? (
        <div ref={innerRef}{...innerProps} style={{padding: '.25rem .5rem', cursor: 'pointer' }}>
            <div className={
                `
                custom-select-option
                ${isSelected ? 'custom-select-option--selected' : ''}
                ${isFocused ? 'custom-select-option--focused' : ''}
                `
            }>
                <div className="tag is-dark has-text-white">
                    <Highlighter searchWords={[inputValue]}
                                 textToHighlight={campaign.join(' | ')}/>
                </div>
                <div style={{ margin: '.25rem 0 0 .25rem' }}>
                    <Highlighter searchWords={[inputValue]}
                                 textToHighlight={channel}/>
                </div>
            </div>
        </div>
    ) : null;
};

export default CustomOption;
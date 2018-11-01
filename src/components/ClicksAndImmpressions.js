import React from 'react';
import Count from "./Count";

const ClicksAndImpressions = ({ adword }) => (
    <div style={{display: 'flex', justifyContent: 'space-between', padding: '1rem'}}>
        <Count title={'Clicks'} count={(adword) ? adword.clicks : 0 }/>
        <Count title={'Impressions'} count={(adword) ? adword.impressions : 0 }/>
    </div>
);

export default ClicksAndImpressions;
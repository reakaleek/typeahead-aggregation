import React from 'react';


const Count = ({ title, count }) => (
    <span>
        {title}: <span className="tag is-light has-text-danger">{count}</span>
    </span>
);

export default Count;
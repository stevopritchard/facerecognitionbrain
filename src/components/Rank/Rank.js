import React from 'react';

const Rank = ({ name, entries }) => {
    return (
        <div>
            <div style={{color: "white"}}>
                {`${name}, your current rank is...`}
            </div>
            <div style={{color: "white", fontSize: "30px"}}>
                {entries}
            </div>
        </div>
    )
}

export default Rank
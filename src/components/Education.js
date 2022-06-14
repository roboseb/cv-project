import React from "react";

const Education = (props) => {
    const info = props.info;

    
    return (
        <div>
            <h2>{info.location}</h2>
            <div>{info.title}</div>
            <div>{info.date}</div>
        </div>

    );
};

export default Education;
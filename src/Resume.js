import React from "react";
import Education from "./Education";
import uniqid from "uniqid";

const Resume = (props) => {
    const {general, education, experience} = props.info;


    return (
        <div>
            <div>
                <h2>General</h2>
                <div>{general.name}</div>
                <div>{general.email}</div>
                <div>{general.phone}</div>
            </div>
            <div>
                <h1>Schooling</h1>

                {/* Display each school and its info. */}
                {education.map((item, index) => {
                    return <div key={uniqid()}>
                            <button 
                                onClick={() => {props.removeSchool(item.school);
                                }}>
                                Remove Schooling
                            </button>

                            <button
                                onClick={() => {props.editSchool(item);
                                }}>
                                Edit Schooling
                            </button>
                            <Education info={education[index]}/>
                        </div>
                })}
            </div>


        </div>
    );
};

export default Resume;
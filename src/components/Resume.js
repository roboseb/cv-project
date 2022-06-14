import React from "react";
import Education from "./Education";
import uniqid from "uniqid";
import manIcon from '../images/manicon.png';
import plantImg from '../images/leaf.png';

const Resume = (props) => {
    const {general, education, experience} = props.info;

    const showButtons = (e) => {
        const buttons = Array.from(e.target.querySelectorAll('button'));
        buttons.forEach(button => {
            button.style.display = 'block';
        });
    }

    const hideButtons = (e) => {
        const buttons = Array.from(e.target.querySelectorAll('button'));
        buttons.forEach(button => {
            button.style.display = null;
        });
    }

    return (
        <div id='resume'>
            <img id='plant' src={plantImg} alt='A painted succulent'></img>
            <div id='general'>
                <div id='iconbox'>
                    <img src={manIcon} alt='Your profesh resume'></img>
                </div>
                <div id='generalinfobox'>
                    <h2>{general.name}</h2>
                    <span>{general.email}</span>
                    <span id='phonedisplay'><strong>{general.phone}</strong></span>
                </div>

            </div>
            <div id='education'>
                <h1>Education</h1>

                {/* Display each school and its info. */}
                {education.map((item, index) => {
                    return <div 
                                className='educationitem' 
                                key={uniqid()}
                                onMouseEnter={showButtons}
                                onMouseLeave={hideButtons}
                            >
                            <button 
                                onClick={() => {props.removeSchool(item.location);
                                }}>
                                Remove Schooling
                            </button>

                            <button
                                onClick={() => {props.startEditingSchool(item);
                                }}>
                                Edit Schooling
                            </button>
                            <Education info={education[index]}/>
                        </div>
                })}
            </div>
            
            <div id='experience'>
                <h1>Experience</h1>

                {/* Display each work experience and its info. */}
                {experience.map((item, index) => {
                    return <div 
                                className='experienceitem' 
                                key={uniqid()}
                                onMouseEnter={showButtons}
                                onMouseLeave={hideButtons}
                            >
                        <button
                            onClick={() => {
                                props.removeSchool(item.location);
                            }}>
                            Remove Experience
                        </button>

                        <button
                            onClick={() => {
                                props.startEditingSchool(item);
                            }}>
                            Edit Experience
                        </button>
                        <Education info={experience[index]} />
                    </div>
                })}
            </div>


        </div>
    );
};

export default Resume;
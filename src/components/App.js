import { getByTitle } from "@testing-library/dom";
import React, { Component, useState, useEffect } from "react";
import uniqid from "uniqid";
import Resume from "./Resume";
import CryptoResume from "./CryptoResume";
import '../index.css';


const App = () => {

    const [general, setGeneral] = useState({
        name: 'Seb April',
        email: 'seb@hotmail.com',
        phone: '555-5454'
    });

    const [education, setEducation] = useState([{
        location: "Saint Mary's",
        title: 'Student',
        date: '2011 - 2016'
    }, {
        location: 'U of A',
        title: 'PHD',
        date: '2017 - 2021'
    }]);

    const [experience, setExperience] = useState([{
        location: 'Blockbuster Inc.',
        title: 'Forklift Operator',
        date: '2020'
    }, {
        location: "McDonald's",
        title: 'Cheese Executive Officer',
        date: '2021-'
    }]);


    const [editing, setEditing] = useState(false);
    const [lastSchool, setLastSchool] = useState(null);
    const [lastCategory, setLastCategory] = useState(null);
    const [modeCategory, setModeCategory] = useState('education');
    const [style, setStyle] = useState('professional');

    //Update state directly from input.
    const handleChange = (e) => {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;

        setGeneral({
            name: name,
            email: email,
            phone: phone
        });
    };

    //Add school to state.
    const addSchool = () => {
        const schoolBtn = document.getElementById('schoolbtn');
        schoolBtn.innerText = `Add ${modeCategory}`;


        const location = document.getElementById('school');
        const title = document.getElementById('title');
        const date = document.getElementById('date');
        
        if (modeCategory === 'education') {
            setEducation(education.concat([{
                location: location.value,
                title: title.value,
                date: date.value
            }]));
        } else if (modeCategory === 'experience') {
            setExperience(experience.concat([{
                location: location.value,
                title: title.value,
                date: date.value
            }]));
        }

        //Clear inputs.
        location.value = '';
        title.value = '';
        date.value = '';

    }

    //Remove school from DOM and from state.
    const removeSchool = (location) => {
        setEducation(education.filter(item => item.location !== location));
        setExperience(experience.filter(item => item.location !== location));
    }

    //Set the school inputs to editing mode and fill them with relevant data.
    const startEditingSchool = (data) => {

        //Display the inputs box.
        const inputsBox = document.getElementById('inputsbox');
        if (!inputsBox.classList.contains('shown')) {
            inputsBox.classList.add('shown');
        }

        //Set editing mode on.
        setEditing(true);

        const schoolBtn = document.getElementById('schoolbtn');

        //Set state for last index based on data was part of education or 
        //experience. Also update the innerText of the edit school button.
        if (education.indexOf(data) !== -1) {
            setLastSchool(education.indexOf(data));
            setLastCategory('education');
            schoolBtn.innerText = 'Edit School';
        } else {
            setLastSchool(experience.indexOf(data));
            setLastCategory('experience');
            schoolBtn.innerText = 'Edit Experience';
        }
    
        //Add chosen school data to the edit inputs.
        const school = document.getElementById('school');
        const title = document.getElementById('title');
        const date = document.getElementById('date');

        school.value = data.location;
        title.value = data.title;
        date.value = data.date;

    }

    const updateSchool = () => {
        //Use the current input values to update state.
        let school = document.getElementById('school');
        const title = document.getElementById('title');
        const date = document.getElementById('date');

        //Find the relevant school and update it if lastCategory is education.
        if (lastCategory === 'education') {
            setEducation(education.map(
                (item, index) => {
                    if (index === lastSchool) {
                        return {
                            location: school.value,
                            title: title.value,
                            date: date.value
                        }
                    } else {
                        return item;
                    }
                }
            ));
        }

        //Find the relevant experience and update it if lastCategory is experience.
        if (lastCategory === 'experience') {
            setExperience(experience.map(
                (item, index) => {
                    if (index === lastSchool) {
                        return {
                            location: school.value,
                            title: title.value,
                            date: date.value
                        }
                    } else {
                        return item;
                    }
                }
            ));
        }

        //Turn off editing mode.
        setEditing(false);

        //Reset school inputs in DOM.
        school.value = '';
        title.value = '';
        date.value = '';

        //Reset adding mode to education.
        const schoolBtn = document.getElementById('schoolbtn');
        schoolBtn.innerText = 'Add School';

        document.querySelector('label[for="school"]').innerText = 'School';
        setModeCategory('education');
    }

    //Toggle edit panel visibility.
    const toggleEditing = () => {
        const inputsBox = document.getElementById('inputsbox');
        if (inputsBox.classList.contains('shown')) {
            inputsBox.classList.remove('shown');
        } else {
            inputsBox.classList.add('shown');
        }
    }

    const toggleStyle = () => {
        if (style === 'professional') {
            setStyle('cryptoBro');
        } else {
            setStyle('professional');
        }
    }


    if (style === 'professional') {
        return (

            <div id='app'>
                <button id='stylebtn'
                        onClick={toggleStyle}
                        >click me
                </button>
                <button 
                    id='showeditbtn'
                    onClick={toggleEditing}
                    >EDIT
                </button>
                <div id='inputsbox'>
                    <h2>Edit</h2>
                    <div id='generalinputs'>
                        <label htmlFor='name'>Name</label>
                        <input
                            onChange={handleChange}
                            id='name'
                            type='text'
                        />

                        <label htmlFor='email'>Email</label>
                        <input
                            onChange={handleChange}
                            id='email'
                            type='text'
                        />

                        <label htmlFor='phone'>Phone</label>
                        <input
                            onChange={handleChange}
                            id='phone'
                            type='text'
                        />
                    </div>
                    <div id='editinputs'>
                        <label htmlFor='school'>School</label>
                        <input

                            id='school'
                            type='text'
                        />

                        <label htmlFor='title'>Title</label>
                        <input

                            id='title'
                            type='text'
                        />

                        <label htmlFor='date'>Date</label>
                        <input

                            id='date'
                            type='text'
                        />
                        <button
                            id='schoolbtn'
                            onClick={() => {
                                if (editing === false) {
                                    addSchool();
                                } else {
                                    updateSchool();
                                }
                            }}
                        >Add School</button>
                        <button
                            id='modebtn'
                            // Add click event for toggling what to add to resume.
                            onClick={() => {
                                if (modeCategory === 'education') {
                                    setModeCategory('experience');
                                    document.getElementById('schoolbtn').innerText = 'Add Experience';
                                    document.querySelector('label[for="school"]').innerText = 'Employer';
                                } else {
                                    setModeCategory('education');
                                    document.getElementById('schoolbtn').innerText = 'Add Education';
                                    document.querySelector('label[for="school"]').innerText = 'School';
                                }
                            }}
                        >Mode</button>
                    </div>
                </div>
                <Resume info={{general, education, experience}}
                        removeSchool={removeSchool}
                        startEditingSchool={startEditingSchool}
                        toggleEditing={toggleEditing}
                />
                
            </div>
        );
    } else {
        return (
            <div id='app'>
                <button id='stylebtn'
                        onClick={toggleStyle}
                        >click me
                </button>
                <button 
                    id='showeditbtn'
                    onClick={toggleEditing}
                    >EDIT
                </button>
                <div id='inputsbox'>
                    <h2>Edit</h2>
                    <div id='generalinputs'>
                        <label htmlFor='name'>Name</label>
                        <input
                            onChange={handleChange}
                            id='name'
                            type='text'
                        />

                        <label htmlFor='email'>Email</label>
                        <input
                            onChange={handleChange}
                            id='email'
                            type='text'
                        />

                        <label htmlFor='phone'>Phone</label>
                        <input
                            onChange={handleChange}
                            id='phone'
                            type='text'
                        />
                    </div>
                    <div id='editinputs'>
                        <label htmlFor='school'>School</label>
                        <input

                            id='school'
                            type='text'
                        />

                        <label htmlFor='title'>Title</label>
                        <input

                            id='title'
                            type='text'
                        />

                        <label htmlFor='date'>Date</label>
                        <input

                            id='date'
                            type='text'
                        />
                        <button
                            id='schoolbtn'
                            onClick={() => {
                                if (editing === false) {
                                    addSchool();
                                } else {
                                    updateSchool();
                                }
                            }}
                        >Add School</button>
                        <button
                            id='modebtn'
                            // Add click event for toggling what to add to resume.
                            onClick={() => {
                                if (modeCategory === 'education') {
                                    setModeCategory('experience');
                                    document.getElementById('schoolbtn').innerText = 'Add Experience';
                                    document.querySelector('label[for="school"]').innerText = 'Employer';
                                } else {
                                    setModeCategory('education');
                                    document.getElementById('schoolbtn').innerText = 'Add Education';
                                    document.querySelector('label[for="school"]').innerText = 'School';
                                }
                            }}
                        >Mode</button>
                    </div>
                </div>
                <CryptoResume info={{general, education, experience}}
                        removeSchool={removeSchool}
                        startEditingSchool={startEditingSchool}
                        toggleEditing={toggleEditing}
                />
                
            </div>

        );
    }

}

export default App;

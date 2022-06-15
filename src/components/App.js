import { getByTitle } from "@testing-library/dom";
import React, { Component } from "react";
import uniqid from "uniqid";
import Resume from "./Resume";
import CryptoResume from "./CryptoResume";
import '../index.css';




class App extends Component {
    constructor() {
        super();
        this.state = {
            general: {
                'name': 'Seb April',
                'email': 'seb@hotmail.com',
                'phone': '555-5454'
            },
            education: [{
                location: 'Walter Murray',
                title: 'Student',
                date: '2011 - 2016'
            }, {
                location: 'U of S',
                title: 'PHD',
                date: '2017 - 2021'
            }],
            experience: [{
                location: 'Goodfellow Inc.',
                title: 'Forklift Operator',
                date: '2020'
            }],
            editingSchool: false,
            lastSchool: null,
            lastCategory: null,
            modeCategory: 'education',
            style: 'professional'
        }

        this.addSchool = this.addSchool.bind(this);
        this.startEditingSchool = this.startEditingSchool.bind(this);
        this.updateSchool = this.updateSchool.bind(this);
        this.toggleEditing = this.toggleEditing.bind(this);
    }

    //Update state directly from input.
    handleChange = (e) => {
        let tempState = this.state;
        
        tempState['general'][e.target.id] = e.target.value;
        this.setState(tempState);

    };

    //Add school to state.
    addSchool = () => {
        const schoolBtn = document.getElementById('schoolbtn');
        schoolBtn.innerText = `Add ${this.state.modeCategory}`;

        let tempState = this.state;

        const school = document.getElementById('school');
        const title = document.getElementById('title');
        const date = document.getElementById('date');
        
        tempState[this.state.modeCategory].push({
            location: school.value,
            title: title.value,
            date: date.value
        });
        this.setState(tempState);

        //Clear inputs.
        school.value = '';
        title.value = '';
        date.value = '';

    }

    //Remove school from DOM and from state.
    removeSchool = (location) => {
        

        let tempState = this.state;

        //If location is in education, remove it from state.
        for (let i = 0; i < tempState['education'].length; i++) {
      
            if (tempState['education'][i] !== undefined &&
                tempState['education'][i].location === location) {
                delete tempState['education'][i];
            }
        }

        //If location is in experience, remove it from state.
        for (let i = 0; i < tempState['experience'].length; i++) {
      
            if (tempState['experience'][i] !== undefined &&
                tempState['experience'][i].location === location) {
                delete tempState['experience'][i];
            }
        }
        this.setState(tempState);
    }

    //Set the school inputs to editing mode and fill them with relevant data.
    startEditingSchool = (data) => {
        this.toggleEditing();

        //Set editing mode on.
        this.setState({editingSchool: true});

        const schoolBtn = document.getElementById('schoolbtn');

        //Set state for last index based on data was part of education or 
        //experience. Also update the innerText of the edit school button.
        if (this.state.education.indexOf(data) !== -1) {
            this.setState({lastSchool: this.state.education.indexOf(data)});
            this.setState({lastCategory: 'education'});
            schoolBtn.innerText = 'Edit School';
        } else {
            this.setState({lastSchool: this.state.experience.indexOf(data)});
            this.setState({lastCategory: 'experience'});
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

    updateSchool = () => {
        let tempState = this.state;

        //Use the current input values to update state.
        let school = document.getElementById('school');
        const title = document.getElementById('title');
        const date = document.getElementById('date');


        //Update the school at the last index with the current input values.
        tempState[this.state.lastCategory][this.state.lastSchool] = {
            location: school.value,
            title: title.value,
            date: date.value
        }

        //Update the state then turn off editing mode.
        this.setState(tempState);
        this.setState({editingSchool: false});

        //Reset school inputs in DOM.
        school.value = '';
        title.value = '';
        date.value = '';

        //Reset adding mode to education.
        const schoolBtn = document.getElementById('schoolbtn');
        schoolBtn.innerText = 'Add School';

        document.querySelector('label[for="school"]').innerText = 'School';
        this.setState({modeCategory: 'education'});
    }

    //Toggle edit panel visibility.
    toggleEditing = () => {
        const inputsBox = document.getElementById('inputsbox');
        if (inputsBox.classList.contains('shown')) {
            inputsBox.classList.remove('shown');
        } else {
            inputsBox.classList.add('shown');
        }
    }

    toggleStyle = () => {
        if (this.state.style === 'professional') {
            this.setState({style: 'cryptoBro'});
        } else {
            this.setState({style: 'professional'});
        }
    }

    render() {
        if (this.state.style === 'professional') {
            return (

                <div id='app'>
                    <button id='stylebtn'
                            onClick={this.toggleStyle}
                            >click
                    </button>
                    <button 
                        id='showeditbtn'
                        onClick={this.toggleEditing}
                        >EDIT
                    </button>
                    <div id='inputsbox'>
                        <h2>Edit</h2>
                        <div id='generalinputs'>
                            <label htmlFor='name'>Name</label>
                            <input
                                onChange={this.handleChange}
                                id='name'
                                type='text'
                            />

                            <label htmlFor='email'>Email</label>
                            <input
                                onChange={this.handleChange}
                                id='email'
                                type='text'
                            />

                            <label htmlFor='phone'>Phone</label>
                            <input
                                onChange={this.handleChange}
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
                                    if (this.state.editingSchool === false) {
                                        this.addSchool();
                                    } else {
                                        this.updateSchool();
                                    }
                                }}
                            >Add School</button>
                            <button
                                id='modebtn'
                                // Add click event for toggling what to add to resume.
                                onClick={() => {
                                    if (this.state.modeCategory === 'education') {
                                        this.setState({ modeCategory: 'experience' });
                                        document.getElementById('schoolbtn').innerText = 'Add Experience';
                                        document.querySelector('label[for="school"]').innerText = 'Employer';
                                    } else {
                                        this.setState({ modeCategory: 'education' });
                                        document.getElementById('schoolbtn').innerText = 'Add Education';
                                        document.querySelector('label[for="school"]').innerText = 'School';
                                    }
                                }}
                            >Mode</button>
                        </div>
                    </div>
                    <Resume info={this.state}
                            removeSchool={this.removeSchool}
                            startEditingSchool={this.startEditingSchool}
                            toggleEditing={this.toggleEditing}
                    />
                    
                </div>
            );
        } else {
            return (

                <div id='app'>
                    <button id='stylebtn'
                            onClick={this.toggleStyle}
                            >click
                    </button>
                    <button 
                        id='showeditbtn'
                        onClick={this.toggleEditing}
                        >EDIT
                    </button>
                    <div id='inputsbox'>
                        <h2>Edit</h2>
                        <div id='generalinputs'>
                            <label htmlFor='name'>Name</label>
                            <input
                                onChange={this.handleChange}
                                id='name'
                                type='text'
                            />

                            <label htmlFor='email'>Email</label>
                            <input
                                onChange={this.handleChange}
                                id='email'
                                type='text'
                            />

                            <label htmlFor='phone'>Phone</label>
                            <input
                                onChange={this.handleChange}
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
                                    if (this.state.editingSchool === false) {
                                        this.addSchool();
                                    } else {
                                        this.updateSchool();
                                    }
                                }}
                            >Add School</button>
                            <button
                                id='modebtn'
                                // Add click event for toggling what to add to resume.
                                onClick={() => {
                                    if (this.state.modeCategory === 'education') {
                                        this.setState({ modeCategory: 'experience' });
                                        document.getElementById('schoolbtn').innerText = 'Add Experience';
                                        document.querySelector('label[for="school"]').innerText = 'Employer';
                                    } else {
                                        this.setState({ modeCategory: 'education' });
                                        document.getElementById('schoolbtn').innerText = 'Add Education';
                                        document.querySelector('label[for="school"]').innerText = 'School';
                                    }
                                }}
                            >Mode</button>
                        </div>
                    </div>
                    <CryptoResume info={this.state}
                            removeSchool={this.removeSchool}
                            startEditingSchool={this.startEditingSchool}
                            toggleEditing={this.toggleEditing}
                    />
                    
                </div>
            );
        }
    }
}

export default App;

import React, { Component } from "react";
import uniqid from "uniqid";
import Resume from "./Resume";


class App extends Component {
    constructor() {
        super();
        this.state = {
            general: {
                'name': 'Seb',
                'email': 'seb@hotmail.com',
                'phone': '5555454'
            },
            education: [{
                school: 'Walter Murray',
                title: 'Student',
                date: '2011 - 2016'
            }, {
                school: 'U of S',
                title: 'PHD',
                date: '2017 - 2021'
            }],
            experience: {},
        }

        this.addSchool = this.addSchool.bind(this);
        this.editSchool = this.editSchool.bind(this);
    }

    handleChange = (e) => {
        let tempState = this.state;
        
        tempState['general'][e.target.id] = e.target.value;
        this.setState(tempState);

    };

    addSchool = (e) => {
        let tempState = this.state;

        const school = document.getElementById('school').value;
        const title = document.getElementById('title').value;
        const date = document.getElementById('date').value;
        
        tempState['education'].push({
            school: school,
            title: title,
            date: date
        });
        this.setState(tempState);
    }

    removeSchool = (school) => {

        let tempState = this.state;

        for (let i = 0; i < tempState['education'].length; i++) {
      
            if (tempState['education'][i] !== undefined &&
                tempState['education'][i].school === school) {
                delete tempState['education'][i];
            }
        }

        this.setState(tempState);
    }

    editSchool = (school) => {
        console.log(school);
        const schoolBtn = document.getElementById('schoolbtn');
        schoolBtn.innerText = 'Edit School';

        const tempState = this.state;

        const schoolName = document.getElementById('school');
        const title = document.getElementById('title');
        const date = document.getElementById('date');

        schoolName.value = school.school;
        title.value = school.title;
        date.value = school.date;

        schoolBtn.addEventListener('click', () => {
            console.log(tempState['education'])
            for (let i = 0; i < tempState['education'].length; i++) {
      
                if (tempState['education'][i] !== undefined &&
                    tempState['education'][i].school === school) {
                    tempState['education'][i].school = schoolName.value;
                    tempState['education'][i].title = date.value;
                    tempState['education'][i].date = date.value;
                }
            }
            this.setState(tempState);
        });

    }

    render() {
        return (
            
            <div>
                <div>
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
                <div>
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
                        onClick={this.addSchool}
                    >Add education</button>
                </div>
                <Resume info={this.state}
                        removeSchool={this.removeSchool}
                        editSchool={this.editSchool}/>
            </div>
        );
    }
}

export default App;

import React from "react";
import Education from "./Education";
import uniqid from "uniqid";
import ape1 from '../images/ape1.png';
import ape2 from '../images/ape2.png';
import ape3 from '../images/ape3.png';
import nezuko from '../images/nezuko-def.gif';

const CryptoResume = (props) => {
    const {general, education, experience} = props.info;

    const stats = ['3 Bored Apes 🐵', '7 CryptoKitties 🐱', '5 CryptoPunks 😎', '5 Pudgy Penguins 🐧', '8 Times Rugpulled'];

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

    //Scroll on statball to rotate it in notches.
    let rotation = 0;

    const scrollBall = (event) => {
        
        if (event.deltaY < 0) {
            rotation += 45;
        } else {
            rotation -= 45;
        }

        //Limit rotation to min and max values.
        if (rotation > 180) {
            rotation = 180;
            return;
        } else if (rotation < -180) {
            rotation = -180;
            return;
        }

        let root = document.documentElement;
        root.style.setProperty('--ball-rotation', `${rotation}deg`);
    }




    //Take the first part of the user email for later use.
    const nickname = general.email.split('@')[0];

    return (
        <div id='cryptoresume'>
            <div id='cryptoheader'>
                <div id='headerapes'>
                    <img src={ape1} alt=''></img>
                    <img src={ape2} alt=''></img>
                    <img src={ape3} alt=''></img>
                </div>
                <h1>{`${nickname.toLowerCase()} crypto`}</h1>
                
            </div>
            <div id='cryptocontacts'>
                <img src={nezuko} alt=''></img>
                <div>NAME ⸸ {general.name}</div>
                <div>EMAIL ⸸ {general.email}</div>
                <div>PHONE ⸸ {general.phone}</div>
                <div>TWITTER ⸸ @{nickname}</div>
                <div>SNAP ⸸ @{nickname}97</div>
                <div>TIKTOK ⸸ @crypto{nickname}</div>
                <div>YOUTUBE ⸸ /{nickname}official</div>
            </div>
            <div id='cryptoexperience'>
                <div id='cryptoedu'>
                    <h1>Education</h1>

                    {/* Display each school and its info. */}
                    {education.map((item, index) => {
                        return <div 
                                    className='' 
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
                
                <div id='cryptoexp'>
                    <h1>Experience</h1>

                    {/* Display each work experience and its info. */}
                    {experience.map((item, index) => {
                        return <div 
                                    className='' 
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
            <div id='cryptostats'>
                <div 
                    id='statball'
                    onWheel={scrollBall}
                    >statball

                    {stats.map((item, index) => {
                        return <div
                            className='statitem'
                            key={uniqid()}
                            
                        >{item}
                        </div>
                    })}
                </div>
            </div>
            <div id='cryptoholdings'></div>

        


        </div>
    );
};

export default CryptoResume;
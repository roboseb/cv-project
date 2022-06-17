import React from "react";
import Education from "./Education";
import uniqid from "uniqid";
import ape1 from '../images/ape1.png';
import ape2 from '../images/ape2.png';
import ape3 from '../images/ape3.png';
import nezuko from '../images/nezuko-def.gif';
import baycLogo from '../images/bayc-red.png';
import graphImg from '../images/graph.webp';
import colApe1 from '../images/apecollection1.png';
import colApe2 from '../images/apecollection2.png';
import colApe3 from '../images/apecollection3.png';
import colApe4 from '../images/apecollection4.png';
import colApe5 from '../images/apecollection5.png';
import chartGif from '../images/newchart.gif'

const CryptoResume = (props) => {

    const stats = ['5 Bored Apes 🐵', '7 CryptoKitties 🐱', '5 CryptoPunks 😎', '5 Pudgy Penguins 🐧', '8 Times Rugpulled'];
    
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
    let statIndex = 0;

    const scrollBall = (event) => {
        
        //Increase or decrease both statball rotation and current stat.
        if (event.deltaY < 0) {
            rotation += 45;
            statIndex --;
        } else {
            rotation -= 45;
            statIndex++;
        }

        //Limit rotation to min and max values.
        if (rotation > 0) {
            rotation = 0;
        } else if (rotation < -180) {
            rotation = -180;
        }

        //Limit rotation to min and max values.
        if (statIndex > 4) {
            statIndex = 4;
            
        } else if (statIndex < 0) {
            statIndex = 0;
            
        }

        //Add focused class to centered item, and remove from the rest.
        const statDisplays = Array.from(document.querySelectorAll('.statitem'));
        
        statDisplays.forEach((stat, index) => {
            if (index === statIndex) {
                statDisplays[index].classList.add('focused');
            } else {
                statDisplays[index].classList.remove('focused');
            }
      
        });
        
        //Update statball rotation in css.
        let root = document.documentElement;
        root.style.setProperty('--ball-rotation', `${rotation}deg`);
    }

    //Set initial stat to be focused.
    setTimeout(() => {
        document.querySelector('.statitem').classList.add('focused');
    }, 0);




    //Take the first part of the user email for later use.
    const nickname = props.info.general.email.split('@')[0];

    return (
        <div id='cryptoresume'>
            
            <div id='dingbat1' className='dingbat'>U</div>
        
            <div id='dingbat2' className='dingbat'>T</div>
        
            

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
                <div>NAME ⸸ {props.info.general.name}</div>
                <div>EMAIL ⸸ {props.info.general.email}</div>
                <div>PHONE ⸸ {props.info.general.phone}</div>
                <div>TWITTER ⸸ @{nickname}</div>
                <div>SNAP ⸸ @{nickname}97</div>
                <div>TIKTOK ⸸ @crypto{nickname}</div>
                <div>YOUTUBE ⸸ /{nickname}official</div>
            </div>
            <div id='cryptoexperience'>
                <div id='cryptoedu'>
                    <h1>Education</h1>

                    {/* Display each school and its info. */}
                    {props.info.education.map((item, index) => {
                        return <div 
                                    className='cryptoeduitem' 
                                    key={uniqid()}
                                    onMouseEnter={showButtons}
                                    onMouseLeave={hideButtons}
                                >

                                <Education info={props.info.education[index]}/>
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
                            </div>
                    })}
                </div>
                
                <div id='cryptoexp'>
                    <h1>Experience</h1>

                    {/* Display each work experience and its info. */}
                    {props.info.experience.map((item, index) => {
                        return <div 
                                    className='cryptoexpitem' 
                                    key={uniqid()}
                                    onMouseEnter={showButtons}
                                    onMouseLeave={hideButtons}
                                >

                            <Education info={props.info.experience[index]} />
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
                        </div>
                    })}
                    
                </div>
                <img src={chartGif} alt='A gif of a failing stock chart'></img>
            </div>
            <div id='cryptostats'>
                <div id='statball'>
                    {stats.map((item, index) => {
                        return <div
                            className='statitem'
                            key={uniqid()}
                            
                        >{item}
                        </div>
                    })}

                    <img onWheel={scrollBall} src={baycLogo} alt='black and red bayc logo'></img>
                </div>
            </div>
            <div id='cryptoholdings'>
                <img src={colApe1} alt='A bored ape NFT'></img>
                <img src={colApe2} alt='A bored ape NFT'></img>
                <img src={colApe3} alt='A bored ape NFT'></img>
                <img src={colApe4} alt='A bored ape NFT'></img>
                <img src={colApe5} alt='A bored ape NFT'></img>
            </div>

        


        </div>
    );
};

export default CryptoResume;
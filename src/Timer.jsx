/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// Unused for now will use later.
import { useEffect, useRef, useState } from 'react'
import resetImg from './assets/reset-svgrepo-com.svg'

export default function Timer(){

    // Display mode code.
    const firstRender = useRef(true)

    const [pause,setPause] = useState(true)
    
    const [initialTime, setInitialTime] = useState(60*1000)

    const [time,setTime] = useState(initialTime)
    
    useEffect(()=>{
        if(firstRender.current) firstRender.current = false;
        else if(pause===false){
            (time!=0)? setTimeout(()=>{setTime(time-500)},500) : console.log('Time')
        }
    },[time,pause])

    const [inputMode,setInputMode] = useState(false)

    // switching between input mode and display mode.
    const tdlRef = useRef()
    const handelClick = (e)=>{
        console.log("clicked")
        try{
            if(tdlRef.current.contains(e.target)) {
                setPause(true)
                setInputMode(true)
            }
            else {
                setInputMode(false)
            }
        }
        catch(err){
            // 
        }
    }
    useEffect(()=>{
        document.addEventListener(
            'click',
            handelClick
        )
        return ()=>{
            window.removeEventListener('click',handelClick)
        }
    },[])

    // Input mode code.

    // Secounds
    const [firstDig, setFirstDig]       = useState(0)
    const [secondDig, setSecondDig]     = useState(0)
    // Minutes
    const [thirdDig, setThirdDig]       = useState(0)
    const [forthDig, setForthDig]       = useState(0)
    // Hours
    const [fifthDig, setFifthDig]       = useState(0)
    const [sixthDig, setSixthDig]       = useState(0)
    // Days
    const [seventhDig, setSeventhDig]   = useState(0)
    const [eightDig, setEightDig]       = useState(0)

    const [digitCounter, setDigitCounter] = useState(1)

    useEffect(()=>{
        document.addEventListener('keypress',(e)=>{
            if(parseInt(e.key)){
                switch(digitCounter){
                    case 1:
                        setFirstDig(e.key)
                        break;
                    case 2:
                        setSecondDig(e.key)
                        break;
                    case 3:
                        setThirdDig(e.key)
                        break;
                    case 4:
                        setForthDig(e.key)
                        break;
                    case 5:
                        setFifthDig(e.key)
                        break;
                    case 6:
                        setSixthDig(e.key)
                        break;
                    case 7:
                        setSeventhDig(e.key)
                        break;
                    case 8:
                        setEightDig(e.key)
                        break;
                    default:
                        // Nothig
                }
                setDigitCounter(digitCounter+1)
            }
        })
    },[])

    useEffect(()=>{
        if(inputMode===false){
            // To be continude...
        }
    },[inputMode])

    return (
        <div className='timer'>
            <div className='timer-display-and-input' ref={tdlRef} style={{zIndex:2, backgroundColor:'transparent'}} />
            <div className='timer-display-and-input' >
                {
                    inputMode?
                    <div className='timer-form' >
                        <span>{eightDig}{seventhDig}</span>
                        :
                        <span>{sixthDig}{fifthDig}</span>
                        :
                        <span>{forthDig}{thirdDig}</span>
                        :
                        <span>{secondDig}{firstDig}</span>
                    </div>
                    : 
                    <div className='timer-display' >
                        <div className='days-display'>
                            {
                                ((time)/(24*60*60*1000)>=1)? 
                                <span>
                                    {Math.floor(time/(24*60*60*1000))}
                                    <span className='subscript'>d</span>
                                </span> 
                                : 
                                <></>
                            }
                        </div>
                        <div className='hours-display'>
                            {
                                ((time)/(60*60*1000)>=1)?
                                <span>
                                    {Math.floor(time/(60*60*1000))}
                                    <span className='subscript'>h</span>
                                </span>
                                :
                                <></>
                            }
                        </div>
                        <div className='minutes-display'>
                            {
                            ((time)/(60*1000)>=1)?
                            <span>
                                {Math.floor(time/(60*1000))}
                                <span className='subscript'>m</span>
                            </span>
                            : 
                            <></>
                            }
                        </div>
                        <div className='seconds-display'>
                            <span>
                                {Math.floor(time/1000)%60!=0?Math.floor(time/1000):0}
                                <span className='subscript'>s</span>
                            </span>
                        </div>
                    </div>
                }
            </div>
            <button className='timer-pause-play' 
                onClick={()=>{
                    setPause(!pause)
                }
            }
            >
                {pause?"play":"pause"}
            </button>
            <img className='timer-reset' src={resetImg} onClick={()=>{
                pause?setTime(initialTime):""
            }} />
        </div>
    )
}
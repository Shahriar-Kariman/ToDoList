/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from "react"
import Popup from 'reactjs-popup'
import CircularSlider from '@fseehawer/react-circular-slider'
import PriorityDisplay from "./PriorityDisplay"
// import Reset from "./assets/refresh-cw-alt-3-svgrepo-com.svg"
import ChangePriority from "./assets/medium-priority-svgrepo-com.svg"
import Delete from "./assets/delete-svgrepo-com.svg"
// import Timer from "./Timer"

export default function ToDoItem({id, description, startDate, priority, handleItemDelete, handleChangePriority}){
    
    const [startDate_, setStartDate] = useState(startDate)
    const [days, setDays] = useState(Math.floor((new Date()-startDate)/(1000*60*60*24)))

    useEffect(()=>{
        setInterval(()=>{setDays(Math.floor((new Date()-startDate_)/(1000*60*60)))}, 1000*60*60)
    },[startDate_,days])

    const [newPriority, setNewPriority] = useState(priority)
    const priorityOptions = ["  🧊","  🕯️","  🔥"," 💣🎆","☢️🍄☁️"]

    useEffect(()=>{
        handleChangePriority(id,newPriority);
    },[newPriority])

    return (
        <div className="item" >
            <div className="left">
                <h1 className="item-description">{description}</h1>
                <p>Started {days} days ago at {startDate_.getHours()}:{startDate_.getMinutes()}</p>
            </div>
            <div className="center">
                <img 
                src={Delete} 
                onClick={()=>{handleItemDelete(id)}} 
                />
                {/* <img src={Reset} /> */}
                <Popup
                modal
                className='priority-popup'
                trigger={<img src={ChangePriority} />}
                position={'bottom center'}
                nested>
                    <CircularSlider
                        label="priority"
                        labelColor="rgba(255, 123, 0, 0.6)"
                        knobColor="rgba(255, 123, 0, 0.897)"
                        progressColorFrom="#00bfbd"
                        progressColorTo="#009c9a"
                        progressSize={24}
                        trackColor="#eeeeee"
                        trackSize={24}
                        data={priorityOptions}
                        dataIndex={newPriority}
                        onChange={ (p)=>{
                            setNewPriority(priorityOptions.indexOf(p))
                        } }
                    />
                </Popup>
            </div>
            <div className="right">
                {/* <Timer /> */}
                <PriorityDisplay priority={newPriority} />
            </div>
        </div>
    )
}
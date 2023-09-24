/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from "react"
import PriorityDisplay from "./PriorityDisplay"
import Reset from "./assets/refresh-cw-alt-3-svgrepo-com.svg"
import ChangePriority from "./assets/medium-priority-svgrepo-com.svg"
import Delete from "./assets/delete-svgrepo-com.svg"
// import Timer from "./Timer"

export default function ToDoItem({id, description, startDate, priority, handelItemDelete}){
    
    const [startDate_, setStartDate] = useState(startDate)
    const [days, setDays] = useState(Math.floor((new Date()-startDate)/(1000*60*60*24)))

    useEffect(()=>{
        setInterval(()=>{setDays(Math.floor((new Date()-startDate_)/(1000*60*60)))}, 1000*60*60)
    },[startDate_,days])

    // console.log(location)

    return (
        <div className="item" >
            <div className="left">
                <h1 className="item-description">{description}</h1>
                <p>Started {days} days ago at {startDate_.getHours()}:{startDate_.getMinutes()}</p>
            </div>
            <div className="center">
                <img src={Delete} />
                <img src={Reset} />
                <img src={ChangePriority} />
            </div>
            <div className="right">
                {/* <Timer /> */}
                <PriorityDisplay priority={priority} />
            </div>
        </div>
    )
}
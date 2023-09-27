/* eslint-disable no-unused-vars */
import Popup from 'reactjs-popup'
import { useEffect, useState, useRef } from 'react'
import ToDoItem from './ToDoItem'
import Dexie from 'dexie'
import { useLiveQuery } from "dexie-react-hooks"
import CircularSlider from '@fseehawer/react-circular-slider'
import addIcon from './assets/plus-svgrepo-com.svg'
import resetIcon from './assets/reset-svgrepo-com.svg'
import explosionIcon from './assets/nuclear-explosion.png'
import { Html, ScrollControls, Scroll } from '@react-three/drei'

export default function Container(){
    const [newDesc, setNewDesc] = useState("")
    const [newPriority, setNewPriority] = useState(4)
    const priorityOptions = ["  🧊","  🕯️","  🔥"," 💣🎆","☢️🍄☁️"]

    const [idCount, setIdCount] = useState(parseInt(localStorage.getItem('idCount') ?? 1))

    useEffect(()=>{
        localStorage.setItem('idCount',idCount)
    },[idCount])

    const db = new Dexie('ToDoList')
    db.version(1).stores({
        ToDoItem: "id, description, startDate, priority"
    })
    db.open().catch((err)=>{
        console.log(err.stack || err)
    })

    const allItems = useLiveQuery(()=>db.ToDoItem.where('id').above(0).toArray())

    const [items, setItems] = useState([])
    useEffect(()=>{
        setItems(allItems??[])
    },[allItems])

    const handleAddItem = async (id, description, startDate, priority, done)=>{
        await db.ToDoItem.add({id,description,startDate, priority, done});
    }

    const handleItemDelete = async (itemId)=>{
        await db.ToDoItem.delete(itemId);
    }

    const handleChangePriority = async (itemId, changedPriority)=>{
        await db.ToDoItem.update(itemId,{priority: changedPriority}).then(
            (updated)=>{
                if(!updated) console.log("couldent updated item number ",itemId)
            }
        );
    }

    return (
        <>
        <ScrollControls pages={1} damping={0.1} >
            <Scroll >
                <Html position={[2,3,1]} >
                    <img 
                    className='reset-button'
                    src={resetIcon} 
                    alt="reset" 
                    onClick={()=>{
                        items.map((item)=>{
                            handleItemDelete(item.id)
                        })
                        setIdCount(1)
                    }}
                    />
                </Html>
                <Html position={[-1,3.2,0]}>
                    <h1 
                    style={
                        {width:'300px',cursor:'auto',userSelect:'none'}
                    }
                    >To Do List</h1>
                </Html>
                <Html position={[-2,2,0]} style={{cursor:"auto"}} >
                    <form className='add-form'>
                        <input
                        className='input-add'
                        value={newDesc} 
                        onChange={(e)=>{setNewDesc(e.target.value)}} 
                        placeholder='Task Name' />
                        <img 
                        className='add-button'
                        src={addIcon}
                        onClick={
                        ()=>{
                            if(newDesc==="") return;
                            const date = new Date();
                            handleAddItem(idCount,newDesc,date,newPriority,false)
                            setIdCount(idCount+1)
                            setNewDesc("")
                        }
                        }>
                        </img>
                        <Popup
                        modal
                        className='priority-popup'
                        trigger={<img className='explosion' src={explosionIcon} alt='explosion' />}
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
                                dataIndex={5}
                                onChange={ (p)=>{setNewPriority(priorityOptions.indexOf(p))} }
                            />
                        </Popup>
                    </form>
                </Html>
                <Html position={[-2,1.5,0]}>
                    {
                    items.map((item, index) => {
                        return (
                        <ToDoItem 
                            key={item.id}
                            id={item.id} 
                            description={item.description} 
                            startDate={item.startDate}
                            priority={item.priority}
                            done={item.done}
                            handleItemDelete={handleItemDelete}
                            handleChangePriority={handleChangePriority}
                        />
                        )
                    })
                    }
                </Html>
            </Scroll>
        </ScrollControls>
        </>
    )
}
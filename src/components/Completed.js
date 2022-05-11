import React, { useEffect, useState } from 'react'
import styles from './Screens.module.css';
import cardCon from './CardConsole.module.css';
import cards from './Card.module.css';
import { clear } from '@testing-library/user-event/dist/clear';

const Completed=()=> {

    const[todos, setToDos]=useState([])
    const[cardOps, setCardOps]= useState(false)
    const[cardEdit, setCardEdit]= useState(false)
    const[title, setTitle]= useState('')
    const[desc, setDesc]= useState('')
    const[editTitle, setEditTitle]= useState('')
    const[editDesc, setEditDesc]= useState('')

    const[currentCard, setCurrentCard]= useState('')
    const[selectedItem, setSelectedItem]=useState([])
    

    useEffect(()=>{
        const todos=JSON.parse(localStorage.getItem('notStarted'))
        setToDos(todos)
    },[])

    const manualRefresh=()=>{
        const todos=JSON.parse(localStorage.getItem('notStarted'))
        setToDos(todos)
    }

    const onPressAdd=()=>{
        setCardOps(true)
    }

    const onPressCancel=()=>{
        setCardOps(false)
    }

    const onPressEditCancel=()=>{
        setCardEdit(false)
        setEditTitle("")
        setEditDesc("")
    }


    const onTitleAreaChange =(v)=>{
        setTitle(v.target.value);

    }

    const onDescAreaChange =(v)=>{
        setDesc(v.target.value);

    }

    const onTitleAreaEdit =(v)=>{
        setEditTitle(v.target.value);

    }

    const onDescAreaEdit =(v)=>{
        setEditDesc(v.target.value);

    }

    const onPressSave=()=>{

        const items = (() => {
            const fieldValue = localStorage.getItem('notStarted');
            return fieldValue === null ? [] : JSON.parse(fieldValue); 
          })();

          items.push({id: Date.now(),"status": "completed", 'name':title, "note": desc})

        localStorage.setItem("notStarted", JSON.stringify(items))

        setCardOps(false)
        setTitle("")
        setDesc("")
        manualRefresh()
    }


    const onPressCard=(id)=>{
        setCardEdit(true)
        const selectedItem = todos.filter((elem, ind)=>{
            return ind === id;
        });
        setSelectedItem(selectedItem)

        console.log(selectedItem)
    }

    const onPressEditSave=(id)=>{
        const items = (() => {
            const fieldValue = localStorage.getItem('notStarted');
            return fieldValue === null ? [] : JSON.parse(fieldValue); 
          })();

       
          const editedItem = todos.filter((elem, ind)=>{
            return ind !== selectedItem[0].id;
        });

        localStorage.setItem("notStarted", JSON.stringify(editedItem))
    }
  


  return (
    <div className={styles.main}>
        {cardOps ? (
             < div className={cardCon.main}>
                <p style={{fontSize: 12, fontWeight: 'bold', color: "#0096FF"}}>New Task: Completed</p>
                <textarea
                placeholder='Title'
                className={cardCon.textAreaTitle}
                value={title}
                onChange={(v)=>onTitleAreaChange(v)}
                >
                </textarea>
                <textarea
                placeholder='Description'
                className={cardCon.textAreaDesc}
                value={desc}
                onChange={(v)=>onDescAreaChange(v)}
                >
                </textarea>
                {/* <p>{text}</p> */}
                <div style={{flexDirection: 'row', display: 'flex'}}>
                    <a onClick={onPressCancel} style={{cursor: "pointer", marginRight: 90}}><p>Cancel</p></a>
                    <a onClick={onPressSave} style={{cursor: "pointer", height: 10}}><p>Save</p></a>
                </div>
                
            </div>
        ):(null)}

        {cardEdit ? (
            < div className={cardCon.main}>
            <p style={{fontSize: 12, fontWeight: 'bold', color: "#0096FF"}}>Status: Completed</p>
            <textarea
            placeholder={`${selectedItem[0].name}`}
            className={cardCon.textAreaTitle}
            value={editTitle}
            onChange={(v)=>onTitleAreaEdit(v)}
            >
            </textarea>
            <textarea
            placeholder={`${selectedItem[0].note}`}
            className={cardCon.textAreaDesc}
            value={editDesc}
            onChange={(v)=>onDescAreaEdit(v)}
            >
            </textarea>
            {/* <p>{text}</p> */}
            <div style={{flexDirection: 'row', display: 'flex'}}>
                <a onClick={onPressEditCancel} style={{cursor: "pointer", marginRight: 90}}><p>Cancel</p></a>
                <a onClick={onPressEditSave} style={{cursor: "pointer", height: 10}}><p>Save</p></a>
            </div>
        </div>
        ):(null)}
       
        <div style={{flexDirection: 'row', display: 'flex', alignItems: 'center'}}>
        <p style={{fontSize: 12, backgroundColor: '#c3dbc5', fontWeight:'500', paddingRight: 5, paddingLeft: 5, borderRadius: 2, minWidth: 65, marginLeft: 5, marginRight: 5}}>Completed</p>
        {todos?
        (
            (         

                todos.map((elem, ind) => {
                if(elem.status === "completed"){
                  return(<p style={{color: '#0096FF', margin: 0}}>●</p>) 
                }else{
                    return("")
                }
                   
                }))

        ):(null) }
        <a onClick={onPressAdd} className={styles.plus}><p style={{fontWeight: 'bold'}}>+</p></a>
        </div>
      

        { todos ? (
                            todos.map((elem, ind) => {
                            if(elem.status === "completed"){
                                return (
                                
                                   <div key={ind}>
                                    
                                       <a onClick={()=>{onPressCard(ind)}} style={{cursor: 'pointer'}}><div className={cards.main}><p style={{fontWeight: 'bold', margin: 0, opacity: .8}}>{elem.name}</p></div></a>
                                      
                                       
                                   </div>
                                )}
                            })) : (null)

                        }
        <a onClick={onPressAdd} style={{cursor: 'pointer'}}><p style={{fontWeight: 'bold', opacity: .4}}>+ New</p></a>


    </div>
  )
}

export default Completed
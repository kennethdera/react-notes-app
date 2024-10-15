import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
//import notes from '../assests/data'
import { Link } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assests/arrow-left.svg";

const NotePage = (props) => {
  let id = useParams().id;
  console.log(id)
  let navigate = useNavigate()

  let [note, setNote] = useState(null);

  let getNotes = async () => {
    if(id === 'new') return
  
    let response = await fetch(`http://localhost:8000/notes/${id}`);
    let data = await response.json();
    setNote(data);
  };

  useEffect(() => {
    getNotes();
  }, [id]);

  let handleSubmit = ()=>{
    if (id !== 'new' && !note.body) {
      deleteNote()
    }else if(id !== 'new'){
      updateNote()
    }else if(id === 'new' && note !== null ){
      createNote()
    }
    navigate('/')
  }
  
  let createNote = async () =>{
    await fetch(`http://localhost:8000/notes/`, {
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...note, 'updated':new Date()})
    });

  }

  let updateNote = async () =>{
    await fetch(`http://localhost:8000/notes/${id}`, {
      method:'PUT',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...note, 'updated':new Date()})
    });

  }

  let deleteNote = async () => {
    await fetch(`http://localhost:8000/notes/${id}`, {
      method:'DELETE',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
      
    });
    navigate('/')
  }

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <Link to="/">
            <ArrowLeft onClick={handleSubmit}/>
          </Link>
        </h3>

        {id === 'new'?(
        <button onClick={handleSubmit} >Done</button>

        ):
        (
        <button onClick={deleteNote} >Delete</button>

        )}


      </div>
      <textarea onChange={(e)=>{
        setNote({...note, 'body':e.target.value})
      }} value={note?.body}></textarea>
    </div>
  );
};

export default NotePage;

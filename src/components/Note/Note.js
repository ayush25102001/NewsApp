import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import './note.css'
const Note = () => {
    const [note, setnote] = useState({ title: "", description: "" })
    const [isLoading, setLoading] = useState(false);
    let history=useNavigate('/')
    const onChange = (e) => {
        setnote(prevState => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!note.title) {
            
        } else if (!note.description) {
            
        } 
        else {
            const response = await fetch('http://localhost:5000/createNote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({ title: note.title, description: note.description})
            });
            const json = await response.json();
            console.log(json);
            if (json === false) {
                history('/login');
            }
            else {
                history('/viewNotes')
            }
        }
        setLoading(false);
    }
    return (
        <div className='center'>
            <form className='note' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input type="text" onChange={onChange} name="title" value={note.title} placeholder="Title" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <textarea onChange={onChange} name="description" value={note.description} placeholder="Description" rows="12" cols="50"></textarea>
                </div>
                <br></br>
                <button type="submit" className="bs btn btn-dark">CreateNote</button>
            </form>
        </div>);
}
export default Note; 
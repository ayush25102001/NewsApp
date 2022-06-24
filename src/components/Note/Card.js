import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import './note.css'
import Carditem from './Carditem';
import './card.css'
const Card = () => {
    const initialnotes = [];
    const [notes, setnotes] = useState(initialnotes)
    const deleteNote = async (id) => {
		const response = await fetch(
			'http://localhost:5000/deleteNote/' + id,
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					'auth-token': localStorage.getItem('token'),
				},
			},
		);
		getnotes();
	};

    const getnotes = async () => {
        const response = await fetch('http://localhost:5000/getNote', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token'),
            },
        });
        const json = await response.json();
        setnotes(json);
    };
    if (notes === initialnotes) {
        getnotes();
    }
    return (
        <>
            
            <br></br>
            <div className="row my-5">
            <h2>Your Notes</h2>
            {notes.map((note) => {
                return (
                    <Carditem note={note} deleteNote={deleteNote} />
                );
            })}
            </div>
        </>
    );
}

export default Card;
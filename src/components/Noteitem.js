import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext'
const Noteitem = (props) => {
    const context = useContext(noteContext)
    const { deleteNote } = context
    const { note, updateNote,showAlert } = props

    return (
        <div className='col-md-3 my-3'>
            <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                        <span className="badge text-bg-success">{note.tag}</span>
                        <p className='my-2'><i className="fa-solid fa-trash-can fa-lg mx-1" onClick={() => {deleteNote(note._id); showAlert("Deleted Succesfully","success")}}></i>
                        <i className="fa-solid fa-pen-to-square fa-lg mx-1" onClick={() => {updateNote(note)}}></i>
                        </p>
                    </div>
            </div>
        </div>
    )
}

export default Noteitem

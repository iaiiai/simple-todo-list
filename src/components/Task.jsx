import React, { useState } from 'react';

const Task = ({ title, description, handleComplete, handleEditTask, handleDelete, uID, state, isEdit }) => {
    const [isEditMode, setEditMode] = useState(isEdit); // false >> true
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedDescription, setEditedDescription] = useState(description);

    return (
        <div id={`task_${uID}`} className={state === 'uncompleted' ? "card purple lighten-5" : 'card completed'}>
            <div className="card-content">
                {isEditMode ?
                    <div id="edit">
                        <form onSubmit={handleEditTask(editedTitle, editedDescription, uID, setEditMode)} id={uID}>
                            <input type="text"
                                placeholder="Edit title"
                                onChange={event => setEditedTitle(event.target.value)}
                                value={editedTitle}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Edit description"
                                onChange={event => setEditedDescription(event.target.value)} value={editedDescription}
                                required />
                            <input
                                type="submit"
                                id={uID}
                                className="waves-effect red btn"
                                value="Save" />
                            <input
                                type="submit"
                                id={uID}
                                onClick={() => setEditMode(false)}
                                className="waves-effect orange darken-4 btn"
                                value="Cancel" />
                        </form>
                    </div> :
                    <div>
                        <span
                            className="card-title">{title} {state !== 'uncompleted' &&
                            <i className="material-icons">done</i>}
                        </span>
                        <p className="description">{description}</p></div>}
            </div>

            <div className="card-action">

                <button id={uID}
                    onClick={handleComplete(uID)}
                    className="waves-effect purple darken-1 btn mxy">
                    {state === 'uncompleted' ? 'Complete' : 'Activate'}
                </button>

                <button
                    id={uID}
                    onClick={() => setEditMode(!isEditMode)}
                    className="waves-effect purple darken-1 btn mxy">
                    Edit
                </button>

                <button
                    id={uID}
                    onClick={handleDelete(uID)}
                    className="waves-effect purple darken-1 btn mxy">
                    Delete
                </button>
            </div>
        </div>
    );
};

export default Task;

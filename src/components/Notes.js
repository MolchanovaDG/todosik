import React from 'react'
import {TransitionGroup, CSSTransition} from 'react-transition-group'

export const Notes = ({notes, onRemove, onToggle}) => (
    <TransitionGroup component="ul" className="list-group">
        {notes.map(note => (
            <CSSTransition
                key={note.id}
                classNames={'note'}
                timeout={800}
            >
                <li className={`list-group-item note ${note.done ? 'note_done' : '' }`}>
                    <div>
                        <strong>{note.title}</strong>
                        <small>{new Date(note.date).toLocaleDateString()}{' '}{new Date(note.date).toLocaleTimeString()}</small>
                    </div>
                    <div>
                    <button
                        type="button"
                        className="btn btn-outline-success btn-sm pull-right"
                        onClick={() => onToggle(note.id, note.done ? false : true)}
                    > <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
                    </svg>
                    </button>
                    <button
                        type="button"
                        className="btn btn-outline-danger ml-3 btn-sm"
                        onClick={() => onRemove(note.id)}
                    >
                        &times;
                    </button>
                    </div>
                </li>
            </CSSTransition>
        ))}
    </TransitionGroup>
)

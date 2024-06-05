'use client'
import React, { createContext, useReducer, useEffect, ReactNode, Dispatch } from 'react';

// Define note type
interface Note {
  id: string;
  note: string;
  isSelected: boolean;
}

// Define action types
type ActionType =
  | { type: 'ADD_NOTE'; payload: Note }
  | { type: 'REMOVE_NOTE'; payload: string }
  | { type: 'TOGGLE_NOTE'; payload: string }
  | { type: 'TOGGLE_ADD_NOTE' };

// Define the state and context types
interface NotesState {
  notes: Note[];
  addNoteEnabled: boolean;
}

interface NotesContextProps extends NotesState {
  addNote: (note: Note) => void;
  removeNote: (id: string) => void;
  toggleNote: (id: string) => void;
  toggleAddNote: () => void;
}

// Create the context
const NotesContext = createContext<NotesContextProps | undefined>(undefined);

// Define the initial state
const initialState: NotesState = {
  notes: [],
  addNoteEnabled: true,
};

// Create a reducer to manage the notes state
const notesReducer = (state: NotesState, action: ActionType): NotesState => {
  switch (action.type) {
    case 'ADD_NOTE':
      return { ...state, notes: [...state.notes, action.payload] };
    case 'REMOVE_NOTE':
      return { ...state, notes: state.notes.filter(note => note.id !== action.payload) };
    case 'TOGGLE_NOTE':
      return {
        ...state,
        notes: state.notes.map(note =>
          note.id === action.payload
            ? { ...note, isSelected: !note.isSelected }
            : note
        ),
      };
    case 'TOGGLE_ADD_NOTE':
      return { ...state, addNoteEnabled: !state.addNoteEnabled };
    default:
      return state;
  }
};

// Create a provider component
const NotesProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(notesReducer, initialState, () => {
    if (typeof window !== "undefined") {
      const localData = localStorage.getItem('notesState');
      return localData ? JSON.parse(localData) : initialState;
    }
    return initialState;
  });

  useEffect(() => {
    localStorage.setItem('notesState', JSON.stringify(state));
  }, [state]);

  // Define action creators
  const addNote = (note: Note) => {
    dispatch({ type: 'ADD_NOTE', payload: note });
  };

  const removeNote = (id: string) => {
    dispatch({ type: 'REMOVE_NOTE', payload: id });
  };

  const toggleNote = (id: string) => {
    dispatch({ type: 'TOGGLE_NOTE', payload: id });
  };

  const toggleAddNote = () => {
    dispatch({ type: 'TOGGLE_ADD_NOTE' });
  };

  return (
    <NotesContext.Provider value={{ ...state, addNote, removeNote, toggleNote, toggleAddNote }}>
      {children}
    </NotesContext.Provider>
  );
};

export { NotesProvider, NotesContext };    export type { Note };


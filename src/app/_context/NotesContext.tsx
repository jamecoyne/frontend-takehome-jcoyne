'use client'
import React, { createContext, useReducer, useEffect, ReactNode, Dispatch } from 'react';

interface Note {
  id: string;
  note: string;
}

type ActionType =
  | { type: 'ADD_NOTE'; payload: Note }
  | { type: 'REMOVE_NOTE'; payload: string }
  | { type: 'SELECT_NOTE'; payload: string }
  | { type: 'TOGGLE_ADD_NOTE' ; payload: string | undefined};

interface NotesState {
  notes: Note[];
  addNoteID: string | undefined;
  selectedNoteID: string | undefined;
}

interface NotesContextProps extends NotesState {
  addNote: ( annotation: string) => void;
  removeNote: (id: string) => void;
  selectNote: (id: string) => void;
  toggleAddNote: (id: string | undefined) => void;
}

const NotesContext = createContext<NotesContextProps | undefined>(undefined);

const initialState: NotesState = {
  notes: [],
  addNoteID: undefined,
  selectedNoteID: undefined,
};

const notesReducer = (state: NotesState, action: ActionType): NotesState => {
  switch (action.type) {
    case 'ADD_NOTE':
      return { ...state, notes: [...state.notes, action.payload], addNoteID: undefined };
    case 'REMOVE_NOTE':
      return { ...state, notes: state.notes.filter(note => note.id !== action.payload) };
    case 'SELECT_NOTE':
      return {
        ...state,
        selectedNoteID: action.payload
      };
    case 'TOGGLE_ADD_NOTE':
      return { ...state, addNoteID: action.payload };
    default:
      return state;
  }
};

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

  const addNote = (annotation: string) => {
    dispatch({ type: 'ADD_NOTE', payload: {id: state.addNoteID ?? '', note: annotation} });
  };

  const removeNote = (id: string) => {
    dispatch({ type: 'REMOVE_NOTE', payload: id });
  };

  const selectNote = (id: string) => {
    dispatch({ type: 'SELECT_NOTE', payload: id });
  };

  const toggleAddNote = (id: string | undefined) => {
    dispatch({ type: 'TOGGLE_ADD_NOTE', payload: id });
  };

  return (
    <NotesContext.Provider value={{ ...state, addNote, removeNote, selectNote, toggleAddNote }}>
      {children}
    </NotesContext.Provider>
  );
};

export { NotesProvider, NotesContext };    
export type { Note };


'use client'
import React, { useContext, useState } from 'react';
import { Note, NotesContext } from '../_context/NotesContext';
import ChartSelector, { chartType } from './chartSelector';
import { Separator } from '~/components/ui/separator';



export default function NotesComponent(props: {currentChart: chartType, setCurrentChart: (chartType: chartType) => void})  {

  const context = useContext(NotesContext);
      if (!context) {
      throw new Error('NotesComponent must be used within a NotesProvider');
    }
  const { notes, toggleNote, removeNote } = context;

  return (
    <div className='border-r b-neutral-200 '>
      <div className='p-4 h-16 items-center flex justify-center'>
      <ChartSelector currentChart={props.currentChart} setCurrentChart={props.setCurrentChart}/>
      </div>
      <Separator />
      <div className='p-3'>
      <h2>Annotations</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {notes.map(note => (
          <li key={note.id} style={{ marginBottom: '10px' }}>
            <span
              style={{ textDecoration: note.isSelected ? 'line-through' : 'none', cursor: 'pointer' }}
              onClick={() => toggleNote(note.id)}
            >
              {note.note}
            </span>
            <button onClick={() => removeNote(note.id)} style={{ marginLeft: '10px' }}>Remove</button>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};

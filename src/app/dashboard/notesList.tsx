'use client'
import React, { useContext, useState } from 'react';
import { Note, NotesContext } from '../_context/NotesContext';
import ChartSelector, { chartType } from './chartSelector';
import { Separator } from '~/components/ui/separator';
import { X } from 'lucide-react';
import { Label } from '@radix-ui/react-label';



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
      <ul >
        {notes.map(note => (
          <li key={note.id} style={{ marginBottom: '10px' }}>
            <div className='flex flex-row items-center'>
              <X onClick={() => removeNote(note.id)} style={{ marginLeft: '10px' }}/>
              <Label
                style={{ 
                  cursor: 'pointer', 
                  textOverflow: 'ellipsis', 
                  overflow: 'hidden', 
                  whiteSpace: 'nowrap',
                  background: note.isSelected ? 'yellow' : 'white'
                 }}
                onClick={() => toggleNote(note.id)}
              >
                {note.note}
              </Label>
            </div>
           
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};

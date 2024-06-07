'use client'
import React, { useContext } from 'react';
import { NotesContext } from '../_context/NotesContext';
import ChartSelector, { chartType } from './chartSelector';
import { Separator } from '~/components/ui/separator';
import { X } from 'lucide-react';
import { Label } from '@radix-ui/react-label';

export default function NotesComponent(props: {currentChart: chartType, setCurrentChart: (chartType: chartType) => void})  {

  const context = useContext(NotesContext);
      if (!context) {
      throw new Error('NotesComponent must be used within a NotesProvider');
    }
  const { notes, selectNote, removeNote, selectedNoteID } = context;

  return (
    <div id="notes-page" className='border-r b-neutral-200' style={{height: 'calc(100vh - 56px)'}}>
      <div className='p-4 h-16 items-center flex justify-center'>
      <ChartSelector currentChart={props.currentChart} setCurrentChart={props.setCurrentChart}/>
      </div>
      <Separator />
      <div className=''>
      <div className=" font-semibold p-3">Annotations</div>
      <ul >
        {notes.map(note => (
          <li 
          onClick={() => selectNote(note.id)}
          key={note.id} 
          className='flex flex-row items-center pt-2 pb-2 border-b border-neutral-200' 
          style={{background: note.id === selectedNoteID ? 'aliceblue' : 'none' }}>
              <X className="flex, flex-shrink-0" onClick={() => removeNote(note.id)} style={{ marginLeft: '10px', width: '20px', height: '20px' }}/>
              <Label
                style={{ 
                  cursor: 'pointer', 
                  textOverflow: 'ellipsis', 
                  overflow: 'hidden', 
                  whiteSpace: 'nowrap',
                 }}
              >
                {note.note}
              </Label>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};

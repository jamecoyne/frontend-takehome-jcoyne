'use client'
import React, { useContext, useState } from 'react';
import { Note, NotesContext } from '../_context/NotesContext';
import ChartSelector from './chartSelector';


// const NotesComponent: React.FC = () => {
//     const context = useContext(NotesContext);
  
//     if (!context) {
//       throw new Error('NotesComponent must be used within a NotesProvider');
//     }
  
//     const { notes, addNote, removeNote, toggleNote, toggleAddNote, addNoteEnabled } = context;
//     const [noteText, setNoteText] = useState('');
  
//     const handleCreateNote = () => {
//       const newNote: Note = {
//         id: Date.now().toString(), // Use a unique id
//         note: noteText,
//         isSelected: false,
//       };
//       addNote(newNote);
//       setNoteText('');
//     };
  
//     return (
//       <div>
//         <input
//           type="text"
//           value={noteText}
//           onChange={(e) => setNoteText(e.target.value)}
//         />
//         <button onClick={handleCreateNote}>Add Note</button>
//         <button onClick={toggleAddNote}>Add Note ({addNoteEnabled.toString()})</button>
//         <ul>
//           {notes.map(note => (
//             <li key={note.id}>
//               <span
//                 style={{ textDecoration: note.isSelected ? 'line-through' : 'none' }}
//                 onClick={() => toggleNote(note.id)}
//               >
//                 {note.note} + {note.id}
//               </span>
//               <button onClick={() => removeNote(note.id)}>Remove</button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   };
  
//   export default NotesComponent;

// import React, { useContext } from 'react';
// import { NotesContext } from '../_context/NotesContext';



const NotesComponent: React.FC = () => {

  const context = useContext(NotesContext);
      if (!context) {
      throw new Error('NotesComponent must be used within a NotesProvider');
    }
  const { notes, toggleNote, removeNote } = context;

  return (
    <div style={{  borderRight: '1px solid #ccc', padding: '10px' }}>
      <ChartSelector currentChart={'heatmap'} setCurrentChart={function (chartType: 'heatmap' | 'linechart'): void {
        throw new Error('Function not implemented.');
      } }/>
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
  );
};

export default NotesComponent;
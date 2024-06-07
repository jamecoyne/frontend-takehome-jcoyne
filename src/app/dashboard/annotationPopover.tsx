'use client'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { Note, NotesContext } from "../_context/NotesContext";
import { useContext, useState } from "react";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";

export default function AnnotationPopover() {
    const context = useContext(NotesContext);
    const [value, setValue] = useState('');

    const onAdd = () => {
        context?.addNote(value);
        setValue('')
    }
    
    const onClose = () => {
        context?.toggleAddNote(undefined);
        setValue('');
    }
      
    return(
        <Dialog open={context?.addNoteID != undefined} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Annotation</DialogTitle>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="annotation" className="sr-only">
                Annotation
              </Label>
              <Input 
              value={value}
              onChange={(event) => {setValue(event.target.value)}}
                id="annotation"
              />
            </div>
            <Button type="submit" className="px-3" onClick={onAdd}>
              <span>Add</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
}
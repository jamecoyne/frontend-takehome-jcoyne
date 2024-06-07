'use client'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "~/components/ui/resizable";
import { NotesProvider } from "../_context/NotesContext";
import Chart from "./chart";
import Heatmap from "./heatmap";
import NotesComponent from "./notesList";
import { DataStructureShape, SchemaDataItem } from "./page";
import { useState } from "react";
import { chartType } from "./chartSelector";
import AnnotationPopover from "./annotationPopover";

export default function Dashboard(props: {data: SchemaDataItem[]}){
    const [currentChart, setCurrentChart] = useState<chartType>('heatmap');
    return (
        <NotesProvider>
            <AnnotationPopover />
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel>
                    <div>
                        {currentChart == 'linechart'&& <Chart data={props.data} />   }
                        {currentChart == 'heatmap' && <Heatmap data={props.data}/> }
                    </div>   
                </ResizablePanel>
            <ResizableHandle withHandle/>
            <ResizablePanel defaultSize={15} minSize={10} >
                <NotesComponent currentChart={currentChart} setCurrentChart={setCurrentChart}/>
            </ResizablePanel>
            </ResizablePanelGroup>  
        </NotesProvider>
   )
}
'use client'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "~/components/ui/resizable";
import { NotesProvider } from "../_context/NotesContext";
import Chart from "./chart";
import Heatmap from "./heatmap";
import NotesComponent from "./notesList";
import { DataStructureShape, SchemaDataItem } from "./page";
import { useState } from "react";
import { chartType } from "./chartSelector";

export default function Dashboard(props: {data: SchemaDataItem[]}){
    const [currentChart, setCurrentChart] = useState<chartType>('heatmap');
    return (
        <NotesProvider>
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel>   
                    {currentChart == 'linechart'&& <Chart data={props.data} width={1700} height={400} />   }
                    {currentChart == 'heatmap' && <Heatmap data={props.data}/> }
                </ResizablePanel>
            <ResizableHandle withHandle/>
            <ResizablePanel defaultSize={15} minSize={10} >
                <NotesComponent currentChart={currentChart} setCurrentChart={setCurrentChart}/>
            </ResizablePanel>
            </ResizablePanelGroup>  
        </NotesProvider>
   )
}
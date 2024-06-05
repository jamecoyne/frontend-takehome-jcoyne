import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "~/components/ui/resizable";
import { NotesProvider } from "../_context/NotesContext";
import Chart from "./chart";
import Heatmap from "./heatmap";
import NotesComponent from "./notesList";
import { DataStructureShape, SchemaDataItem } from "./page";

export default function Dashboard(props: {data: SchemaDataItem[]}){
    const year = 2020;
    const startDate = `${year}-01-01`;
    const endDate = `${year}-12-31`;
    return (
        <NotesProvider>
        <ResizablePanelGroup direction="horizontal">
            <ResizablePanel>                
                <Heatmap data={props.data} startDate={startDate} endDate={endDate}  />
            </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
            <NotesComponent/>
        </ResizablePanel>
</ResizablePanelGroup>
          
        </NotesProvider>
   )
}

//   {/* <div style={{ display: 'flex' }}>
                
//                  {/* <Chart data={props.data} width={1700} height={400} /> */}

//                 </div> */}
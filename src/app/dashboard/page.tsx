import React from "react";
import Heatmap from "./heatmap";
import Dashboard from "./dashboard";

interface SchemaFieldItem {
    name: string;
    type: string;
    tz?: string;
    units?: string;
  }

  export interface SchemaDataItem {
    datetime: string;
    carbon_intensity: number;
  }

 interface SchemaStructure {
    fields: SchemaFieldItem[],
    data: SchemaDataItem[]
}

async function getData(): Promise<SchemaStructure> {
    const res = await fetch('https://storage.googleapis.com/verse-scratch-data-public/interview-takehome/caiso_carbon_intensity.json')
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
}

export type DataStructureShape = {
  datetime: string;
  value: number;
  // hour: number;
}[]

export default async function Page() {
  const res = await getData();
  
  // const real_data: DataStructureShape = res.data.map(d => {
  //   // const splitDateTime = d.datetime.split("T");
  //   // const date = splitDateTime[0] ?? "";
  //   // const time = splitDateTime[1];
  //   // const hour = parseInt(time?.split(":")[0] ?? "", 10)
      
  //   return({
  //     // date,
  //     datetime: d.datetime,
  //     value: d.carbon_intensity,
  //     // hour
  //   })
  //   })
    
    return (
      <Dashboard data={res.data} />
     )
}
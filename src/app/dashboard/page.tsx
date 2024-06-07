import React from "react";
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
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
}

export type DataStructureShape = {
  datetime: string;
  value: number;
}[]

export default async function Page() {
  const res = await getData();
    
    return (
      <Dashboard data={res.data} />
     )
}
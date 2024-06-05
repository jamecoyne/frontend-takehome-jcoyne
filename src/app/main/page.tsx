import Link from "next/link";
import React from "react";
import { Button } from "~/components/ui/button";

export default async function Page() {
return (
    <div className="flex flex-row">
        <Sidebar/>
        <Main/>
    </div>
    );
}



function Sidebar(){
    return( <div className="flex flex-col bg-neutral-100 w-64 h-screen border-2 border-neutral-300 p-4 gap-3"> 
    <SidebarTab isSelected={true} title="Planning & Procurement"/>
    <SidebarTab isSelected={false} title="Delivery"/>
    <SidebarTab isSelected={false} title="Optimization"/>
    <SidebarTab isSelected={false} title="Monitoring & reporting"/>
     </div>);
}

function LinkCard(props: {title: string, isSelected: boolean, link?: string}){
    return (<Link href={props.link ?? ''}>
        <div className="flex flex-col w-64 h-72 rounded-2xl items-center justify-between text-center p-8" 
            style={{background: props.isSelected ? "rgb(178, 196, 217)" : "rgb(238, 240, 239)"}}
            >
                <div className="rounded-full w-10 h-10 bg-neutral-600"></div>
            <div>{props.title}</div>
        <Button variant={props.isSelected ? 'default' : 'secondary'} className="rounded-full pl-10 pr-10">Set Up</Button>
        </div>
    </Link>)
}

function Main(){
    return  <div className="flex-1 items-center justify-center  w-full ">
        <div className="flex gap-8 items-center justify-center  h-screen">
        <LinkCard title="Goal Setting & Portfolio Design" isSelected={false}/>
        <LinkCard title="RFO Administration" isSelected={false}/>
        <LinkCard title="Commercial Structuring" isSelected={false}/>
        <LinkCard title="Energy Supply Portfolio Construction" isSelected={true} link="/dashboard"/>
        </div>
        </div>
}

function SidebarTab(props: {title: string, isSelected: boolean}){
    return (
    <div className=" flex border-2 border-neutral-300 h-20 rounded-sm items-center justify-center" style={props.isSelected ?{background: "rgb(178, 196, 217)"} : {}}>
        {props.title}
    </div>
    );
}
import Link from "next/link";
import React from "react";
import Image from 'next/image';
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
    return( <div className="flex flex-col bg-neutral-100 w-64 border-2 border-neutral-300 p-4 gap-3" style={{height: 'calc(100vh - 56px)'}}> 
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
                <Image
                className="opacity-50"
                    src="/mountain-black.svg"
                    alt="mountain icon"
                    width={50}
                    height={50}
                />
            <div>{props.title}</div>
        <Button variant={props.isSelected ? 'default' : 'secondary'} className="rounded-full pl-10 pr-10">Set Up</Button>
        </div>
    </Link>)
}

function Main(){
    return  (
        <div className="flex-1 items-center justify-center  w-full ">
            <div className="flex flex-col gap-8 items-center justify-center  h-svh" style={{height: 'calc(100vh - 56px)'}}>
                <div className="flex flex-row gap-8">
                    <LinkCard title="Goal Setting & Portfolio Design" isSelected={false}/>
                    <LinkCard title="RFO Administration" isSelected={false}/>
                </div>
                <div className="flex flex-row gap-8">
                    <LinkCard title="Commercial Structuring" isSelected={false}/>
                    <LinkCard title="Energy Supply Portfolio Construction" isSelected={true} link="/dashboard"/>
                </div>
            </div>
        </div>
    )
}

function SidebarTab(props: {title: string, isSelected: boolean}){
    return (
    <div className=" flex border-2 border-neutral-300 h-20 rounded-sm items-center " style={props.isSelected ?{background: "rgb(178, 196, 217)"} : {}}>
      <Image
        className="m-5"
        src="/mountain-black.svg"
        alt="mountain icon"
        width={20}
        height={20}
                />
        {props.title}
    </div>
    );
}
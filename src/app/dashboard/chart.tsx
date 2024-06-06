'use client'
import { useEffect, useRef, useState } from "react";
import * as d3 from 'd3';
import DatePopover from "../_components/DatePopover";
import { SchemaDataItem } from "./page";
import { Separator } from "~/components/ui/separator";
import { Switch } from "~/components/ui/switch";
import { Label } from "~/components/ui/label";


interface LineChartProps {
  data: SchemaDataItem[];
  width: number;
  height: number;
}

export default function LineChart (props: LineChartProps)  {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [fillArea, setFillArea] = useState(false);
  const [min_date, setMinDate] = useState<Date>()
  const [max_date, setMaxDate] = useState<Date>()

  const data = props.data.map(d => {
    return {date: d.datetime, value: d.carbon_intensity}
  });
  
  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const innerWidth = props.width - margin.left - margin.right;
    const innerHeight = props.height - margin.top - margin.bottom;


    const fullRange = d3.extent(data, d => new Date(d.date)) as [Date, Date];
    const x = d3
      .scaleTime()
      .domain([min_date ?? fullRange[0], max_date ?? fullRange[1]])
      .range([0, innerWidth]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.value)] as [number, number])
      .range([innerHeight, 0]);

    //   the curve
    const line = d3
      .line<{ date: string; value: number }>()
      .x(d => x(new Date(d.date)))
      .y(d => y(d.value));

    //   area under the curve
    const area = d3
      .area<{ date: string; value: number }>()
      .x(d => x(new Date(d.date)))
      .y0(innerHeight)
      .y1(d => y(d.value));

    //   global transform
    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    
    if(fillArea){
        g.append('path')
        .datum(data)
        .attr('fill', 'steelblue')
        .attr('opacity', 0.5)
        .attr('d', area);
    }
    
    g.append('g')
      .call(d3.axisLeft(y))
      .append('text')
      .attr('fill', '#000')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '-4em')
      .attr('text-anchor', 'end')
      .text('Value');

    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x))
      .append('text')
      .attr('fill', '#000')
      .attr('x', innerWidth)
      .attr('dy', '3em')
      .attr('text-anchor', 'end')
      .text('Date');

    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', line);
  }, [props.data, props.height, props.width, fillArea, min_date, max_date]);

  return <div>
     <LineChartHeader fillArea={fillArea} maxDate={max_date} minDate={min_date} setFillArea={setFillArea} setMaxDate={setMaxDate} setMinDate={setMinDate}/>
        <svg ref={svgRef} viewBox={`0 0 ${props.width} ${props.height}`} preserveAspectRatio="xMidYMid meet"></svg>
    </div>;
};

function LineChartHeader(props: {
  minDate: Date | undefined, 
  maxDate: Date | undefined, 
  fillArea: boolean,
  setFillArea: (fillArea: boolean) => void,
  setMinDate: (date: Date| undefined) => void, 
  setMaxDate: (date: Date | undefined) => void,}) {
return (
  <> 
   <div className="items-top flex space-x-2  items-center h-16 p-4">
    <DatePopover date={props.minDate} setDate={props.setMinDate} placeholder="Start Date"/>
    <DatePopover date={props.maxDate} setDate={props.setMaxDate} placeholder="End Date"/>
    {/* <CheckBox onChange={props.setFillArea} value={props.fillArea} label="Fill Area"/> */}
    <Switch id="fill-area"  onCheckedChange={props.setFillArea} checked={props.fillArea} />
    <Label htmlFor="fill-area">Fill Area</Label>
  </div>
  <Separator /></>
 );
}
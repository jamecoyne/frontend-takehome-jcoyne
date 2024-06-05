'use client'
import { useEffect, useRef, useState } from "react";
import * as d3 from 'd3';
import DatePopover from "../_components/DatePopover";
import CheckBox from "../_components/CheckBox";


interface LineChartProps {
  data: { date: string; value: number }[];
  width: number;
  height: number;
}

export default function LineChart (props: LineChartProps)  {
  const svgRef = useRef<SVGSVGElement | null>(null);
    const [fillArea, setFillArea] = useState(false);
    const [min_date, setMinDate] = useState<Date>()
    const [max_date, setMaxDate] = useState<Date>()

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const innerWidth = props.width - margin.left - margin.right;
    const innerHeight = props.height - margin.top - margin.bottom;


    const fullRange = d3.extent(props.data, d => new Date(d.date)) as [Date, Date];
    // const x = d3
    //   .scaleTime()
    //   .domain(d3.extent(data, d => new Date(d.date)) as [Date, Date])
    //   .range([0, innerWidth]);

    const x = d3
      .scaleTime()
      .domain([min_date ?? fullRange[0], max_date ?? fullRange[1]])
      .range([0, innerWidth]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(props.data, d => d.value)] as [number, number])
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
        .datum(props.data)
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
      .datum(props.data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', line);
  }, [props.data, props.height, props.width, fillArea, min_date, max_date]);

  return <div>
    <div className="items-top flex space-x-2">
        <DatePopover date={min_date} setDate={setMinDate}/>
        <DatePopover date={max_date} setDate={setMaxDate}/>
        <CheckBox onChange={setFillArea} value={fillArea} label="Fill Area"/>
        </div>
        <svg ref={svgRef} viewBox={`0 0 ${props.width} ${props.height}`} preserveAspectRatio="xMidYMid meet"></svg>
    </div>;
};



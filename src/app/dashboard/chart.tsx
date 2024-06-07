'use client';
import { useEffect, useContext, useRef, useState } from 'react';
import * as d3 from 'd3';
import { NotesContext } from '../_context/NotesContext';
import DatePopover from '../_components/DatePopover';
import { SchemaDataItem } from './page';
import { Separator } from '~/components/ui/separator';
import { Switch } from '~/components/ui/switch';
import { Label } from '~/components/ui/label';

interface LineChartProps {
  data: SchemaDataItem[];
}

export default function LineChart(props: LineChartProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef(null);
  const [fillArea, setFillArea] = useState(false);
  const [minDate, setMinDate] = useState<Date>();
  const [maxDate, setMaxDate] = useState<Date>();

  const data = props.data.map(d => {
    return { date: d.datetime, value: d.carbon_intensity };
  });

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 40, right: 30, bottom: 30, left: 40 };
    const container = d3.select(containerRef.current);

    const width = container.node().clientWidth;
    const height = container.node().clientHeight;
    svg
      .attr('width', width)
      .attr('height', height)
      .append('g');

    const fullRange = d3.extent(data, d => new Date(d.date)) as [Date, Date];
    const x = d3
      .scaleTime()
      .domain([minDate ?? fullRange[0], maxDate ?? fullRange[1]])
      .range([0, innerWidth]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.value)] as [number, number])
      .range([innerHeight- 200, 0]);

    // Line and area generators
    const line = d3
      .line<{ date: string; value: number }>()
      .x(d => x(new Date(d.date)))
      .y(d => y(d.value));

    const area = d3
      .area<{ date: string; value: number }>()
      .x(d => x(new Date(d.date)))
      .y0(innerHeight - 200 )
      .y1(d => y(d.value));

    // Append chart group
    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Area under the curve
      const filledArea  = g.append('path')
        .datum(data)
        .attr('fill', fillArea ? 'steelblue' : 'none')
        .attr('opacity', 0.5)
        .attr('d', area);

    // Axis
    const xAxis = g.append('g')
      .attr('transform', `translate(0,${innerHeight- 200})`)
      .call(d3.axisBottom(x));

    const yAxis = g.append('g')
      .call(d3.axisLeft(y));

    // Line path
    const linePath = g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', line);


    // Zoom functionality
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .on('zoom', (event) => {
        const transform = event.transform;
        const newX = transform.rescaleX(x);
        const newY = transform.rescaleY(y);
        
        xAxis.call(d3.axisBottom(newX));
        yAxis.call(d3.axisLeft(newY));
        
        linePath.attr('d', line.x(d => newX(new Date(d.date))).y(d => newY(d.value)));

        filledArea.attr('d', line.x(d => newX(new Date(d.date))).y(d => newY(d.value)));
      });

    svg.call(zoom);

  }, [props.data, fillArea, minDate, maxDate]);

  return (
    <div>
      <LineChartHeader fillArea={fillArea} maxDate={maxDate} minDate={minDate} setFillArea={setFillArea} setMaxDate={setMaxDate} setMinDate={setMinDate} />
      <div ref={containerRef} style={{height: 'calc(100vh - 121px)', width: '100vw' }}>
        <svg ref={svgRef}></svg>
      </div>
    </div>
  );
}

function LineChartHeader(props: {
  minDate: Date | undefined,
  maxDate: Date | undefined,
  fillArea: boolean,
  setFillArea: (fillArea: boolean) => void,
  setMinDate: (date: Date | undefined) => void,
  setMaxDate: (date: Date | undefined) => void,
}) {
  return (
    <>
      <div className="items-top flex space-x-2 items-center h-16 p-4">
        <DatePopover date={props.minDate} setDate={props.setMinDate} placeholder="Start Date" />
        <DatePopover date={props.maxDate} setDate={props.setMaxDate} placeholder="End Date" />
        <Switch id="fill-area" onCheckedChange={props.setFillArea} checked={props.fillArea} />
        <Label htmlFor="fill-area">Fill Area</Label>
      </div>
      <Separator />
    </>
  );
}
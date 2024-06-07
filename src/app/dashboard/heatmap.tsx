'use client';
import { useContext, useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { SchemaDataItem } from './page';
import { NotesContext } from '../_context/NotesContext';
import { Separator } from '~/components/ui/separator';
import HeatmapNav from './HeatmapNav';

export default function Heatmap(props: { data: SchemaDataItem[] }) {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const containerRef = useRef(null);
    const context = useContext(NotesContext);
    const [currentYear, setCurrentYear] = useState(2021);
    const startDate = `${currentYear}-01-01`;
    const endDate = `${currentYear}-12-31`;

    if (!context) {
        throw new Error('NotesComponent must be used within a NotesProvider');
    }

    const { notes, toggleAddNote, selectedNoteID } = context;

    const handleCreateNote = (id: string) => {
        toggleAddNote(id);
    };

    const structured_data = props.data.map((d) => {
        const splitDateTime = d.datetime.split('T');
        const day = splitDateTime[0] ?? '';
        const time = splitDateTime[1];
        const hour = parseInt(time?.split(':')[0] ?? '', 10);

        return {
            day,
            value: d.carbon_intensity,
            hour,
            id: d.datetime,
        };
    });

    useEffect(() => {
        if (!svgRef.current || !containerRef.current) return;
        const cellSize = 10;
    
        const svg_root = d3.select(svgRef.current);
        svg_root.selectAll('*').remove();
        const container = d3.select(containerRef.current);

        const width = container.node().clientWidth;
        const height = container.node().clientHeight;
        const svg = svg_root
            .attr('width', width)
            .attr('height', height)
            .append('g');
           
            

        const parseTime = d3.timeParse('%Y-%m-%d');

        const startDateParsed = parseTime(startDate);
        const endDateParsed = parseTime(endDate);
        const days = d3.timeDays(startDateParsed!, endDateParsed!);
        const months = d3.timeMonths(startDateParsed!, endDateParsed!);

        const counts: { [key: string]: number } = {};
        structured_data.forEach((d) => {
            const key = `${d.day}-${d.hour}`;
            counts[key] = d.value;
        });

        const colorScale = d3
            .scaleLinear<string>()
            .domain([0, d3.max(structured_data, (d) => d.value) ?? 0])
            .range(['blue', 'pink']);

        const heatmapGroup = svg.append('g');

        heatmapGroup
            .selectAll('rect')
            .data(
                days.flatMap((day) =>
                    Array.from({ length: 24 }, (_, hour) => ({
                        day,
                        hour,
                        count: counts[`${day.toISOString().split('T')[0]}-${hour}`] || 0,
                    }))
                )
            )
            .enter()
            .append('rect')
            .on('click', (_e, d) => {
                handleCreateNote(`${d.day.toISOString().split('T')[0]}-${d.hour}`);
            })
            .attr('width', cellSize)
            .attr('height', cellSize)
            .attr('x', (d) => days.indexOf(d.day) * cellSize)
            .attr('y', (d) => d.hour * cellSize)
            .attr('fill', (d) => colorScale(d.count))
            .append('title')
            .text((d) => `${d.day.toISOString().split('T')[0]} ${d.hour}:00 - Carbon Intensity: ${d.count}`);

        heatmapGroup
            .selectAll('.dayLabel')
            .data(months)
            .enter()
            .append('text')
            .attr('x', (_, i) => 30 * i * cellSize + cellSize / 2)
            .attr('y', -5)
            .style('text-anchor', 'middle')
            .text((d) => d3.timeFormat('%b')(d));

        heatmapGroup
            .selectAll('.hourLabel')
            .data(d3.range(0, 25, 6))
            .enter()
            .append('text')
            .attr('x', -5)
            .attr('y', (d) => d * cellSize + cellSize / 2)
            .style('text-anchor', 'end')
            .text((d) => `${d}`);

        const noteKeys = notes.map((note) => note.id);

        heatmapGroup
            .selectAll('circle')
            .data(
                days.flatMap((day) =>
                    Array.from({ length: 24 }, (_, hour) => ({
                        day,
                        hour,
                        hasNote: noteKeys.includes(`${day.toISOString().split('T')[0]}-${hour}`),
                    }))
                )
            )
            .enter()
            .append('circle')
            .filter((d) => d.hasNote)
            .attr('cx', (d) => days.indexOf(d.day) * cellSize + cellSize / 2)
            .attr('cy', (d) => d.hour * cellSize + cellSize / 2)
            .attr('r', cellSize / 3)
            .attr('fill', (d) => {
                const id = `${d.day.toISOString().split('T')[0]}-${d.hour}`;
                return id == selectedNoteID ? 'yellow' : 'red';
            });

        const zoom = d3.zoom<SVGSVGElement, unknown>()
            .on('zoom', (event) => {
                heatmapGroup.attr('transform', event.transform);
            });
        svg_root.call(zoom);
    }, [structured_data, startDate, endDate, notes, containerRef]);

    return (
        <>
       
        <HeatmapNav currentYear={currentYear} setCurrentYear={setCurrentYear} maxYear={2024} minYear={2019} />
        <Separator />
        <div ref={containerRef} style={{height: 'calc(100vh - 121px)', width: '100vw' }}>
            <svg ref={svgRef} ></svg>
        </div>
    </>
        
    );
}

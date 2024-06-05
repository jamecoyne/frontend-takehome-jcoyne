'use client'
import { useContext, useEffect, useRef } from "react";
import * as d3 from 'd3';
import { DataStructureShape, SchemaDataItem } from "./page";
import { Note, NotesContext } from "../_context/NotesContext";

interface HeatmapProps {
    data: SchemaDataItem[];
    startDate: string;
    endDate: string;
}

function HeatmapNav() {
  return <div className="h-10 bg-neutral-300"></div>
}

function Heatmap(props: HeatmapProps) {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const context = useContext(NotesContext);
    
    if (!context) {
        throw new Error('NotesComponent must be used within a NotesProvider');
    }

    const { notes, addNote, removeNote, toggleNote, toggleAddNote, addNoteEnabled } = context;

    const handleCreateNote = (id: string) => {
        const newNote: Note = {
            id,
            note: "hello world",
            isSelected: false,
        };
        addNote(newNote);
    };

    const structured_data = props.data.map((d) => {
        const splitDateTime = d.datetime.split("T");
        const day = splitDateTime[0] ?? "";
        const time = splitDateTime[1];
        const hour = parseInt(time?.split(":")[0] ?? "", 10);

        return ({
            day,
            value: d.carbon_intensity,
            hour,
            id: d.datetime
        });
    });

    useEffect(() => {
        const cellSize = 10;
        const margin_size = 40;
        const margin = { top: margin_size, right: margin_size, bottom: margin_size, left: margin_size };
        const width = (365 * cellSize) + (2 * margin_size);
        const height = (24 * cellSize) + (2 * margin_size);

        const svg_root = d3
            .select(svgRef.current);
        svg_root.selectAll('*').remove();
        const svg = svg_root.attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        const parseTime = d3.timeParse('%Y-%m-%d');

        const startDateParsed = parseTime(props.startDate);
        const endDateParsed = parseTime(props.endDate);
        const days = d3.timeDays(startDateParsed!, endDateParsed!);
        const months = d3.timeMonths(startDateParsed!, endDateParsed!);

        const counts: { [key: string]: number } = {};
        structured_data.forEach((d) => {
            const key = `${d.day}-${d.hour}`;
            counts[key] = d.value;
        });

        const colorScale = d3
            .scaleLinear<string>()
            .domain([0, d3.max(structured_data, d => d.value) ?? 0])
            .range(['blue', 'pink']);

        svg
            .selectAll('rect')
            .data(days.flatMap((day) =>
                Array.from({ length: 24 }, (_, hour) => ({
                    day,
                    hour,
                    count: counts[`${day.toISOString().split('T')[0]}-${hour}`] || 0,
                }))
            ))
            .enter()
            .append('rect')
            .on('click', (e, d) => {
                handleCreateNote(`${d.day.toISOString().split('T')[0]}-${d.hour}`);
            })
            .attr('width', cellSize)
            .attr('height', cellSize)
            .attr('x', (d) => days.indexOf(d.day) * cellSize)
            .attr('y', (d) => d.hour * cellSize)
            .attr('fill', (d) => colorScale(d.count))
            .append('title')
            .text(
                (d) => `${d.day.toISOString().split('T')[0]} ${d.hour}:00 - Carbon Intensity: ${d.count}`
            );

        svg
            .selectAll('.dayLabel')
            .data(months)
            .enter()
            .append('text')
            .attr('x', (_, i) => 30 * i * cellSize + cellSize / 2)
            .attr('y', -5)
            .style('text-anchor', 'middle')
            .text((d) => d3.timeFormat('%b')(d));

        svg
            .selectAll('.hourLabel')
            .data(d3.range(0, 25, 6))
            .enter()
            .append('text')
            .attr('x', -5)
            .attr('y', (d) => d * cellSize + cellSize / 2)
            .style('text-anchor', 'end')
            .text((d) => `${d}`);

        // Adding scatter plot points
        const noteKeys = notes.map(note => note.id);
        svg
            .selectAll('circle')
            .data(days.flatMap((day) =>
                Array.from({ length: 24 }, (_, hour) => ({
                    day,
                    hour,
                    hasNote: noteKeys.includes(`${day.toISOString().split('T')[0]}-${hour}`),
                }))
            ))
            .enter()
            .append('circle')
            .filter(d => d.hasNote)
            .attr('cx', (d) => days.indexOf(d.day) * cellSize + cellSize / 2)
            .attr('cy', (d) => d.hour * cellSize + cellSize / 2)
            .attr('r', cellSize / 3)
            .attr('fill', 'red');
    }, [structured_data, props.startDate, props.endDate, notes]);

    return <div className="w-screen overflow-y-auto"><svg ref={svgRef}></svg></div>;
};

export default Heatmap;

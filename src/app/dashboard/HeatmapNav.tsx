import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "~/components/ui/pagination";

export default function HeatmapNav(props: {currentYear: number, minYear: number, maxYear: number, setCurrentYear: (currentYear: number) => void}) {
    return ( 
      <div className="items-top  flex space-x-2  h-16 p-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              {props.minYear != props.currentYear-1 &&<PaginationPrevious onClick={() => {
                  props.setCurrentYear(props.currentYear-1)
                }}/> }
            </PaginationItem>
            {props.currentYear-2 > props.minYear && 
            <PaginationItem>
              <PaginationEllipsis onClick={() => {props.setCurrentYear(props.currentYear-2)}}/>
            </PaginationItem>}
            {props.currentYear-1 > props.minYear && 
              <PaginationItem>
              <PaginationLink onClick={() => {props.setCurrentYear(props.currentYear-1)}}>{props.currentYear-1}</PaginationLink>
            </PaginationItem>}
            <PaginationItem>
              <PaginationLink isActive >{props.currentYear}</PaginationLink>
            </PaginationItem >
            {props.currentYear+1 < props.maxYear && 
            <PaginationItem onClick={() => {props.setCurrentYear(props.currentYear+1)}}>
            <PaginationLink>{props.currentYear+1}</PaginationLink>
            </PaginationItem>}
            {props.currentYear+2 < props.maxYear && 
              <PaginationItem onClick={() => {props.setCurrentYear(props.currentYear+2)}}>
                <PaginationEllipsis />
            </PaginationItem>}
            
            <PaginationItem>
            </PaginationItem>
            <PaginationItem>
              {props.maxYear != props.currentYear+1 &&  <PaginationNext onClick={() => {
                  props.setCurrentYear(props.currentYear+1)
                }}/>}
             
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    );
}
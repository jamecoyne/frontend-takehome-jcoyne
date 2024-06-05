import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { Calendar } from "~/components/ui/calendar";
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

export default function DatePopover(props: {date: Date | undefined, setDate: (date: Date | undefined) => void}) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !props.date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {props.date ? format(props.date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={props.date}
            onSelect={props.setDate}
            initialFocus
            />
        </PopoverContent>
      </Popover>
    )
}
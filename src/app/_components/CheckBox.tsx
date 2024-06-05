import { Checkbox } from "~/components/ui/checkbox";

export default function CheckBox(props: {
    value: boolean, 
    onChange: (value: boolean) => void, 
    label?: string}) {
    return (
    <>
        <Checkbox id="fillArea" checked={props.value} onCheckedChange={(value) => {props.onChange(!!value)}}/>
        <div className="grid gap-1.5 leading-none">
            <label
            htmlFor="fillArea"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
            {props.label}
            </label>
        </div>
    </>
    );   
}
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '~/components/ui/select';

type chartType = 'heatmap' | 'linechart'

export default function ChartSelector (props: {currentChart: chartType, setCurrentChart: (chartType: chartType) => void}) {
    return (
      <Select onValueChange={(value) => {console.log(value)}} value={'heatmap'}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a chart" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {/* <SelectLabel>Fruits</SelectLabel> */}
          <SelectItem value="heatmap" onClick={() => {console.log('test')}}>Heatmap</SelectItem>
          <SelectItem value="linechart" onClick={() => {console.log('test 2')}}>Line Chart</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    );
  }
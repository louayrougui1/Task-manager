import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const PrioritySelect = ({ priority, setPriority }) => {
  return (
    <Select value={priority} onValueChange={setPriority}>
      <SelectTrigger
        className={`w-full ${
          priority == "3"
            ? "text-red-700"
            : priority == "2"
            ? "text-yellow-700"
            : "text-blue-700"
        }`}
      >
        <SelectValue placeholder="Select a priority" />
      </SelectTrigger>
      <SelectContent>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Priority</SelectLabel>
            <SelectItem
              value="1"
              className="text-blue-700 hover:text-blue-700 focus:text-blue-700"
            >
              Low
            </SelectItem>
            <SelectItem
              value="2"
              className="text-yellow-700 hover:text-yellow-700 focus:text-yellow-700"
            >
              Medium
            </SelectItem>
            <SelectItem
              value="3"
              className="text-red-700 hover:text-red-700 focus:text-red-700"
            >
              High
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </SelectContent>
    </Select>
  );
};
export default PrioritySelect;

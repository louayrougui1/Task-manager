import { useState } from "react";
import { updateTask } from "../Slices/taskSlice";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useDispatch } from "react-redux";
import PrioritySelect from "./PrioritySelect";
import { FaPen } from "react-icons/fa";

const EditDialog = ({ task }) => {
  const [completed, setCompleted] = useState(task.completed);
  const [description, setDescription] = useState(task.text);
  const [priority, setPriority] = useState(task.priority.toString());
  const [open, setOpen] = useState(false); // control dialog open state
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    if (priority == 0 || description === "") {
      alert("invalid");
      return;
    }

    const newtask = {
      _id: task._id,
      text: description,
      priority,
      completed,
    };
    dispatch(updateTask(newtask));
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex-1  " asChild>
        <Button variant="outline">
          <FaPen /> Edit Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="description">Task Description</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label>Priority</Label>
              <PrioritySelect priority={priority} setPriority={setPriority} />
            </div>
            <div className="flex items-center gap-3">
              <Checkbox
                id="completed"
                checked={completed}
                onCheckedChange={() => setCompleted((prev) => !prev)}
                className="border border-black"
              />
              <Label htmlFor="completed" className="text-sm font-medium">
                Completed
              </Label>
            </div>
          </div>
          <DialogFooter className="mt-5 flex-row justify-center items-center">
            <Button className="flex-1" type="submit">
              Done
            </Button>
            <DialogClose className="flex-1" asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;

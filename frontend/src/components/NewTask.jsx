import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTask } from "../Slices/taskSlice";
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
import { toast, Bounce } from "react-toastify";
import PrioritySelect from "./PrioritySelect";
import { FaRegSquarePlus } from "react-icons/fa6";

const NewTask = () => {
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [open, setOpen] = useState(false); // control dialog open state
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    if (priority == 0 || description === "") {
      alert("invalid");
      return;
    }
    const task = {
      text: description,
      priority: parseInt(priority),
    };
    dispatch(createTask(task));
    setDescription("");
    setPriority("");
    setOpen(false);
    toast.success("Task Created", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div>
        <DialogTrigger asChild>
          <div className="flex justify-start items-center py-4 text-4xl gap-2 cursor-pointer inline-block flex 1">
            Create Task
            <FaRegSquarePlus className="w-20 h-20 cursor-pointer" />
          </div>
        </DialogTrigger>
      </div>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Task Description</Label>
              <Input
                id="name-1"
                name="name"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label>Priority</Label>
              <PrioritySelect priority={priority} setPriority={setPriority} />
            </div>
          </div>
          <DialogFooter className="mt-5 flex-row justify-center items-center">
            <Button className="flex-1" type="submit">
              Create Task
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

export default NewTask;

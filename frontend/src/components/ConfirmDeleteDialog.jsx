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
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { deleteTask } from "../Slices/taskSlice";
import { useState } from "react";
import { toast, Bounce } from "react-toastify";
import { FaTrashAlt } from "react-icons/fa";

const ConfirmDeleteDialog = ({ task }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(deleteTask(task._id));
    setOpen(false);
    toast.info("Task Deleted", {
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
      <DialogTrigger className="flex-1 bg-red-500 text-white" asChild>
        <Button variant="outline">
          <FaTrashAlt />
          Delete Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label>Are you sure you want to delete this Task</Label>
            </div>
          </div>
          <DialogFooter className="mt-5 flex-row justify-center items-center">
            <Button className="flex-1 bg-red-500 text-white" type="submit">
              <FaTrashAlt />
              Delete
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

export default ConfirmDeleteDialog;

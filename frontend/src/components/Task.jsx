import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { deleteTask } from "../Slices/taskSlice";
import { useDispatch } from "react-redux";
import EditDialog from "./EditDialog";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
const Task = ({ task }) => {
  const dispatch = useDispatch();
  const priorityClass =
    task.priority === 3
      ? "bg-red-100 text-red-700"
      : task.priority === 2
      ? "bg-yellow-100 text-yellow-700"
      : "bg-blue-100 text-blue-700";

  const completedClass = task.completed
    ? "bg-green-100 text-green-700"
    : "bg-gray-200 text-gray-600";
  return (
    <Card className="w-full max-w-sm shadow-md">
      <CardHeader>
        <CardTitle>{task.text}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2 text-gray-700">
        <div className="flex justify-start items-center gap-4">
          <p
            className={`font-semibold text-sm inline-block px-2 py-1.5 rounded-md ${priorityClass}`}
          >
            Priority:{" "}
            {task.priority === 3
              ? "High"
              : task.priority === 2
              ? "Medium"
              : "Low"}
          </p>
          <p
            className={`inline-block px-2 py-1 rounded-md font-semibold ${completedClass}`}
          >
            {task.completed ? "Completed" : "Uncompleted"}
          </p>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        <EditDialog task={task} />

        <ConfirmDeleteDialog task={task} />
      </CardFooter>
    </Card>
  );
};

export default Task;

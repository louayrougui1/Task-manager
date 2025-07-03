import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { reset, getTasks } from "../Slices/taskSlice";
import NewTask from "../components/NewTask";
import Task from "../components/Task";

const TasksList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { tasks, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.task
  );
  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/");
    } else {
      dispatch(getTasks());
    }
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch, isError, message]);
  return (
    <>
      <div className="container mx-auto p-4">
        <div>
          <p className="inline-block text-gray-600 text-7xl capitalize mt-10 p-4  ">
            Tasks List
          </p>
        </div>
        <NewTask />
        <div className="mt-5">
          {tasks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
              {tasks.map((task) => (
                <Task key={task._id} task={task} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 text-3xl capitalize mt-10 p-4 border border-gray-300 rounded-md bg-gray-200">
              You have no tasks.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default TasksList;

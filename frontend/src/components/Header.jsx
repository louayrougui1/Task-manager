import { useNavigate, Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { reset, logout } from "../Slices/authSlice";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import DropdownProfile from "./DropDownProfile";

const Header = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>

        <SheetContent side="left">
          <Link to="/" className="mr-6 hidden lg:flex">
            <MountainIcon className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>

          <div className="grid gap-2 p-5">
            <Link
              to="/"
              className="flex w-full items-center py-2 text-lg font-semibold"
            >
              Home
            </Link>

            {user ? (
              <>
                <Link
                  to="/tasks"
                  className="flex w-full items-center py-2 text-lg font-semibold"
                >
                  Task List
                </Link>
                <div className="flex w-full items-center py-2 text-lg font-semibold">
                  <DropdownProfile />
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex w-full items-center py-2 text-lg font-semibold"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="flex w-full items-center py-2 text-lg font-semibold"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <Link to="/" className="mr-6 hidden lg:flex">
        <MountainIcon className="h-6 w-6" />
        <span className="sr-only">Acme Inc</span>
      </Link>

      <nav className="ml-auto hidden lg:flex gap-6 items-center">
        <Link
          to="/"
          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium hover:bg-gray-100"
        >
          Home
        </Link>

        {user ? (
          <>
            <Link
              to="/tasks"
              className="group inline-flex  h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium hover:bg-gray-100"
            >
              Task List
            </Link>
            <div className="flex flex-1 items-center py-2 text-lg font-semibold">
              <DropdownProfile />
            </div>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium hover:bg-gray-100"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium hover:bg-gray-100"
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
export default Header;

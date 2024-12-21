import { Link, useLocation } from 'react-router-dom';

export function NavBar() {
  const location = useLocation();

  return (
    <div className = "mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-4">
      <nav className="flex justify-end space-x-4 mb-8">
        <Link
          to="/"
          className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === "/" ? "text-primary border-b-2 border-b-emerald-500" : "text-muted-foreground"
            }`}
        >
          Home
        </Link>
        <Link
          to="/history"
          className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === "/history" ? "text-primary border-b-2 border-b-emerald-500" : "text-muted-foreground"
            }`}
        >
          History
        </Link>
      </nav>

    </div>
  );
}


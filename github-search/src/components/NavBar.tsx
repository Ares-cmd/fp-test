import { Link, useLocation } from 'react-router-dom';

export function NavBar() {
  const location = useLocation();
  
  return (
    <nav className="flex justify-end space-x-4 mb-8">
      <Link 
        to="/" 
        className={`text-sm font-medium transition-colors hover:text-primary ${
          location.pathname === "/" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
        }`}
      >
        Home
      </Link>
      <Link 
        to="/history" 
        className={`text-sm font-medium transition-colors hover:text-primary ${
          location.pathname === "/history" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
        }`}
      >
        History
      </Link>
    </nav>
  );
}


import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/root-layout";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SearchPage from "./pages/SearchPage";
import MoviesPage from "./pages/MoviesPage";
import NowPlayingPage from "./pages/NowPlayingPage";
import PopularPage from "./pages/PopularPage";
import TopRatedPage from "./pages/TopRatedPage";
import UpComingPage from "./pages/UpComingPage";
import MovieDetailPage from "./pages/MovieDetailPage";
import { AuthProvider } from "./context/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "search", element: <SearchPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignUpPage /> },
      { path: "movies", element: <MoviesPage /> },
      { path: "movies/now-playing", element: <NowPlayingPage /> },
      { path: "movies/popular", element: <PopularPage /> },
      { path: "movies/top-rated", element: <TopRatedPage /> },
      { path: "movies/up-coming", element: <UpComingPage /> },
      { path: "movies/:movieId", element: <MovieDetailPage /> },
    ],
  },
]);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;

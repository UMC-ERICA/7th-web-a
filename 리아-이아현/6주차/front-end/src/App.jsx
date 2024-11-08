import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/root-layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import MoviesPage from "./pages/MoviesPage.jsx";
import NowPlayingPage from "./pages/NowPlayingPage.jsx";
import PopularPage from "./pages/PopularPage.jsx";
import TopRatedPage from "./pages/TopRatedPage.jsx";
import UpComingPage from "./pages/UpComingPage.jsx";
import MovieDetailPage from "./pages/MovieDetailPage.jsx";
import { AuthProvider } from "./context/AuthContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignUpPage />,
      },
      {
        path: "movies",
        element: <MoviesPage />,
      },
      {
        path: "movies/now-playing",
        element: <NowPlayingPage />,
      },
      {
        path: "movies/popular",
        element: <PopularPage />,
      },
      {
        path: "movies/top-rated",
        element: <TopRatedPage />,
      },
      {
        path: "movies/up-coming",
        element: <UpComingPage />,
      },
      {
        path: "/movies/:movieId",
        element: <MovieDetailPage />,
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;

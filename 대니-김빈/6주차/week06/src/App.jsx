import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home";
import SearchPage from "./pages/search";
import MoviesNowPlayingPage from "./pages/movies/now_playing";
import MoviesPopularPage from "./pages/movies/popular";
import MoviesTopRatedPage from "./pages/movies/top_rated";
import MoviesUpComingPage from "./pages/movies/up_coming";
import MovieCategoryPage from "./pages/moviecategory";
import MovieDetailPage from "./pages/moviedetailpage";
import LoginPage from "./pages/login";
import SignUpPage from "./pages/signup";
import RootLayout from "./root-layout";
import { AuthProvider } from './context/AuthContext';
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <SearchPage />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'moviecategory',
        element: <MovieCategoryPage />
      },
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'signup',
        element: <SignUpPage />
      },
      {
        path: 'search',
        element: <SearchPage />
      },
      {
        path: 'movies/now_playing',
        element: <MoviesNowPlayingPage />
      },
      {
        path: 'movies/popular',
        element: <MoviesPopularPage />
      },
      {
        path: 'movies/top_rated',
        element: <MoviesTopRatedPage />
      },
      {
        path: 'movies/up_coming',
        element: <MoviesUpComingPage />
      },
      {
        path: 'movies/:movieId',
        element: <MovieDetailPage />
      },
    ]
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

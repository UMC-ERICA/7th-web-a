import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import MainPage from "./pages/MainPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SearchPage from "./pages/SearchPage";
import MoviePage from "./pages/MoviePage";
import PlayingPage from "./pages/NowPlayingPage";
import PopularPage from "./pages/PopularPage";
import TopRatedPage from "./pages/TopRatedPage";
import UpComingPage from "./pages/UpComingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <MainPage />,
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
        path: "movie",
        element: <MoviePage />,
      },
      {
        path: "movie/playing",
        element: <PlayingPage />,
      },
      {
        path: "movie/popular",
        element: <PopularPage />,
      },
      {
        path: "movie/top_rated",
        element: <TopRatedPage />,
      },
      {
        path: "movie/up_coming",
        element: <UpComingPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

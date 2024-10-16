import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/root-layout";
import MainPage from "./pages/main_page";
import SignUpPage from "./pages/sign_up_page";
import LoginPage from "./pages/login_page";
import SearchPage from "./pages/search_page";
import MoviePage from "./pages/movie_page";
import PlayingPage from "./pages/playing_page";
import PopularPage from "./pages/popular_page";
import TopRatedPage from "./pages/top_rated_page";
import UpComingPage from "./pages/up_coming_page";

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

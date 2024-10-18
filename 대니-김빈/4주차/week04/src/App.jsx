import './App.css';

import {createBrowserRouter, RouterProvider} from "react-router-dom";
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




const router = createBrowserRouter([
  {
      path: '/',
      element: <RootLayout/>,
      errorElement: <SearchPage/>,
      // 1. Navbar 밑에 path에 해당하는 element를 보여주고 싶으면 아래와 같이 children을 활용
      children: [
          {
              // 2. index: true는 위의 path: '/' 즉, 홈 경로를 의미한다.
              index: true,
              element: <HomePage/>
          },
          {
              // 3. 부모의 path가 '/'이니, /를 붙이지 않아도 /movies랑 동일하게 동작한다.
              path: 'moviecategory',
              element: <MovieCategoryPage/>
          },
          {
            path: 'login',
            element: <LoginPage/>
        },
        {
          path: 'signup',
          element: <SignUpPage/>
      },
      {
        path: 'search',
        element: <SearchPage/>
      },
      {
        path: 'movies/now_playing',
        element: <MoviesNowPlayingPage/>
      },
      {
        path: 'movies/popular',
        element: <MoviesPopularPage/>
      },
      {
        path: 'movies/top_rated',
        element: <MoviesTopRatedPage/>
      },
      {
        path: 'movies/up_coming',
        element: <MoviesUpComingPage/>
      },
      {
        path: 'movies/:movieId',
        element: <MovieDetailPage/>
      },
      ]
  },

])

function App() {
  return <RouterProvider router={router}/>
}

export default App
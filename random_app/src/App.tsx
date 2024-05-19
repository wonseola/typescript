import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/home";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { Login } from "./pages/login/login";
import ProtectedRoute from "./components/protected-route";
import { RandomChat } from "./pages/chat/random/random";
import { Welcome } from "./pages/chat/welcome";
import { Room } from "./pages/chat/room/room";
import { Globalchat } from "./pages/chat/globalchat";
import { Chat } from "./pages/chat/chat";

const router = createBrowserRouter([
  {
    path: "/", element: <ProtectedRoute><Home /></ProtectedRoute>, children: [
      { path: "", element: <Welcome /> },
      { path: "/random", element: <RandomChat /> },
      { path: "/room", element: <Room /> },
      { path: "/globalchat", element: <Globalchat /> },
      { path: "/chat", element: <Chat /> },
    ]
  },
  { path: "/login", element: <Login /> },
]);

const GlobalStyles = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
  body{
    
background-color:#e7e7e7;
  font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
`;

const Wrapper = styled.div`
  width:100%;
  height: 100vh;
  display:flex;
  margin:auto;
`;


function App() {

  return (
    <>
      <Wrapper>
        <GlobalStyles />
        <RouterProvider router={router} />
      </Wrapper>
    </>
  )
}

export default App

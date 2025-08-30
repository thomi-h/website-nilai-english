import { useState } from "react";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material";
import Login from "./components/login";
import ScorePage from "./components/ScorePage";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  const [login, setlogin] = useState({ nama: "", kode: "", kelas: "kelas1" });
  const [loggedIn, setLoggedIn] = useState(false);

  const handleFormChange = (e) => {
    const { id, name, value } = e.target;
    const key = id || name; // Use id for TextField, name for NativeSelect
    setlogin((prev) => ({ ...prev, [key]: value }));
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log("Login clicked", login);
    if (login.nama && login.kode && login.kelas) {
      setLoggedIn(true);
    } else {
      alert("Please fill in both fields");
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setlogin((prev) => ({ ...prev, nama: "", kode: "", kelas: "kelas1" }));
    queryClient.clear();
  };

  const theme = createTheme({
    typography: {
      fontFamily: ["Nunito Sans", "sans-serif"].join(","),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <main>
          {!loggedIn ? (
            <Login handleFormChange={handleFormChange} handleClick={handleClick} login={login} />
          ) : (
            <ScorePage handleLogout={handleLogout} login={login} />
          )}
        </main>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;

import { ThemeProvider } from "./components/theme-provider";
import { AuthProvider } from "./context/auth";
import AppRouter from "./routes";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

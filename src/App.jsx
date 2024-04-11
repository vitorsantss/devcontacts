import { ContactProvider } from "./contexts/ContactContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import AppRouter from "./routes";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ContactProvider>
        <AppRouter />
      </ContactProvider>
    </ThemeProvider>
  );
}

export default App;

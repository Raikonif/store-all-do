import "./App.css";
import RoutesApp from "./routes";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <RoutesApp />
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;

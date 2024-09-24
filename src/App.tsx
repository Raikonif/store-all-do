import "./App.css";
import RoutesApp from "./routes";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdminProvider from "@/context/AdminProvider.tsx";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <AdminProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <RoutesApp />
          </BrowserRouter>
        </QueryClientProvider>
      </AdminProvider>
    </>
  );
}

export default App;

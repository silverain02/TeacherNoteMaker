import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AnalyzeSyntaxComponent from "./components/AnalyzeSyntaxComponent";
import { Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat";
const queryClient = new QueryClient();
function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/chat" element={<Chat />} />
          <Route path="/" element={<AnalyzeSyntaxComponent />} />
        </Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AnalyzeSyntaxComponent from "./components/AnalyzeSyntaxComponent";
import { Routes, Route } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
const queryClient = new QueryClient();
function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/" element={<AnalyzeSyntaxComponent />} />
        </Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AnalyzeSyntaxComponent from "./components/AnalyzeSyntaxComponent";
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AnalyzeSyntaxComponent />
    </QueryClientProvider>
  );
}

export default App;

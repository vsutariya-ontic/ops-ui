import { createRoot } from "react-dom/client";
import { App } from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import { StrictMode } from "react";
import "../public/css/output.css";
const container = document.getElementById("root");
const root = createRoot(container!);
const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 1000 * 60 * 15 } },
});
root.render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </StrictMode>
);

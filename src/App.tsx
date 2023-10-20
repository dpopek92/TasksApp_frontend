import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import Routing from "routing/Routing";
import { ThemeProvider } from "styled-components";
import { theme } from "theme/MainTheme";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Suspense fallback={<LoadingSpinner />}>
            <Routing />
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;

import { RouterProvider } from "react-router-dom";
import { router } from "./router/routes";
import { Toaster } from "sonner";
import { AuthProvider } from "./context/auth-context";

const App = () => {
  return (
    <AuthProvider>
      <div>
        <Toaster position="top-right" duration={3000} expand={true} />
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  );
};

export default App;

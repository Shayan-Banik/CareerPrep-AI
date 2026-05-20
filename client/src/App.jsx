import { RouterProvider } from "react-router-dom";
import { router } from "./app.route";
import { AuthProvider } from "./features/auth/store/auth.context.jsx";

RouterProvider;

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;

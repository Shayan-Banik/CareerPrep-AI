import { RouterProvider } from "react-router-dom";
import { router } from "./app.route";
import { AuthProvider } from "./features/auth/store/auth.context.jsx";
import { InterviewProvider } from "./features/interview/store/interview.context.jsx";

RouterProvider;

const App = () => {
  return (
    <AuthProvider>
      <InterviewProvider>
      <RouterProvider router={router} />
      </InterviewProvider>
    </AuthProvider>
  );
};

export default App;

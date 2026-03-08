import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./utils/utils";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormProvider } from "./context";


const App: React.FC = () => {
  return (
    <FormProvider>
    <BrowserRouter>
      <Routes>
        {routes.map((route, index: number) => {
         const Element = route.element as React.ComponentType;
          return <Route key={index} path={route.path} element={<Element />} />;
        })}
      </Routes>
    </BrowserRouter>
    </FormProvider>

  );
};

export default App;

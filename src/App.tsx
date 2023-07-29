import { ChakraProvider, Container } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Resources from './pages/Resources'
import Header from "./Components/Header";
import ResourceDetails from "./Components/ResourceDetails";
import ApplicationDetails from "./Components/ApplicationDetails";
import ApplicationList from "./pages/Applications";
import HomePage from "./pages";

function App() {
  return (
    <ChakraProvider>
      <div>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/applications" element={<ApplicationList />} />
            <Route  path="/applications/:appName" element={<ApplicationDetails />} />
            <Route path="/resources/:slug" element={<ResourceDetails />} />
          </Routes>
        </Router>
      </div>
    </ChakraProvider>
  );
}

export default App;

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "./index.css";
// import "@radix-ui/themes/styles.css";
import "./App.css";

import store, { persistor } from "./store/store";
import Home from "./pages/Home";
import DeviceList from "./pages/DeviceList";
import DeviceDetails from "./pages/DeviceDetails";
import Charts from "./pages/Charts";
import Tables from "./pages/DeviceTables";

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/devices" element={<DeviceList />} />
              <Route
                path="/device/:model_identifier"
                element={<DeviceDetails />}
              />
              <Route path="/charts" element={<Charts />} />
              <Route path="/tables" element={<Tables />} />
            </Routes>
          </Router>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;

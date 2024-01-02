import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import Screens from "./screens";
import theme from "./theme";
import { GlobalStyle } from "./theme/style.global";
import store, { history } from "./redux/store";
import { fetchBaseData } from "./redux/actions";
import { Slide, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

store.dispatch(fetchBaseData())

const App = () => (
  <Provider store={store}>
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <ConnectedRouter history={history}>
        <React.StrictMode>
          <GlobalStyle />
          <ThemeProvider theme={theme}>
              <Screens />
          </ThemeProvider>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            transition={Slide}
          />
        </React.StrictMode>
      </ConnectedRouter>
    </LocalizationProvider>
  </Provider>
);


const root = createRoot(document.getElementById("root"));
root.render(<App />);

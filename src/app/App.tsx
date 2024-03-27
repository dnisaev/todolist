import React, { useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { ErrorSnackbar } from "common/components/ErrorSnackbar/ErrorSnackbar";
import { useActions } from "common/hooks/useActions";
import { selectIsInitialized } from "app/appSlice";
import { AppHeader } from "app/AppHeader/AppHeader";
import { Routing } from "app/Routing/Routing";

type PropsType = {
  demo?: boolean;
};

export function App({ demo = false }: PropsType) {
  const { isInitialized } = useSelector(selectIsInitialized);
  const { initializeAppTC } = useActions();

  useEffect(() => {
    if (!demo) {
      initializeAppTC();
    }
  }, [initializeAppTC, demo]);

  if (!isInitialized) {
    return (
      <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="App">
      <ErrorSnackbar />
      <AppHeader />
      <Routing demo={demo} />
    </div>
  );
}

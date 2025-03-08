import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { captureNuiEvent } from "../utils/captureNuiEvent";
import { postNui } from "../utils/postNui";

interface returnSpawnPlayer {
  ok: boolean;
}

function App() {
  const [visible, setVisible] = useState<boolean>(false);

  captureNuiEvent<boolean>("setVisible", setVisible);

  const handleSpawnPlayer = () => {
    postNui<returnSpawnPlayer>("timbas-spawnManagement:spawnPlayer").then(
      () => {
        console.log("loggin");
      }
    );
  };

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          visibility: visible ? "visible" : "hidden",
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: "350px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "var(--none, 0px) 50px 50px var(--none, 0px)",
            background: "linear-gradient(270deg, #0019F9 -32.18%, #F44 113.8%)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              height: "20%",
              flexDirection: "column",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Typography
              sx={{
                color: "#FFF",
                textAlign: "center",
                fontFeatureSettings: "'clig' off, 'liga' off",
                fontFamily: "Roboto",
                fontSize: "50px",
                fontStyle: "normal",
                lineHeight: "20px",
                fontWeight: 600,
                letterSpacing: "0.46px",
                textTransform: "uppercase",
              }}
            >
              TIMBASCITY
            </Typography>
            <Typography
              sx={{
                color: "#FFF",
                fontFeatureSettings: "'clig' off, 'liga' off",
                fontFamily: "Roboto",
                textAlign: "center",
                fontSize: "30px",
                fontStyle: "normal",
                fontWeight: 400,
                letterSpacing: "0.46px",
                textTransform: "uppercase",
              }}
            >
              BEM-VINDO(A)
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              width: "100%",
              height: "80%",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Button
              variant="outlined"
              size="large"
              onClick={handleSpawnPlayer}
              sx={{
                width: "70%",
                color: "#FFF",
                height: "50px",
                lineHeight: "24px",
                marginTop: "50vh",
                flexShrink: 0,
                borderRadius: "43px",
                border: "2px solid #FFF",
                "&:hover": {
                  borderColor: "#FFF",
                  border: "2px solid #000",
                },
              }}
            >
              ENTRAR
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default App;

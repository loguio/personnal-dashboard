"use client";
import { Grid, Paper, styled, TextField } from "@mui/material";

export default function Home() {
  return (
    <div className="w-screen h-[calc(100vh-5rem)] p-5">
      <Grid container spacing={3}>
        <Grid size={4}>
          <Item>
            <div>Notes</div>
            <TextField
              multiline
              variant="standard"
              rows={12}
              slotProps={{ input: { disableUnderline: true } }}
            ></TextField>
          </Item>
        </Grid>
      </Grid>
    </div>
  );
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  fontSize: "24px",
}));

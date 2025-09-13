"use client";
import getNote from "@/server/prisma/getNote";
import updateNote from "@/server/prisma/updateNote";
import { Grid, Paper, styled, TextField } from "@mui/material";
import { ChangeEvent, KeyboardEventHandler, useEffect, useState } from "react";
import { debounce } from "lodash";

export default function Home() {
  const [note, setNote] = useState<string>("");
  const debouncedSendRequest = debounce(updateNote, 300);

  useEffect(() => {
    retrieveNote();
  }, []);

  const retrieveNote = async () => {
    setNote((await getNote())?.text ?? "");
  };

  const updateOnChange = async (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNote(e.target.value);
    debouncedSendRequest(e.target.value);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();

      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      const newValue = note.substring(0, start) + "\t" + note.substring(end);

      setNote(newValue);

      requestAnimationFrame(() => {
        target.selectionStart = target.selectionEnd = start + 4;
      });
    }
  };
  return (
    <div className="w-[calc(100vw-7.5rem)] h-[calc(100vh-5rem)] p-5">
      <Grid container spacing={3}>
        <Grid size={4}>
          <Item>
            <div>Notes</div>
            <TextField
              multiline
              variant="standard"
              rows={12}
              slotProps={{ input: { disableUnderline: true } }}
              onChange={(e) => updateOnChange(e)}
              value={note}
              onKeyDown={handleKeyDown}
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

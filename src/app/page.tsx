"use client";
import getNote from "@/server/prisma/getNote";
import updateNote from "@/server/prisma/updateNote";
import { Grid, Paper, styled, TextField } from "@mui/material";
import { ChangeEvent, KeyboardEventHandler, useEffect, useState } from "react";
import { debounce } from "lodash";
import { useSearchParams } from "next/navigation";
import getAuthorization from "@/server/strava/getAuthorization";
import getRun from "@/server/strava/getRun";

export default function Home() {
  const [note, setNote] = useState<string>("");
  const [accessToken, setAccessToken] = useState<string>("");
  const debouncedSendRequest = debounce(updateNote, 300);

  const searchParams = useSearchParams();
  const token = searchParams.get("code");

  useEffect(() => {
    retrieveNote();
    const token = sessionStorage.getItem("accessToken");
    if (!token) return;
    setAccessToken(token);
  }, []);
  useEffect(() => {
    if (accessToken) retrieveRuns(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (token && !accessToken) {
      getNewToken(token);
    }
  }, [token]);

  const getNewToken = async (token: string) => {
    setAccessToken((await getAuthorization(token)).access_token);
  };
  const retrieveNote = async () => {
    setNote((await getNote())?.text ?? "");
  };
  const retrieveRuns = async (token: string) => {
    await getRun(token);
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
        <Item>
          <a href="https://www.strava.com/oauth/authorize?client_id=176821&redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=code&approval_prompt=auto&scope=activity%3Aread_all">
            Se connecter à Strava
          </a>
        </Item>
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

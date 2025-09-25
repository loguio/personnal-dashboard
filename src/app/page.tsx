"use client";
import getNote from "@/server/prisma/getNote";
import updateNote from "@/server/prisma/updateNote";
import { Grid, Paper, styled, TextField } from "@mui/material";
import { ChangeEvent, KeyboardEventHandler, useEffect, useState } from "react";
import { debounce } from "lodash";
import { useSearchParams } from "next/navigation";
import getAuthorization from "@/server/strava/getAuthorization";
import getRun from "@/server/strava/getRun";
import getToken from "@/server/prisma/getToken";

export default function Home() {
  const [note, setNote] = useState<string>("");
  const [accessToken, setAccessToken] = useState<string>();

  const debouncedSendRequest = debounce(updateNote, 300);

  const searchParams = useSearchParams();
  const token = searchParams.get("code");

  useEffect(() => {
    retrieveNote();
    retrieveToken();
  }, []);
  useEffect(() => {
    if (accessToken) retrieveRuns(accessToken);
    console.log(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (token && !accessToken) {
      getNewToken(token);
    }
  }, [token]);

  const getNewToken = async (token: string) => {
    const newToken = await getAuthorization({ accessToken: token });
    if (newToken) {
      sessionStorage.setItem("accessToken", newToken.access_token);
      setAccessToken(newToken.access_token);
    }
  };
  const retrieveToken = async () => {
    try {
      const tokens = await getToken();
      if (tokens && tokens.stravaExpiredDate.getTime() < Date.now()) {
        const newToken = await getAuthorization({
          refreshToken: tokens.stravaRefreshToken,
        });
        if (newToken) {
          setAccessToken(newToken.access_token);
          sessionStorage.setItem("accessToken", newToken.access_token);
        }
        return;
      }
      const token = sessionStorage.getItem("accessToken");
      if (!token) return;
      setAccessToken(token);
    } catch (e) {}
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
          {!accessToken && (
            <a href="https://www.strava.com/oauth/authorize?client_id=176821&redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=code&approval_prompt=auto&scope=activity%3Aread_all">
              Se connecter à Strava
            </a>
          )}
          {accessToken && <p>Strava est connecté {accessToken}hh</p>}
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

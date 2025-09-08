import Image from "next/image";

export default function SideBars() {
  return (
    <div className="fixed h-[calc(100vh-5rem)] w-30 border-r border-gray-400 bg-gray-50 flex flex-col gap-3 items-center justify-evenly">
      <a className="cursor-pointer" href="http://strava.com/" target="_blank">
        <Image
          src={"/logo_strava_icon.png"}
          alt="Strava"
          width={80}
          height={80}
        ></Image>
      </a>
      <a
        className="cursor-pointer"
        href="http://github.com/loguio"
        target="_blank"
      >
        <Image
          src={"/github-icon-1-logo.webp"}
          alt="Github"
          width={80}
          height={80}
        ></Image>
      </a>
      <a className="cursor-pointer" href="http://intervals.icu" target="_blank">
        <Image
          src={"/logo_intervals.png"}
          alt="Intervals"
          width={70}
          height={70}
        ></Image>
      </a>
      <a className="cursor-pointer" href="http://twitch.com" target="_blank">
        <Image
          src={"/logo_twitch.png"}
          alt="Twitch"
          width={70}
          height={70}
        ></Image>
      </a>
    </div>
  );
}

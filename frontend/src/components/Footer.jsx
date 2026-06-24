import React, { useState, useEffect } from "react";
import { personalInfo } from "../mock";

const JOKES = [
  "There are 10 types of people: those who understand binary, and those who don't.",
  "A SQL query goes into a bar, walks up to two tables and asks... 'Can I join you?'",
  "There are 2 hard problems in computer science: cache invalidation, naming things, and off-by-1 errors.",
  "I would tell you a UDP joke, but you might not get it.",
  "To understand recursion, you must first understand recursion.",
  "!false — It's funny because it's true.",
  "Why do Java devs wear glasses? They can't C#.",
  "Knock, knock. Who's there? [very long pause] Java.",
  "If it works on your machine, then we'll ship your machine.",
  "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
  "Why do programmers prefer dark mode? Because light attracts bugs.",
  "A QA engineer orders a beer. Orders 0 beers. Orders 9999999 beers. Orders a lizard. Orders a NaN.",
  "Hardware: The part of a computer that you can kick.",
  "['hip', 'hip'] (hip hip array!)",
  "There is no place like 127.0.0.1",
  "A programmer's spouse: 'Buy a loaf of bread. If they have eggs, get a dozen.' Returns with 12 loaves.",
  "If at first you don't succeed, call it version 1.0.",
  "The definition of insanity is writing the same code and expecting different results.",
  "CSS is like magic. Except when you change one margin and the whole page explodes.",
  "What's a programmer's favorite place to hang out? Foo Bar.",
  "A byte walks into a bar and says, 'Yeah, I'm feeling a bit parity.'",
];

const COLORS = [
  "text-blue-500",
  "text-emerald-500",
  "text-amber-500",
  "text-pink-500",
  "text-violet-500",
  "text-rose-500",
  "text-cyan-500",
  "text-fuchsia-500",
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [time, setTime] = useState("");
  const [timezoneAbbr, setTimezoneAbbr] = useState("");
  const [jokeState, setJokeState] = useState({
    text: JOKES[0],
    color: COLORS[0],
  });

  useEffect(() => {
    setJokeState({
      text: JOKES[Math.floor(Math.random() * JOKES.length)],
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    });

    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let abbr = "";
    if (tz) {
      abbr =
        new Intl.DateTimeFormat("en-US", { timeZoneName: "short" })
          .formatToParts(new Date())
          .find((part) => part.type === "timeZoneName")?.value || "";

      if (tz === "Asia/Kolkata" || abbr === "GMT+5:30") {
        abbr = "IST";
      }
    }
    setTimezoneAbbr(abbr);

    const updateClock = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      });
      setTime(formatter.format(now));
    };

    updateClock();
    const timerId = setInterval(updateClock, 1000);
    return () => clearInterval(timerId);
  }, []);

  const handleMouseEnter = () => {
    let newJoke = JOKES[Math.floor(Math.random() * JOKES.length)];
    while (newJoke === jokeState.text && JOKES.length > 1) {
      newJoke = JOKES[Math.floor(Math.random() * JOKES.length)];
    }

    let newColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    while (newColor === jokeState.color && COLORS.length > 1) {
      newColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    }

    setJokeState({ text: newJoke, color: newColor });
  };

  return (
    <footer className="py-8 bg-white/70 dark:bg-[#0a0a0a]/70 backdrop-blur-xl border-t border-gray-200/80 dark:border-[#333]/80 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 md:gap-4">
          <div className="text-sm text-gray-600 dark:text-gray-400 justify-self-center md:justify-self-start">
            &copy; {currentYear} {personalInfo.name}. All rights reserved.
          </div>

          <div className="justify-self-center text-sm text-gray-600 dark:text-gray-400">
            <div
              className="group relative cursor-pointer overflow-hidden h-12 w-72 flex items-center justify-center"
              onMouseEnter={handleMouseEnter}
            >
              <span className="absolute transition-transform duration-300 group-hover:-translate-y-12 font-medium">
                Psst... wanna hear a joke?
              </span>
              <span
                className={`absolute translate-y-12 transition-transform duration-300 group-hover:translate-y-0 ${jokeState.color} font-mono text-[11px] leading-tight text-center w-full px-2`}
              >
                {jokeState.text}
              </span>
            </div>
          </div>

          <div className="text-sm font-mono text-gray-600 dark:text-gray-400 flex items-center justify-center md:justify-end gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Local Time • {time} {timezoneAbbr && `(${timezoneAbbr})`}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

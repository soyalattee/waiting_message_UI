"use client";
import { useEffect, useState } from "react";
import { Sparkles, Lightbulb, Heart, Zap } from "lucide-react";
import LoadingLottie from "./LoadingLottie";

const waitingMessages = [
  "Analyzing your question with AI",
  "Preparing the best possible answer for you",
  "Engaging in deep thinking",
  "Working hard to craft a perfect answer",
  "Gathering creative ideas",
  "Verifying accurate information",
  "Composing a personalized response",
  "Reviewing the latest information",
];

const waitingTips = [
  {
    message: "💡 Asking clear and specific questions leads to better answers.",
    type: "tip",
    icon: Lightbulb,
  },
  {
    message:
      "🔍 Try to include context or examples to improve the quality of results.",
    type: "tip",
    icon: Lightbulb,
  },
  {
    message:
      "📅 Adding details like time, location, or purpose helps refine the response.",
    type: "tip",
    icon: Lightbulb,
  },
  {
    message:
      "✨ The more specific your question, the more tailored the insights we can provide!",
    type: "question",
    icon: Sparkles,
  },
  {
    message:
      "🔄 Not satisfied with the results? Try asking from a different angle.",
    type: "question",
    icon: Sparkles,
  },
  {
    message:
      "📱 Insights are most useful when applied to real-world decisions.",
    type: "business",
    icon: Zap,
  },
  {
    message:
      "⚡ Patterns in data often reveal opportunities you might overlook.",
    type: "business",
    icon: Zap,
  },
  {
    message: "🎨 Combining data with creativity leads to smarter strategies.",
    type: "business",
    icon: Zap,
  },
  {
    message:
      "🚀 Data analysis isn't as hard as it seems—just take it step by step!",
    type: "motivation",
    icon: Heart,
  },
  {
    message: "💪 Checking your data daily—even just a little—leads to success.",
    type: "motivation",
    icon: Heart,
  },
  {
    message: "🌟 Small improvements add up to big results—don’t forget that!",
    type: "motivation",
    icon: Heart,
  },
  {
    message: "🎉 Have a question? Just ask—let’s grow together!",
    type: "motivation",
    icon: Heart,
  },
];

function ProgressWave() {
  return (
    <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden mb-6">
      <div className="h-full bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 rounded-full animate-pulse">
        <div className="h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-ping"></div>
      </div>
    </div>
  );
}

function getShuffledMessages(messages: typeof waitingTips) {
  return [...messages].sort(() => Math.random() - 0.5);
}
export default function WaitingMessage() {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [messageIdx, setMessageIdx] = useState(0);
  const [shuffledMessages] = useState(getShuffledMessages(waitingTips));

  useEffect(() => {
    // Message rotation 10seconds
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % waitingMessages.length);
    }, 6000);

    const timeouts: NodeJS.Timeout[] = [];

    function scheduleMessages(idx: number) {
      let delay = 9000; // default 10s
      if (idx === 0) delay = 5000; // first 7s
      else if (idx === 1) delay = 7000; // secound 8s

      timeouts.push(
        setTimeout(() => {
          setMessageIdx((prev) => (prev + 1) % waitingMessages.length);
          scheduleMessages(idx + 1);
        }, delay)
      );
    }

    scheduleMessages(0);

    return () => {
      timeouts.forEach(clearTimeout);
      clearInterval(messageInterval);
    };
  }, []);
  const CurrentTipIcon = shuffledMessages[messageIdx].icon;
  return (
    <>
      <div className="flex flex-col gap-2 border border-gray-200 rounded-lg py-5 px-4 items-center">
        <div className="flex gap-2 w-full justify-center">
          <LoadingLottie />
        </div>
        {/* Main Message */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 transition-all duration-500 ease-in-out">
            {waitingMessages[currentMessage]}
          </h2>
          <p className="text-gray-600 text-lg">Please wait a moment!</p>
        </div>
        <ProgressWave />
      </div>
      {/* Tip Card */}
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl border border-blue-200/30 p-6 w-full">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <CurrentTipIcon className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-sm font-semibold text-blue-700">Tip</span>
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
                <div
                  className="w-1 h-1 bg-purple-400 rounded-full animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed transition-all duration-500 ease-in-out">
              {shuffledMessages[messageIdx].message}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

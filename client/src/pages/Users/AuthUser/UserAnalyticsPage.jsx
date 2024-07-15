import React from "react";
import useGetAnalytics from "../../../features/Analysis/hooks/useGetAnalytics";
import Spinner from "../../../ui/components/Spinner";
import { IoIosStats } from "react-icons/io";
import DayWiseAreaChart from "../../../features/Analysis/components/DayWiseAreaChart";
import ArtistPieChart from "../../../features/Analysis/components/ArtistPieChart";
import GenrePieChart from "../../../features/Analysis/components/GenrePieChart";

export default function UserAnalyticsPage() {
  const { analysis, isGettingAnalysis, gotAnalysis } = useGetAnalytics();
  return (
    <div className="w-full h-full p-3 overflow-scroll disable-scrollbars flex flex-col gap-3">
      <h1 className="self-center text-3xl ">User Activity</h1>
      {isGettingAnalysis ? (
        <Spinner />
      ) : (
        analysis && (
          <div className="w-full grow rounded-lg bg-secondary flex flex-col gap-3 items-center p-2">
            <div className="bg-primary self-start h-24 w-52 rounded-lg flex flex-col justify-center items-center text-2xl">
              <IoIosStats />
              <span>Played: {analysis.totalPlayed}</span>
            </div>
            <div className="h-0.5 bg-primary w-full "></div>
            <h2 className="self-start text-xl">Day Wise Chart</h2>
            <DayWiseAreaChart data={analysis.dayWiseAnalysis} />
            <div className="h-0.5 bg-primary w-full "></div>
            <div className="flex items-center h-64 w-full bg-primary p-3 gap-2">
              <div className="h-full grow bg-secondary rounded-lg flex flex-col justify-center items-center">
                <h1 className="">Artist Distribution</h1>
                <ArtistPieChart data={analysis.artistAnalysis} />
              </div>
              <div className="h-full grow bg-secondary rounded-lg flex flex-col justify-center items-center">
                <h1 className="">Genre Distribution</h1>
                <GenrePieChart data={analysis.genreAnalysis} />
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}

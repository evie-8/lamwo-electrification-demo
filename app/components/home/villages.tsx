import React from "react";

const Villages = () => {
  return (
    <div>
      <div className="cover-card fade-in ">
        <span className="mt-auto">
          Electrification strategy for Lamwo district
        </span>
      </div>
      <div className="flex items-center center gap-3 flex-wrap">
        <button className="flex whitespace-nowrap rounded-full border-2 border-sunbird-navy-blue font-bold text-sunbird-navy-blue py-1 px-3">
          Solar Candidate
        </button>
        <button className="flex whitespace-nowrap rounded-full border-2 border-sunbird-navy-blue font-bold text-sunbird-navy-blue py-1 px-3">
          Existing Mini Grid
        </button>
        <button className="flex  whitespace-nowrap rounded-full border-2 border-sunbird-navy-blue font-bold text-sunbird-navy-blue py-1 px-3">
          Mini Grid Candidate
        </button>
        <button className="flex  whitespace-nowrap rounded-full border-2 border-sunbird-navy-blue font-bold text-sunbird-navy-blue py-1 px-3">
          Grid Extension
        </button>
      </div>
    </div>
  );
};

export default Villages;

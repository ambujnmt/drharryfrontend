import React from 'react';

export default function LatestData() {
  return (
    <div className="pt-4">
      <h2 className="text-2xl font-bold mb-6">Latest Data available</h2>

      <div className="bg-[rgb(108,206,126)] rounded-3xl w-full p-4 flex items-center gap-4">
        {/* Circle with image */}
        <div className="w-20 h-20 rounded-full bg-[rgb(145,224,159)] flex items-center justify-center">
          <img
            src="https://nmtdevserver.com/welli/medical_report.png"
            alt="Medical Report"
            className="w-10 h-10"
          />
        </div>

        {/* Text on the right */}
        <div>
          <div className="font-semibold text-white">Clinica S. Maria</div>
          <div className="text-white text-sm">Referto n.</div>
        </div>
      </div>
    </div>
  );
}

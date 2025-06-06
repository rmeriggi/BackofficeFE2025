import React, { useEffect } from 'react'
import ApexCharts from 'apexcharts';

function getChartOption(data) {

  const formattedData = data.map(d => {return {x: d.day, y: d.variations}})

  const options = {
    series: [
      {
        data: formattedData,
      },
    ],
    chart: {
      type: "candlestick",
      height: 350
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    }
  };
  return options;
}

export function Valuation ({data}) {

  useEffect(() => {
    const element = document.getElementById("apex_chart_candlestick");

    if (!element) {
      return;
    }

    const options = getChartOption(data)
    const chart = new ApexCharts(element, options);
    chart.render();
    return function cleanUp() {
      chart.destroy();
    };
  }, [data]);

  return (
    <>
      <div className='d-flex justify-content-center pt-5'>
        <h5>Valuación</h5>
      </div>
      <div 
        className="mx-auto" 
        id="apex_chart_candlestick">
    </div>
   </>
  )
}

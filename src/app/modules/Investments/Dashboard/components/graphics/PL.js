import React, { useEffect } from 'react'
import ApexCharts from 'apexcharts';
import moment from "moment"

function getChartOption(data) {
  
  const series = data.map(d => [d.day, d.amount])

  const options = {
    series: [
      {
        name: "P&L",
        data: series,
      },
    ],
    chart: {
      type: "area",
      stacked: false,
      zoom :{
        type: "x",
        enabled: true,
        autoScaleYaxis : true
      },
      toolbar: {
        autoSelected: "zoom",
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: 2,
      curve: 'straight',
    },
    markers: {
      size: 0,
    },
    xaxis: {
      type: 'datetime',
      labels: {
        formatter: function (value) {
          return moment(value).format("DD-MM")
        },
      }
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100]
      }
    },
    tooltip: {
      shared: false,
      y: {
        formatter: function (val) {
          return "$ " + val
        }
      }
    }
  };
  return options;
}

export function PL ({data}) {
  useEffect(() => {
    const element = document.getElementById("apex_chart_line_PL");

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
        <h5>P&L</h5>
      </div>
      <div 
        className="mx-auto" 
        id="apex_chart_line_PL">
    </div>
   </>
  )
}

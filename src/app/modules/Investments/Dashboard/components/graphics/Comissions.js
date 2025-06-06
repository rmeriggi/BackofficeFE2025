import React, { useEffect } from 'react'
import ApexCharts from 'apexcharts';
import moment from "moment"

function getChartOption(data) {
  const amount = data.map(d => d.amount)
  const days = data.map(d => d.day)
  const options = {
    series: [
      {
        name: "Comisiones",
        data: amount,
      },
    ],
    chart: {
      type: "bar",
      height: 350
    },
    xaxis: {
      type: 'datetime',
      categories: days,
      labels: {
        formatter: function (value) {
          return moment(value).format("DD-MM")
        },
      }
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    },
    fill: {
      opacity: 1
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
  };
  return options;
}

export function Comissions ({data}) {
  useEffect(() => {
    const element = document.getElementById("apex_chart_candlestick_comission");

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
        <h5>Comisiones</h5>
      </div>
      <div 
        className="mx-auto" 
        id="apex_chart_candlestick_comission">
    </div>
   </>
  )
}

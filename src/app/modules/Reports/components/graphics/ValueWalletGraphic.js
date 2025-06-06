import React, { useEffect } from 'react'
import ApexCharts from 'apexcharts';
import moment from "moment"

function getChartOption(data) {
  const amount = data.map(d => d.value)
  const days = data.map(d => d.day)
  const options = {
    series: [
      {
        name: "Valor de la cartera",
        data: amount,
      },
    ],
    chart: {
      type: "bar",
      height: 250
    },
    colors: ['#342c5c'],
    xaxis: {
      type: 'datetime',
      categories: days,
      labels: {
        formatter: function (value) {
          return moment(value).format("DD/MM/YYYY")
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
       
      },
    },
  };
  return options;
}

export function ValueWalletGraphic ({data}) {
  useEffect(() => {
    const element = document.getElementById("apex_chart_candlestick_bar");

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
        <h5 className='text-uppercase'>Valor de la cartera</h5>
      </div>
    <div 
      id="apex_chart_candlestick_bar">
    </div>
    </>
  )
}

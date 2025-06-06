import React, { useEffect } from 'react'
import ApexCharts from 'apexcharts';
import moment from "moment"

function getChartOption(data) {

  const series = data.map(d => [d.day, d.value])

  const options = {
    series: [
      {
        name: "PNL",
        data: series,
      },
    ],
    chart: {
      type: "line",
      stacked: false,
      height: 250,
      zoom :{
        type: "x",
        enabled: true,
        autoScaleYaxis : true
      },
      toolbar: {
        autoSelected: "zoom",
      },
    },
    colors: ['#342c5c'],
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: 5,
    },
    markers: {
      size: 0,
      style: 'hollow',
    },
    xaxis: {
      type: 'datetime',
      labels: {
        formatter: function (value) {
          return moment(value).format("DD/MM/YYYY")
        },
      }
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return value + "%";
        }
      },
    },
    tooltip: {
      shared: false,
      y: {
        formatter: function (val) {
          return val + "% "
        }
      }
    }
  };
  return options;
}

export function PNLGraphic({data}) {
  useEffect(() => {
    const element = document.getElementById("apex_chart_bar");

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
        <h5 className='text-uppercase'>PNL</h5>
      </div>
      <div 
        className="mx-auto" 
        id="apex_chart_bar">
    </div>
   </>
  )
}

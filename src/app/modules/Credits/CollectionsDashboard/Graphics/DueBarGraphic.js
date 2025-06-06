import React, { useEffect } from 'react'
import ApexCharts from 'apexcharts';
import moment from 'moment';

function getChartOption(data) {
  const days = data.map(d => moment(d.day).format('DD-MM-YYYY'))
  const dataSales = data.map(d => d.value)
  const maxNumber = Math.max(...dataSales)
  const options = {
    series: [
      {
        name: "Por Día",
        data: dataSales,
      },
    ],
    tooltip: {
      style: {
        fontSize: "12px",
      },
      y: {
        formatter: function(val) {
          return (val).toFixed(0);
        },
      },
    },
    chart: {
      type: "bar",
      height: 150,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '75%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "solid",
      opacity: 1,
    },
    xaxis: {
      categories: days,
      crosshairs: {
        show: false,
      },
    },
    yaxis: {
      min: 0,
      max: maxNumber,
    },
    states: {
      hover: {
          filter: {
            type: "none",
            value: 0,
        },
      },
    },
  };
  return options;
}

export default function DueBarGraphic ({data}) {
  useEffect(() => {
    const element = document.getElementById("apex_chart_bar2");

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
    <div 
      className="col-10 col-sm-8 col-md-6 col-lg-10 col-xl-12 mx-auto" 
      id="apex_chart_bar2">
   </div>
  )
}

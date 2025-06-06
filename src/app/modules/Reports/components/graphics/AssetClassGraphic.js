import React, { useEffect } from 'react'
import ApexCharts from 'apexcharts';

function getChartOption(data){
  const labels = data.map(a => a.type)
  const series = data.map(a => a.value)
  const options = {
    tooltip: {
      enabled: false
    },
    series: series,
    labels: labels,
    chart: {
      type: 'pie',
      width: 320,
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return `% ${val}`;
      },
      style: {
        colors: ["#000000"]
      },
      dropShadow: {
        enabled: false,
      }
    },
    legend: {
      show: true,
      position: 'bottom'
    }, 
    plotOptions: {
      pie:{
        dataLabels: {
          offset: 35,
      },
      }
    }     
  }
  return options;
}

export function AssetClassGraphic({data}) {
  
  
  useEffect(() => {
    const element = document.getElementById("apex_chart_pie");

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
      <div 
        className='mx-auto'
        id="apex_chart_pie">
      </div>
    </>
  )
}

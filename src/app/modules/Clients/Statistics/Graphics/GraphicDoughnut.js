import React, { useEffect } from 'react'
import ApexCharts from 'apexcharts';
import { formatAmountFromString } from '../../../../utils/formatData';

function getChartOption(data){
  const {cashin, cashout, internals} = data

  const options = {
    tooltip: {
      style: {
        fontSize: "12px",
      },
      y: {
        formatter: function(val) {
          return '$' + formatAmountFromString(val);
        },
      },
    },
    series: [cashin, cashout, internals],
    labels: ['Cash-in', 'Cahs-out', 'Internas'],
    colors:['#289DF5', '#52D23D', '#FBC93F'],
    chart: {
      type: 'donut',
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false
    },      
  }
  return options;
}

export default function GraphicDoughnut({data}) {
  
  
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
    <div 
      className="col-xl-10 col-lg-8 col-md-4 col-sm-6 col-8 mx-auto"
      id="apex_chart_pie">
    </div>
  )
}

import React, { useEffect } from 'react'
import ApexCharts from 'apexcharts';
import { formatAmountFromString } from '../../../../utils/formatData';

//Grafico de CANALES => El nombre se definió mucho después de la creacion del archivo.

function getChartOption(data){
  const { trx, tc, cashin} = data

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
    series: [ trx, tc, cashin],
    labels: ['Transferencias', 'Links de pago', 'Bocas de efectivo'],
    colors:[ '#52D23D', '#FBC93F', '#FBC98F'],
    chart: {
      type: 'donut',
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false
    },    
    plotOptions: {
    pie: {
      customScale: 1
    }
  }
  }
  return options;
}

export default function InversionGraphicDoughnut({data}) {
  
  
  useEffect(() => {
    const element = document.getElementById("apex_chart_pie2");

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
      id="apex_chart_pie2"
     >
    </div>
  )
}

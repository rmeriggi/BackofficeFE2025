import ApexCharts from "apexcharts";
import React, { useEffect, useRef } from "react";

export default function ModernLineChart({ data, height = 300 }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!data || !Array.isArray(data)) return;

    const months = data.map((d) => d.month);
    const credits = data.map((d) => d.credits);
    const debits = data.map((d) => d.debits);

    const options = {
      series: [
        {
          name: "Créditos",
          data: credits,
        },
        {
          name: "Débitos",
          data: debits,
        },
      ],
      colors: ["#0BB783", "#F64E60"],
      chart: {
        type: "line",
        height: height,
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 800,
        },
        background: "transparent",
      },
      stroke: {
        curve: "smooth",
        width: 3,
        lineCap: "round",
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "vertical",
          shadeIntensity: 0.1,
          gradientToColors: ["#0BB783", "#F64E60"],
          inverseColors: false,
          opacityFrom: 0.3,
          opacityTo: 0.1,
          stops: [0, 100],
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: months,
        labels: {
          style: {
            colors: "#6c757d",
            fontSize: "12px",
            fontFamily: "Inter, sans-serif",
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          formatter: function(val) {
            return new Intl.NumberFormat("es-AR", {
              style: "currency",
              currency: "ARS",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
              notation: "compact",
              compactDisplay: "short",
            }).format(val);
          },
          style: {
            colors: "#6c757d",
            fontSize: "12px",
            fontFamily: "Inter, sans-serif",
          },
        },
        min: 0,
      },
      grid: {
        borderColor: "#f1f1f1",
        strokeDashArray: 4,
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function(val) {
            return new Intl.NumberFormat("es-AR", {
              style: "currency",
              currency: "ARS",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(val);
          },
        },
        theme: "light",
        style: {
          fontSize: "12px",
          fontFamily: "Inter, sans-serif",
        },
      },
      legend: {
        show: true,
        position: "top",
        horizontalAlign: "right",
        fontSize: "14px",
        fontFamily: "Inter, sans-serif",
        markers: {
          width: 12,
          height: 12,
          radius: 6,
        },
        itemMargin: {
          horizontal: 10,
          vertical: 5,
        },
      },
      markers: {
        size: 6,
        strokeWidth: 2,
        strokeColors: ["#fff", "#fff"],
        fillColors: ["#0BB783", "#F64E60"],
        radius: 4,
        hover: {
          size: 8,
        },
      },
      states: {
        hover: {
          filter: {
            type: "none",
            value: 0,
          },
        },
        active: {
          filter: {
            type: "none",
            value: 0,
          },
        },
      },
      responsive: [
        {
          breakpoint: 768,
          options: {
            chart: {
              height: 250,
            },
            legend: {
              position: "bottom",
              fontSize: "12px",
            },
          },
        },
      ],
    };

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (chartRef.current) {
      chartInstance.current = new ApexCharts(chartRef.current, options);
      chartInstance.current.render();
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, height]);

  return <div ref={chartRef} style={{ width: "100%", height: "100%" }} />;
}

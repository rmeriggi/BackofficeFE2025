import ApexCharts from "apexcharts";
import React, { useEffect, useRef } from "react";

export default function ModernBarChart({
  data,
  title,
  color = "#3699FF",
  height = 300,
}) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!data || !Array.isArray(data)) return;

    const days = data.map((d) => d.day);
    const values = data.map((d) => d.value);
    const maxValue = Math.max(...values);

    const options = {
      series: [
        {
          name: title || "Valores",
          data: values,
        },
      ],
      colors: [color],
      chart: {
        type: "bar",
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
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "70%",
          endingShape: "rounded",
          borderRadius: 6,
          dataLabels: {
            position: "top",
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "vertical",
          shadeIntensity: 0.1,
          gradientToColors: [color],
          inverseColors: false,
          opacityFrom: 0.8,
          opacityTo: 0.9,
          stops: [0, 100],
        },
      },
      xaxis: {
        categories: days,
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
        max: maxValue * 1.1,
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
            plotOptions: {
              bar: {
                columnWidth: "60%",
              },
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
  }, [data, title, color, height]);

  return <div ref={chartRef} style={{ width: "100%", height: "100%" }} />;
}

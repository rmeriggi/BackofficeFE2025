import ApexCharts from "apexcharts";
import React, { useEffect, useRef } from "react";

export default function ModernDoughnutChart({ data, height = 300 }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!data) return;

    const { credits, collections } = data;

    const options = {
      series: [credits, collections],
      labels: ["Créditos", "Débitos"],
      colors: ["#0BB783", "#F64E60"],
      chart: {
        type: "donut",
        height: height,
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 800,
        },
        background: "transparent",
      },
      plotOptions: {
        pie: {
          donut: {
            size: "65%",
            background: "transparent",
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: "16px",
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                color: "#6c757d",
                offsetY: -10,
              },
              value: {
                show: true,
                fontSize: "24px",
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                color: "#2c3e50",
                offsetY: 16,
                formatter: function(val) {
                  return val + "%";
                },
              },
              total: {
                show: true,
                label: "Total",
                fontSize: "16px",
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                color: "#6c757d",
                formatter: function(w) {
                  return (
                    w.globals.seriesTotals.reduce((a, b) => a + b, 0) + "%"
                  );
                },
              },
            },
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: true,
        position: "bottom",
        horizontalAlign: "center",
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
      stroke: {
        width: 0,
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: ["#0BB783", "#F64E60"],
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 0.85,
          stops: [0, 100],
        },
      },
      tooltip: {
        enabled: true,
        theme: "light",
        style: {
          fontSize: "12px",
          fontFamily: "Inter, sans-serif",
        },
        y: {
          formatter: function(val) {
            return val + "%";
          },
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

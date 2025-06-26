import React from "react";
import ReactApexChart from "react-apexcharts";
import "./ModernCharts.css";

// Colores modernos para los gráficos
const COLORS = {
  primary: "#3699FF",
  success: "#0BB783",
  warning: "#FFA800",
  danger: "#F64E60",
  info: "#8950FC",
  light: "#E1F0FF",
  dark: "#181C32",
  gray: "#6C7293",
};

// Componente de estado de carga para gráficos
export const ChartLoading = ({ height = 300 }) => {
  return (
    <div className="chart-loading" style={{ height }}>
      <div className="spinner"></div>
    </div>
  );
};

// Componente de gráfico de barras moderno
export const ModernBarChart = ({
  data,
  title,
  height = 300,
  loading = false,
}) => {
  if (loading) {
    return <ChartLoading height={height} />;
  }

  if (!data || !Array.isArray(data)) {
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height }}
      >
        <div className="text-muted">No hay datos disponibles</div>
      </div>
    );
  }

  const chartData = data.map((item) => ({
    x: item.day,
    y: item.value,
  }));

  const options = {
    chart: {
      type: "bar",
      height: height,
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: "60%",
        distributed: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: [COLORS.primary],
    series: [
      {
        name: "Transacciones",
        data: chartData,
      },
    ],
    xaxis: {
      categories: data.map((item) => item.day),
      labels: {
        style: {
          colors: COLORS.gray,
          fontSize: "12px",
          fontFamily: "Poppins, sans-serif",
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
        style: {
          colors: COLORS.gray,
          fontSize: "12px",
          fontFamily: "Poppins, sans-serif",
        },
      },
    },
    grid: {
      borderColor: COLORS.light,
      strokeDashArray: 3,
    },
    tooltip: {
      theme: "light",
      style: {
        fontSize: "12px",
        fontFamily: "Poppins, sans-serif",
      },
      y: {
        formatter: function(val) {
          return val + " transacciones";
        },
      },
    },
  };

  return (
    <div className="modern-chart-container">
      <ReactApexChart
        options={options}
        series={options.series}
        type="bar"
        height={height}
      />
    </div>
  );
};

// Componente de gráfico de línea moderno
export const ModernLineChart = ({
  data,
  title,
  height = 300,
  loading = false,
}) => {
  if (loading) {
    return <ChartLoading height={height} />;
  }

  if (!data || !Array.isArray(data)) {
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height }}
      >
        <div className="text-muted">No hay datos disponibles</div>
      </div>
    );
  }

  const chartData = data.map((item) => ({
    x: `Mes ${item.month}`,
    y: item.value,
  }));

  const options = {
    chart: {
      type: "line",
      height: height,
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
      },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    colors: [COLORS.success],
    series: [
      {
        name: "Saldos",
        data: chartData,
      },
    ],
    xaxis: {
      categories: data.map((item) => `Mes ${item.month}`),
      labels: {
        style: {
          colors: COLORS.gray,
          fontSize: "12px",
          fontFamily: "Poppins, sans-serif",
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
        style: {
          colors: COLORS.gray,
          fontSize: "12px",
          fontFamily: "Poppins, sans-serif",
        },
      },
    },
    grid: {
      borderColor: COLORS.light,
      strokeDashArray: 3,
    },
    tooltip: {
      theme: "light",
      style: {
        fontSize: "12px",
        fontFamily: "Poppins, sans-serif",
      },
      y: {
        formatter: function(val) {
          return "$" + val.toLocaleString();
        },
      },
    },
    markers: {
      size: 4,
      colors: [COLORS.success],
      strokeColors: "#fff",
      strokeWidth: 2,
    },
  };

  return (
    <div className="modern-chart-container">
      <ReactApexChart
        options={options}
        series={options.series}
        type="line"
        height={height}
      />
    </div>
  );
};

// Componente de gráfico de área moderno
export const ModernAreaChart = ({
  data,
  title,
  height = 300,
  loading = false,
}) => {
  if (loading) {
    return <ChartLoading height={height} />;
  }

  if (!data || !Array.isArray(data)) {
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height }}
      >
        <div className="text-muted">No hay datos disponibles</div>
      </div>
    );
  }

  const chartData = data.map((item) => ({
    x: item.day,
    y: item.value,
  }));

  const options = {
    chart: {
      type: "area",
      height: height,
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.3,
        opacityTo: 0.1,
        stops: [0, 90, 100],
      },
    },
    colors: [COLORS.info],
    series: [
      {
        name: "Volumen",
        data: chartData,
      },
    ],
    xaxis: {
      categories: data.map((item) => item.day),
      labels: {
        style: {
          colors: COLORS.gray,
          fontSize: "12px",
          fontFamily: "Poppins, sans-serif",
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
        style: {
          colors: COLORS.gray,
          fontSize: "12px",
          fontFamily: "Poppins, sans-serif",
        },
      },
    },
    grid: {
      borderColor: COLORS.light,
      strokeDashArray: 3,
    },
    tooltip: {
      theme: "light",
      style: {
        fontSize: "12px",
        fontFamily: "Poppins, sans-serif",
      },
      y: {
        formatter: function(val) {
          return val + " unidades";
        },
      },
    },
  };

  return (
    <div className="modern-chart-container">
      <ReactApexChart
        options={options}
        series={options.series}
        type="area"
        height={height}
      />
    </div>
  );
};

// Componente de gráfico de dona moderno
export const ModernDoughnutChart = ({
  data,
  height = 300,
  loading = false,
}) => {
  if (loading) {
    return <ChartLoading height={height} />;
  }

  if (!data) {
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height }}
      >
        <div className="text-muted">No hay datos disponibles</div>
      </div>
    );
  }

  const { cashin = 0, cashout = 0, internals = 0 } = data;
  const total = cashin + cashout + internals;

  const series = [cashin, cashout, internals].filter((val) => val > 0);
  const labels = ["Cash In", "Cash Out", "Internas"].filter(
    (_, index) => [cashin, cashout, internals][index] > 0
  );

  if (series.length === 0) {
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height }}
      >
        <div className="text-muted">No hay datos disponibles</div>
      </div>
    );
  }

  const options = {
    chart: {
      type: "donut",
      height: height,
    },
    colors: [COLORS.success, COLORS.danger, COLORS.warning],
    series: series,
    labels: labels,
    plotOptions: {
      pie: {
        donut: {
          size: "60%",
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function(val, opts) {
        return (
          opts.w.globals.seriesTotals[opts.seriesIndex] +
          "\n(" +
          val.toFixed(1) +
          "%)"
        );
      },
      style: {
        fontSize: "12px",
        fontFamily: "Poppins, sans-serif",
      },
    },
    legend: {
      position: "bottom",
      fontSize: "12px",
      fontFamily: "Poppins, sans-serif",
      labels: {
        colors: COLORS.gray,
      },
    },
    tooltip: {
      theme: "light",
      style: {
        fontSize: "12px",
        fontFamily: "Poppins, sans-serif",
      },
      y: {
        formatter: function(val) {
          return val + " (" + ((val / total) * 100).toFixed(1) + "%)";
        },
      },
    },
  };

  return (
    <div className="modern-chart-container">
      <ReactApexChart
        options={options}
        series={options.series}
        type="donut"
        height={height}
      />
    </div>
  );
};

// Componente de métricas con iconos modernos
export const MetricCard = ({
  title,
  value,
  icon: Icon,
  color,
  trend,
  subtitle,
}) => {
  return (
    <div
      className="card card-custom gutter-b metric-card"
      style={{ border: "none", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}
    >
      <div className="card-body p-6">
        <div className="d-flex align-items-center">
          <div
            className="symbol symbol-50 mr-6"
            style={{ backgroundColor: `${color}15` }}
          >
            <span
              className="symbol-label"
              style={{ backgroundColor: "transparent" }}
            >
              <Icon style={{ fontSize: 24, color: color }} />
            </span>
          </div>
          <div className="flex-grow-1">
            <div className="text-muted font-weight-bold font-size-sm mb-1">
              {title}
            </div>
            <div
              className="font-size-h3 font-weight-bolder mb-2"
              style={{ color }}
            >
              {value}
            </div>
            {trend && (
              <div className="d-flex align-items-center">
                <span
                  className="font-weight-bold font-size-sm"
                  style={{ color }}
                >
                  {trend}
                </span>
                {subtitle && (
                  <span className="text-muted font-size-sm ml-2">
                    {subtitle}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente de estadísticas rápidas
export const QuickStats = ({ stats }) => {
  return (
    <div className="row mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="col-xl-3 col-lg-6 col-md-6 col-sm-12 mb-6">
          <MetricCard {...stat} />
        </div>
      ))}
    </div>
  );
};

// Componente de gráfico combinado (barras + línea)
export const CombinedChart = ({ data, height = 300, loading = false }) => {
  if (loading) {
    return <ChartLoading height={height} />;
  }

  if (!data || !Array.isArray(data)) {
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height }}
      >
        <div className="text-muted">No hay datos disponibles</div>
      </div>
    );
  }

  const chartData = data.map((item) => ({
    x: item.day,
    y: item.value,
  }));

  const trendData = data.map((item) => ({
    x: item.day,
    y: Math.floor(item.value * 0.8),
  }));

  const options = {
    chart: {
      type: "line",
      height: height,
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
      },
    },
    stroke: {
      curve: "smooth",
      width: [0, 3],
    },
    colors: [COLORS.primary, COLORS.success],
    series: [
      {
        name: "Transacciones",
        type: "column",
        data: chartData,
      },
      {
        name: "Tendencia",
        type: "line",
        data: trendData,
      },
    ],
    xaxis: {
      categories: data.map((item) => item.day),
      labels: {
        style: {
          colors: COLORS.gray,
          fontSize: "12px",
          fontFamily: "Poppins, sans-serif",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: [
      {
        labels: {
          style: {
            colors: COLORS.gray,
            fontSize: "12px",
            fontFamily: "Poppins, sans-serif",
          },
        },
      },
      {
        opposite: true,
        labels: {
          style: {
            colors: COLORS.gray,
            fontSize: "12px",
            fontFamily: "Poppins, sans-serif",
          },
        },
      },
    ],
    grid: {
      borderColor: COLORS.light,
      strokeDashArray: 3,
    },
    tooltip: {
      theme: "light",
      style: {
        fontSize: "12px",
        fontFamily: "Poppins, sans-serif",
      },
      y: {
        formatter: function(val) {
          return val + " unidades";
        },
      },
    },
    legend: {
      position: "top",
      fontSize: "12px",
      fontFamily: "Poppins, sans-serif",
      labels: {
        colors: COLORS.gray,
      },
    },
  };

  return (
    <div className="modern-chart-container">
      <ReactApexChart
        options={options}
        series={options.series}
        type="line"
        height={height}
      />
    </div>
  );
};

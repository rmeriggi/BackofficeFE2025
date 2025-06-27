import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

export const getCajaCierre = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/cash/caja-cierre`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener cierre de caja:", error);
    throw error;
  }
};

// Función para procesar los movimientos y calcular totales para el resumen
export const procesarMovimientosCierre = (movimientos) => {
  if (!Array.isArray(movimientos) || movimientos.length === 0) {
    return {
      movimientos: [],
      resumen: {
        totalIngresos: 0,
        totalEgresos: 0,
        saldoFinal: 0,
        moneda: "$",
      },
      estadisticas: {
        totalOperaciones: 0,
        plazosFijos: { cantidad: 0, monto: 0 },
        tarjetas: { cantidad: 0, monto: 0 },
        efectivo: { cantidad: 0, monto: 0 },
        creditos: { cantidad: 0, monto: 0 },
        cuentas: { cantidad: 0, monto: 0 },
      },
    };
  }

  let totalIngresos = 0;
  let totalEgresos = 0;

  const estadisticas = {
    totalOperaciones: movimientos.length,
    plazosFijos: { cantidad: 0, monto: 0 },
    tarjetas: { cantidad: 0, monto: 0 },
    efectivo: { cantidad: 0, monto: 0 },
    creditos: { cantidad: 0, monto: 0 },
    cuentas: { cantidad: 0, monto: 0 },
  };

  movimientos.forEach((mov) => {
    const monto = parseFloat(mov.monto) || 0;

    // Clasificar ingresos vs egresos según la operación
    if (
      mov.operacion === "apertura" ||
      mov.operacion === "deposito" ||
      mov.operacion === "pago"
    ) {
      totalIngresos += monto;
    } else if (mov.operacion === "extraccion" || mov.operacion === "retiro") {
      totalEgresos += monto;
    } else {
      // Por defecto consideramos como ingreso
      totalIngresos += monto;
    }

    // Agrupar por tipo
    switch (mov.tipo) {
      case "plazo_fijo":
        estadisticas.plazosFijos.cantidad++;
        estadisticas.plazosFijos.monto += monto;
        break;
      case "tarjeta":
        estadisticas.tarjetas.cantidad++;
        estadisticas.tarjetas.monto += monto;
        break;
      case "credito":
        estadisticas.creditos.cantidad++;
        estadisticas.creditos.monto += monto;
        break;
      case "cuenta":
        estadisticas.cuentas.cantidad++;
        estadisticas.cuentas.monto += monto;
        break;
      default:
        // Agrupar en efectivo para tipos no reconocidos
        estadisticas.efectivo.cantidad++;
        estadisticas.efectivo.monto += monto;
        break;
    }
  });

  return {
    movimientos,
    resumen: {
      totalIngresos,
      totalEgresos,
      saldoFinal: totalIngresos - totalEgresos,
      moneda: movimientos[0]?.moneda || "$",
    },
    estadisticas,
  };
};

// Función obsoleta mantenida para compatibilidad (ya no es necesaria)
export const adaptarCierreAMovimientos = (datosApiCierre) => {
  // Si recibimos un array directamente, solo lo devolvemos
  if (Array.isArray(datosApiCierre)) {
    return datosApiCierre;
  }

  // Si recibimos la estructura antigua, la procesamos
  if (!datosApiCierre) return [];

  const movimientos = [];

  // Simular movimientos basados en la data del cierre
  if (datosApiCierre.movimientos?.plazosFijos) {
    for (let i = 0; i < datosApiCierre.movimientos.plazosFijos.cantidad; i++) {
      movimientos.push({
        id: `pf_${i + 1}`,
        fecha: `${datosApiCierre.fecha}T${String(
          9 + Math.floor(i / 2)
        ).padStart(2, "0")}:${String(Math.random() * 60).padStart(2, "0")}:00`,
        tipo: "plazo_fijo",
        operacion: "apertura",
        monto: Math.floor(
          datosApiCierre.movimientos.plazosFijos.monto /
            datosApiCierre.movimientos.plazosFijos.cantidad
        ),
        moneda: datosApiCierre.resumen?.moneda || "$",
        productoNombre: "Plazo Fijo Tradicional",
        cliente: `Cliente PF ${i + 1}`,
        estado: "Completado",
        formaPago: "efectivo",
      });
    }
  }

  if (datosApiCierre.movimientos?.tarjetas) {
    for (let i = 0; i < datosApiCierre.movimientos.tarjetas.cantidad; i++) {
      movimientos.push({
        id: `tar_${i + 1}`,
        fecha: `${datosApiCierre.fecha}T${String(
          9 + Math.floor(i / 3)
        ).padStart(2, "0")}:${String(Math.random() * 60).padStart(2, "0")}:00`,
        tipo: "tarjeta",
        operacion: "pago",
        monto: Math.floor(
          datosApiCierre.movimientos.tarjetas.monto /
            datosApiCierre.movimientos.tarjetas.cantidad
        ),
        moneda: datosApiCierre.resumen?.moneda || "$",
        productoNombre: "Tarjeta Débito/Crédito",
        cliente: `Cliente TAR ${i + 1}`,
        estado: "Completado",
        formaPago: "transferencia",
      });
    }
  }

  if (datosApiCierre.movimientos?.efectivo) {
    for (let i = 0; i < datosApiCierre.movimientos.efectivo.cantidad; i++) {
      movimientos.push({
        id: `ef_${i + 1}`,
        fecha: `${datosApiCierre.fecha}T${String(
          9 + Math.floor(i / 1)
        ).padStart(2, "0")}:${String(Math.random() * 60).padStart(2, "0")}:00`,
        tipo: "cuenta",
        operacion: Math.random() > 0.5 ? "deposito" : "extraccion",
        monto: Math.floor(
          datosApiCierre.movimientos.efectivo.monto /
            datosApiCierre.movimientos.efectivo.cantidad
        ),
        moneda: datosApiCierre.resumen?.moneda || "$",
        productoNombre: "Operación en Efectivo",
        cliente: `Cliente EF ${i + 1}`,
        estado: "Completado",
        formaPago: "efectivo",
      });
    }
  }

  return movimientos.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
};

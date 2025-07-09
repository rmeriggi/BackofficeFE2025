// Función para descargar CSV de patronos
export const downloadPatronosCSV = async (authToken = null) => {
  try {
    // Usar el token pasado como parámetro o fallback a localStorage
    const token =
      authToken ||
      localStorage.getItem("authToken") ||
      localStorage.getItem("token");

    const headers = {
      "Content-Type": "application/json",
    };

    // Agregar Authorization header si existe el token
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/cash/patronos-csv`,
      {
        method: "GET",
        headers,
      }
    );

    if (!response.ok) {
      // Manejar errores específicos
      if (response.status === 401) {
        throw new Error("No autorizado. Por favor, inicia sesión nuevamente.");
      } else if (response.status === 403) {
        throw new Error("No tienes permisos para descargar este archivo.");
      } else if (response.status === 404) {
        throw new Error(
          "Endpoint no encontrado. Verifica la configuración del servidor."
        );
      } else {
        throw new Error(`Error HTTP: ${response.status}`);
      }
    }

    // Obtener el blob del archivo
    const blob = await response.blob();

    // Crear URL del blob
    const url = window.URL.createObjectURL(blob);

    // Crear elemento de descarga
    const link = document.createElement("a");
    link.href = url;
    link.download = "patronos.csv";

    // Agregar al DOM y hacer clic
    document.body.appendChild(link);
    link.click();

    // Limpiar
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    return {
      success: true,
      message: "Archivo CSV de patronos descargado exitosamente",
    };
  } catch (error) {
    console.error("Error al descargar CSV de patronos:", error);
    return {
      success: false,
      message: error.message || "Error al descargar el archivo CSV de patronos",
    };
  }
};

export default downloadPatronosCSV;

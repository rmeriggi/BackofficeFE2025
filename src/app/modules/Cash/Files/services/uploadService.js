import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

// Función para subir archivo TXT al endpoint final
const uploadTxtFile = async (fileInfo, authToken = null) => {
  try {
    // Verificar si tenemos un objeto válido
    if (!fileInfo) {
      throw new Error("Archivo no válido");
    }

    console.log("Datos del archivo recibidos:", {
      type: typeof fileInfo,
      isFile: fileInfo instanceof File,
      hasName: !!fileInfo.name,
      hasContent: !!fileInfo.content,
      name: fileInfo.name,
      fileType: fileInfo.fileType,
      keys: Object.keys(fileInfo),
    });

    let fileToUpload;

    // Si es un objeto File directo, usarlo
    if (fileInfo instanceof File) {
      fileToUpload = fileInfo;
    } else if (fileInfo.name && fileInfo.content) {
      // Si tenemos el contenido del archivo, recrear el File
      const blob = new Blob([fileInfo.content], {
        type: fileInfo.fileType || "text/plain",
      });
      fileToUpload = new File([blob], fileInfo.name, {
        type: fileInfo.fileType || "text/plain",
      });
      console.log("Archivo recreado:", fileToUpload);
    } else {
      throw new Error(
        "No se puede procesar el archivo - formato no válido. Debe tener name y content."
      );
    }

    // Usar el token pasado como parámetro o fallback a localStorage
    const token =
      authToken ||
      localStorage.getItem("authToken") ||
      localStorage.getItem("token");

    // Crear FormData para enviar el archivo
    const formData = new FormData();
    formData.append("file", fileToUpload);

    const headers = {};

    // Agregar Authorization header si existe el token
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    // No establecer Content-Type - axios lo hará automáticamente para FormData
    const response = await axios.post(`${BASE_URL}/cash/upload-txt`, formData, {
      headers,
    });

    // Verificar si la respuesta del backend indica éxito
    if (response.data && response.data.success === false) {
      // El backend respondió con error
      throw new Error(response.data.message || "Error procesando el archivo");
    }

    return {
      success: true,
      data: response.data,
      message: response.data.message || "Archivo procesado exitosamente",
    };
  } catch (error) {
    console.error("Error al procesar archivo TXT:", error);

    let errorMessage = "Error al procesar el archivo";

    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      if (error.response.status === 401) {
        errorMessage = "No autorizado. Por favor, inicia sesión nuevamente.";
      } else if (error.response.status === 403) {
        errorMessage = "No tienes permisos para realizar esta acción.";
      } else if (error.response.status === 404) {
        errorMessage =
          "Endpoint no encontrado. Verifica la configuración del servidor.";
      } else if (error.response.status === 400) {
        errorMessage =
          error.response.data?.message ||
          "Los datos del archivo no son válidos.";
      } else if (error.response.data?.message) {
        errorMessage = error.response.data.message;
      } else {
        errorMessage = `Error del servidor: ${error.response.status}`;
      }
    } else if (error.request) {
      // La petición fue hecha pero no se recibió respuesta
      errorMessage =
        "No se pudo conectar con el servidor. Verifica tu conexión.";
    } else {
      // Otro tipo de error (incluyendo los que vienen del backend con success: false)
      if (error.message) {
        errorMessage = error.message;
      } else {
        errorMessage = "Error desconocido al procesar el archivo";
      }
    }

    return {
      success: false,
      message: errorMessage,
      error: true,
    };
  }
};

// Exportar como objeto con métodos para fácil uso
export const uploadService = {
  uploadFile: uploadTxtFile,
  uploadTxtFile: uploadTxtFile,
};

export default uploadService;

import axios from "axios";

export const FILES_URLS = {
  UPLOAD: `${process.env.REACT_APP_API_URL}/cash/upload-txt`,
  // En el futuro se pueden agregar más endpoints:
  // GET_FILES: `${process.env.REACT_APP_API_URL}/cash/files`,
  // DELETE_FILE: (id) => `${process.env.REACT_APP_API_URL}/cash/files/${id}`,
};

/**
 * Sube un archivo al backend que lo almacena en S3
 * @param {File} file - Archivo a subir
 * @param {string} fileName - Nombre personalizado del archivo (opcional)
 * @param {string} description - Descripción del archivo (opcional)
 * @param {Function} onProgress - Callback para el progreso de subida
 * @returns {Promise} - Promise con la respuesta del backend
 */
export const uploadFileToS3 = async (
  file,
  fileName,
  description,
  onProgress
) => {
  const formData = new FormData();
  formData.append("file", file);

  if (fileName) {
    formData.append("fileName", fileName);
  }

  if (description) {
    formData.append("description", description);
  }

  try {
    const response = await axios.post(FILES_URLS.UPLOAD, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.lengthComputable) {
          const progress = (progressEvent.loaded / progressEvent.total) * 100;
          onProgress(progress);
        }
      },
      timeout: 300000, // 5 minutos
    });

    // Retornar la respuesta del backend
    return response.data;
  } catch (error) {
    // En lugar de lanzar un error, retornar un objeto con el error
    console.error("Error en uploadFileToS3:", error);

    // Determinar el mensaje de error apropiado
    let errorMessage = "Error al subir el archivo";

    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      if (error.response.status === 404) {
        errorMessage =
          "Endpoint no encontrado. Verifica la configuración del backend.";
      } else if (error.response.status === 413) {
        errorMessage = "El archivo es demasiado grande para el servidor.";
      } else if (error.response.status === 500) {
        errorMessage = "Error interno del servidor. Intenta más tarde.";
      } else if (error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      } else {
        errorMessage = `Error del servidor: ${error.response.status}`;
      }
    } else if (error.request) {
      // La petición fue hecha pero no se recibió respuesta
      errorMessage =
        "No se pudo conectar con el servidor. Verifica tu conexión.";
    } else if (error.code === "ECONNABORTED") {
      // Timeout
      errorMessage =
        "Tiempo de espera agotado. El archivo es muy grande o la conexión es lenta.";
    } else {
      // Otro tipo de error
      errorMessage = error.message || "Error desconocido al subir el archivo";
    }

    // Retornar un objeto con el error en lugar de lanzar una excepción
    return {
      success: false,
      message: errorMessage,
      error: true,
    };
  }
};

/**
 * Valida un archivo antes de subirlo
 * @param {File} file - Archivo a validar
 * @param {number} maxSize - Tamaño máximo en bytes (default: 10MB)
 * @param {Array} allowedTypes - Tipos MIME permitidos (opcional)
 * @returns {Object} - Objeto con isValid y error si hay alguno
 */
export const validateFile = (
  file,
  maxSize = 10 * 1024 * 1024,
  allowedTypes = []
) => {
  if (!file) {
    return { isValid: false, error: "No se ha seleccionado ningún archivo" };
  }

  if (file.size > maxSize) {
    return {
      isValid: false,
      error: `El archivo es demasiado grande. Tamaño máximo: ${formatFileSize(
        maxSize
      )}`,
    };
  }

  if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error:
        "Tipo de archivo no permitido. Por favor, selecciona un archivo válido.",
    };
  }

  return { isValid: true };
};

/**
 * Formatea el tamaño de archivo en bytes a formato legible
 * @param {number} bytes - Tamaño en bytes
 * @returns {string} - Tamaño formateado
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
};

/**
 * Tipos de archivo permitidos por defecto
 */
export const DEFAULT_ALLOWED_TYPES = [
  "application/pdf",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/csv",
  "text/plain",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
  "image/gif",
  "application/zip",
  "application/x-rar-compressed",
];

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

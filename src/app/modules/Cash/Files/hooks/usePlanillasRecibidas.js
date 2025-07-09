import { useCallback, useEffect, useState } from "react";
import { planillasRecibidasService } from "../services/planillasRecibidasService";

export const usePlanillasRecibidas = (idpatrono = 0) => {
  const [planillas, setPlanillas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPlanillas = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await planillasRecibidasService.getPlanillasRecibidas(
        idpatrono
      );
      setPlanillas(data);
    } catch (err) {
      setError(err.message || "Error al cargar planillas recibidas");
    } finally {
      setLoading(false);
    }
  }, [idpatrono]);

  useEffect(() => {
    fetchPlanillas();
  }, [fetchPlanillas, idpatrono]);

  const refetch = () => {
    fetchPlanillas();
  };

  return {
    planillas,
    loading,
    error,
    refetch,
  };
};

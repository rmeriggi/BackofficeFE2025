import { useEffect, useState } from "react";
import { getPlanillasProyectadas } from "../modules/Cash/Forms/services/planillasProyectadasService";

export const usePlanillasProyectadas = (idPatrono) => {
  const [planillas, setPlanillas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchPlanillas = async () => {
      if (!idPatrono) {
        setPlanillas([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await getPlanillasProyectadas(idPatrono);
        if (isMounted) {
          setPlanillas(data || []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Error al cargar las planillas proyectadas");
          setPlanillas([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPlanillas();

    return () => {
      isMounted = false;
    };
  }, [idPatrono]);

  const refreshPlanillas = async () => {
    if (!idPatrono) return;

    setLoading(true);
    setError(null);

    try {
      const data = await getPlanillasProyectadas(idPatrono);
      setPlanillas(data || []);
    } catch (err) {
      setError(err.message || "Error al cargar las planillas proyectadas");
      setPlanillas([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    planillas,
    loading,
    error,
    refreshPlanillas,
  };
};

export default usePlanillasProyectadas;

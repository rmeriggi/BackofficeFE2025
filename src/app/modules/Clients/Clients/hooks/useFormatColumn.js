import { useHistory, useLocation  } from "react-router-dom"
import { ActionColumnFormatter } from "../../../../utils/column-formatter/ActionColumnFormatter"
import { DateColumnFormatter } from "../../../../utils/column-formatter/DateColumnFormatter"
import { ClientColumnFormatter } from "../pages/Listing/column-formatters/ClientColumnFormatter"
import { PerfilColumnFormatter } from "../pages/Listing/column-formatters/PerfilColumnFormatter"
import { StatusColumnFormatter } from "../pages/Listing/column-formatters/StatusColumnFormatter"

export const useFormatColumn = () => {

  const history = useHistory()
  const location = useLocation();
  const currentPath = location.pathname;

  const formats = [
    {
        key: 'Acción', 
        data: {
            headerClasses: "align-top",
            formatter: ActionColumnFormatter, 
            formatExtraData: {
            fnAction : ({id}) => {
                if(currentPath === "/clients/bankaccounts"){
                    //acá voy a agregar el selector para el usuario
                    history.push(`/clients/bankaccounts/list/${id}`)
                } else {
                    history.push(`/clients/clients/edit/${id}`)
                }
                
            }}
        }
    },
    {
        key: 'Estado',
        data: {
            formatter: StatusColumnFormatter,
            headerClasses: "align-top",
        }
    },
    {
        key: 'Número de cuenta',
        data : {
            headerClasses: "align-top",
        }
    },
    {
        key: 'Perfil',
        data : {
            formatter: PerfilColumnFormatter,
            headerClasses: "align-top",
        }
    },
    {
        key: 'Fecha Alta',
        data : {
            formatter: DateColumnFormatter,
            headerClasses: "align-top",
        }
    },
    {
        key: 'Cliente',
        data : {
            headerClasses: "align-top",
            formatter: ClientColumnFormatter,
        }
    }
  ]
  return formats
}
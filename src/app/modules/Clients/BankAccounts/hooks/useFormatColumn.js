import { useHistory } from "react-router-dom"
import { ActionColumnFormatter } from "../pages/Listing/column-formatters/ActionColumnFormatter"
import { DateColumnFormatter } from "../../../../utils/column-formatter/DateColumnFormatter"
import { ClientColumnFormatter } from "../pages/Listing/column-formatters/ClientColumnFormatter"
import { PerfilColumnFormatter } from "../pages/Listing/column-formatters/PerfilColumnFormatter"
import { StatusColumnFormatter } from "../pages/Listing/column-formatters/StatusColumnFormatter"

export const useFormatColumn = (handleShowModal) => {

  const history = useHistory()


  const formats = [
    {
        key: 'Acción', 
        data: {
            headerClasses: "text-center",
            classes: "text-center",
            formatter: ActionColumnFormatter, 
            formatExtraData: {
            fnAction : ({id}) => {
                history.push(`/clients/bankaccounts/edit/${id}`)
            },
            fnActionDelete : ({id}) => {
                handleShowModal(id)
            }        
        }
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
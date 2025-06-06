import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Button, CircularProgress } from "@material-ui/core";
import RelationsTable from "../RelationsTable";
import { ListingTableContextProvider } from "../ListingTableContext";
import { IdentityEditForm } from "../../../IdentityEditForm";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../../../_metronic/_partials/controls";
import { useFetchRelations } from "../../../../../../../hooks";
import { RelationsEdit } from "../../../RelationsEdit";
import { TrainRounded } from "@material-ui/icons";


export default function Listing({urlImage}) {
  
  const idParam = useParams().id; 
  const [relations, loading] = useFetchRelations(idParam)   
  const [data, setData] = useState(false);
  const [isEdit, setIsEdit]= useState(false);
  const [selectedRelation, setSelectedRelation]= useState({});

  return (
    <>
     {isEdit ? <RelationsEdit setIsEdit={setIsEdit} setSelectedRelation={setSelectedRelation} selectedRelation={selectedRelation} urlImage={urlImage}/> :
    <Card>
    <CardHeader title={data ? "Crear Relación" : "Relaciones"}>
      <CardHeaderToolbar>
      {data && <Button
          variant="outlined"
          color="secondary"
          className="ml-4"
          size="large"
          onClick={() =>{ 
            setIsEdit(false)
            setData(false)
          }}
        >
          Volver
        </Button>}
        {!data &&<Button
          variant="contained"
          color="secondary"
          className="ml-4"
          size="large"
          onClick={() => setData(true)}
        >
         Nueva Relación
        </Button>  }       
      </CardHeaderToolbar>
    </CardHeader>
    <CardBody>
      <ListingTableContextProvider >
      {loading ? (
        <CircularProgress size={20} color="secondary" />
      ) : data ? <IdentityEditForm setData={setData}  /> :  
        <RelationsTable relations={relations} setIsEdit={setIsEdit} setSelectedRelation={setSelectedRelation} />
      }
      </ListingTableContextProvider >
    </CardBody>
  </Card>
     }
    </>
  );
}

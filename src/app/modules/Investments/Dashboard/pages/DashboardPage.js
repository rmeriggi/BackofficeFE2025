import React, {useEffect, useState} from 'react'
import { LayoutSplashScreen, useSubheader } from '../../../../../_metronic/layout'
import CardsShow from '../components/header/CardsShow';
import {Filters} from '../components/Filters'
import { Button } from "@material-ui/core";
import { ModalWrapper } from '../../../../components/ModalWrapper';
import productMock from '../__mocks__/productMock';
import groupMock from '../__mocks__/groupMock';
import { ActiveTypes } from '../components/graphics/ActiveTypes';
import { Operations } from '../components/graphics/Operations';
import { VolumeOperated } from '../components/graphics/VolumeOperated';
import { Comissions } from '../components/graphics/Comissions';
import { getDashboard } from '../utils/service';
import { Valuation } from '../components/graphics/Valuation';
import { PL } from '../components/graphics/PL';
import clientsMock from '../__mocks__/clientsMock';
import { dashboardAdapter } from '../adapters/dashboardAdapter';
import { useHistory } from "react-router";


const initialValues = {
  productId: 0,
  accountId: 0,
  fromDate: new Date(),
  toDate: new Date(),
  clientId: 1
}


const DashboardPage = () => {

  const subheader = useSubheader()  
  const history = useHistory();

  subheader.setTitle("Dashboard")
  const [dashboardInfo, setDashboardInfo] = useState()
  const [values, setValues] =useState(initialValues)
    
  useEffect(()=>{
    const getStatistics = async()=> {
      const response = await getDashboard(initialValues)
      const dashboardFormatted = dashboardAdapter(response.dashboard)
      setDashboardInfo(dashboardFormatted)
    }
    getStatistics()
  },[])

  if(!dashboardInfo) return <LayoutSplashScreen />

  const { charts, header } = dashboardInfo;
  const {species, operations, volume, comissions, valuation, pl} = charts;  

  return (
    <>    
      <ModalWrapper
        show={subheader.openFilter}
        onHide={subheader.handleClose}
        size="lg"
        title="Filtros"
        
      >
        
        <Filters 
          products={productMock} 
          groups={groupMock} 
          clients={clientsMock}
          setValues={setValues} 
          values={values}
          setDashboardInfo={setDashboardInfo}
        />
        
      </ModalWrapper> 

      <Button 
      variant="transparent"
      color="secondary"
      style={{ marginBottom:"10px"}}
      className="ml-4"
      size="large"
      onClick={() => history.push(`/investments/testtable`)}
      > Reporte 1 
      </Button>

      <Button 
      variant="transparent"
      color="secondary"
      style={{ marginBottom:"10px"}}
      className="ml-4"
      size="large"
      onClick={() => history.push(`/investments/wallet`)}
      > Reporte Cartera Socio
      </Button>

      <Button 
      variant="transparent"
      color="secondary"
      className="ml-4"
      style={{ marginBottom:"10px"}}
      size="large"
      onClick={() => history.push(`/investments/external`)}
      > Cliente Externo
      </Button>
     
      <CardsShow values={header}/>
      <div className='d-flex justify-content-center my-5'>
        <div className="bg-white rounded shadow-sm w-100">
          <Valuation data={valuation.data} />
        </div>
      </div>
      <div className='d-flex justify-content-center my-5'>
        <div className="bg-white rounded shadow-sm mr-1d-flex flex-column align-items-center" style={{width: "30%"}}>
          <ActiveTypes data={species.data}/>
        </div>
        <div className="bg-white rounded shadow-sm ml-1" style={{width: "70%"}}>
          <Operations data={operations.data}/>
        </div>
      </div>
      <div className='d-flex justify-content-center my-5'>
        <div className="bg-white rounded shadow-sm w-100">
          <Comissions data={comissions.data}/>
        </div>
      </div>
      <div className='d-flex justify-content-center mt-5'>
        <div className="bg-white rounded shadow-sm mr-1 w-50">
          <VolumeOperated data={volume.data}/>
        </div>
        <div className="bg-white rounded shadow-sm ml-1 w-50">
          <PL data={pl.data}/>
        </div>
      </div>
    </> 
  )
}

export default DashboardPage;
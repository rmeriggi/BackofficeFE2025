import React from 'react'
import { arrCardDescription } from '../utils/dataForComponents'
import { CardDescription } from './CardDescription'
import { AssetClassGraphic } from './graphics/AssetClassGraphic'
import { dataAssetClass, dataValueWallet, dataPNL } from '../utils/dataForComponents'
import { ValueWalletGraphic } from './graphics/ValueWalletGraphic'
import { PNLGraphic } from './graphics/PNLGraphic'

export const Graphics = () => {
  return (
    <>
      <div className='col-6 p-0'>
        <div className='d-flex flex-column'>
          <h5 className='my-5 mx-auto'>GEOGRAFÍA</h5>
          {
            arrCardDescription.map((d, i)=> <CardDescription key={i} description={d.description} />)
          }
        </div>
        <div className='d-flex flex-column mt-5'>
          <h5 className='mx-auto'>ASSET CLASS</h5>
          <AssetClassGraphic data={dataAssetClass}/>
        </div>
      </div>
      <div className='col-6 p-0'>
          <ValueWalletGraphic data={dataValueWallet}/>
          <PNLGraphic data={dataPNL}/>
      </div>
    </>
  )
}

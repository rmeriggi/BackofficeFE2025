import React from 'react'
import { useSubheader } from '../../../_metronic/layout'
import { Card, CardBody, CardHeader, CardHeaderToolbar } from '../../../_metronic/_partials/controls'

export const LayoutCard = ({
  title = '', 
  cardHeader = true, 
  renderToolbar, 
  children,
  name
  }) => {

  const subHeader = useSubheader()
  subHeader.setTitle(name)

  return (
    <Card>
      {
        cardHeader && 
        <CardHeader title={title}>
          <CardHeaderToolbar>
          {
            renderToolbar && renderToolbar
          }
          </CardHeaderToolbar>
        </CardHeader>
      }
      <CardBody>
        {children}
      </CardBody>
    </Card>
  )
}
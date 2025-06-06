import React from 'react'
import { LayoutSplashScreen } from '../../_metronic/layout'
import useIsMountedRef from "../hooks/useIsMountedRef"

export const withLayoutSplashScreen = (Component, hooks) => {
  const NewComponent = props => {

    const isMounted = useIsMountedRef()
    const responses = []
    const responsesCompleted = []

    if(hooks){
      hooks.forEach(hooks => {
        const {hook, params} = hooks
        if(params && typeof params === "string"){
          const param = props.match?.params[params] || props[params]
          const [response, completed] = hook(isMounted, param)
          responses.push(response)
          responsesCompleted.push(completed)
          return
        }
        if(params || params === 0){
          const [response, completed] = hook(isMounted, params)
          responses.push(response)
          responsesCompleted.push(completed)
          return
        }
        const [response, completed] = hook(isMounted)
        responses.push(response)
        responsesCompleted.push(completed)
      })
    }
    
    if(responsesCompleted.includes(false)) return <LayoutSplashScreen />

    return (
      <>
        <Component  {...props} data={responses}/>
      </>
    )
  }
  return NewComponent
}

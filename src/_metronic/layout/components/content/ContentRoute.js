import React from "react";
import {Route} from "react-router-dom";
import {Content} from "./Content";

export function ContentRoute({ children, component, render, ContextProvider, ...props }) {
  return (
    <Route {...props}>
      {routeProps => {
        if (typeof children === "function") {
          if (ContextProvider) {
            return (
                <ContextProvider>
                  <Content>{children(routeProps)}</Content>
                </ContextProvider>
            );
          } else {
            return (
              <Content>{children(routeProps)}</Content>
            );
          }
        }

        if (!routeProps.match) {
          return null;
        }

        let content = null;

        if (children) {
          content = <Content>{children}</Content>
        }

        if (component) {
          content = <Content>{React.createElement(component, routeProps)}</Content>
        }

        if (render) {
          content = <Content>{render(routeProps)}</Content>
         }
 
        if (content !== null) {
           return (
               ContextProvider ? (
                   <ContextProvider>
                     {content}
                   </ContextProvider>
               ) :
                   content
           )
        }
        return null;
      }}
    </Route>
  );
}

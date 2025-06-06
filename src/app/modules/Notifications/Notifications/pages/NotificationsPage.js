import React from 'react';
import Listing from '../components/Listing';
import { Switch } from 'react-router-dom';
import { ContentRoute } from '../../../../../_metronic/layout';
import { NotificationEdit } from '../components/NotificationEdit';
import { NotificationCreate } from '../components/NotificationCreate';
import { ListingTableContextProvider } from '../components/Listing/ListingTableContext';


const NotificationsPage = () => {
    const baseRouterUrl = '/compliance'
    
    return (
        <>
        <Switch>
            <ContentRoute 
                exact
                path={baseRouterUrl + '/inbox'}
                component={Listing} 
                ContextProvider={ListingTableContextProvider} />
                  <ContentRoute
                    path={baseRouterUrl +"/inbox/notification/:id"}
                    component={NotificationEdit}
                    ContextProvider={ListingTableContextProvider}
                />
                 <ContentRoute
                    path={baseRouterUrl +"/inbox/notifications/new/create"}
                    component={NotificationCreate}
                    ContextProvider={ListingTableContextProvider}
                />
        </Switch>  
    </>  
    )
}

export default NotificationsPage;
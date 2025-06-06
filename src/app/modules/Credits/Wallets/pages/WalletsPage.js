import React from "react";
import { AssignWallet } from "./AssignWallet/AssignWallet";
import { Switch } from "react-router-dom";
import { ContentRoute } from "../../../../../_metronic/layout";

export default function WalletsPage() {
    return (
        <Switch>
            <ContentRoute 
                exact 
                path="/credits/wallet" 
                component={AssignWallet} 
            />
        </Switch>
    )
}
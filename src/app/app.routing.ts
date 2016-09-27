//these 2 import for routing
import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { ReceiptComponent } from './receipt/receipt.component';
import { ReceiptSelectorComponent } from './receipt-selector/receipt-selector.component';

const appRoute:Routes = [
    {
        path:"",
        redirectTo:"/home",
        pathMatch:"full"
    },
    {
        path:"home",
        component:ReceiptSelectorComponent
    },
    {
        path: "receipt",
        component: ReceiptComponent
    }
]

export const routing:ModuleWithProviders = RouterModule.forRoot(appRoute)
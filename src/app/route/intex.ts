import express from 'express';

import { AuthRoutes } from '../modules/Auth/auth.route';
import { UserRoutes } from '../modules/Registration/user.route';
import { EventRoutes } from '../modules/Event/event.route';


const router=express.Router()



const modulerRoutes=[

    {
        path:'/auth',
        route:UserRoutes,
        
    },
    {
        path:'/auth',
        route:AuthRoutes,
        
    },
    {
        path:'/events',
        route:EventRoutes,
        
    },
 
]

modulerRoutes.forEach(route=>router.use(route.path,route.route))

export default router
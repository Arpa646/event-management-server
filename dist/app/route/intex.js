"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/Auth/auth.route");
const user_route_1 = require("../modules/Registration/user.route");
const event_route_1 = require("../modules/Event/event.route");
const router = express_1.default.Router();
const modulerRoutes = [
    {
        path: '/auth',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/events',
        route: event_route_1.EventRoutes,
    },
];
modulerRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;

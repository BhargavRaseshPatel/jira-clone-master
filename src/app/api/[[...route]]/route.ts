import { Hono } from 'hono';
import { handle } from 'hono/vercel'

import auth from "@/features/auth/server/route";
import workspaces from "@/features/workspaces/server/route";

const app = new Hono().basePath('/api');

// app.get('/hello', (c) => {
//     return c.json({ hello: 'world' });
// }).get('/project/:id', (c) => {
//     const {id} = c.req.param();

//     return c.json({ id });
// })

const routes = app
    .route('/auth', auth)
    .route('/workspaces', workspaces);

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof routes;

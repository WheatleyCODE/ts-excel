import { App } from '@core';
import { pathRoutes } from '@routes/pathRoutes';
import '@styles/index.scss';

const app = new App('#root', pathRoutes);

app.render();

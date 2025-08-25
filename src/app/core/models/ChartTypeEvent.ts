import { ChartEvent, ActiveElement } from 'chart.js';

export type ChartClickEvent = {
    event?: ChartEvent;
    active?: ActiveElement[] | {}[];
};
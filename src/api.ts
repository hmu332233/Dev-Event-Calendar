import axios from 'axios';
import { DevEvent } from './types';

const apiInstance = axios.create({
  baseURL: process.env.API_HOST,
});

export async function getDevEvents(): Promise<DevEvent[]> {
  const { data } = await apiInstance.get('/front/v2/events/current');
  const devEvents: DevEvent[] = data
    .map((v: any) => v.dev_event)
    .flat()
    .map((event: any) => ({
      title: event.title,
      start: event.start_date_time,
      end: event.end_date_time,
      link: event.event_link,
    }));
  return devEvents;
}

import { createEvents, EventAttributes } from 'ics';
import { getTimeArray } from './utils/date';
import { getDevEvents } from './api';
import { DevEvent } from './types';

function convertToIcs(events: DevEvent[]): string {
  const targetEvents = events.map((issue) => {
    const event: EventAttributes = {
      calName: 'Dev-Event-Calendar',
      start: getTimeArray(issue.start, 'Asia/Seoul'),
      startInputType: 'utc',
      end: getTimeArray(issue.end, 'Asia/Seoul'),
      endInputType: 'utc',
      title: issue.title,
      description: issue.link,
      classification: 'PUBLIC',
      status: 'CONFIRMED',
    };
    return event;
  });

  const { error, value } = createEvents(targetEvents);

  if (error) {
    throw error;
  }

  return value || '';
}

async function run() {
  const devEvents = await getDevEvents();

  const aaa = convertToIcs(devEvents);
  console.log(aaa);
}

run();

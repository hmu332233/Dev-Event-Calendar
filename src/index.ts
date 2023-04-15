import { createEvents, EventAttributes } from 'ics';
import { getTimeArray } from './utils/date';
import { getDevEvents } from './api';
import { DevEvent } from './types';
import { createIcsFile } from './utils/file';

const PUBLISH_DIR = process.env.PUBLISH_DIR || 'data';

function convertToIcs(devEvents: DevEvent[]): string {
  const targetEvents = devEvents.map((devEvent) => {
    const event: EventAttributes = {
      calName: 'Dev-Event-Calendar',
      start: getTimeArray(devEvent.start, 'Asia/Seoul'),
      startInputType: 'utc',
      end: getTimeArray(devEvent.end, 'Asia/Seoul'),
      endInputType: 'utc',
      title: devEvent.title,
      description: devEvent.link,
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
  const icsString = convertToIcs(devEvents);
  createIcsFile(PUBLISH_DIR, icsString);
}

run();

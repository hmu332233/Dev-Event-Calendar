import * as fs from 'fs';

function mkdir(dirPath: string) {
  const isExists = fs.existsSync(dirPath);
  if (!isExists) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

export function createIcsFile(path: string, data: any) {
  mkdir(path);
  fs.writeFileSync(`${path}/events.ics`, data);
}

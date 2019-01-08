import { Lane } from '../types';

export function getLaneTitle(lane: Lane): string {
  switch (lane) {
    case Lane.ThingsTodo: return 'Things todo';
    case Lane.Next: return 'Next';
    case Lane.Doing: return 'Doing';
    case Lane.Waiting: return 'Waiting';
    case Lane.Done: return 'Done';
    case Lane.Notes: return 'Notes';
    default: return '';
  }
}
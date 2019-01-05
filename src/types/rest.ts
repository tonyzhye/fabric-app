/**
 * Model types from RESTful api requests
 */

// For kanban section

export enum AccessLevel {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

/**
 * Lane declare and helper methods
 */

export enum Lane {
  ThingsTodo = 'THINGSTODO',
  Next = 'NEXT',
  Waiting = 'WAITING',
  Doing = 'DOING',
  Done = 'DONE',
  Notes = 'NOTES'
}

export interface LaneItem {
  key: string;
  title: string;
}

export const LaneItemList: LaneItem[] = [
  { key: 'THINGSTODO', title: 'Things todo'},
  { key: 'NEXT', title: 'Next'},
  { key: 'WAITING', title: 'Waiting'},
  { key: 'DOING', title: 'Doing'},
  { key: 'DONE', title: 'Done'},
  { key: 'NOTES', title: 'Notes'},
];

export const getLaneFromString = (key: string): Lane => {
  return key as Lane;
};

export const getLaneFromLaneItem = (item: LaneItem): Lane => {
  return getLaneFromString(item.key);
};

export enum NetworkStatus {
  Idle = 0,
  Loading,
  Successed,
  Error
}

export const LaneOrderTail: number = 25535;

export interface KanbanSummary {
  id: number;
  title: string;
  accessLevel: AccessLevel;
  createdAt: string;
  updatedAt: string;
}

export interface KanbanModel {
  id: number;
  accessLevel: AccessLevel;
  title: string;
  memos: MemoModel[];
  createdAt: string;
  updatedAt: string;
}

export interface MemoModel {
  id: number;
  kanbanId: number;
  lane: Lane;
  laneOrder: number;

  subject: string;
  description: string;

  createdAt: string;
  updatedAt: string;
}

// For membership section

export interface UserInfoModel {
  id: number;
  email: string;
  fullName: string;
  pictureUrl: string;
}

export interface ErrorResponse {
  response?: {
    status: number;
    data: {
      message: string;
    }
  };
}

export const StatusNetworkError = -1;

export interface RestError {
  status: number;
  message: string;
}

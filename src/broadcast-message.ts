
export enum EventType {
  UserJoin = 'UserJoin',
  UserLeave = 'UserLeave',
  CarrotMove = 'CarrotMove',
  TextUpdate = 'TextUpdate',
}

interface Event {
  type: EventType;
  user: string;
}

interface CarrotMoveEvent extends Event {
  startIndex: number;
  endIndex: number;
}

export interface NewUserEvent extends Event {
  type: EventType.UserJoin
}

export interface UserLeaveEvent extends Event {
  type: EventType.UserLeave
}

interface TextUpdate extends Event {
  type: EventType.TextUpdate;
  newValue:string;
}
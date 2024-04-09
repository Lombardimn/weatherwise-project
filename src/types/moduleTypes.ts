export interface WeekDays {
  [index: number]: string;
}

export interface Months {
  [index: number]: string;
}

export interface AQIText {
  [key: number]: {
    level: string;
    message: string;
  };
}
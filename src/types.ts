type StackDirection = 'up' | 'down';

export interface GanttOptions {
  textField?: string;
  startField?: string;
  endField?: string;
  colorByField?: string;
  groupByField?: string;
  labelFields: string[];
  stackDirection: StackDirection;
  showYAxis: boolean;

  colors?: Array<{ text: string; color: string }>;

  experiments: {
    enabled: boolean;
    lockToExtents: boolean;
    relativeXAxis: boolean;
  };
}

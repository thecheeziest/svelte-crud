export interface SelectedItem {
  id: number;
}

export interface RowData {
  id: number;
  name: string;
  category: string;
  description: string;
  link: string;
  hashtags: string[];
  [key: string]: string | number | string[];
}

export const applicationData: RowData[] = [
  { id: 1, name: 'Task 1', category: 'Work', description: 'First task description', link: 'http://example.com', hashtags: ['err'] },
  { id: 2, name: 'Task 2', category: 'Home', description: 'Second task description', link: 'http://example.com', hashtags: ['#task4'] },
  { id: 3, name: 'Task 3', category: 'Apple', description: 'R task description', link: 'http://example.com', hashtags: ['#task3'] },
  { id: 4, name: 'Task 4', category: 'Base', description: 'Q task description', link: 'http://example.com', hashtags: ['#task8'] },
  { id: 5, name: 'Task 5', category: 'Zen', description: 'O task description', link: 'http://example.com', hashtags: ['#task1'] },
  { id: 6, name: 'Task 6', category: 'Doll', description: 'W task description', link: 'http://example.com', hashtags: ['#task12'] },
  { id: 7, name: 'Task 7', category: 'Any', description: 'TR task description', link: 'http://example.com', hashtags: ['#task41'] },
  { id: 8, name: 'Task 8', category: 'Time', description: 'Y task description', link: 'http://example.com', hashtags: ['#task61'] },
  { id: 9, name: 'Task 9', category: 'World', description: 'J task description', link: 'http://example.com', hashtags: ['#task11'] },
  { id: 10, name: 'Task 10', category: 'Univ', description: 'L task description', link: 'http://example.com', hashtags: ['#task31'] },
  { id: 11, name: 'Task 11', category: 'Power', description: 'K task description', link: 'http://example.com', hashtags: ['#task21'] },
  { id: 12, name: 'Task 12', category: 'ZigZag', description: 'T task description', link: 'http://example.com', hashtags: ['#task84'] },
  { id: 13, name: 'Task 13', category: 'My', description: 'Q task description', link: 'http://example.com', hashtags: ['#task91'] },
  { id: 14, name: 'Task 14', category: 'iZna', description: 'BU task description', link: 'http://example.com', hashtags: ['#task20'] },
  { id: 15, name: 'Task 15', category: 'Bang', description: 'X task description', link: 'http://example.com', hashtags: ['#task101'] },
];

export const protocolData: RowData[] = [
  { id: 1, name: 'Task 1', category: 'Choco', description: 'First task description', link: 'http://example.com', hashtags: ['#task6'] },
  { id: 2, name: 'Task 2', category: 'bee', description: 'Second task description', link: 'http://example.com', hashtags: ['#task4'] },
  { id: 3, name: 'Task 3', category: 'what', description: 'R task description', link: 'http://example.com', hashtags: ['#task3'] },
  { id: 4, name: 'Task 4', category: 'monday', description: 'Q task description', link: 'http://example.com', hashtags: ['#task8'] },
  { id: 5, name: 'Task 5', category: 'Tuesday', description: 'O task description', link: 'http://example.com', hashtags: ['#task1'] },
  { id: 6, name: 'Task 6', category: 'Wednesday', description: 'W task description', link: 'http://example.com', hashtags: ['#task12'] },
  { id: 7, name: 'Task 7', category: 'Thursday', description: 'TR task description', link: 'http://example.com', hashtags: ['#task41'] },
  { id: 8, name: 'Task 8', category: 'Friday', description: 'Y task description', link: 'http://example.com', hashtags: ['#task61'] },
  { id: 9, name: 'Task 9', category: 'Saturday', description: 'J task description', link: 'http://example.com', hashtags: ['#task11'] },
  { id: 10, name: 'Task 10', category: 'Sunday', description: 'L task description', link: 'http://example.com', hashtags: ['#task31'] },
  { id: 11, name: 'Task 11', category: 'one', description: 'K task description', link: 'http://example.com', hashtags: ['#task21'] },
  { id: 12, name: 'Task 12', category: 'two', description: 'T task description', link: 'http://example.com', hashtags: ['#task84'] },
  { id: 13, name: 'Task 13', category: 'three', description: 'Q task description', link: 'http://example.com', hashtags: ['#task91'] },
  { id: 14, name: 'Task 14', category: 'Four', description: 'BU task description', link: 'http://example.com', hashtags: ['#task20'] },
  { id: 15, name: 'Task 15', category: 'five', description: 'X task description', link: 'http://example.com', hashtags: ['#task101'] },
];

export const domainData: RowData[] = [
  { id: 1, name: 'Task 1', category: 'six', description: 'First task description', link: 'http://example.com', hashtags: ['#task6'] },
  { id: 2, name: 'Task 2', category: 'SeVen', description: 'Second task description', link: 'http://example.com', hashtags: ['#task4'] },
  { id: 3, name: 'Task 3', category: 'eight', description: 'R task description', link: 'http://example.com', hashtags: ['#task3'] },
  { id: 4, name: 'Task 4', category: 'monday', description: 'Q task description', link: 'http://example.com', hashtags: ['#task8'] },
  { id: 5, name: 'Task 5', category: 'Tuesday', description: 'O task description', link: 'http://example.com', hashtags: ['#task1'] },
  { id: 6, name: 'Task 6', category: 'Wednesday', description: 'W task description', link: 'http://example.com', hashtags: ['#task12'] },
  { id: 7, name: 'Task 7', category: 'Thursday', description: 'TR task description', link: 'http://example.com', hashtags: ['#task41'] },
  { id: 8, name: 'Task 8', category: 'Friday', description: 'Y task description', link: 'http://example.com', hashtags: ['#task61'] },
  { id: 9, name: 'Task 9', category: 'Saturday', description: 'J task description', link: 'http://example.com', hashtags: ['#task11'] },
  { id: 10, name: 'Task 10', category: 'Sunday', description: 'L task description', link: 'http://example.com', hashtags: ['#task31'] },
  { id: 11, name: 'Task 11', category: 'one', description: 'K task description', link: 'http://example.com', hashtags: ['#task21'] },
  { id: 12, name: 'Task 12', category: 'two', description: 'T task description', link: 'http://example.com', hashtags: ['#task84'] },
  { id: 13, name: 'Task 13', category: 'three', description: 'Q task description', link: 'http://example.com', hashtags: ['#task91'] },
  { id: 14, name: 'Task 14', category: 'Four', description: 'BU task description', link: 'http://example.com', hashtags: ['#task20'] },
  { id: 15, name: 'Task 15', category: 'five', description: 'X task description', link: 'http://example.com', hashtags: ['#task101'] },
];
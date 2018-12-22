export interface IDivision {
  id: number;
  name: string;
  ancestry: string | null;
  ancestorName: string | null;
  children: {
    id: number;
    name: string;
    ancestry: string | null;
    ancestorName: string | null;
  };
}

export interface ISeason {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  active: boolean;
}

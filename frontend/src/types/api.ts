export interface APIItem {
  id: number;
  name: string;
  url: string;
  method: string;
}

interface Log {
  status: number;
  latency: number;
}
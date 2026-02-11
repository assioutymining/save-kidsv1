
export interface NavItem {
  label: string;
  path: string;
}

export interface StatCard {
  label: string;
  value: number;
  suffix: string;
  color: string;
}

export interface PetitionFormData {
  parentType: 'Father' | 'Mother' | 'Guardian';
  childAge: number;
  custodyStatus: string;
  deprivationDuration: string;
  psychEffects: string[];
  contactEmail?: string;
}

export interface Story {
  id: string;
  title: string;
  author: string;
  excerpt: string;
  imageUrl: string;
  videoUrl?: string;
}

export interface ChartData {
  name: string;
  value: number;
}

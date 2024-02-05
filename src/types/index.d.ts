export interface Link {
  id: number;
  url: string | null;
  createdAt: Date;
  updatedAt: Date | null;
  userId: string;
  slug: string | null;
  visits: number | null;
}

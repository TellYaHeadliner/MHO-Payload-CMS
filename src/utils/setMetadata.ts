import { Metadata } from 'next';

export const setMetaData = (title: string | null | undefined, description?: string | null | undefined): Metadata => {
  return {
    title,
    description,
  };
};
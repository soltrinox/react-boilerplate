// JS imports
import { ReactNode, ReactNodeArray } from 'react';

// Properties
// Shared props
declare interface CommonProps {
  children?: ReactNode | ReactNodeArray[];
}

// Empty
declare interface EmptyProps {
  title: string;
  description: string;
  cta?: string;
  action?: string;
  url?: string;
}

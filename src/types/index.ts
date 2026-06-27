// src/types/index.ts
import type { ReactNode } from 'react';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export type NavigationItem = {
  id: string;
  label: string;
  icon: IconDefinition;
  href: string;
};

export type ProfileData = {
  name: string;
  title: string;
  description: string;
  avatar: string;
  heroBackground: string;
};

export type ContactLink = {
  label?: string;
  value: string;
  href: string;
  icon?: IconDefinition;
};

export type ButtonProps = {
  text: string;
  icon?: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'dark' | 'light' | 'panel';
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
};

export type TimelineItem = {
  id?: string;
  date: number | string;
  title: string;
  text: string;
};

export type ExpertiseItem = {
  date: string;
  info: {
    company: string;
    job: string;
    description: string;
  };
};

export type SkillItem = {
  id: string;
  name: string;
  range: number;
};

export type SkillsProps = {
  items: SkillItem[];
};

export type AddSkillFormValues = {
  name: string;
  range: string;
};

export type BoxProps = {
  title: string;
  content?: ReactNode;
  children?: ReactNode;
  className?: string;
};

export type InfoProps = {
  text: string;
  className?: string;
};

export type PortfolioCategory = 'All' | 'Web' | 'ML' | 'NLP';

export type PortfolioItem = {
  id: number;
  title: string;
  category: Exclude<PortfolioCategory, 'All'>;
  image: string;
  description: string;
  url?: string;
};

export type FeedbackItem = {
  feedback: string;
  reporter: {
    photoUrl: string;
    name: string;
    citeUrl: string;
  };
};

export type AddressProps = {
  items: ContactLink[];
};

export type FeedbackProps = {
  data: FeedbackItem[];
};

export type PortfolioProps = {
  items: PortfolioItem[];
};

export type AsyncStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export type TimeLineProps = {
  data: TimelineItem[];
  status?: AsyncStatus;
  error?: string | null;
};
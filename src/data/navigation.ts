// src/data/navigation.ts
import {
  faCircleUser,
  faUserGraduate,
  faPencil,
  faBriefcase,
  faPaperPlane,
  faComment
} from '@fortawesome/free-solid-svg-icons';
import type { NavigationItem } from '../types';

export const navigationItems: NavigationItem[] = [
  {
    id: 'about',
    label: 'About me',
    icon: faCircleUser,
    href: '#about'
  },
  {
    id: 'education',
    label: 'Education',
    icon: faUserGraduate,
    href: '#education'
  },
  {
    id: 'experience',
    label: 'Experience',
    icon: faPencil,
    href: '#experience'
  },
  {
    id: 'portfolio',
    label: 'Portfolio',
    icon: faBriefcase,
    href: '#portfolio'
  },
  {
    id: 'contacts',
    label: 'Contacts',
    icon: faPaperPlane,
    href: '#contacts'
  },
  {
    id: 'feedback',
    label: 'Feedbacks',
    icon: faComment,
    href: '#feedback'
  }
];
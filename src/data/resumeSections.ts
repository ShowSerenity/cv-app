// src/data/resumeSections.ts
import {
  faEnvelope,
  faLocationDot,
  faPhone
} from '@fortawesome/free-solid-svg-icons';
import {
  faGithub,
  faLinkedinIn,
  faTelegramPlane
} from '@fortawesome/free-brands-svg-icons';
import type {
  ContactLink,
  ExpertiseItem,
  FeedbackItem,
  PortfolioItem,
  TimelineItem
} from '../types';

export const aboutText =
  'I am a first-year master’s student and a motivated developer focused on building practical, user-friendly web applications. I already have hands-on experience working on real projects, and I am eager to keep growing as a frontend developer while applying new tools and technologies in practice. My core frontend stack includes HTML, CSS, and JavaScript, and I also have experience in machine learning engineering, which helps me approach problems with both product and technical thinking.';

export const educationItems: TimelineItem[] = [
  {
    date: '2022',
    title: 'NIS Taldykorgan',
    text: 'Graduated from Nazarbayev Intellectual School with a strong academic background and early interest in technology.'
  },
  {
    date: '2025',
    title: 'B.A. in Software Engineering — Astana IT University',
    text: 'Completed undergraduate studies in Software Engineering with a focus on programming, systems thinking, and applied software development.'
  },
  {
    date: '2027',
    title: 'M.S. in Applied Artificial Intelligence — Astana IT University',
    text: 'Currently pursuing a master’s degree in Applied Artificial Intelligence, expanding expertise in machine learning, intelligent systems, and practical AI applications.'
  }
];

export const experienceItems: ExpertiseItem[] = [
  {
    date: '2-month internship',
    info: {
      company: 'WEAREDRFT TOO',
      job: 'Full Stack Developer Intern',
      description:
        'Worked on page layout based on provided designs, built user interface pages, and integrated frontend functionality with backend APIs.'
    }
  },
  {
    date: '2-month internship + 5-month project work',
    info: {
      company: 'Meyirim TOO',
      job: 'Frontend Developer',
      description:
        'Maintained and improved website appearance, added new interface elements, and contributed to the ongoing development of the company website.'
    }
  },
  {
    date: '2023 - 2024',
    info: {
      company: 'Yandex Crowd',
      job: 'Assessor-Tester',
      description:
        'Tested applications and services, identified bugs, documented issues clearly, and helped improve product quality through structured feedback.'
    }
  }
];

export const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: 'Car Rental System',
    category: 'Web',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80',
    description:
      'Free-float car sharing platform with vehicle classes, real-time location tracking, and per-minute rental flow.',
    url: 'https://github.com/ShowSerenity/car-rental-system'
  },
  {
    id: 2,
    title: 'Meyirim Website',
    category: 'Web',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80',
    description:
      'Static informational website for Meyirim with content about the organization, events, activities, and gallery sections.',
    url: 'https://github.com/ShowSerenity/Meyirim'
  },
  {
    id: 3,
    title: 'Grade Your Professor NLP',
    category: 'NLP',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80',
    description:
      'NLP-based project for filtering toxic or inappropriate language in comments related to professor grading.',
    url: 'https://github.com/ShowSerenity/grade-your-prof-nlp'
  },
  {
    id: 4,
    title: 'World Cuisines Website',
    category: 'Web',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80',
    description:
      'One of my first projects built with HTML, CSS, and Bootstrap to showcase cuisines from different countries.',
    url: 'https://github.com/ShowSerenity/website'
  },
  {
    id: 5,
    title: 'Heart Failure Prediction',
    category: 'ML',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=80',
    description:
      'Machine learning project that compares five models on clinical patient data to predict heart failure risk.',
    url: 'https://github.com/ShowSerenity/Heart_Failure_Prediction'
  },
  {
    id: 6,
    title: 'Smart Homes Energy Forecasting',
    category: 'ML',
    image: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&w=1400&q=80',
    description:
      'Forecasting project for smart-home energy consumption using weather-related features and predictive modeling.',
    url: 'https://github.com/ShowSerenity/Energy-Consumption-Forecasting-in-Smart-Homes-with-Weather'
  },
  {
    id: 7,
    title: 'Appliances Energy Prediction',
    category: 'ML',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80',
    description:
      'Energy prediction project with multiple experimental branches, including model comparison, MLP/DNN, LSTM, CNN, and autoencoder approaches.',
    url: 'https://github.com/ShowSerenity/Appliances-Energy-Prediction'
  }
];

export const contactItems: ContactLink[] = [
  {
    value: '+7 (778) 268-8838',
    href: 'tel:+77782688838',
    icon: faPhone
  },
  {
    value: 'asanali.rymgali@gmail.com',
    href: 'mailto:asanali.rymgali@gmail.com',
    icon: faEnvelope
  },
  {
    value: 'Astana, Kazakhstan',
    href: 'https://maps.google.com/?q=Astana,+Kazakhstan',
    icon: faLocationDot
  },
  {
    label: 'Telegram',
    value: '@Saltild',
    href: 'https://t.me/Saltild',
    icon: faTelegramPlane
  },
  {
    label: 'GitHub',
    value: 'github.com/ShowSerenity',
    href: 'https://github.com/ShowSerenity',
    icon: faGithub
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/assanali-rymgali-b7436a27a',
    href: 'https://www.linkedin.com/in/assanali-rymgali-b7436a27a/',
    icon: faLinkedinIn
  }
];

export const feedbackItems: FeedbackItem[] = [
  {
    feedback:
      'Assanali is a dependable and fast-learning developer who approaches tasks seriously and always tries to improve both the code and the final user experience.',
    reporter: {
      photoUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
      name: 'Project Supervisor',
      citeUrl: 'https://www.citeexample.com'
    }
  },
  {
    feedback:
      'He quickly adapts to new requirements, communicates clearly during collaboration, and shows strong motivation in both frontend and technical problem-solving tasks.',
    reporter: {
      photoUrl:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      name: 'Team Colleague',
      citeUrl: 'https://www.citeexample.com'
    }
  },
  {
    feedback:
      'He quickly adapts to new requirements, communicates clearly during collaboration, and shows strong motivation in both frontend and technical problem-solving tasks.',
    reporter: {
      photoUrl:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      name: 'Team Colleague',
      citeUrl: 'https://www.citeexample.com'
    }
  }
];
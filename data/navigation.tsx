import {
  ProjectType,
  ProjectTypeLabels,
  SITE_OWNER_EMAIL,
  SITE_OWNER_GITHUB,
  SITE_OWNER_LINKEDIN,
} from '@/data/constants';
import {
  Code,
  Download,
  FileText,
  FileUser,
  Gamepad2,
  Github,
  Globe,
  Home,
  Linkedin,
  Mail,
  MonitorSmartphone,
} from 'lucide-react';
import { ReactNode } from 'react';

export interface NavItem {
  icon: ReactNode;
  label: string;
  href: string;
  onClick?: () => void;
}

export interface TabItem extends NavItem {
  value: string;
}

export const feedItems: NavItem[] = [
  { icon: <Home className="h-5 w-5" />, label: 'Home', href: '/' },
  {
    icon: <FileUser className="h-5 w-5" />,
    label: 'Resume',
    href: '/resume',
  },
];

export const communityItems: TabItem[] = [
  {
    icon: <Globe className="h-5 w-5" />,
    label: ProjectTypeLabels[ProjectType.ALL],
    value: ProjectType.ALL,
    href: '#',
  },
  {
    icon: <Code className="h-5 w-5" />,
    label: ProjectTypeLabels[ProjectType.WEB],
    value: ProjectType.WEB,
    href: '#',
  },
  {
    icon: <Gamepad2 className="h-5 w-5" />,
    label: ProjectTypeLabels[ProjectType.GAME],
    value: ProjectType.GAME,
    href: '#',
  },
];

export const resumeItems: TabItem[] = [
  {
    icon: <MonitorSmartphone className="h-5 w-5" />,
    label: 'r/html',
    value: 'html',
    href: '#',
  },
  {
    icon: <FileText className="h-5 w-5" />,
    label: 'r/pdf',
    value: 'pdf',
    href: '#',
  },
];

export const resourceItems: NavItem[] = [
  {
    icon: <Mail className="h-5 w-5" />,
    label: 'Email',
    href: `mailto:${SITE_OWNER_EMAIL}`,
  },
  {
    icon: <Github className="h-5 w-5" />,
    label: 'GitHub',
    href: SITE_OWNER_GITHUB,
  },
  {
    icon: <Linkedin className="h-5 w-5" />,
    label: 'LinkedIn',
    href: SITE_OWNER_LINKEDIN,
  },
  {
    icon: <Download className="h-5 w-5" />,
    label: 'Download Resume',
    href: '#',
    onClick: () => {
      const link = document.createElement('a');
      link.href = '/jeffreypolasz-resume.pdf';
      link.download = 'jeffreypolasz-resume.pdf';
      link.click();
    },
  },
];

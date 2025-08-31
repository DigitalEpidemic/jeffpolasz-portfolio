import {
  Code,
  FileText,
  Gamepad2,
  Globe,
  MonitorSmartphone,
} from 'lucide-react';

const ICON_MAP = {
  Globe,
  Code,
  Gamepad2,
  MonitorSmartphone,
  FileText,
} as const;

export function getIconComponent(
  iconName: keyof typeof ICON_MAP,
  className: string = 'h-4 w-4'
) {
  const IconComponent = ICON_MAP[iconName];
  if (!IconComponent) {
    console.warn(`Icon "${iconName}" not found in icon map`);
    return null;
  }
  return <IconComponent className={className} />;
}

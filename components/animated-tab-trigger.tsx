'use client';

import { TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';

interface AnimatedTabTriggerProps {
  label: string;
  icon: React.ReactNode;
  value: string;
  onClick?: () => void;
}

export function AnimatedTabTrigger({
  label,
  icon,
  value,
  onClick,
}: AnimatedTabTriggerProps) {
  return (
    <motion.div whileHover="hover" initial="initial" animate="initial">
      <TabsTrigger className="w-full" value={value} onClick={onClick}>
        <motion.span
          className="inline-block"
          variants={{
            initial: { scale: 1 },
            hover: { scale: 1.25 },
          }}
        >
          {icon}
        </motion.span>
        {label}
      </TabsTrigger>
    </motion.div>
  );
}

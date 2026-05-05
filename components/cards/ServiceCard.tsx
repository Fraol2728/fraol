"use client";

import { motion } from "framer-motion";
import { Camera, Code2, Layers, Palette, Sparkles, Zap } from "lucide-react";

type Service = {
  _id: string;
  title: string;
  description?: string;
  icon?: string;
  features?: string[];
};

type ServiceCardProps = {
  service: Service;
  delay?: number;
};

const iconMap = {
  design: Palette,
  web: Code2,
  branding: Layers,
  motion: Zap,
  photo: Camera,
} as const;

export default function ServiceCard({ service, delay = 0 }: ServiceCardProps) {
  const Icon = iconMap[service.icon as keyof typeof iconMap] ?? Sparkles;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay }}
      whileHover={{ scale: 1.02 }}
      className="group rounded-2xl border border-l-4 border-[#1f1f1f] bg-[#111111] p-8 transition-all duration-300 hover:border-l-[#c9ff47] hover:bg-[#161616]"
    >
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-[#1f1f1f] bg-[#0d0d0d]">
        <Icon className="h-7 w-7 text-[#c9ff47]" />
      </div>

      <h3 className="text-[20px] font-bold text-white">{service.title}</h3>
      <p className="mt-2 text-sm text-[#666666]">{service.description}</p>

      <ul className="mt-5 space-y-2">
        {(service.features ?? []).map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-[13px] text-[#999999]">
            <span className="mt-0.5 text-[#c9ff47]">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

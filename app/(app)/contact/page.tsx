import { Clock3, Globe, Linkedin, Mail, MapPin, Dribbble, Github, Twitter } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";

export const metadata = {
  title: "Contact | Portfolio",
  description: "Get in touch — let's build something amazing together",
};

const items = [
  { icon: Mail, label: "Email", value: "your@email.com" },
  { icon: MapPin, label: "Location", value: "Addis Ababa, Ethiopia" },
  { icon: Clock3, label: "Hours", value: "Mon–Fri, 9AM–6PM EAT" },
  { icon: Globe, label: "Work Mode", value: "Available for remote work worldwide" },
];

export default function ContactPage() {
  return <main className="bg-[#080808] text-white"><section className="flex min-h-[40vh] items-center justify-center bg-[#0a0a0a] px-6 text-center"><div><p className="mb-4 text-sm tracking-[0.35em] text-[#999]"><span className="mx-3">—</span>GET IN TOUCH<span className="mx-3">—</span></p><h1 className="text-5xl font-black md:text-7xl">Let&apos;s <span className="text-[#c9ff47]">Talk</span></h1><p className="mx-auto mt-4 max-w-xl text-[#a3a3a3]">Have a project in mind or just want to say hello? I&apos;d love to hear from you.</p></div></section>
  <section className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-16 lg:grid-cols-[45%_55%]"><div><h2 className="mb-5 text-2xl font-bold">Contact Information</h2><div className="space-y-4">{items.map(({icon:Icon,label,value})=><div key={label} className="rounded-xl border border-[#1f1f1f] bg-[#0d0d0d] p-4"><div className="mb-1 flex items-center gap-3 text-[#999]"><Icon className="h-4 w-4 text-[#c9ff47]" />{label}</div><p className="font-medium">{value}</p></div>)}</div><div className="mt-6 rounded-xl border border-[#1f1f1f] bg-[#111111] p-6"><p className="flex items-center gap-3 font-semibold"><span className="h-2.5 w-2.5 animate-pulse rounded-full bg-lime-400" />Currently Available for Projects</p><p className="mt-2 text-sm text-[#999]">Taking on new clients for Q1 2025</p></div><div className="mt-6"><h3 className="mb-3 text-lg font-semibold">Find me on</h3><div className="flex gap-3">{[{I:Github,h:"#"},{I:Linkedin,h:"#"},{I:Twitter,h:"#"},{I:Dribbble,h:"#"}].map(({I,h},idx)=><a key={idx} href={h} className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[#1f1f1f] transition hover:border-[#c9ff47]"><I className="h-5 w-5" /></a>)}</div></div></div><ContactForm /></section></main>;
}

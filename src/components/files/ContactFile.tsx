'use client';
import { motion, Variants } from 'framer-motion';
import { FaGlobe, FaEnvelope, FaLinkedin, FaGithub, FaCode, FaInstagram } from 'react-icons/fa';
import React from 'react';

const socialLinks = [
  { platform: "Email", url: "madhuriyeggoni@gmail.com", href: "mailto:madhuriyeggoni@gmail.com", icon: FaEnvelope, color: "#4fc1ff" },
  { platform: "LinkedIn", url: "linkedin.com/in/Madhuri-yeggoni", href: "https://linkedin.com/in/Madhuri-yeggoni", icon: FaLinkedin, color: "#0077b5" },
  { platform: "GitHub", url: "github.com/madhuriyeggoni", href: "https://github.com/madhuriyeggoni", icon: FaGithub, color: "#d4d4d4" },
  { platform: "Instagram", url: "instagram.com/madhuriiiiii_royal", href: "https://www.instagram.com/madhuriiiiii_royal/", icon: FaInstagram, color: "#E1306C" }
];

export default function ContactFile({ hasBeenOpened }: { hasBeenOpened: boolean }) {
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("https://formsubmit.co/ajax/madhuriyeggoni@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const container: Variants = {
    hidden: { opacity: hasBeenOpened ? 1 : 0 },
    visible: { opacity: 1, transition: { staggerChildren: hasBeenOpened ? 0 : 0.1 } }
  };

  const itemVariant: Variants = {
    hidden: { opacity: hasBeenOpened ? 1 : 0, y: hasBeenOpened ? 0 : 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  const dly = (n: number) => hasBeenOpened ? 0 : n;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="contact-page font-mono flex flex-col gap-8 w-full h-full overflow-y-auto p-6 max-w-5xl mx-auto custom-scrollbar bg-[#1e1e1e]"
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: dly(0.1) }}
        className="contact-header flex flex-col gap-2"
      >
        <div className="code-line text-[#6A9955] text-sm">{"/* contact.css — let's build something */"}</div>
        <h1 className="heading-font text-4xl md:text-5xl font-bold text-white tracking-tight">Contact</h1>
        <p className="subtitle text-[#858585] mt-1">{'// open to work, collabs & good conversations'}</p>
      </motion.div>

      <motion.div
        initial={hasBeenOpened ? "visible" : "hidden"}
        animate="visible"
        variants={container}
        className="contact-grid grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 pb-8"
      >
        <motion.div variants={itemVariant} className="left-section flex flex-col gap-4">
          <h2 className="subheading-font text-[#4fc1ff] text-xl font-bold mb-2 uppercase tracking-widest border-b border-[#333] pb-2">
            FIND ME ON
          </h2>

          <div className="flex flex-col gap-3">
            {socialLinks.map((social, idx) => {
              const Icon = social.icon;
              return (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center p-3 bg-[#252526] border border-[#333] rounded-lg transition-all group hover:shadow-lg"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = social.color;
                    e.currentTarget.style.backgroundColor = `${social.color}15`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#333";
                    e.currentTarget.style.backgroundColor = "#252526";
                  }}
                >
                  <div className="icon flex items-center justify-center p-2 rounded-md bg-[#1e1e1e] border border-[#3c3c3c] mr-4 group-hover:scale-110 transition-transform">
                    <Icon size={20} color={social.color} />
                  </div>
                  <div className="flex flex-col">
                    <span
                      className="font-bold text-[#e0e0e0] transition-colors"
                      onMouseEnter={(e) => (e.currentTarget.style.color = social.color)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#e0e0e0")}
                    >
                      {social.platform}
                    </span>
                    <span className="text-xs text-[#858585]">{social.url}</span>
                  </div>
                </a>
              );
            })}
          </div>
        </motion.div>

        <motion.div variants={itemVariant} className="right-section flex flex-col gap-4">
          <h2 className="subheading-font text-[#4fc1ff] text-xl font-bold mb-2 uppercase tracking-widest border-b border-[#333] pb-2">
            SEND A MESSAGE
          </h2>

          <form className="flex flex-col gap-5 bg-[#252526] p-6 rounded-lg border border-[#333]" onSubmit={handleSubmit}>
            <input type="hidden" name="_captcha" value="false" />

            <div className="flex flex-col gap-1">
              <label className="text-[#6A9955] text-xs mb-1">{'// YOUR_NAME *'}</label>
              <input
                type="text"
                name="name"
                placeholder='"string"'
                required
                disabled={status === "loading"}
                className="bg-[#1e1e1e] border border-[#3c3c3c] rounded p-2.5 text-[#cccccc] font-mono text-sm focus:outline-none focus:border-[#4fc1ff] focus:shadow-[0_0_8px_rgba(79,193,255,0.15)] transition-all placeholder:text-[#555] disabled:opacity-50"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[#6A9955] text-xs mb-1">{'// YOUR_EMAIL *'}</label>
              <input
                type="email"
                name="email"
                placeholder='"string"'
                required
                disabled={status === "loading"}
                className="bg-[#1e1e1e] border border-[#3c3c3c] rounded p-2.5 text-[#cccccc] font-mono text-sm focus:outline-none focus:border-[#4fc1ff] focus:shadow-[0_0_8px_rgba(79,193,255,0.15)] transition-all placeholder:text-[#555] disabled:opacity-50"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[#6A9955] text-xs mb-1">{'// SUBJECT'}</label>
              <input
                type="text"
                name="_subject"
                placeholder='"string"'
                disabled={status === "loading"}
                className="bg-[#1e1e1e] border border-[#3c3c3c] rounded p-2.5 text-[#cccccc] font-mono text-sm focus:outline-none focus:border-[#4fc1ff] focus:shadow-[0_0_8px_rgba(79,193,255,0.15)] transition-all placeholder:text-[#555] disabled:opacity-50"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[#6A9955] text-xs mb-1">{'// MESSAGE *'}</label>
              <textarea
                name="message"
                placeholder='"your message"'
                required
                rows={4}
                disabled={status === "loading"}
                className="bg-[#1e1e1e] border border-[#3c3c3c] rounded p-2.5 text-[#cccccc] font-mono text-sm focus:outline-none focus:border-[#4fc1ff] focus:shadow-[0_0_8px_rgba(79,193,255,0.15)] transition-all resize-y placeholder:text-[#555] custom-scrollbar disabled:opacity-50"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="mt-2 w-full py-3 bg-[#0e639c] hover:bg-[#1177bb] disabled:bg-[#333] disabled:text-[#858585] text-white font-mono font-bold rounded flex justify-center items-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-[#4fc1ff] focus:ring-offset-2 focus:ring-offset-[#252526] cursor-pointer"
            >
              {status === "loading" ? (
                <span>Sending...</span>
              ) : status === "success" ? (
                <span className="text-[#6A9955]">Message Sent!</span>
              ) : status === "error" ? (
                <span className="text-[#f44336]">Error. Try Again.</span>
              ) : (
                <>
                  <span className="text-[#4fc1ff]">→</span> send_message()
                </>
              )}
            </button>

            <p className="text-center text-[10px] text-[#858585] mt-2">
              {'// Powered by FormSubmit (lands directly in madhuriyeggoni@gmail.com)'}
            </p>
          </form>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  motion,
  type MotionValue,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { useTheme } from "next-themes";
import { clsx } from "clsx";
import {
  FiArrowUpRight,
  FiLinkedin,
  FiTwitter,
  FiGithub,
  FiMoon,
  FiSun,
} from "react-icons/fi";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.2,
  });

  const glowTranslate = useTransform(smoothProgress, [0, 1], [0, -220]);
  const smallGlowTranslate = useTransform(smoothProgress, [0, 1], [0, -160]);

  const EMAIL_PATTERN =
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const navItems = useMemo(
    () => [
      { label: "About Us", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Case Studies", href: "#cases" },
      { label: "Blog", href: "#blog" },
      { label: "Contact", href: "#contact" },
    ],
    [],
  );

  const services = useMemo(
    () => [
      {
        title: "AI Consulting",
        description:
          "End-to-end AI strategy, capability roadmapping, and technical due diligence for leadership teams.",
        metrics: ["Vision to roadmap", "Foundational governance", "Team enablement"],
      },
      {
        title: "AI Agents",
        description:
          "Deploy task-specific autonomous agents that integrate with your stack and deliver measurable outcomes.",
        metrics: ["Multi-agent orchestration", "Realtime reasoning", "Secure integrations"],
      },
      {
        title: "Automations",
        description:
          "Design resilient AI-driven workflows that eliminate manual toil and accelerate throughput.",
        metrics: ["Process mining", "Automated QA", "Human-in-the-loop"],
      },
      {
        title: "AI Content",
        description:
          "Own your brand voice at scale with content systems powered by alignment tuning and editorial guardrails.",
        metrics: ["Voice cloning", "Content QA", "Multi-channel delivery"],
      },
      {
        title: "AI Web Development",
        description:
          "Ship performant web experiences that leverage AI personalization, search, and multimodal understanding.",
        metrics: ["Cognitive UX", "Semantic search", "Generative UI"],
      },
    ],
    [],
  );

  const caseStudies = useMemo(
    () => [
      {
        client: "Vanta Labs",
        impact: "72% lift in onboarding conversions",
        snippet:
          "Designed an agentic onboarding concierge orchestrating product education and tailored integrations.",
        tags: ["Agents", "Product-led growth"],
      },
      {
        client: "Nova Media",
        impact: "4.5x faster content pipelines",
        snippet:
          "Implemented editorial AI stack with automated research, voice aligned drafting, and QA guardrails.",
        tags: ["Content", "Automation"],
      },
      {
        client: "Helix Fintech",
        impact: "$3.2M operational savings",
        snippet:
          "Modernized risk workflows via retrieval-augmented copilots for analysts and automated compliance reporting.",
        tags: ["RAG", "Automation"],
      },
    ],
    [],
  );

  const blogPosts = useMemo(
    () => [
      {
        title: "Designing Trustworthy AI Agents",
        description:
          "Principles for shipping agents that balance autonomy with enterprise-grade control surfaces.",
        date: "Jan 14, 2025",
      },
      {
        title: "How to Operationalize RAG in Production",
        description:
          "Architecture patterns our team uses to deploy resilient retrieval augmented generation systems.",
        date: "Dec 02, 2024",
      },
      {
        title: "Automation Playbooks for RevOps",
        description:
          "High-leverage workflows that compound sales velocity without compromising human relationships.",
        date: "Nov 18, 2024",
      },
    ],
    [],
  );

  const socialLinks = useMemo(
    () => [
      {
        label: "LinkedIn",
        href: "https://linkedin.com",
        icon: <FiLinkedin />,
      },
      {
        label: "X (Twitter)",
        href: "https://x.com",
        icon: <FiTwitter />,
      },
      {
        label: "GitHub",
        href: "https://github.com",
        icon: <FiGithub />,
      },
    ],
    [],
  );

  const isDark = theme === "dark" || (!mounted && true);

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "We need your email to respond.";
    } else if (!EMAIL_PATTERN.test(formData.email.trim())) {
      newErrors.email = "Use a valid email address.";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Share a bit about your goals.";
    }
    return newErrors;
  };

  const clearFieldError = (field: string, value?: string) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const content = value ?? formData[field as keyof typeof formData] ?? "";
      const trimmed =
        typeof content === "string" ? content.trim() : String(content);
      if (!trimmed) return prev;
      if (field === "email" && !EMAIL_PATTERN.test(trimmed)) {
        return prev;
      }
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length === 0) {
      setSubmitted(true);
      // Simulate sending by clearing after delay to keep UX responsive
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          company: "",
          message: "",
        });
      }, 300);
    } else {
      setSubmitted(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <motion.span
        aria-hidden
        className="fixed inset-x-0 top-0 z-40 h-0.5 bg-gradient-to-r from-purple-500/80 via-violet-400/70 to-sky-300/80"
        style={{ scaleX: smoothProgress, transformOrigin: "0% 50%" }}
      />
      <DecorativeBackground
        glowTranslate={glowTranslate}
        smallGlowTranslate={smallGlowTranslate}
      />
      <header className="sticky top-0 z-30 backdrop-blur-xl transition bg-transparent">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5 md:px-8">
          <Link
            href="/"
            className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.35em] text-purple-200"
          >
            <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-full bg-purple-500/20">
              <span className="absolute h-10 w-10 animate-[pulse_6s_ease-in-out_infinite] rounded-full bg-purple-500/50 blur-xl" />
              <span className="relative text-lg font-bold text-purple-100">
                E
              </span>
            </span>
            Evo
          </Link>
          <nav
            aria-label="Primary"
            className="hidden items-center gap-8 text-sm font-medium text-slate-200 md:flex"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="relative transition hover:text-white"
              >
                {item.label}
                <span className="absolute inset-x-0 bottom-[-10px] h-[2px] origin-center scale-x-0 rounded-lg bg-emerald-300/70 transition-transform duration-300 ease-out hover:scale-x-100" />
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg text-purple-100 transition hover:border-white/20 hover:bg-white/10"
            >
              {isDark ? <FiSun /> : <FiMoon />}
            </button>
            <a
              href="#contact"
              className="hidden rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-sky-400 px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_60px_rgba(134,89,255,0.35)] transition hover:shadow-[0_22px_70px_rgba(134,89,255,0.45)] md:inline-flex"
            >
              Get a Free Consultation
            </a>
          </div>
        </div>
      </header>

      <nav
        aria-label="Primary mobile"
        className="mx-auto mt-[-12px] flex w-full max-w-6xl items-center gap-4 overflow-x-auto px-6 pb-4 text-xs font-medium text-slate-200 md:hidden"
      >
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex-shrink-0 rounded-full border border-white/10 bg-white/5 px-4 py-2 uppercase tracking-[0.25em] transition hover:border-emerald-300/60 hover:text-white"
          >
            {item.label}
          </a>
        ))}
      </nav>

      <main className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 pb-24 md:px-8">
        <Hero />

        <section id="about" className="relative mt-28 md:mt-32">
          <SectionHeader
            overline="Why Evo"
            title="We craft intelligent systems that compound."
            description="From discovery to deployment, Evo embeds with your teams to design, build, and scale AI capabilities that generate real traction."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="glass-card relative overflow-hidden rounded-3xl p-10 text-sm leading-relaxed text-slate-200"
            >
              <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-purple-500/30 blur-3xl" />
              <p className="text-lg font-medium text-white md:text-xl">
                Evo builds AI leverage for modern operators.
              </p>
              <ul className="mt-7 grid gap-4 text-base text-slate-200 md:grid-cols-2">
                <li className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <span className="text-sm uppercase tracking-[0.2em] text-emerald-300">
                    Strategize
                  </span>
                  <p className="mt-2 text-slate-100">
                    Stakeholder alignment workshops and executive-ready roadmaps.
                  </p>
                </li>
                <li className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <span className="text-sm uppercase tracking-[0.2em] text-sky-300">
                    Build
                  </span>
                  <p className="mt-2 text-slate-100">
                    Rapid experimentation, guardrailed deployments, and scalable architectures.
                  </p>
                </li>
                <li className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <span className="text-sm uppercase tracking-[0.2em] text-fuchsia-300">
                    Automate
                  </span>
                  <p className="mt-2 text-slate-100">
                    Intelligent workflows, observability dashboards, and continuous optimization.
                  </p>
                </li>
                <li className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <span className="text-sm uppercase tracking-[0.2em] text-purple-300">
                    Upskill
                  </span>
                  <p className="mt-2 text-slate-100">
                    Embedded enablement, documentation, and change management that sticks.
                  </p>
                </li>
              </ul>
            </motion.article>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
              className="glass-card flex flex-col justify-between rounded-3xl p-10 text-slate-100"
            >
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-purple-200">
                  Impact Snapshot
                </p>
                <h3 className="mt-6 text-3xl font-semibold text-white">
                  35+ enterprise launches
                </h3>
                <p className="mt-4 text-base text-slate-200/80">
                  From AI copilots to complex agentic ecosystems, Evo teams have
                  shipped production-grade solutions across fintech, media,
                  health, and B2B SaaS.
                </p>
              </div>
              <dl className="mt-10 grid gap-6 rounded-2xl border border-white/10 bg-slate-900/60 p-6 text-sm text-slate-200">
                <div className="flex items-center justify-between">
                  <dt>Average time-to-value</dt>
                  <dd className="text-lg font-semibold text-emerald-300">
                    6 weeks
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt>Net retention across retainer clients</dt>
                  <dd className="text-lg font-semibold text-sky-300">
                    143%
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt>Preferred client partnership model</dt>
                  <dd className="text-lg font-semibold text-purple-300">
                    Embedded pods
                  </dd>
                </div>
              </dl>
            </motion.div>
          </div>
        </section>

        <section id="services" className="relative mt-28 md:mt-32">
          <SectionHeader
            overline="Services"
            title="Orchestrated teams for every phase of AI maturity."
            description="We combine strategy, engineering, design, and change management to move critical AI initiatives from deck to deployment."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {services.map((service, index) => (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="glass-card group relative overflow-hidden rounded-3xl border border-white/10 bg-white/10 p-8 transition hover:border-emerald-300/40 hover:bg-white/15"
              >
                <div className="absolute -right-14 -top-14 h-32 w-32 rounded-full bg-purple-500/20 blur-3xl transition group-hover:bg-purple-400/30" />
                <h3 className="text-xl font-semibold text-white">
                  {service.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-200">
                  {service.description}
                </p>
                <ul className="mt-6 flex flex-wrap gap-3 text-xs uppercase tracking-[0.24em] text-purple-200">
                  {service.metrics.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-purple-300/20 bg-purple-500/10 px-4 py-1"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="cases" className="relative mt-28 md:mt-32">
          <SectionHeader
            overline="Case Studies"
            title="Transformations engineered with Evo."
            description="We co-create with leaders who expect strategic depth, technical rigor, and measurable outcomes."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {caseStudies.map((item, index) => (
              <motion.article
                key={item.client}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className="glass-card relative flex h-full flex-col rounded-3xl border border-white/10 bg-slate-900/70 p-8"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">
                    {item.client}
                  </h3>
                  <span className="rounded-full border border-purple-300/30 bg-purple-400/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-purple-100">
                    Impact
                  </span>
                </div>
                <p className="mt-4 text-2xl font-semibold text-emerald-300">
                  {item.impact}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-slate-200">
                  {item.snippet}
                </p>
                <div className="mt-auto flex flex-wrap gap-2 pt-6 text-xs uppercase tracking-[0.22em] text-slate-300">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/10 px-3 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="blog" className="relative mt-28 md:mt-32">
          <SectionHeader
            overline="Insights"
            title="Patterns from the frontier."
            description="Practical guidance from teams scaling AI across product, revenue, and operations."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="group flex flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-7 text-slate-100 backdrop-blur-lg transition hover:border-emerald-200/40 hover:bg-white/10"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-purple-200">
                    {post.date}
                  </p>
                  <h3 className="mt-5 text-xl font-semibold text-white">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-200">
                    {post.description}
                  </p>
                </div>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-300">
                  Read the play
                  <FiArrowUpRight className="transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </motion.article>
            ))}
          </div>
        </section>

        <section
          id="contact"
          className="relative mt-28 md:mt-36"
          aria-labelledby="contact-heading"
        >
          <SectionHeader
            overline="Let's build"
            title="We co-design the future of your AI advantage."
            description="Share your objectives and we'll assemble the right pod to accelerate your roadmap."
          />
          <div className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="glass-card relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-10"
            >
              <div className="absolute -right-24 top-0 h-48 w-48 rounded-full bg-purple-500/30 blur-3xl" />
              <p className="text-sm uppercase tracking-[0.28em] text-emerald-300">
                Partnership Models
              </p>
              <ul className="mt-6 space-y-6 text-sm leading-relaxed text-slate-200">
                <li className="flex gap-4">
                  <span className="mt-1 h-2 w-2 rounded-full bg-emerald-300" />
                  Embedded pods that integrate daily with product and ops teams.
                </li>
                <li className="flex gap-4">
                  <span className="mt-1 h-2 w-2 rounded-full bg-purple-300" />
                  Strategic sprints to unlock clarity on AI investments and ROI.
                </li>
                <li className="flex gap-4">
                  <span className="mt-1 h-2 w-2 rounded-full bg-sky-300" />
                  Venture partnerships with AI-native startups to accelerate launches.
                </li>
              </ul>
              <p className="mt-10 text-base font-medium text-white">
                Need immediate momentum?
              </p>
              <Link
                href="mailto:hello@evo.ai"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 transition hover:text-emerald-200"
              >
                hello@evo.ai
                <FiArrowUpRight />
              </Link>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="rounded-3xl border border-white/10 bg-white/10 p-10 text-slate-100 backdrop-blur-xl"
              onSubmit={handleSubmit}
              noValidate
              aria-labelledby="contact-heading"
            >
              <h3
                id="contact-heading"
                className="text-2xl font-semibold text-white"
              >
                Tell us about your initiative
              </h3>
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                <InputField
                  label="Full Name"
                  id="name"
                  type="text"
                  value={formData.name}
                  placeholder="Alex Doe"
                  error={errors.name}
                  onChange={(value) => {
                    setFormData((prev) => ({ ...prev, name: value }));
                    clearFieldError("name", value);
                  }}
                  required
                />
                <InputField
                  label="Work Email"
                  id="email"
                  type="email"
                  value={formData.email}
                  placeholder="alex@company.com"
                  error={errors.email}
                  onChange={(value) => {
                    setFormData((prev) => ({ ...prev, email: value }));
                    clearFieldError("email", value);
                  }}
                  required
                />
              </div>
              <InputField
                className="mt-5"
                label="Company"
                id="company"
                type="text"
                value={formData.company}
                placeholder="Evo"
                error={errors.company}
                onChange={(value) => {
                  setFormData((prev) => ({ ...prev, company: value }));
                  clearFieldError("company", value);
                }}
              />
              <div className="mt-5">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-slate-100"
                >
                  What should we explore together?
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={(event) =>
                    setFormData((prev) => {
                      const value = event.target.value;
                      clearFieldError("message", value);
                      return {
                        ...prev,
                        message: value,
                      };
                    })
                  }
                  placeholder="Share use cases, goals, or success metrics."
                  className={clsx(
                    "mt-2 w-full resize-y rounded-2xl border border-white/15 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-300/60",
                    errors.message && "border-red-400/70 focus:ring-red-300/50",
                  )}
                  required
                />
                {errors.message && (
                  <p className="mt-2 text-xs text-red-300">{errors.message}</p>
                )}
              </div>
              <button
                type="submit"
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-emerald-400 px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_50px_rgba(170,108,255,0.4)] transition hover:shadow-[0_20px_60px_rgba(170,108,255,0.55)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
              >
                Submit Request
                <FiArrowUpRight className="text-base" />
              </button>
              {submitted && (
                <p
                  role="status"
                  className="mt-4 text-sm font-medium text-emerald-300"
                >
                  Thanks — our team will reach out within one business day.
                </p>
              )}
            </motion.form>
          </div>
        </section>
      </main>

      <footer className="relative border-t border-white/10 bg-black/30">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10 text-sm text-slate-300 md:flex-row md:items-center md:justify-between md:px-8">
          <div>
            <p className="text-lg font-semibold text-white">Evo Consulting</p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-300">
              Strategic AI partners for venture-backed startups and enterprise
              operators scaling intelligent systems.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-lg text-white transition hover:border-emerald-300/60 hover:text-emerald-200"
              >
                <span className="sr-only">{link.label}</span>
                {link.icon}
              </a>
            ))}
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 text-xs text-slate-500 md:px-8">
            <p>© {new Date().getFullYear()} Evo Consulting • All rights reserved.</p>
            <a
              href="https://agentic-aa5ac43c.vercel.app"
              className="text-emerald-300 transition hover:text-emerald-200"
            >
              agentic-aa5ac43c.vercel.app
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

type SectionHeaderProps = {
  overline: string;
  title: string;
  description: string;
};

function SectionHeader({ overline, title, description }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45 }}
      className="max-w-3xl"
    >
      <p className="text-xs uppercase tracking-[0.35em] text-purple-200">
        {overline}
      </p>
      <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base text-slate-200">{description}</p>
    </motion.div>
  );
}

type InputFieldProps = {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  className?: string;
};

function InputField({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  required,
  className,
}: InputFieldProps) {
  return (
    <div className={clsx("flex flex-col", className)}>
      <label htmlFor={id} className="text-sm font-medium text-slate-100">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        className={clsx(
          "mt-2 rounded-2xl border border-white/15 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-300/60",
          error && "border-red-400/70 focus:ring-red-300/50",
        )}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p id={`${id}-error`} className="mt-2 text-xs text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}

const heroText = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
};

function Hero() {
  return (
    <section
      id="hero"
      className="relative mt-20 grid gap-12 rounded-[32px] border border-white/10 bg-white/5 px-8 py-16 text-slate-100 shadow-[0_30px_80px_rgba(27,15,65,0.45)] backdrop-blur-2xl md:grid-cols-[1.15fr_0.85fr] md:px-12 md:py-20"
    >
      <div className="absolute -left-52 top-1/2 hidden h-[520px] w-[520px] -translate-y-1/2 rounded-full bg-purple-500/30 blur-3xl md:block" />
      <motion.div
        variants={heroText}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="relative z-10"
      >
        <p className="text-xs uppercase tracking-[0.35em] text-purple-200">
          Consulting AI Agency
        </p>
        <h1 className="mt-6 text-4xl font-semibold leading-[1.1] text-white md:text-5xl lg:text-6xl">
          Architect your edge with agentic AI systems.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-200">
          Evo partners with teams ready to operationalize AI. We identify the
          sharpest opportunities, ship production-grade agents, and automate
          workflows that unlock compounding leverage.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-sky-400 px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_60px_rgba(130,86,255,0.4)] transition hover:shadow-[0_22px_70px_rgba(130,86,255,0.55)]"
          >
            Get a Free Consultation
            <FiArrowUpRight className="text-base" />
          </a>
          <a
            href="#services"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:border-emerald-200/70 hover:bg-white/20"
          >
            Explore Services
          </a>
        </div>
        <dl className="mt-10 grid gap-6 sm:grid-cols-3">
          <div>
            <dt className="text-xs uppercase tracking-[0.3em] text-emerald-300">
              Avg ROI
            </dt>
            <dd className="mt-3 text-2xl font-semibold text-white">
              5.4x
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.3em] text-purple-200">
              Lead time
            </dt>
            <dd className="mt-3 text-2xl font-semibold text-white">
              18 days
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.3em] text-sky-200">
              Satisfaction
            </dt>
            <dd className="mt-3 text-2xl font-semibold text-white">
              96%
            </dd>
          </div>
        </dl>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        className="relative z-10 flex flex-col justify-between rounded-3xl border border-purple-300/20 bg-gradient-to-br from-fuchsia-500/30 via-purple-700/20 to-indigo-900/30 p-8"
      >
        <div className="space-y-6 text-sm text-slate-100">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-purple-100">
              Why now
            </p>
            <p className="mt-2 leading-relaxed text-slate-100/90">
              Agentic AI is reshaping product experiences and operations.
              Winning organizations pair bold vision with disciplined delivery.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-purple-100">
              Our edge
            </p>
            <p className="mt-2 leading-relaxed text-slate-100/90">
              Multi-disciplinary pods, treated as extensions of your team, with
              a bias towards measurable outcomes and responsible deployment.
            </p>
          </div>
        </div>

        <ul className="mt-10 space-y-3 text-sm text-slate-100">
          {[
            "Retained thought partnership with executives",
            "Rapid prototyping labs with production hand-off",
            "Compliance-aware AI governance frameworks",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-2.5 w-2.5 flex-shrink-0 rounded-full bg-emerald-300" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}

type DecorativeBackgroundProps = {
  glowTranslate: MotionValue<number>;
  smallGlowTranslate: MotionValue<number>;
};

function DecorativeBackground({
  glowTranslate,
  smallGlowTranslate,
}: DecorativeBackgroundProps) {
  const mirroredGlow = useTransform(glowTranslate, (value) => value * -0.6);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <motion.div
        className="absolute left-1/2 top-[-10%] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-purple-500/30 blur-3xl"
        style={{ y: glowTranslate }}
      />
      <motion.div
        className="absolute left-[12%] top-[40%] h-[420px] w-[420px] rounded-full bg-fuchsia-500/25 blur-3xl"
        style={{ y: smallGlowTranslate }}
      />
      <motion.div
        className="absolute right-[8%] top-[65%] h-[460px] w-[460px] rounded-full bg-sky-400/25 blur-3xl"
        style={{ y: mirroredGlow }}
      />
    </div>
  );
}

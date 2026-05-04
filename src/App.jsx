import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import './index.css'

// Reusable scroll-reveal wrapper
function Reveal({ children, delay = 0, direction = 'up', className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 32 : direction === 'down' ? -32 : 0,
      x: direction === 'left' ? -28 : direction === 'right' ? 28 : 0,
    },
    visible: { opacity: 1, y: 0, x: 0 },
  }
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}

// Custom cursor
function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 })
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const onMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY })
      setTimeout(() => setRingPos({ x: e.clientX, y: e.clientY }), 80)
    }
    const onEnter = () => setHovering(true)
    const onLeave = () => setHovering(false)
    window.addEventListener('mousemove', onMove)
    document.querySelectorAll('a,button,.svc-item,.wc,.proc,.faq,.s-chip,.cl-name').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <>
      <motion.div
        id="cursor"
        animate={{ left: pos.x, top: pos.y, width: hovering ? 20 : 12, height: hovering ? 20 : 12 }}
        transition={{ type: 'spring', stiffness: 800, damping: 40 }}
      />
      <motion.div
        id="cursor-ring"
        animate={{ left: ringPos.x, top: ringPos.y, width: hovering ? 60 : 40, height: hovering ? 60 : 40 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      />
    </>
  )
}

// Nav
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])
  return (
    <motion.nav
      className={scrolled ? 'scrolled' : ''}
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <a href="#" className="logo">
        <div className="logo-mark">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <polygon points="16,2 28,8 28,20 16,26 4,20 4,8" fill="none" stroke="rgba(245,240,232,0.12)" strokeWidth="1"/>
            <polygon points="20,6 32,12 32,24 20,30 8,24 8,12" fill="none" stroke="#b8922e" strokeWidth="1.2" opacity="0.7"/>
            <line x1="12" y1="16" x2="20" y2="16" stroke="#b8922e" strokeWidth="1.5"/>
            <line x1="12" y1="20" x2="18" y2="20" stroke="#b8922e" strokeWidth="1" opacity="0.5"/>
            <circle cx="12" cy="16" r="2.5" fill="#b8922e"/>
          </svg>
        </div>
        <div>
          <div className="logo-text">BIVONIX</div>
          <div className="logo-sub">enterprise data</div>
        </div>
      </a>
      <div className="nav-links">
        {['services','work','dashboards','process','faq','about'].map(link => (
          <a key={link} href={`#${link}`}>{link}</a>
        ))}
      </div>
      <a href="#contact" className="nav-cta">Book a call →</a>
    </motion.nav>
  )
}

// Hero
function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, 80])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

  return (
    <div className="hero" id="hero">
      <div className="hero-bg" />
      <div className="hero-grid-lines" />
      <motion.div className="hero-left" style={{ y, opacity }}>
        <motion.div className="hero-tag" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.7 }}>
          Enterprise data consulting · Paris, France
        </motion.div>
        <motion.h1 className="hero-h1" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}>
          BI<br/>VON<span className="serif">ix.</span>
        </motion.h1>
        <motion.p className="hero-p" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }}>
          We build the data infrastructure, governance platforms, and executive intelligence systems that <strong>tier-1 organisations</strong> rely on to make decisions worth millions. <strong>Nine years. Five industries. Zero fluff.</strong>
        </motion.p>
        <motion.div className="hero-actions" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.7 }}>
          <a href="#contact" className="btn-primary">Start a project</a>
          <a href="#work" className="btn-outline">View case studies</a>
        </motion.div>
      </motion.div>

      <div className="hero-right">
        <div className="photo-overlay" />
        <motion.div
          className="hero-float-card"
          initial={{ opacity: 0, x: 40, y: '-50%' }}
          animate={{ opacity: 1, x: 0, y: '-50%' }}
          transition={{ delay: 1.1, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ position: 'absolute', top: '50%', right: 60 }}
          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
        >
          <div className="fc-label">Avg. project value</div>
          <div className="fc-val">€84K</div>
          <div className="fc-unit">per engagement</div>
          <div className="fc-hr" />
          <div className="fc-row"><span className="fc-k">Satisfaction</span><span className="fc-v">98%</span></div>
          <div className="fc-row"><span className="fc-k">On-time delivery</span><span className="fc-v">100%</span></div>
          <div className="fc-row"><span className="fc-k">Repeat clients</span><span className="fc-v">82%</span></div>
          <div className="fc-hr" />
          <div className="fc-avail"><span className="avail-dot" />Available Q3 2026</div>
        </motion.div>
        <div className="hero-number">09</div>
      </div>
    </div>
  )
}

// Ticker
function Ticker() {
  const items = ['Databricks','Power BI','Enovia PLM','SAP S/4HANA','Azure Data Factory','Unity Catalog','Delta Lake','Lakehouse Architecture','Data Quality','BOM Analytics']
  const repeated = [...items, ...items]
  return (
    <div className="ticker">
      <div className="ticker-track">
        {repeated.map((item, i) => (
          <span key={i} className="t-item">
            {item}
            {i < repeated.length - 1 && <span style={{ opacity: 0.3, margin: '0 4px' }}>✦</span>}
          </span>
        ))}
      </div>
    </div>
  )
}

// Stats
function Stats() {
  const stats = [
    { n: '9+', l: 'Years in enterprise data' },
    { n: '€84M', l: 'Revenue impact delivered' },
    { n: '47', l: 'Enterprise clients' },
    { n: '100%', l: 'On-time delivery rate' },
  ]
  return (
    <div className="stats-bar">
      {stats.map((s, i) => (
        <Reveal key={i} delay={i * 0.1} direction="up">
          <div className="stat">
            <div className="stat-n">{s.n}</div>
            <div className="stat-l">{s.l}</div>
          </div>
        </Reveal>
      ))}
    </div>
  )
}

// Clients
function Clients() {
  const names = ['Atlas Copco','Siemens','Airbus','TotalEnergies','BNP Paribas','Michelin','Schneider Electric']
  return (
    <Reveal>
      <div className="client-band">
        <div className="cl-label">Trusted by</div>
        <div className="cl-names">
          {names.map((n, i) => <div key={i} className="cl-name">{n}</div>)}
        </div>
      </div>
    </Reveal>
  )
}

// Services
function Services() {
  const services = [
    { num: '01', name: 'Data Lakehouse Architecture', desc: 'We design and build production-grade Databricks Medallion architectures — Bronze, Silver, Gold — with Delta Lake, Unity Catalog lineage, and enterprise-grade governance baked in from day one.', chips: ['Databricks','Delta Lake','Unity Catalog','Azure','ADLS Gen2'], price: 'From €12K/month' },
    { num: '02', name: 'PLM Data Quality Platforms', desc: 'Full-stack BOM data quality pipelines from Enovia / 3DEXPERIENCE into Databricks. DQ engine with 500+ configurable rules. ERP write-back gates. Power BI dashboards per division.', chips: ['Enovia','3DEXPERIENCE','SAP S/4','PySpark','Power BI'], price: 'From €18K/month' },
    { num: '03', name: 'Executive BI & Analytics', desc: 'Power BI semantic models on Gold layer data. DirectQuery live connections. Row-level security per business unit. Certified datasets. Division league tables and KPI frameworks.', chips: ['Power BI','DirectQuery','DAX','Star Schema','RLS'], price: 'From €8K/month' },
    { num: '04', name: 'Data Governance & Compliance', desc: 'Unity Catalog implementations, Azure AD SSO, column-level permissions, automated lineage graphs, GDPR tagging, audit log retention policies. Security reviewed and production-hardened.', chips: ['Unity Catalog','Azure AD','GDPR','Data Lineage','Audit'], price: 'From €6K/month' },
    { num: '05', name: 'MLflow & Anomaly Detection', desc: 'ML models trained on historical data quality patterns. Predict which parts or divisions are likely to have quality issues before they occur. Databricks Workflows orchestration.', chips: ['MLflow','PySpark','Databricks ML','Anomaly Detection'], price: 'From €14K/month' },
  ]
  return (
    <section id="services">
      <Reveal><div className="sec-eyebrow">What we do</div></Reveal>
      <Reveal delay={0.1}><h2 className="sec-h">Enterprise-grade <span className="i">services</span></h2></Reveal>
      <div className="svc-list">
        {services.map((svc, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <motion.div
              className="svc-item"
              whileHover={{ paddingLeft: 20, backgroundColor: 'rgba(184,146,46,0.02)' }}
              transition={{ duration: 0.2 }}
            >
              <div className="svc-num">{svc.num}</div>
              <div>
                <div className="svc-name">{svc.name}</div>
              </div>
              <div>
                <div className="svc-desc">{svc.desc}</div>
                <div className="svc-chips">{svc.chips.map((c, j) => <span key={j} className="chip">{c}</span>)}</div>
              </div>
              <div className="svc-price">{svc.price}</div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

// Work
function Work() {
  const cases = [
    { client: 'Atlas Copco', tag: 'PLM · Databricks · Power BI', desc: 'Built end-to-end BOM data quality pipeline from Enovia 3DEXPERIENCE into Databricks Medallion architecture. 500+ DQ rules. Power BI dashboards for 7 CT divisions.', result: '€2.1M MRP errors prevented in first 6 months. 92% BOM completeness achieved across 112K active parts.' },
    { client: 'Airbus Defence', tag: 'Data Governance · Unity Catalog', desc: 'Designed Unity Catalog governance layer for 40TB+ engineering data estate. Column-level permissions for 12 business units. Automated lineage from CAD systems to BI.', result: 'GDPR audit passed first-time. Data lineage visibility increased from 12% to 97% of total estate.' },
    { client: 'TotalEnergies', tag: 'Lakehouse · MLflow · Azure', desc: 'Migrated legacy Oracle EDW to Databricks Lakehouse. Implemented MLflow anomaly detection on production sensor data. ADF pipelines replacing 140+ SSIS packages.', result: '68% reduction in data processing time. €840K annual infrastructure cost savings realised.' },
    { client: 'BNP Paribas', tag: 'Power BI · DirectQuery · RLS', desc: 'Executive analytics platform across 18 European entities. Certified Power BI semantic model with DirectQuery on Databricks SQL Warehouse. Row-level security for regulatory compliance.', result: 'C-suite adoption from 8% to 74% within 90 days of go-live. Replaced 4 competing BI tools.' },
  ]
  return (
    <section id="work" className="work-section">
      <Reveal><div className="sec-eyebrow">Case studies</div></Reveal>
      <Reveal delay={0.1}><h2 className="sec-h">Work that <span className="i">moves</span> the needle</h2></Reveal>
      <div className="work-grid">
        {cases.map((c, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <motion.div className="wc" whileHover={{ backgroundColor: 'rgba(245,240,232,0.03)' }}>
              <div className="wc-client">{c.client}</div>
              <div className="wc-tag">{c.tag}</div>
              <div className="wc-desc">{c.desc}</div>
              <div className="wc-result">{c.result}</div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

// Dashboards showcase
const DASHBOARDS = [
  {
    id: 'arch',
    tag: 'Atlas Copco · Compressor Technique',
    title: 'BOM Data Quality Architecture',
    desc: 'End-to-end Enovia → Databricks Medallion architecture. Interactive high-level and low-level views covering Bronze/Silver/Gold layers, DQ engine, Unity Catalog governance, and SAP S/4 write-back.',
    src: '/dashboard-architecture.html',
    chips: ['Databricks','Enovia 3DEXPERIENCE','Delta Lake','Unity Catalog','SAP S/4'],
  },
  {
    id: 'gems',
    tag: 'Atlas Copco · CT Division · GEMS Migration',
    title: 'GEMS Readiness Power BI Dashboard',
    desc: 'Live Power BI mockup for 12 product companies across 6 divisions. 9 use-case checks, KPI cards, stacked bar charts, doughnut severity breakdown, attribute completeness bars, and weekly trend lines.',
    src: '/dashboard-gems.html',
    chips: ['Power BI','DirectQuery','PySpark','DQ Engine','RLS'],
  },
]

function Dashboards() {
  const [active, setActive] = useState('arch')
  const current = DASHBOARDS.find(d => d.id === active)

  return (
    <section id="dashboards" style={{ padding: '100px 0 0', background: 'rgba(245,240,232,0.015)' }}>
      <div style={{ padding: '0 60px 48px' }}>
        <Reveal><div className="sec-eyebrow">Live deliverables</div></Reveal>
        <Reveal delay={0.1}><h2 className="sec-h">Real work. <span className="i">Running live.</span></h2></Reveal>
        <Reveal delay={0.15}>
          <p style={{ fontSize: 11, lineHeight: 2.1, color: 'rgba(245,240,232,0.45)', maxWidth: 560, marginBottom: 36 }}>
            These are actual deliverables built for Atlas Copco Compressor Technique. Interactive — click, filter, drill down. No mocks, no Figma. Production-grade architecture running in your browser.
          </p>
        </Reveal>
        <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
          {DASHBOARDS.map(d => (
            <motion.button
              key={d.id}
              onClick={() => setActive(d.id)}
              style={{
                padding: '10px 24px', border: `1.5px solid ${active === d.id ? '#b8922e' : 'rgba(245,240,232,0.12)'}`,
                background: active === d.id ? 'rgba(184,146,46,0.08)' : 'transparent',
                color: active === d.id ? '#b8922e' : 'rgba(245,240,232,0.45)',
                fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: '0.18em',
                textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s',
              }}
              whileHover={{ borderColor: '#b8922e', color: '#b8922e' }}
            >
              {d.title}
            </motion.button>
          ))}
        </div>
      </div>

      <motion.div
        key={active}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ padding: '0 60px', marginBottom: 0 }}
      >
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
          <span style={{ fontSize: 8, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#b8922e' }}>{current.tag}</span>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
          {current.chips.map((c, i) => <span key={i} className="chip">{c}</span>)}
        </div>
        <p style={{ fontSize: 10, lineHeight: 1.9, color: 'rgba(245,240,232,0.4)', maxWidth: 700, marginBottom: 24 }}>{current.desc}</p>
      </motion.div>

      <motion.div
        key={active + '-frame'}
        initial={{ opacity: 0, scale: 0.995 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{ position: 'relative', margin: '0 60px', border: '1px solid rgba(245,240,232,0.08)', borderBottom: 'none' }}
      >
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 32,
          background: 'rgba(10,10,15,0.9)', backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', padding: '0 16px', gap: 6, zIndex: 2,
          borderBottom: '1px solid rgba(245,240,232,0.06)',
        }}>
          {['#ef4444','#f59e0b','#22c55e'].map((c, i) => (
            <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.7 }} />
          ))}
          <span style={{ fontSize: 9, color: 'rgba(245,240,232,0.3)', letterSpacing: '0.12em', marginLeft: 8 }}>
            bivonix.com · live demo · {current.title.toLowerCase()}
          </span>
        </div>
        <iframe
          src={current.src}
          title={current.title}
          style={{ width: '100%', height: 680, border: 'none', marginTop: 32, display: 'block' }}
          loading="lazy"
        />
      </motion.div>
      <div style={{ height: 100 }} />
    </section>
  )
}

// Demo Band
function DemoBand() {
  return (
    <Reveal>
      <div className="demo-band">
        <div>
          <div className="demo-h">See your data <span className="i">live</span><br/>in 48 hours</div>
          <div className="demo-sub">We run a free 2-hour discovery session and deliver a live proof-of-concept on your actual data within 48 hours. No slides. No decks. Real architecture, running live.</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <motion.a
            href="#contact"
            className="demo-btn"
            whileHover={{ backgroundColor: '#1a1a24', color: '#b8922e' }}
            whileTap={{ scale: 0.97 }}
          >
            Book free discovery →
          </motion.a>
          <div className="demo-meta">No commitment · NDA available · Paris / Remote</div>
        </div>
      </div>
    </Reveal>
  )
}

// Process
function Process() {
  const steps = [
    { n: '01', name: 'Discovery', desc: '2-hour deep-dive into your data estate, pain points, and strategic goals. We map your current architecture and identify highest-value interventions.', time: 'Week 1' },
    { n: '02', name: 'Architecture', desc: 'We design the target state architecture: Lakehouse layers, governance model, ingestion pipelines, DQ engine, and BI layer. Signed off before build starts.', time: 'Week 2–3' },
    { n: '03', name: 'Build', desc: 'Engineering sprint. Bronze/Silver/Gold layers, Unity Catalog, ADF pipelines, DQ rules engine, Power BI semantic model. Weekly demos throughout.', time: 'Week 4–12' },
    { n: '04', name: 'Validate', desc: 'UAT with your teams. DQ benchmarks met. Performance tested. Security reviewed. ERP integration validated end-to-end with live data.', time: 'Week 13–14' },
    { n: '05', name: 'Operate', desc: 'Handover with documentation. Optional ongoing support retainer. SLA monitoring, incident runbooks, quarterly health reviews.', time: 'Ongoing' },
  ]
  return (
    <section id="process">
      <Reveal><div className="sec-eyebrow">How we work</div></Reveal>
      <Reveal delay={0.1}><h2 className="sec-h">Proven <span className="i">process</span></h2></Reveal>
      <div className="process-grid">
        {steps.map((s, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div className="proc">
              <div className="proc-n">{s.n}</div>
              <div className="proc-name">{s.name}</div>
              <div className="proc-desc">{s.desc}</div>
              <div className="proc-time">{s.time}</div>
              {i < steps.length - 1 && <div className="proc-arr">→</div>}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

// Stack
function Stack() {
  const cats = [
    { h: 'Lakehouse & Ingestion', chips: ['Databricks','Delta Lake','Apache Kafka','Azure Data Factory','Auto Loader','ADLS Gen2','Parquet','Z-Order'] },
    { h: 'Governance & Security', chips: ['Unity Catalog','Azure Active Directory','Data Lineage','GDPR Compliance','Column-level RLS','Audit Log','Key Vault'] },
    { h: 'BI & Analytics', chips: ['Power BI','DirectQuery','DAX','Star Schema','Semantic Model','Teams Alerts','SharePoint'] },
    { h: 'PLM & ERP', chips: ['Enovia 3DEXPERIENCE','SAP S/4HANA','CATIA','3DX REST API','MBOM/EBOM','IDocs/BAPI','ADF Pipelines'] },
  ]
  return (
    <section className="stack-bg" id="stack">
      <Reveal><div className="sec-eyebrow">Technology</div></Reveal>
      <Reveal delay={0.1}><h2 className="sec-h">The <span className="i">stack</span></h2></Reveal>
      <div className="stack-grid">
        {cats.map((cat, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div className="stack-cat">
              <div className="stack-cat-h">{cat.h}</div>
              <div className="s-chips">
                {cat.chips.map((c, j) => (
                  <motion.span key={j} className="s-chip" whileHover={{ borderColor: '#b8922e', color: '#b8922e' }}>{c}</motion.span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

// FAQ
function FAQ() {
  const faqs = [
    { q: 'Do you work with companies outside France?', a: 'Yes — 60% of our clients are outside France. We work fully remote or with periodic on-site sprints. We have delivered projects across 14 European countries and the US.' },
    { q: 'What industries do you specialise in?', a: 'Industrial manufacturing (PLM/BOM), energy, financial services, aerospace, and healthcare. We are deepest in manufacturing-adjacent data — Enovia, SAP, Databricks pipelines.' },
    { q: 'How long does a typical project take?', a: 'A full Lakehouse + Power BI engagement typically runs 12–16 weeks. A focused DQ engine build is 6–8 weeks. Advisory retainers start immediately with no setup lag.' },
    { q: 'Do you offer fixed-price or time-and-materials?', a: 'Both. Most clients choose a monthly retainer with a defined scope. For well-defined projects we offer fixed-fee delivery with a change control process.' },
    { q: 'Can you work with our existing team?', a: 'Absolutely — we prefer it. We embed alongside your engineers, upskill your team, and ensure full knowledge transfer. The goal is your independence, not dependency on us.' },
    { q: 'What happens after the project ends?', a: 'We offer optional support retainers from €2,400/month covering SLA monitoring, incident response, quarterly health reviews, and ongoing DQ rule updates.' },
  ]
  return (
    <section id="faq">
      <Reveal><div className="sec-eyebrow">FAQ</div></Reveal>
      <Reveal delay={0.1}><h2 className="sec-h">Common <span className="i">questions</span></h2></Reveal>
      <div className="faq-grid">
        {faqs.map((f, i) => (
          <Reveal key={i} delay={i * 0.07}>
            <motion.div className="faq" whileHover={{ backgroundColor: 'rgba(245,240,232,0.025)' }}>
              <div className="faq-q">{f.q}</div>
              <div className="faq-a">{f.a}</div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

// Contact
function Contact() {
  return (
    <section id="contact" className="contact-section">
      <Reveal><div className="sec-eyebrow" style={{ color: 'rgba(10,10,15,0.4)' }}>Get in touch</div></Reveal>
      <Reveal delay={0.1}>
        <h2 className="contact-h">Let's build something <span className="i">worth building</span></h2>
      </Reveal>
      <div className="contact-grid">
        <div>
          <div className="c-detail">
            <div className="c-lbl">Email</div>
            <div className="c-val"><a href="mailto:ankitparihar@bivonix.com">ankitparihar@bivonix.com</a></div>
          </div>
          <div className="c-detail">
            <div className="c-lbl">Location</div>
            <div className="c-val">Paris, France · Remote available globally</div>
          </div>
          <div className="c-detail">
            <div className="c-lbl">Response time</div>
            <div className="c-val">Within 24 hours, typically same day</div>
          </div>
          <motion.a href="mailto:ankitparihar@bivonix.com" className="contact-btn" whileHover={{ backgroundColor: '#b8922e' }}>
            Send us an email →
          </motion.a>
          <div className="contact-person">
            <motion.img
              src="/ankit-parihar.jpg"
              alt="Ankit Parihar"
              style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', objectPosition: 'center top', border: '2px solid rgba(184,146,46,0.4)', flexShrink: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            />
            <div>
              <div className="cp-name">Ankit Parihar</div>
              <div className="cp-role">Founder · Principal Architect</div>
            </div>
          </div>
        </div>
        <Reveal delay={0.15} direction="right">
          <div className="form-title">Start a conversation</div>
          <div className="f-row">
            <div className="f-group"><label className="f-label">First name</label><input className="f-input" type="text" /></div>
            <div className="f-group"><label className="f-label">Last name</label><input className="f-input" type="text" /></div>
          </div>
          <div className="f-group"><label className="f-label">Company</label><input className="f-input" type="text" /></div>
          <div className="f-group"><label className="f-label">Email</label><input className="f-input" type="email" /></div>
          <div className="f-group">
            <label className="f-label">Service interest</label>
            <select className="f-sel">
              <option>Data Lakehouse Architecture</option>
              <option>PLM Data Quality Platform</option>
              <option>Executive BI & Analytics</option>
              <option>Data Governance</option>
              <option>Programme Partnership</option>
            </select>
          </div>
          <div className="f-group"><label className="f-label">Tell us about your project</label><textarea className="f-area" /></div>
          <motion.button className="f-submit" whileHover={{ backgroundColor: '#b8922e' }} whileTap={{ scale: 0.97 }}>
            Send message →
          </motion.button>
        </Reveal>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <>
      <Cursor />
      <Nav />
      <Hero />
      <Ticker />
      <Stats />
      <Clients />
      <Services />
      <Work />
      <Dashboards />
      <DemoBand />
      <Process />
      <Stack />
      <FAQ />
      <Contact />
      <footer>
        <div className="ft-copy">© 2026 Bivonix. Enterprise data consulting. Paris, France.</div>
        <div className="ft-r">ankitparihar@bivonix.com</div>
      </footer>
    </>
  )
}

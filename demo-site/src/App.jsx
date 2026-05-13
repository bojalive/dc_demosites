import { useState, useEffect } from "react";
import { HashRouter, Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import {
  Activity, AlertTriangle, ArrowUp, ArrowDown, BarChart3, Bell, Bot,
  Calendar, Check, CheckCircle, ChevronDown, ChevronRight, ChevronUp,
  ClipboardList, Clock, Factory, Flag, Gauge, LayoutDashboard, Minus,
  Package, Plus, Save, Search, Send, Settings, Shield, Sliders,
  Sparkles, Target, Timer, TrendingUp, Truck, User, Users, X, Zap,
  AlertCircle, Archive
} from "lucide-react";
import { config } from "./config/customer";
import "./index.css";

// ── BRAND ─────────────────────────────────────────────────────────────────
const B = {
  primary: config.brand.primaryColor,
  primaryDark: config.brand.primaryDark,
  primaryLight: config.brand.primaryLight,
  dark: "#1A1A2E", darkSoft: "#374151",
  card: "#FFFFFF", surface: "#F1F5F9",
  border: "#E5E7EB", borderLight: "#F3F4F6",
  hoverBg: "#F1F5F9",
  text: "#1A1A2E", textMuted: "#6B7280", textLight: "#9CA3AF",
  accent: "#D97706", success: "#059669", danger: "#DC2626",
  warning: "#D97706", info: "#2563EB", purple: "#7C3AED", teal: "#0D9488",
  successBg: "#ECFDF5", warningBg: "#FFFBEB", dangerBg: "#FEF2F2",
  infoBg: "#EFF6FF", purpleBg: "#F5F3FF", tealBg: "#F0FDFA",
  bg: "#F8F9FB",
  shadow: "0 4px 20px rgba(0,0,0,0.06)",
  tipShadow: "0 4px 12px rgba(0,0,0,0.08)",
};

// ── DATA ──────────────────────────────────────────────────────────────────
const {
  ncReports, capaRecords, capaMilestones, ncrTrend, defectPareto,
  deptBreakdown, costOfQuality, supplierScorecard, supplierComparisonData,
  capaEffectiveness, qualityAlerts, yieldTrendData, ncrAgingData,
  inspectionSchedule, inspectionHistory, spcData, users,
} = config.data;

// ── STYLES ────────────────────────────────────────────────────────────────
const card = { background: B.card, border: `1px solid ${B.border}`, borderRadius: 14, padding: 24, transition: "box-shadow 0.2s ease" };
const cardSm = { ...card, padding: 16, borderRadius: 10 };
const glass = card;
const glassSm = cardSm;
const btn = { background: B.primary, color: "#fff", border: "none", borderRadius: 8, padding: "9px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "background 0.15s", fontFamily: "'Montserrat', sans-serif", display: "inline-flex", alignItems: "center", gap: 6 };
const btnGhost = { ...btn, background: B.surface, color: B.darkSoft, border: `1px solid ${B.border}` };
const inp = { background: "#fff", border: `1px solid ${B.border}`, borderRadius: 8, padding: "9px 13px", color: B.text, fontSize: 13, fontFamily: "'Open Sans', sans-serif", width: "100%", outline: "none" };
const lbl = { fontSize: 11, fontWeight: 600, color: B.textMuted, marginBottom: 5, display: "block", fontFamily: "'Montserrat', sans-serif", textTransform: "uppercase", letterSpacing: "0.5px" };

// ── SMALL COMPONENTS ──────────────────────────────────────────────────────
const Badge = ({ children, color = B.primary, filled }) => (
  <span style={{ background: filled ? color : `${color}14`, color: filled ? "#fff" : color, fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20, fontFamily: "'Montserrat', sans-serif", textTransform: "uppercase", letterSpacing: "0.4px", whiteSpace: "nowrap" }}>{children}</span>
);

const SeverityBadge = ({ severity }) => {
  const map = { critical: { color: B.danger, label: "Critical" }, major: { color: B.accent, label: "Major" }, minor: { color: B.info, label: "Minor" } };
  return <Badge color={(map[severity] || map.minor).color}>{(map[severity] || map.minor).label}</Badge>;
};

const StatusBadge = ({ status }) => {
  const map = { open: { color: B.danger, label: "Open" }, investigation: { color: B.accent, label: "Investigation" }, "capa-open": { color: B.purple, label: "CAPA Open" }, "in-progress": { color: B.info, label: "In Progress" }, verification: { color: B.accent, label: "Verification" }, closed: { color: B.success, label: "Closed" }, upcoming: { color: B.info, label: "Upcoming" }, due: { color: B.accent, label: "Due Now" } };
  const s = map[status] || { color: B.textMuted, label: status };
  return <Badge color={s.color}>{s.label}</Badge>;
};

const Metric = ({ icon: Icon, label, value, sub, change, up, color = B.primary }) => (
  <div style={{ ...card, padding: 20, cursor: "pointer" }} onMouseEnter={e => { e.currentTarget.style.boxShadow = B.shadow; }} onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <div>
        <p style={{ fontSize: 11, color: B.textMuted, textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 8, fontFamily: "'Montserrat', sans-serif", fontWeight: 600 }}>{label}</p>
        <p style={{ fontSize: 28, fontWeight: 700, color: B.text, fontFamily: "'Montserrat', sans-serif", lineHeight: 1 }}>{value}</p>
        {change && (
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8 }}>
            {up ? <ArrowDown size={12} color={B.success} /> : <ArrowUp size={12} color={B.danger} />}
            <span style={{ fontSize: 12, color: up ? B.success : B.danger, fontWeight: 600 }}>{change}</span>
            <span style={{ fontSize: 11, color: B.textMuted }}>{sub || "vs last month"}</span>
          </div>
        )}
      </div>
      <div style={{ width: 44, height: 44, borderRadius: 8, background: `${color}10`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon size={20} color={color} />
      </div>
    </div>
  </div>
);

const Section = ({ icon: Icon, title, action, children }) => (
  <div style={card}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Icon size={18} color={B.primary} />
        <h3 style={{ fontSize: 15, fontWeight: 700, color: B.text, fontFamily: "'Montserrat', sans-serif", margin: 0 }}>{title}</h3>
      </div>
      {action}
    </div>
    {children}
  </div>
);

const TH = ({ children }) => <th style={{ padding: "10px 12px", fontSize: 10, color: B.textMuted, textTransform: "uppercase", letterSpacing: "0.6px", fontFamily: "'Montserrat', sans-serif", fontWeight: 600, textAlign: "left", borderBottom: `2px solid ${B.border}` }}>{children}</th>;
const TD = ({ children, style: s = {} }) => <td style={{ padding: "11px 12px", fontSize: 12, color: B.darkSoft, ...s }}>{children}</td>;

const FormField = ({ label, name, type = "text", value, onChange, error, options, placeholder, required, rows }) => (
  <div style={{ marginBottom: 16 }}>
    <label style={lbl}>{label}{required && <span style={{ color: B.danger }}> *</span>}</label>
    {type === "select" ? (
      <select value={value} onChange={e => onChange(name, e.target.value)} style={{ ...inp, appearance: "none" }}>
        <option value="">Select...</option>
        {(options || []).map(o => <option key={o.value || o} value={o.value || o}>{o.label || o}</option>)}
      </select>
    ) : type === "textarea" ? (
      <textarea value={value} onChange={e => onChange(name, e.target.value)} rows={rows || 3} placeholder={placeholder} style={{ ...inp, resize: "vertical", minHeight: 70 }} />
    ) : (
      <input type={type} value={value} onChange={e => onChange(name, e.target.value)} placeholder={placeholder}
        style={{ ...inp, ...(error ? { borderColor: B.danger } : {}) }}
        onFocus={e => { e.target.style.borderColor = B.primary; }}
        onBlur={e => { if (!error) e.target.style.borderColor = B.border; }} />
    )}
    {error && <p style={{ color: B.danger, fontSize: 11, marginTop: 4 }}>{error}</p>}
  </div>
);

const validate = (fields, values) => {
  const errors = {};
  fields.forEach(f => { if (f.required && !values[f.name]) errors[f.name] = `${f.label} is required`; });
  return errors;
};

// ═══════════════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════════════
function AppInner() {
  const navigate = useNavigate();
  const location = useLocation();
  const nav = location.pathname.replace("/", "") || "dashboard";
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const collapsed = !sidebarHovered;

  useEffect(() => { document.title = `${config.brand.shortName} · Quality NC Portal`; }, []);

  const now = new Date();
  const time = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
  const date = now.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" });

  const navItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "ncr-list", icon: AlertTriangle, label: "NC Reports" },
    { id: "capa", icon: Shield, label: "CAPA Tracker" },
    { id: "spc", icon: Activity, label: "SPC / Analytics" },
    { id: "inspections", icon: ClipboardList, label: "Inspections" },
    { id: "new-ncr", icon: Flag, label: "Raise NCR" },
    { id: "new-capa", icon: Target, label: "New CAPA" },
    { id: "ai-chat", icon: Bot, label: "AI Assistant" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  const openNCRs = ncReports.filter(n => n.status !== "closed").length;

  return (
    <div style={{ fontFamily: "'Open Sans', sans-serif", background: B.bg, height: "100vh", color: B.text, display: "flex", position: "relative", overflow: "hidden" }}>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}} @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>

      <div style={{ width: 68, flexShrink: 0 }} />

      <nav onMouseEnter={() => setSidebarHovered(true)} onMouseLeave={() => setSidebarHovered(false)}
        style={{ width: collapsed ? 68 : 240, height: "100vh", background: "#FFFFFF", borderRight: `1px solid ${B.border}`, display: "flex", flexDirection: "column", transition: "width 0.25s ease", position: "fixed", left: 0, top: 0, zIndex: 20, overflowX: "hidden", overflowY: "auto", boxShadow: collapsed ? "none" : "4px 0 20px rgba(0,0,0,0.06)" }}>

        <div style={{ padding: "16px 0 16px 16px", borderBottom: `1px solid ${B.border}`, display: "flex", alignItems: "center", gap: 12, minHeight: 68, whiteSpace: "nowrap" }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: B.primary, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ color: "#fff", fontWeight: 800, fontSize: 13, fontFamily: "'Montserrat', sans-serif" }}>{config.brand.initials}</span>
          </div>
          <div style={{ opacity: collapsed ? 0 : 1, transition: "opacity 0.2s ease" }}>
            <div style={{ fontSize: 17, fontWeight: 800, fontFamily: "'Montserrat', sans-serif", color: B.text, lineHeight: 1.1 }}>{config.brand.shortName}</div>
            <div style={{ fontSize: 9, color: B.primary, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", fontFamily: "'Montserrat', sans-serif" }}>{config.brand.portalName}</div>
          </div>
        </div>

        <div style={{ flex: 1, padding: "12px 8px", display: "flex", flexDirection: "column", gap: 2 }}>
          {navItems.map(item => {
            const active = nav === item.id;
            return (
              <button key={item.id} onClick={() => navigate(`/${item.id}`)}
                style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0 10px 14px", borderRadius: 8, border: "none", cursor: "pointer", background: active ? `${B.primary}0A` : "transparent", color: active ? B.primary : B.textMuted, fontFamily: "'Montserrat', sans-serif", fontSize: 13, fontWeight: active ? 600 : 500, transition: "background 0.15s, color 0.15s", justifyContent: "flex-start", borderLeft: active ? `3px solid ${B.primary}` : "3px solid transparent", whiteSpace: "nowrap" }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.background = B.hoverBg; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}>
                <item.icon size={18} style={{ flexShrink: 0 }} />
                <span style={{ opacity: collapsed ? 0 : 1, transition: "opacity 0.2s ease" }}>{item.label}</span>
                {item.id === "ncr-list" && openNCRs > 0 && (
                  <span style={{ marginLeft: "auto", marginRight: 12, background: B.danger, color: "#fff", fontSize: 10, fontWeight: 700, padding: "1px 7px", borderRadius: 10, opacity: collapsed ? 0 : 1, transition: "opacity 0.2s ease" }}>{openNCRs}</span>
                )}
              </button>
            );
          })}
        </div>

        <div style={{ padding: "12px 8px", borderTop: `1px solid ${B.border}`, display: "flex", justifyContent: "center" }}>
          <ChevronRight size={14} color={B.textLight} style={{ transform: collapsed ? "rotate(0deg)" : "rotate(180deg)", transition: "transform 0.25s ease" }} />
        </div>
      </nav>

      <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", height: "100vh" }}>
        <header style={{ height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", background: "#FFFFFF", borderBottom: `1px solid ${B.border}`, flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, fontFamily: "'Montserrat', sans-serif", margin: 0, color: B.text }}>
              {navItems.find(n => n.id === nav)?.label}
            </h2>
            <Badge color={B.success}>LIVE</Badge>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: B.text }}>{time}</div>
              <div style={{ fontSize: 10, color: B.textMuted }}>{date}</div>
            </div>
            <div style={{ width: 1, height: 28, background: B.border }} />
            <div style={{ position: "relative" }}>
              <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: B.textMuted }} />
              <input placeholder="Search NCRs, CAPAs..." style={{ ...inp, width: 200, paddingLeft: 32, fontSize: 12, padding: "7px 12px 7px 32px" }} />
            </div>
            <div style={{ position: "relative" }}>
              <button onClick={() => setShowNotif(p => !p)} style={{ background: "none", border: "none", cursor: "pointer", padding: 6 }}>
                <Bell size={18} color={B.textMuted} />
                <span style={{ position: "absolute", top: 2, right: 2, width: 8, height: 8, borderRadius: "50%", background: B.danger, border: "2px solid #fff" }} />
              </button>
              {showNotif && (
                <div style={{ position: "absolute", top: "100%", right: 0, marginTop: 8, width: 340, ...card, padding: 0, zIndex: 100, animation: "fadeIn 0.2s ease", boxShadow: B.tipShadow }}>
                  <div style={{ padding: "14px 16px", borderBottom: `1px solid ${B.border}`, display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 13, fontWeight: 700, fontFamily: "'Montserrat', sans-serif", color: B.text }}>Quality Alerts</span>
                    <button onClick={() => setShowNotif(false)} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={14} color={B.textMuted} /></button>
                  </div>
                  {ncReports.filter(n => n.status !== "closed").slice(0, 4).map(n => (
                    <div key={n.id} style={{ padding: "10px 16px", borderBottom: `1px solid ${B.borderLight}`, display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <AlertCircle size={14} color={n.severity === "critical" ? B.danger : B.accent} style={{ marginTop: 2, flexShrink: 0 }} />
                      <div>
                        <p style={{ fontSize: 12, margin: 0, color: B.text }}>{n.title}</p>
                        <p style={{ fontSize: 10, color: B.textMuted, margin: "2px 0 0" }}>{n.id} · {n.dept}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: `${B.primary}10`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <User size={14} color={B.primary} />
            </div>
          </div>
        </header>

        <div style={{ flex: 1, overflow: "auto", padding: "20px 24px" }}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/ncr-list" element={<NCRListPage />} />
            <Route path="/capa" element={<CAPAPage />} />
            <Route path="/spc" element={<SPCPage />} />
            <Route path="/inspections" element={<InspectionsPage />} />
            <Route path="/new-ncr" element={<NewNCRPage />} />
            <Route path="/new-capa" element={<NewCAPAPage />} />
            <Route path="/ai-chat" element={<AIChatPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return <HashRouter><AppInner /></HashRouter>;
}

// ═══════════════════════════════════════════════════════════════════════════
// DASHBOARD
// ═══════════════════════════════════════════════════════════════════════════
function DashboardPage() {
  const openNCRs = ncReports.filter(n => n.status !== "closed").length;
  const criticalNCRs = ncReports.filter(n => n.severity === "critical" && n.status !== "closed").length;
  const openCAPAs = capaRecords.filter(c => c.status !== "closed").length;
  const overdueNCRs = ncReports.filter(n => n.status !== "closed" && new Date(n.due) < new Date()).length;
  const alertColors = { critical: B.danger, warning: B.accent, info: B.info };
  const tip = { background: "#fff", border: `1px solid ${B.border}`, borderRadius: 10, fontSize: 12, boxShadow: B.tipShadow };

  return (
    <div style={{ animation: "fadeIn 0.4s ease" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 16 }}>
        <Metric icon={AlertTriangle} label="Open NCRs" value={openNCRs} change="-25%" up={true} color={B.danger} />
        <Metric icon={Flag} label="Critical NCRs" value={criticalNCRs} change="-1" up={true} sub="vs last week" color={B.accent} />
        <Metric icon={Shield} label="Open CAPAs" value={openCAPAs} change="+2" up={false} sub="new this month" color={B.purple} />
        <Metric icon={Clock} label="Avg Close Time" value="6.2d" change="-1.3 days" up={true} color={B.teal} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
        <Metric icon={Target} label="First Pass Yield" value="97.8%" change="+0.5%" up={true} color={B.success} />
        <Metric icon={Package} label="Supplier Quality Index" value="86.2" change="-1.3" up={false} color={B.info} />
        <Metric icon={CheckCircle} label="CAPA Effectiveness" value="92%" change="+4%" up={true} sub="6-month avg" color={B.purple} />
        <Metric icon={Timer} label="Overdue NCRs" value={overdueNCRs} change="+1" up={false} sub="need attention" color={B.danger} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 16, marginBottom: 16 }}>
        <Section icon={TrendingUp} title="NCR Trend (6 months)" action={<Badge>Monthly</Badge>}>
          <div style={{ height: 260 }}><ResponsiveContainer>
            <BarChart data={ncrTrend} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke={B.borderLight} />
              <XAxis dataKey="month" tick={{ fill: B.textMuted, fontSize: 11 }} axisLine={{ stroke: B.border }} />
              <YAxis tick={{ fill: B.textMuted, fontSize: 11 }} axisLine={{ stroke: B.border }} />
              <Tooltip contentStyle={tip} />
              <Bar dataKey="product" stackId="a" fill={B.danger} name="Product NC" />
              <Bar dataKey="process" stackId="a" fill={B.accent} name="Process NC" />
              <Bar dataKey="supplier" stackId="a" fill={B.info} radius={[4,4,0,0]} name="Supplier NC" />
              <Line type="monotone" dataKey="closed" stroke={B.success} strokeWidth={2} dot={{ fill: B.success, r: 3 }} name="Closed" />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </BarChart>
          </ResponsiveContainer></div>
        </Section>
        <Section icon={BarChart3} title="Defect Pareto" action={<Badge>YTD</Badge>}>
          <div style={{ height: 260 }}><ResponsiveContainer>
            <BarChart data={defectPareto} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke={B.borderLight} />
              <XAxis type="number" tick={{ fill: B.textMuted, fontSize: 10 }} axisLine={{ stroke: B.border }} />
              <YAxis dataKey="defect" type="category" tick={{ fill: B.textMuted, fontSize: 10 }} axisLine={{ stroke: B.border }} width={100} />
              <Tooltip contentStyle={tip} />
              <Bar dataKey="count" fill={B.primary} radius={[0,6,6,0]} name="Count" />
            </BarChart>
          </ResponsiveContainer></div>
        </Section>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <Section icon={Clock} title="NCR Aging Analysis" action={<Badge color={B.danger}>{ncrAgingData.reduce((s,d)=>s+d.count,0)} Open</Badge>}>
          <div style={{ height: 220 }}><ResponsiveContainer>
            <BarChart data={ncrAgingData} layout="vertical" barSize={20}>
              <CartesianGrid strokeDasharray="3 3" stroke={B.borderLight} />
              <XAxis type="number" tick={{ fill: B.textMuted, fontSize: 10 }} axisLine={{ stroke: B.border }} />
              <YAxis dataKey="bucket" type="category" tick={{ fill: B.textMuted, fontSize: 10 }} axisLine={{ stroke: B.border }} width={80} />
              <Tooltip contentStyle={tip} />
              <Bar dataKey="count" name="NCRs" radius={[0,6,6,0]}>{ncrAgingData.map((d,i)=><Cell key={i} fill={d.color}/>)}</Bar>
            </BarChart>
          </ResponsiveContainer></div>
        </Section>
        <Section icon={Shield} title="CAPA Effectiveness (6 months)">
          <div style={{ height: 220 }}><ResponsiveContainer>
            <BarChart data={capaEffectiveness} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke={B.borderLight} />
              <XAxis dataKey="month" tick={{ fill: B.textMuted, fontSize: 11 }} axisLine={{ stroke: B.border }} />
              <YAxis tick={{ fill: B.textMuted, fontSize: 11 }} axisLine={{ stroke: B.border }} />
              <Tooltip contentStyle={tip} />
              <Bar dataKey="initiated" fill={B.info} name="Initiated" radius={[4,4,0,0]} />
              <Bar dataKey="closedEffective" fill={B.success} name="Closed Effective" radius={[4,4,0,0]} />
              <Bar dataKey="closedIneffective" fill={B.danger} name="Closed Ineffective" radius={[4,4,0,0]} />
              <Legend wrapperStyle={{ fontSize: 10 }} />
            </BarChart>
          </ResponsiveContainer></div>
        </Section>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "0.8fr 1.2fr", gap: 16, marginBottom: 16 }}>
        <Section icon={Zap} title="Quality Alerts" action={<Badge color={B.danger}>{qualityAlerts.filter(a=>a.type==="critical").length} Critical</Badge>}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 280, overflowY: "auto" }}>
            {qualityAlerts.map(a => (
              <div key={a.id} style={{ ...glassSm, padding: "10px 12px", display: "flex", gap: 10, alignItems: "flex-start", borderLeft: `3px solid ${alertColors[a.type]||B.info}` }}>
                <AlertCircle size={14} color={alertColors[a.type]||B.info} style={{ marginTop: 2, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 11, margin: 0, lineHeight: 1.4 }}>{a.text}</p>
                  <p style={{ fontSize: 9, color: B.textMuted, margin: "3px 0 0" }}>{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>
        <Section icon={Truck} title="Supplier Quality Scorecard" action={<Badge>Q1 2025</Badge>}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 3px" }}>
              <thead><tr>{["Supplier","City","Lots Recv","Rejected","PPM","Rating","Trend"].map(h=><TH key={h}>{h}</TH>)}</tr></thead>
              <tbody>{supplierScorecard.map((s,i)=>(
                <tr key={i}>
                  <TD style={{ fontWeight:600, fontSize:11 }}>{s.supplier}</TD>
                  <TD style={{ fontSize:11, color:B.textMuted }}>{s.city}</TD>
                  <TD style={{ fontSize:11 }}>{s.lotsReceived}</TD>
                  <TD style={{ fontSize:11, color:s.lotsRejected>0?B.danger:B.success }}>{s.lotsRejected}</TD>
                  <TD style={{ fontSize:11, fontWeight:600, color:s.ppm>1500?B.danger:s.ppm>800?B.accent:B.success }}>{s.ppm}</TD>
                  <TD><Badge color={s.rating.startsWith("A")?B.success:s.rating==="B"?B.accent:B.danger}>{s.rating}</Badge></TD>
                  <TD>{s.trend==="up"?<ArrowUp size={12} color={B.success}/>:s.trend==="down"?<ArrowDown size={12} color={B.danger}/>:<Minus size={12} color={B.textMuted}/>}</TD>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </Section>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "0.7fr 1fr 1.3fr", gap: 16, marginBottom: 16 }}>
        <Section icon={Factory} title="NC by Department">
          <div style={{ height: 240, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <ResponsiveContainer width="100%" height={190}>
              <PieChart>
                <Pie data={deptBreakdown} cx="50%" cy="50%" innerRadius={45} outerRadius={72} dataKey="value" startAngle={90} endAngle={-270} stroke="none">
                  {deptBreakdown.map((_,i)=><Cell key={i} fill={[B.danger,B.accent,B.info,B.purple,B.teal,B.textMuted][i]}/>)}
                </Pie>
                <Tooltip contentStyle={tip} formatter={v=>`${v}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"6px 12px", justifyContent:"center" }}>
              {deptBreakdown.map((d,i)=>(
                <div key={i} style={{ display:"flex", alignItems:"center", gap:4 }}>
                  <span style={{ width:7, height:7, borderRadius:"50%", background:[B.danger,B.accent,B.info,B.purple,B.teal,B.textMuted][i] }}/>
                  <span style={{ fontSize:9, color:B.textMuted }}>{d.name}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>
        <Section icon={TrendingUp} title="Cost of Quality (Lakhs)">
          <div style={{ height: 240 }}><ResponsiveContainer>
            <AreaChart data={costOfQuality}>
              <defs><linearGradient id="coqGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={B.danger} stopOpacity={0.2}/><stop offset="100%" stopColor={B.danger} stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke={B.borderLight} />
              <XAxis dataKey="month" tick={{ fill:B.textMuted, fontSize:10 }} axisLine={{ stroke:B.border }} />
              <YAxis tick={{ fill:B.textMuted, fontSize:10 }} axisLine={{ stroke:B.border }} />
              <Tooltip contentStyle={tip} />
              <Area type="monotone" dataKey="internal" stroke={B.danger} fill="url(#coqGrad)" strokeWidth={2} name="Internal Failure" />
              <Area type="monotone" dataKey="external" stroke={B.accent} fill="none" strokeWidth={1.5} name="External Failure" />
              <Line type="monotone" dataKey="prevention" stroke={B.success} strokeWidth={1.5} strokeDasharray="4 4" dot={false} name="Prevention" />
              <Legend wrapperStyle={{ fontSize:10 }} />
            </AreaChart>
          </ResponsiveContainer></div>
        </Section>
        <Section icon={AlertTriangle} title="Recent Non-Conformances" action={<Badge color={B.danger}>{ncReports.filter(n=>n.severity==="critical"&&n.status!=="closed").length} Critical</Badge>}>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {ncReports.slice(0,5).map(n=>(
              <div key={n.id} style={{ ...glassSm, padding:12, display:"flex", gap:12, alignItems:"flex-start", borderLeft:`3px solid ${n.severity==="critical"?B.danger:n.severity==="major"?B.accent:B.info}` }}>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                    <span style={{ fontSize:12, fontWeight:700, fontFamily:"'Montserrat', sans-serif", color:B.primary }}>{n.id}</span>
                    <SeverityBadge severity={n.severity}/><StatusBadge status={n.status}/>
                  </div>
                  <p style={{ fontSize:12, margin:0, lineHeight:1.4 }}>{n.title}</p>
                  <p style={{ fontSize:10, color:B.textMuted, margin:"4px 0 0" }}>{n.part} · {n.dept} · {n.assignee}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      <Section icon={Calendar} title="Upcoming Inspections" action={<Badge>{inspectionSchedule.filter(i=>i.status==="due").length} Due Now</Badge>}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
          {inspectionSchedule.filter(i=>i.status==="upcoming"||i.status==="due").slice(0,3).map(ins=>(
            <div key={ins.id} style={{ ...glassSm, display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ width:36, height:36, borderRadius:8, background:ins.status==="due"?`${B.accent}20`:`${B.teal}15`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <ClipboardList size={16} color={ins.status==="due"?B.accent:B.teal}/>
              </div>
              <div style={{ flex:1 }}>
                <p style={{ fontSize:12, fontWeight:600, fontFamily:"'Montserrat', sans-serif", margin:0 }}>{ins.id} — {ins.type}</p>
                <p style={{ fontSize:10, color:B.textMuted, margin:"2px 0 0" }}>{ins.area} · {ins.nextDue}</p>
              </div>
              <StatusBadge status={ins.status}/>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// NCR LIST
// ═══════════════════════════════════════════════════════════════════════════
function NCRListPage() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? ncReports : ncReports.filter(n => n.status === filter);
  const totalDefective = ncReports.reduce((s,n) => s + n.defectQty, 0);

  return (
    <div style={{ animation: "fadeIn 0.4s ease" }}>
      <div style={{ ...glassSm, display:"flex", gap:32, marginBottom:16, alignItems:"center" }}>
        {[
          { label:"Total NCRs", value:ncReports.length, color:B.primary },
          { label:"Open", value:ncReports.filter(n=>n.status==="open").length, color:B.danger },
          { label:"Under Investigation", value:ncReports.filter(n=>n.status==="investigation").length, color:B.accent },
          { label:"CAPA Open", value:ncReports.filter(n=>n.status==="capa-open").length, color:B.purple },
          { label:"Closed", value:ncReports.filter(n=>n.status==="closed").length, color:B.success },
          { label:"Total Defective Units", value:totalDefective, color:B.info },
        ].map((s,i)=>(
          <div key={i} style={{ textAlign:"center" }}>
            <p style={{ fontSize:10, color:B.textMuted, textTransform:"uppercase", letterSpacing:"0.5px", fontFamily:"'Montserrat', sans-serif", fontWeight:600, margin:"0 0 4px" }}>{s.label}</p>
            <p style={{ fontSize:20, fontWeight:700, color:s.color, fontFamily:"'Montserrat', sans-serif", margin:0 }}>{s.value}</p>
          </div>
        ))}
      </div>
      <div style={{ display:"flex", gap:8, marginBottom:20 }}>
        {["all","open","investigation","capa-open","closed"].map(f=>(
          <button key={f} onClick={()=>setFilter(f)} style={{ ...btn, padding:"8px 16px", fontSize:12, background:filter===f?B.primary:B.surface, color:filter===f?"#fff":B.textMuted }}>
            {f==="all"?"All":f==="capa-open"?"CAPA Open":f.charAt(0).toUpperCase()+f.slice(1)}
            <span style={{ marginLeft:4, opacity:0.7 }}>({(f==="all"?ncReports:ncReports.filter(n=>n.status===f)).length})</span>
          </button>
        ))}
      </div>
      <div style={glass}>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"separate", borderSpacing:"0 4px" }}>
            <thead><tr>{["NCR ID","Title","Part / Part No.","Type","Source","Severity","Status","Assignee","Due Date"].map(h=><TH key={h}>{h}</TH>)}</tr></thead>
            <tbody>{filtered.map(n=>(
              <tr key={n.id} style={{ cursor:"pointer" }} onMouseEnter={e=>e.currentTarget.style.background=B.hoverBg} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                <TD style={{ fontWeight:700, fontFamily:"'Montserrat', sans-serif", color:B.primary }}>{n.id}</TD>
                <TD style={{ maxWidth:220 }}>{n.title}</TD>
                <TD><span style={{ fontSize:12 }}>{n.part}</span><br/><span style={{ fontSize:10, color:B.textMuted }}>{n.partNo}</span></TD>
                <TD><Badge color={n.type==="Product"?B.danger:n.type==="Supplier"?B.purple:B.accent}>{n.type}</Badge></TD>
                <TD style={{ fontSize:11, color:B.textMuted }}>{n.source}</TD>
                <TD><SeverityBadge severity={n.severity}/></TD>
                <TD><StatusBadge status={n.status}/></TD>
                <TD style={{ fontSize:12 }}>{n.assignee}</TD>
                <TD style={{ fontSize:12, color:B.textMuted }}>{n.due}</TD>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// CAPA
// ═══════════════════════════════════════════════════════════════════════════
function CAPAPage() {
  const [expandedCapa, setExpandedCapa] = useState(null);
  const closedEffective = capaRecords.filter(c => c.status === "closed" && c.effectiveness && c.effectiveness.startsWith("Effective")).length;
  const closedTotal = capaRecords.filter(c => c.status === "closed").length;
  const effectivenessRate = closedTotal > 0 ? Math.round((closedEffective / closedTotal) * 100) : 0;

  return (
    <div style={{ animation: "fadeIn 0.4s ease" }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:16, marginBottom:24 }}>
        <Metric icon={Shield} label="Total CAPAs" value={capaRecords.length} color={B.teal}/>
        <Metric icon={Flag} label="Open" value={capaRecords.filter(c=>c.status==="open").length} color={B.danger}/>
        <Metric icon={Activity} label="In Progress" value={capaRecords.filter(c=>c.status==="in-progress").length} color={B.info}/>
        <Metric icon={CheckCircle} label="Closed" value={closedTotal} color={B.success}/>
        <Metric icon={Target} label="Effectiveness Rate" value={`${effectivenessRate}%`} color={B.purple}/>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
        {capaRecords.map(c => {
          const pct = c.actions > 0 ? Math.round((c.completed / c.actions) * 100) : 0;
          const ms = capaMilestones[c.id];
          const isExpanded = expandedCapa === c.id;
          return (
            <div key={c.id}>
              <div style={{ ...glass, display:"flex", alignItems:"center", gap:20, cursor:"pointer" }} onClick={()=>setExpandedCapa(isExpanded?null:c.id)}>
                <div style={{ width:120 }}>
                  <p style={{ fontSize:14, fontWeight:700, fontFamily:"'Montserrat', sans-serif", color:B.primary, margin:0 }}>{c.id}</p>
                  <p style={{ fontSize:10, color:B.textMuted, margin:"2px 0 0" }}>Linked: {c.ncr}</p>
                </div>
                <div style={{ flex:1 }}>
                  <p style={{ fontSize:13, fontWeight:600, margin:0 }}>{c.title}</p>
                  <p style={{ fontSize:11, color:B.textMuted, margin:"4px 0 0" }}>Owner: {c.owner} · Due: {c.dueDate}</p>
                  {c.effectiveness && <p style={{ fontSize:11, color:B.success, margin:"4px 0 0" }}>{c.effectiveness}</p>}
                </div>
                <div style={{ width:160 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                    <span style={{ fontSize:11, color:B.textMuted }}>Actions: {c.completed}/{c.actions}</span>
                    <span style={{ fontSize:11, fontWeight:600, color:pct===100?B.success:B.teal }}>{pct}%</span>
                  </div>
                  <div style={{ height:6, background:B.surface, borderRadius:3, overflow:"hidden" }}>
                    <div style={{ width:`${pct}%`, height:"100%", background:pct===100?B.success:B.primary, borderRadius:3 }}/>
                  </div>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <Badge color={c.type==="Corrective"?B.danger:B.info}>{c.type}</Badge>
                  <StatusBadge status={c.status}/>
                  {ms && (isExpanded?<ChevronUp size={14} color={B.textMuted}/>:<ChevronDown size={14} color={B.textMuted}/>)}
                </div>
              </div>
              {isExpanded && ms && (
                <div style={{ ...glassSm, marginTop:4, padding:"16px 24px", display:"flex", alignItems:"center" }}>
                  {ms.map((m,i)=>{
                    const isLast = i===ms.length-1;
                    const isCurrent = m.done && (isLast || !ms[i+1].done);
                    return (
                      <div key={i} style={{ display:"flex", alignItems:"center", flex:isLast?"none":1 }}>
                        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
                          <div style={{ width:20, height:20, borderRadius:"50%", background:m.done?(isCurrent?B.teal:B.success):B.surface, border:`2px solid ${m.done?(isCurrent?B.teal:B.success):B.border}`, display:"flex", alignItems:"center", justifyContent:"center", animation:isCurrent?"pulse 2s infinite":"none" }}>
                            {m.done && <Check size={10} color="#fff"/>}
                          </div>
                          <span style={{ fontSize:9, color:m.done?B.text:B.textMuted, fontWeight:m.done?600:400, textAlign:"center", maxWidth:80, fontFamily:"'Montserrat', sans-serif" }}>{m.step}</span>
                        </div>
                        {!isLast && <div style={{ flex:1, height:2, background:ms[i+1].done?B.success:B.border, margin:"0 4px", marginBottom:20 }}/>}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SPC
// ═══════════════════════════════════════════════════════════════════════════
function SPCPage() {
  const tip = { background:"#fff", border:`1px solid ${B.border}`, borderRadius:10, fontSize:12, boxShadow:B.tipShadow };
  return (
    <div style={{ animation:"fadeIn 0.4s ease" }}>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
        <Section icon={Activity} title="SPC — Bore Diameter (mm) · Cylinder Head CH-250">
          <div style={{ height:280 }}><ResponsiveContainer>
            <LineChart data={spcData}>
              <CartesianGrid strokeDasharray="3 3" stroke={B.borderLight}/>
              <XAxis dataKey="sample" tick={{ fill:B.textMuted, fontSize:10 }} axisLine={{ stroke:B.border }}/>
              <YAxis tick={{ fill:B.textMuted, fontSize:10 }} axisLine={{ stroke:B.border }} domain={[24.5,25.5]}/>
              <Tooltip contentStyle={tip}/>
              <Line type="monotone" dataKey="ucl" stroke={B.danger} strokeWidth={1} strokeDasharray="6 4" dot={false} name="UCL (25.3)"/>
              <Line type="monotone" dataKey="lcl" stroke={B.danger} strokeWidth={1} strokeDasharray="6 4" dot={false} name="LCL (24.7)"/>
              <Line type="monotone" dataKey="target" stroke={B.accent} strokeWidth={1} strokeDasharray="3 3" dot={false} name="Target (25.0)"/>
              <Line type="monotone" dataKey="value" stroke={B.teal} strokeWidth={2.5} dot={{ fill:B.teal, r:3.5, strokeWidth:0 }} activeDot={{ r:5, fill:B.teal }} name="Measured"/>
              <Legend wrapperStyle={{ fontSize:10 }}/>
            </LineChart>
          </ResponsiveContainer></div>
        </Section>
        <Section icon={TrendingUp} title="NC Type Distribution (6 months)">
          <div style={{ height:280 }}><ResponsiveContainer>
            <AreaChart data={ncrTrend}>
              <defs>
                <linearGradient id="prodGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={B.danger} stopOpacity={0.2}/><stop offset="100%" stopColor={B.danger} stopOpacity={0}/></linearGradient>
                <linearGradient id="procGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={B.accent} stopOpacity={0.2}/><stop offset="100%" stopColor={B.accent} stopOpacity={0}/></linearGradient>
                <linearGradient id="suppGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={B.info} stopOpacity={0.2}/><stop offset="100%" stopColor={B.info} stopOpacity={0}/></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={B.borderLight}/>
              <XAxis dataKey="month" tick={{ fill:B.textMuted, fontSize:11 }} axisLine={{ stroke:B.border }}/>
              <YAxis tick={{ fill:B.textMuted, fontSize:11 }} axisLine={{ stroke:B.border }}/>
              <Tooltip contentStyle={tip}/>
              <Area type="monotone" dataKey="product" stroke={B.danger} fill="url(#prodGrad)" strokeWidth={2} name="Product"/>
              <Area type="monotone" dataKey="process" stroke={B.accent} fill="url(#procGrad)" strokeWidth={2} name="Process"/>
              <Area type="monotone" dataKey="supplier" stroke={B.info} fill="url(#suppGrad)" strokeWidth={2} name="Supplier"/>
              <Legend wrapperStyle={{ fontSize:11 }}/>
            </AreaChart>
          </ResponsiveContainer></div>
        </Section>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"0.6fr 1.4fr", gap:16, marginBottom:16 }}>
        <Section icon={Gauge} title="Process Capability (Cpk)">
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", padding:"10px 0" }}>
            <div style={{ height:140, width:"100%" }}><ResponsiveContainer>
              <PieChart>
                <Pie data={[{value:1.42},{value:0.58}]} cx="50%" cy="90%" startAngle={180} endAngle={0} innerRadius={55} outerRadius={75} dataKey="value" stroke="none">
                  <Cell fill={B.success}/><Cell fill={B.surface}/>
                </Pie>
              </PieChart>
            </ResponsiveContainer></div>
            <div style={{ textAlign:"center", marginTop:-20 }}>
              <p style={{ fontSize:28, fontWeight:700, fontFamily:"'Montserrat', sans-serif", color:B.success, margin:0 }}>1.42</p>
              <p style={{ fontSize:10, color:B.textMuted, margin:"4px 0 8px" }}>Bore Diameter · CH-250</p>
            </div>
            <div style={{ display:"flex", gap:20 }}>
              <div style={{ textAlign:"center" }}>
                <p style={{ fontSize:10, color:B.textMuted, margin:0, textTransform:"uppercase", fontWeight:600, letterSpacing:"0.5px", fontFamily:"'Montserrat', sans-serif" }}>Ppk</p>
                <p style={{ fontSize:18, fontWeight:700, color:B.success, margin:0, fontFamily:"'Montserrat', sans-serif" }}>1.38</p>
              </div>
              <div style={{ width:1, background:B.border }}/>
              <div style={{ textAlign:"center" }}>
                <p style={{ fontSize:10, color:B.textMuted, margin:0, textTransform:"uppercase", fontWeight:600, letterSpacing:"0.5px", fontFamily:"'Montserrat', sans-serif" }}>Status</p>
                <Badge color={B.success}>Capable</Badge>
              </div>
            </div>
          </div>
        </Section>
        <Section icon={TrendingUp} title="Yield Trend (6 months)" action={<Badge color={B.success}>FPY: 97.8%</Badge>}>
          <div style={{ height:260 }}><ResponsiveContainer>
            <LineChart data={yieldTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke={B.borderLight}/>
              <XAxis dataKey="month" tick={{ fill:B.textMuted, fontSize:11 }} axisLine={{ stroke:B.border }}/>
              <YAxis yAxisId="fpy" domain={[94,100]} tick={{ fill:B.textMuted, fontSize:10 }} axisLine={{ stroke:B.border }}/>
              <YAxis yAxisId="rate" orientation="right" domain={[0,5]} tick={{ fill:B.textMuted, fontSize:10 }} axisLine={{ stroke:B.border }}/>
              <Tooltip contentStyle={tip}/>
              <Line yAxisId="fpy" type="monotone" dataKey="fpy" stroke={B.teal} strokeWidth={2.5} dot={{ fill:B.teal, r:4 }} name="First Pass Yield %"/>
              <Line yAxisId="rate" type="monotone" dataKey="reworkRate" stroke={B.accent} strokeWidth={1.5} strokeDasharray="4 4" dot={{ r:3, fill:B.accent }} name="Rework Rate %"/>
              <Line yAxisId="rate" type="monotone" dataKey="scrapRate" stroke={B.danger} strokeWidth={1.5} strokeDasharray="4 4" dot={{ r:3, fill:B.danger }} name="Scrap Rate %"/>
              <Legend wrapperStyle={{ fontSize:10 }}/>
            </LineChart>
          </ResponsiveContainer></div>
        </Section>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
        <Section icon={TrendingUp} title="Cost of Poor Quality (Lakhs)">
          <div style={{ height:260 }}><ResponsiveContainer>
            <AreaChart data={costOfQuality}>
              <defs><linearGradient id="coq2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={B.danger} stopOpacity={0.25}/><stop offset="100%" stopColor={B.danger} stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke={B.borderLight}/>
              <XAxis dataKey="month" tick={{ fill:B.textMuted, fontSize:11 }} axisLine={{ stroke:B.border }}/>
              <YAxis tick={{ fill:B.textMuted, fontSize:11 }} axisLine={{ stroke:B.border }}/>
              <Tooltip contentStyle={tip}/>
              <Area type="monotone" dataKey="internal" stroke={B.danger} fill="url(#coq2)" strokeWidth={2} name="Internal Failure"/>
              <Area type="monotone" dataKey="external" stroke={B.accent} fill="none" strokeWidth={2} strokeDasharray="4 4" name="External Failure"/>
              <Line type="monotone" dataKey="prevention" stroke={B.success} strokeWidth={2} dot={{ r:3, fill:B.success }} name="Prevention Cost"/>
              <Line type="monotone" dataKey="appraisal" stroke={B.info} strokeWidth={1.5} dot={false} name="Appraisal Cost"/>
              <Legend wrapperStyle={{ fontSize:10 }}/>
            </AreaChart>
          </ResponsiveContainer></div>
        </Section>
        <Section icon={BarChart3} title="Top Defect Categories (Pareto)">
          <div style={{ height:260 }}><ResponsiveContainer>
            <BarChart data={defectPareto}>
              <CartesianGrid strokeDasharray="3 3" stroke={B.borderLight}/>
              <XAxis dataKey="defect" tick={{ fill:B.textMuted, fontSize:9, angle:-20 }} axisLine={{ stroke:B.border }} interval={0} height={50}/>
              <YAxis tick={{ fill:B.textMuted, fontSize:10 }} axisLine={{ stroke:B.border }}/>
              <Tooltip contentStyle={tip}/>
              <Bar dataKey="count" fill={B.primary} radius={[6,6,0,0]} name="Occurrences"/>
            </BarChart>
          </ResponsiveContainer></div>
        </Section>
      </div>
      <Section icon={Truck} title="Supplier Performance Comparison" action={<Badge>Q1 2025</Badge>}>
        <div style={{ height:260 }}><ResponsiveContainer>
          <BarChart data={supplierComparisonData} layout="vertical" barGap={2}>
            <CartesianGrid strokeDasharray="3 3" stroke={B.borderLight}/>
            <XAxis type="number" domain={[0,100]} tick={{ fill:B.textMuted, fontSize:10 }} axisLine={{ stroke:B.border }}/>
            <YAxis dataKey="name" type="category" tick={{ fill:B.textMuted, fontSize:10 }} axisLine={{ stroke:B.border }} width={120}/>
            <Tooltip contentStyle={tip}/>
            <Bar dataKey="quality" fill={B.primary} name="Quality" radius={[0,4,4,0]}/>
            <Bar dataKey="delivery" fill={B.info} name="Delivery" radius={[0,4,4,0]}/>
            <Bar dataKey="cost" fill={B.accent} name="Cost" radius={[0,4,4,0]}/>
            <Legend wrapperStyle={{ fontSize:10 }}/>
          </BarChart>
        </ResponsiveContainer></div>
      </Section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// INSPECTIONS
// ═══════════════════════════════════════════════════════════════════════════
function InspectionsPage() {
  const resultColors = { pass:B.success, fail:B.danger, conditional:B.accent };
  const resultLabels = { pass:"PASS", fail:"FAIL", conditional:"CONDITIONAL" };
  const dueCount = inspectionSchedule.filter(i=>i.status==="due").length;
  const passCount = inspectionHistory.filter(h=>h.result==="pass").length;

  return (
    <div style={{ animation:"fadeIn 0.4s ease" }}>
      <div style={{ ...glassSm, display:"flex", gap:32, marginBottom:16, alignItems:"center" }}>
        {[
          { label:"Scheduled", value:inspectionSchedule.length, color:B.primary },
          { label:"Due Now", value:dueCount, color:B.accent },
          { label:"Completed (Recent)", value:inspectionHistory.length, color:B.info },
          { label:"Pass Rate", value:`${Math.round((passCount/inspectionHistory.length)*100)}%`, color:B.success },
        ].map((s,i)=>(
          <div key={i} style={{ textAlign:"center" }}>
            <p style={{ fontSize:10, color:B.textMuted, textTransform:"uppercase", letterSpacing:"0.5px", fontFamily:"'Montserrat', sans-serif", fontWeight:600, margin:"0 0 4px" }}>{s.label}</p>
            <p style={{ fontSize:20, fontWeight:700, color:s.color, fontFamily:"'Montserrat', sans-serif", margin:0 }}>{s.value}</p>
          </div>
        ))}
      </div>
      <Section icon={ClipboardList} title="Inspection Schedule" action={<button style={btn}><Plus size={14}/> Schedule Inspection</button>}>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {inspectionSchedule.map(ins=>(
            <div key={ins.id} style={{ ...glassSm, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                <div style={{ width:40, height:40, borderRadius:10, background:ins.status==="due"?`${B.accent}20`:`${B.teal}15`, display:"flex", alignItems:"center", justifyContent:"center", border:`1px solid ${ins.status==="due"?B.accent:B.teal}25` }}>
                  <ClipboardList size={18} color={ins.status==="due"?B.accent:B.teal}/>
                </div>
                <div>
                  <p style={{ fontSize:13, fontWeight:600, fontFamily:"'Montserrat', sans-serif", margin:0 }}>{ins.id} — {ins.type} Inspection</p>
                  <p style={{ fontSize:11, color:B.textMuted, margin:"2px 0 0" }}>{ins.area} · Frequency: {ins.freq}</p>
                </div>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:16 }}>
                <div style={{ textAlign:"right" }}>
                  <p style={{ fontSize:12, fontWeight:500, margin:0 }}>{ins.nextDue}</p>
                  <p style={{ fontSize:10, color:B.textMuted, margin:0 }}>Next Due</p>
                </div>
                <StatusBadge status={ins.status}/>
              </div>
            </div>
          ))}
        </div>
      </Section>
      <div style={{ marginTop:16 }}>
        <Section icon={Archive} title="Recent Completion History">
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"separate", borderSpacing:"0 4px" }}>
              <thead><tr>{["ID","Type","Area","Date","Result","Findings","Inspector"].map(h=><TH key={h}>{h}</TH>)}</tr></thead>
              <tbody>{inspectionHistory.map(h=>(
                <tr key={h.id}>
                  <TD style={{ fontWeight:700, fontFamily:"'Montserrat', sans-serif", color:B.primary }}>{h.id}</TD>
                  <TD style={{ fontSize:11 }}>{h.type}</TD>
                  <TD style={{ fontSize:11, color:B.textMuted }}>{h.area}</TD>
                  <TD style={{ fontSize:11 }}>{h.date}</TD>
                  <TD><Badge color={resultColors[h.result]||B.textMuted}>{resultLabels[h.result]||h.result}</Badge></TD>
                  <TD style={{ fontSize:11, maxWidth:250 }}>{h.findings}</TD>
                  <TD style={{ fontSize:11 }}>{h.inspector}</TD>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </Section>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// RAISE NCR
// ═══════════════════════════════════════════════════════════════════════════
function NewNCRPage() {
  const blank = { title:"", partName:"", partNumber:"", type:"", source:"", severity:"", dept:"", assignee:"", dueDate:"", defectQty:"", batchQty:"", lotNumber:"", drawingRef:"", inspectionMethod:"", measurementActual:"", measurementSpec:"", disposition:"", containment:"", description:"" };
  const [values, setValues] = useState(blank);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const fields = [
    { name:"title", label:"NC Title", required:true, placeholder:"Brief description of non-conformance" },
    { name:"partName", label:"Part / Component Name", required:true, placeholder:"e.g. Cylinder Block CB-400" },
    { name:"partNumber", label:"Part Number", required:true, placeholder:"e.g. CA-CB-4001" },
    { name:"type", label:"NC Type", type:"select", required:true, options:[{value:"Product",label:"Product Non-Conformance"},{value:"Process",label:"Process Non-Conformance"},{value:"Supplier",label:"Supplier Non-Conformance"},{value:"Customer",label:"Customer Complaint"}] },
    { name:"source", label:"Detection Source", type:"select", required:true, options:["Incoming Inspection","In-Process Inspection","Final Inspection","SPC Alert","CMM Measurement","Lab Testing","Customer Feedback","Internal Audit","Operator Report"] },
    { name:"severity", label:"Severity", type:"select", required:true, options:[{value:"critical",label:"Critical — Safety / Regulatory risk"},{value:"major",label:"Major — Functional impact"},{value:"minor",label:"Minor — Cosmetic / Documentation"}] },
    { name:"dept", label:"Responsible Department", type:"select", required:true, options:["CNC Machining","Precision Grinding","Heat Treatment","Assembly","Paint & Coating","Welding & Fabrication","Quality","Stores / Incoming","Supplier"] },
    { name:"assignee", label:"Assigned To", required:true, placeholder:"Name of responsible person" },
    { name:"dueDate", label:"Response Due Date", type:"date", required:true },
    { name:"defectQty", label:"Defective Quantity", type:"number", required:true, placeholder:"Number of defective units" },
    { name:"batchQty", label:"Batch / Lot Quantity", type:"number", required:true, placeholder:"Total units in batch" },
    { name:"lotNumber", label:"Lot / Batch Number", placeholder:"e.g. LOT-2025-03-0147" },
    { name:"drawingRef", label:"Drawing / Spec Reference", placeholder:"e.g. DWG-CB-4001 Rev C" },
    { name:"inspectionMethod", label:"Inspection Method Used", type:"select", options:["Visual Inspection","CMM","Surface Profilometer","Hardness Tester","Go/No-Go Gauge","Micrometer","Dial Indicator","Lab Analysis","Functional Test"] },
    { name:"measurementSpec", label:"Specified Value / Tolerance", placeholder:"e.g. 25.0 +/- 0.15 mm" },
    { name:"measurementActual", label:"Actual Measured Value", placeholder:"e.g. 25.42 mm" },
    { name:"disposition", label:"Immediate Disposition", type:"select", required:true, options:[{value:"Hold",label:"Hold — Quarantine pending review"},{value:"Rework",label:"Rework — Can be corrected"},{value:"Scrap",label:"Scrap — Cannot be salvaged"},{value:"Use As-Is",label:"Use As-Is — Accept with deviation"},{value:"Reject & Return",label:"Reject and Return — Supplier material"},{value:"Pending",label:"Pending — Investigation needed"}] },
    { name:"containment", label:"Immediate Containment Action", type:"textarea", placeholder:"What immediate steps were taken?" },
    { name:"description", label:"Detailed Description", type:"textarea", rows:4, required:true, placeholder:"Describe what was found, when, where, how many affected..." },
  ];

  const handleChange = (n,v) => { setValues(p=>({...p,[n]:v})); if(errors[n]) setErrors(p=>{const e={...p};delete e[n];return e;}); };
  const handleSubmit = () => { const errs=validate(fields,values); setErrors(errs); if(Object.keys(errs).length===0) setSubmitted(true); };

  if (submitted) return (
    <div style={{ animation:"fadeIn 0.4s ease", display:"flex", alignItems:"center", justifyContent:"center", minHeight:400 }}>
      <div style={{ ...glass, textAlign:"center", maxWidth:480 }}>
        <div style={{ width:64, height:64, borderRadius:"50%", background:`${B.success}20`, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
          <CheckCircle size={32} color={B.success}/>
        </div>
        <h3 style={{ fontSize:20, fontWeight:700, fontFamily:"'Montserrat', sans-serif", marginBottom:8 }}>NCR Submitted Successfully</h3>
        <p style={{ fontSize:13, color:B.textMuted, marginBottom:6 }}><strong style={{ color:B.primary }}>NCR-2025-{String(148+Math.floor(Math.random()*10)).padStart(4,"0")}</strong></p>
        <p style={{ fontSize:12, color:B.textMuted, marginBottom:20 }}><strong style={{ color:B.text }}>{values.title}</strong><br/>Assigned to {values.assignee} · Due: {values.dueDate}</p>
        <button onClick={()=>{setSubmitted(false);setValues(blank);}} style={btn}><Plus size={14}/> Raise Another NCR</button>
      </div>
    </div>
  );

  return (
    <div style={{ animation:"fadeIn 0.4s ease" }}>
      <div style={glass}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20 }}>
          <Flag size={18} color={B.teal}/><h3 style={{ fontSize:15, fontWeight:700, fontFamily:"'Montserrat', sans-serif", margin:0 }}>Raise Non-Conformance Report</h3><Badge color={B.danger}>New</Badge>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 24px" }}>
          {fields.map(f=>(
            <div key={f.name} style={f.type==="textarea"?{gridColumn:"1 / -1"}:{}}>
              <FormField {...f} value={values[f.name]} onChange={handleChange} error={errors[f.name]}/>
            </div>
          ))}
        </div>
        <div style={{ display:"flex", gap:12, marginTop:8, justifyContent:"flex-end" }}>
          <button style={btnGhost}><X size={14}/> Cancel</button>
          <button style={{ ...btn, background:B.surface }}><Save size={14}/> Save Draft</button>
          <button onClick={handleSubmit} style={btn}><Send size={14}/> Submit NCR</button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// NEW CAPA
// ═══════════════════════════════════════════════════════════════════════════
function NewCAPAPage() {
  const blank = { linkedNCR:"", type:"", title:"", owner:"", dueDate:"", rootCause:"", rootCauseMethod:"", action1:"", action1Owner:"", action1Due:"", action2:"", action2Owner:"", action2Due:"", action3:"", action3Owner:"", action3Due:"", verification:"", effectivenessCheck:"" };
  const [values, setValues] = useState(blank);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const fields = [
    { name:"linkedNCR", label:"Linked NCR", type:"select", required:true, options:ncReports.filter(n=>n.status!=="closed").map(n=>({value:n.id,label:`${n.id} — ${n.title}`})) },
    { name:"type", label:"CAPA Type", type:"select", required:true, options:[{value:"Corrective",label:"Corrective Action"},{value:"Preventive",label:"Preventive Action"}] },
    { name:"title", label:"CAPA Title", required:true, placeholder:"Brief description of corrective/preventive action" },
    { name:"owner", label:"CAPA Owner", required:true, placeholder:"Person responsible for closure" },
    { name:"dueDate", label:"Target Completion Date", type:"date", required:true },
    { name:"rootCauseMethod", label:"Root Cause Method", type:"select", options:["5 Why Analysis","Fishbone / Ishikawa","Fault Tree Analysis","8D","FMEA Review","Other"] },
    { name:"rootCause", label:"Root Cause Analysis", type:"textarea", required:true, rows:3, placeholder:"Describe the identified root cause..." },
    { name:"action1", label:"Action Item 1", required:true, placeholder:"Describe corrective/preventive action" },
    { name:"action1Owner", label:"Action 1 Owner", placeholder:"Responsible person" },
    { name:"action1Due", label:"Action 1 Due Date", type:"date" },
    { name:"action2", label:"Action Item 2", placeholder:"Optional second action" },
    { name:"action2Owner", label:"Action 2 Owner", placeholder:"Responsible person" },
    { name:"action2Due", label:"Action 2 Due Date", type:"date" },
    { name:"action3", label:"Action Item 3", placeholder:"Optional third action" },
    { name:"action3Owner", label:"Action 3 Owner", placeholder:"Responsible person" },
    { name:"action3Due", label:"Action 3 Due Date", type:"date" },
    { name:"verification", label:"Verification Method", type:"textarea", placeholder:"How will you verify the action was implemented?" },
    { name:"effectivenessCheck", label:"Effectiveness Check Plan", type:"textarea", placeholder:"How will you confirm the problem does not recur?" },
  ];

  const handleChange = (n,v) => { setValues(p=>({...p,[n]:v})); if(errors[n]) setErrors(p=>{const e={...p};delete e[n];return e;}); };
  const handleSubmit = () => { const errs=validate(fields,values); setErrors(errs); if(Object.keys(errs).length===0) setSubmitted(true); };

  if (submitted) return (
    <div style={{ animation:"fadeIn 0.4s ease", display:"flex", alignItems:"center", justifyContent:"center", minHeight:400 }}>
      <div style={{ ...glass, textAlign:"center", maxWidth:480 }}>
        <div style={{ width:64, height:64, borderRadius:"50%", background:`${B.success}20`, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
          <CheckCircle size={32} color={B.success}/>
        </div>
        <h3 style={{ fontSize:20, fontWeight:700, fontFamily:"'Montserrat', sans-serif", marginBottom:8 }}>CAPA Created</h3>
        <p style={{ fontSize:13, color:B.textMuted, marginBottom:20 }}><strong style={{ color:B.primary }}>CAPA-2025-{String(33+Math.floor(Math.random()*10)).padStart(3,"0")}</strong> linked to {values.linkedNCR}</p>
        <button onClick={()=>{setSubmitted(false);setValues(blank);}} style={btn}><Plus size={14}/> Create Another CAPA</button>
      </div>
    </div>
  );

  return (
    <div style={{ animation:"fadeIn 0.4s ease" }}>
      <div style={glass}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20 }}>
          <Target size={18} color={B.teal}/><h3 style={{ fontSize:15, fontWeight:700, fontFamily:"'Montserrat', sans-serif", margin:0 }}>Initiate CAPA</h3><Badge color={B.purple}>New</Badge>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 24px" }}>
          {fields.map(f=>(
            <div key={f.name} style={f.type==="textarea"?{gridColumn:"1 / -1"}:{}}>
              <FormField {...f} value={values[f.name]} onChange={handleChange} error={errors[f.name]}/>
            </div>
          ))}
        </div>
        <div style={{ display:"flex", gap:12, marginTop:8, justifyContent:"flex-end" }}>
          <button style={btnGhost}><X size={14}/> Cancel</button>
          <button onClick={handleSubmit} style={btn}><Send size={14}/> Initiate CAPA</button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SETTINGS
// ═══════════════════════════════════════════════════════════════════════════
function SettingsPage() {
  const [tab, setTab] = useState("general");
  const tabs = [{ id:"general", label:"General", icon:Settings }, { id:"workflow", label:"Workflow Rules", icon:Sliders }, { id:"notifications", label:"Notifications", icon:Bell }, { id:"users", label:"Users & Roles", icon:Users }];

  return (
    <div style={{ animation:"fadeIn 0.4s ease" }}>
      <div style={{ display:"flex", gap:8, marginBottom:20 }}>
        {tabs.map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{ ...btn, padding:"8px 16px", fontSize:12, background:tab===t.id?B.primary:B.surface, color:tab===t.id?"#fff":B.textMuted }}><t.icon size={14}/> {t.label}</button>)}
      </div>
      <div style={glass}>
        {tab==="general" && (
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}><Settings size={18} color={B.teal}/><h3 style={{ fontSize:15, fontWeight:700, fontFamily:"'Montserrat', sans-serif", margin:0 }}>General Settings</h3></div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 24px" }}>
              <FormField label="Plant Name" name="plant" value={config.brand.plantName} onChange={()=>{}}/>
              <FormField label="QMS Standard" name="qms" type="select" value="ISO 9001:2015" onChange={()=>{}} options={["ISO 9001:2015","IATF 16949","AS9100D","ISO 13485"]}/>
              <FormField label="NCR Auto-Number Prefix" name="prefix" value="NCR-2025-" onChange={()=>{}}/>
              <FormField label="CAPA Auto-Number Prefix" name="capaPrefix" value="CAPA-2025-" onChange={()=>{}}/>
              <FormField label="Default NCR Response Time" name="response" type="select" value="7 days" onChange={()=>{}} options={["3 days","5 days","7 days","14 days"]}/>
              <FormField label="CAPA Effectiveness Review Period" name="review" type="select" value="30 days" onChange={()=>{}} options={["30 days","60 days","90 days"]}/>
            </div>
            <div style={{ display:"flex", justifyContent:"flex-end", marginTop:12 }}><button style={btn}><Save size={14}/> Save Settings</button></div>
          </div>
        )}
        {tab==="workflow" && (
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}><Sliders size={18} color={B.teal}/><h3 style={{ fontSize:15, fontWeight:700, fontFamily:"'Montserrat', sans-serif", margin:0 }}>Workflow and Escalation Rules</h3></div>
            {[
              { rule:"Critical NCR auto-escalation", condition:"Severity = Critical and no response in 24 hrs", action:"Escalate to Plant Head + email notification", active:true },
              { rule:"CAPA overdue alert", condition:"CAPA due date exceeded", action:"Daily reminder to owner + notify QA Manager", active:true },
              { rule:"Auto-close verification", condition:"CAPA verification complete + 30 days no recurrence", action:"Auto-close CAPA, notify stakeholders", active:true },
              { rule:"Supplier NC auto-route", condition:"NC Type = Supplier", action:"Route to Incoming Quality + Procurement", active:false },
            ].map((r,i)=>(
              <div key={i} style={{ ...glassSm, marginBottom:8, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <div>
                  <p style={{ fontSize:13, fontWeight:600, margin:0 }}>{r.rule}</p>
                  <p style={{ fontSize:11, color:B.textMuted, margin:"2px 0 0" }}>When: {r.condition}</p>
                  <p style={{ fontSize:11, color:B.textMuted, margin:"2px 0 0" }}>Then: {r.action}</p>
                </div>
                <Badge color={r.active?B.success:B.textMuted}>{r.active?"Active":"Disabled"}</Badge>
              </div>
            ))}
          </div>
        )}
        {tab==="notifications" && (
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}><Bell size={18} color={B.teal}/><h3 style={{ fontSize:15, fontWeight:700, fontFamily:"'Montserrat', sans-serif", margin:0 }}>Notification Preferences</h3></div>
            {[
              { event:"New NCR raised", email:true, sms:false, app:true },
              { event:"NCR assigned to me", email:true, sms:true, app:true },
              { event:"CAPA due date approaching", email:true, sms:false, app:true },
              { event:"Critical NCR escalation", email:true, sms:true, app:true },
              { event:"CAPA effectiveness review due", email:true, sms:false, app:true },
            ].map((n,i)=>(
              <div key={i} style={{ ...glassSm, marginBottom:8, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <span style={{ fontSize:13, fontWeight:500 }}>{n.event}</span>
                <div style={{ display:"flex", gap:12 }}>
                  {["Email","SMS","In-App"].map((ch,j)=>{const on=[n.email,n.sms,n.app][j];return <span key={ch} style={{ fontSize:11, color:on?B.success:B.textMuted, fontWeight:600 }}>{on?"Y":"N"} {ch}</span>;})}
                </div>
              </div>
            ))}
          </div>
        )}
        {tab==="users" && (
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}><Users size={18} color={B.teal}/><h3 style={{ fontSize:15, fontWeight:700, fontFamily:"'Montserrat', sans-serif", margin:0 }}>Users and Access Control</h3></div>
            {users.map((u,i)=>(
              <div key={i} style={{ ...glassSm, marginBottom:8, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ width:32, height:32, borderRadius:10, background:`${B.teal}20`, display:"flex", alignItems:"center", justifyContent:"center" }}><User size={14} color={B.teal}/></div>
                  <div><p style={{ fontSize:13, fontWeight:600, margin:0 }}>{u.name}</p><p style={{ fontSize:11, color:B.textMuted, margin:0 }}>{u.role} · {u.access}</p></div>
                </div>
                <Badge color={u.status==="active"?B.success:B.textMuted}>{u.status}</Badge>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// AI ASSISTANT
// ═══════════════════════════════════════════════════════════════════════════
function formatMarkdown(text) {
  return text.split("\n").map((line,i) => {
    let html = line.replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>").replace(/\*(.+?)\*/g,"<em>$1</em>");
    if (line.startsWith("- ")) html = `<span style="display:block;padding-left:12px">${html}</span>`;
    return <span key={i} dangerouslySetInnerHTML={{ __html: html + (i < text.split("\n").length-1 ? "<br/>" : "") }}/>;
  });
}

const aiResponses = [
  { keywords:["open ncr","ncr status","ncr summary","ncrs open"], text:()=>{const open=ncReports.filter(n=>n.status==="open").length,inv=ncReports.filter(n=>n.status==="investigation").length,co=ncReports.filter(n=>n.status==="capa-open").length,cl=ncReports.filter(n=>n.status==="closed").length;return `There are currently **${ncReports.length} NCRs** in the system:\n\n- **${open}** Open\n- **${inv}** Under Investigation\n- **${co}** CAPA Open\n- **${cl}** Closed`;}, chart:()=>({type:"bar",title:"NCR Status Breakdown",data:[{name:"Open",value:ncReports.filter(n=>n.status==="open").length,color:B.danger},{name:"Investigation",value:ncReports.filter(n=>n.status==="investigation").length,color:B.warning},{name:"CAPA Open",value:ncReports.filter(n=>n.status==="capa-open").length,color:B.purple},{name:"Closed",value:ncReports.filter(n=>n.status==="closed").length,color:B.success}]}) },
  { keywords:["defect","pareto","top defect"], text:()=>`**Defect Pareto (YTD):**\n\n${defectPareto.map((d,i)=>`${i+1}. **${d.defect}** — ${d.count} occurrences (${d.pct}%)`).join("\n")}`, chart:()=>({type:"horizontal-bar",title:"Defect Pareto (YTD)",data:defectPareto.map(d=>({name:d.defect,value:d.count}))}) },
  { keywords:["supplier","vendor","ppm"], text:()=>{const w=supplierScorecard.reduce((a,b)=>a.ppm>b.ppm?a:b),b2=supplierScorecard.reduce((a,b)=>a.ppm<b.ppm?a:b);return `**Supplier Quality Scorecard (Q1 2025):**\n\n${supplierScorecard.map(s=>`- **${s.supplier}** — Rating: **${s.rating}**, PPM: **${s.ppm}**`).join("\n")}\n\nBest: **${b2.supplier}** | Needs attention: **${w.supplier}**`;}, chart:()=>({type:"bar",title:"Supplier PPM Defect Rate",data:supplierScorecard.map(s=>({name:s.supplier.split(" ")[0],value:s.ppm,color:s.ppm>1500?B.danger:s.ppm>800?B.warning:B.success}))}) },
  { keywords:["capa","corrective","preventive"], text:()=>{const o=capaRecords.filter(c=>c.status==="open").length,ip=capaRecords.filter(c=>c.status==="in-progress").length,cl=capaRecords.filter(c=>c.status==="closed").length;return `**CAPA Summary (${capaRecords.length} total):**\n\n- **${o}** Open\n- **${ip}** In Progress\n- **${cl}** Closed\n\nOverall effectiveness rate: **92%**`;}, chart:()=>({type:"area",title:"CAPA Effectiveness Trend",data:capaEffectiveness}) },
  { keywords:["yield","fpy","first pass","scrap","rework"], text:()=>{const l=yieldTrendData[yieldTrendData.length-1];return `**Yield Performance (latest):**\n\n- First Pass Yield: **${l.fpy}%**\n- Rework Rate: **${l.reworkRate}%**\n- Scrap Rate: **${l.scrapRate}%**`;}, chart:()=>({type:"yield",title:"Yield Trend (6 Months)",data:yieldTrendData}) },
  { keywords:["cost","quality cost","coq"], text:()=>{const l=costOfQuality[costOfQuality.length-1];return `**Cost of Quality (latest month):**\n\n- Internal Failure: **₹${l.internal}L**\n- External Failure: **₹${l.external}L**\n- Prevention: **₹${l.prevention}L**\n- Appraisal: **₹${l.appraisal}L**`;}, chart:()=>({type:"line",title:"Cost of Quality Trend (Lakhs)",data:costOfQuality}) },
  { keywords:["department","dept breakdown"], text:()=>`**NC by Department:**\n\n${deptBreakdown.map(d=>`- **${d.name}**: ${d.value}%`).join("\n")}`, chart:()=>({type:"pie",title:"NC by Department",data:deptBreakdown}) },
  { keywords:["trend","monthly","ncr trend"], text:()=>`**NCR Trend (6 months):**\n\n${ncrTrend.map(m=>`- **${m.month}**: ${m.total} raised, ${m.closed} closed`).join("\n")}`, chart:()=>({type:"ncr-trend",title:"NCR Trend",data:ncrTrend}) },
  { keywords:["critical","urgent","escalation"], text:()=>{const c=ncReports.filter(n=>n.severity==="critical"&&n.status!=="closed");return c.length>0?`**${c.length} Critical NCRs open:**\n\n${c.map(n=>`- **${n.id}**: ${n.title} (${n.dept})`).join("\n")}`:"No critical NCRs currently open.";}, chart:null },
  { keywords:["alert","quality alert"], text:()=>`**Active Quality Alerts:**\n\n${qualityAlerts.map(a=>`- ${a.type==="critical"?"🔴":a.type==="warning"?"🟡":"🔵"} ${a.text}`).join("\n")}`, chart:null },
];

const defaultSuggestions = ["How many NCRs are open?","Show me the defect Pareto","What's the supplier quality status?","Show CAPA effectiveness","Cost of quality trend","What's the current yield?","Which department has most NCs?","Any critical NCRs?","Show quality alerts"];

function matchResponse(query) {
  const q = query.toLowerCase();
  for (const r of aiResponses) { if (r.keywords.some(k=>q.includes(k))) return r; }
  return null;
}

function AIChart({ chartData }) {
  if (!chartData) return null;
  const { type, title, data } = chartData;
  const tip = { background:"#fff", border:`1px solid ${B.border}`, borderRadius:10, fontSize:12, boxShadow:B.tipShadow };
  return (
    <div style={{ ...card, height:"100%" }}>
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16 }}>
        <BarChart3 size={16} color={B.primary}/><h4 style={{ fontSize:14, fontWeight:700, fontFamily:"'Montserrat', sans-serif", margin:0 }}>{title}</h4>
      </div>
      <div style={{ height:300 }}><ResponsiveContainer>
        {type==="bar" ? <BarChart data={data}><CartesianGrid strokeDasharray="3 3" stroke={B.borderLight}/><XAxis dataKey="name" tick={{ fill:B.textMuted, fontSize:10 }}/><YAxis tick={{ fill:B.textMuted, fontSize:10 }}/><Tooltip contentStyle={tip}/><Bar dataKey="value" radius={[6,6,0,0]}>{data.map((d,i)=><Cell key={i} fill={d.color||B.primary}/>)}</Bar></BarChart>
        : type==="horizontal-bar" ? <BarChart data={data} layout="vertical"><CartesianGrid strokeDasharray="3 3" stroke={B.borderLight}/><XAxis type="number" tick={{ fill:B.textMuted, fontSize:10 }}/><YAxis dataKey="name" type="category" tick={{ fill:B.textMuted, fontSize:10 }} width={100}/><Tooltip contentStyle={tip}/><Bar dataKey="value" fill={B.primary} radius={[0,6,6,0]}/></BarChart>
        : type==="pie" ? <PieChart><Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" stroke="none">{data.map((_,i)=><Cell key={i} fill={[B.danger,B.warning,B.info,B.purple,B.teal,B.textLight][i]}/>)}</Pie><Tooltip contentStyle={tip} formatter={v=>`${v}%`}/><Legend wrapperStyle={{ fontSize:11 }}/></PieChart>
        : type==="line" ? <AreaChart data={data}><CartesianGrid strokeDasharray="3 3" stroke={B.borderLight}/><XAxis dataKey="month" tick={{ fill:B.textMuted, fontSize:11 }}/><YAxis tick={{ fill:B.textMuted, fontSize:11 }}/><Tooltip contentStyle={tip}/><Area type="monotone" dataKey="internal" stroke={B.danger} fill={`${B.danger}20`} strokeWidth={2} name="Internal"/><Area type="monotone" dataKey="external" stroke={B.warning} fill="none" strokeWidth={1.5} strokeDasharray="4 4" name="External"/><Line type="monotone" dataKey="prevention" stroke={B.success} strokeWidth={2} dot={{ r:3 }} name="Prevention"/><Legend wrapperStyle={{ fontSize:10 }}/></AreaChart>
        : type==="yield" ? <LineChart data={data}><CartesianGrid strokeDasharray="3 3" stroke={B.borderLight}/><XAxis dataKey="month" tick={{ fill:B.textMuted, fontSize:11 }}/><YAxis yAxisId="fpy" domain={[94,100]} tick={{ fill:B.textMuted, fontSize:10 }}/><YAxis yAxisId="rate" orientation="right" domain={[0,5]} tick={{ fill:B.textMuted, fontSize:10 }}/><Tooltip contentStyle={tip}/><Line yAxisId="fpy" type="monotone" dataKey="fpy" stroke={B.teal} strokeWidth={2.5} dot={{ fill:B.teal, r:4 }} name="FPY %"/><Line yAxisId="rate" type="monotone" dataKey="reworkRate" stroke={B.warning} strokeWidth={1.5} strokeDasharray="4 4" dot={{ r:3 }} name="Rework %"/><Line yAxisId="rate" type="monotone" dataKey="scrapRate" stroke={B.danger} strokeWidth={1.5} strokeDasharray="4 4" dot={{ r:3 }} name="Scrap %"/><Legend wrapperStyle={{ fontSize:10 }}/></LineChart>
        : type==="ncr-trend" ? <BarChart data={data} barGap={2}><CartesianGrid strokeDasharray="3 3" stroke={B.borderLight}/><XAxis dataKey="month" tick={{ fill:B.textMuted, fontSize:11 }}/><YAxis tick={{ fill:B.textMuted, fontSize:11 }}/><Tooltip contentStyle={tip}/><Bar dataKey="product" stackId="a" fill={B.danger} name="Product"/><Bar dataKey="process" stackId="a" fill={B.warning} name="Process"/><Bar dataKey="supplier" stackId="a" fill={B.info} radius={[4,4,0,0]} name="Supplier"/><Legend wrapperStyle={{ fontSize:10 }}/></BarChart>
        : <BarChart data={data} barGap={2}><CartesianGrid strokeDasharray="3 3" stroke={B.borderLight}/><XAxis dataKey="month" tick={{ fill:B.textMuted, fontSize:11 }}/><YAxis tick={{ fill:B.textMuted, fontSize:11 }}/><Tooltip contentStyle={tip}/><Bar dataKey="initiated" fill={B.info} name="Initiated" radius={[4,4,0,0]}/><Bar dataKey="closedEffective" fill={B.success} name="Effective" radius={[4,4,0,0]}/><Bar dataKey="closedIneffective" fill={B.danger} name="Ineffective" radius={[4,4,0,0]}/><Legend wrapperStyle={{ fontSize:10 }}/></BarChart>
        }
      </ResponsiveContainer></div>
    </div>
  );
}

function AIChatPage() {
  const [messages, setMessages] = useState([{ role:"ai", text:"Hello! I'm your **Quality AI Assistant**. I can analyze NCRs, CAPAs, defect trends, supplier quality, yield data, and more.\n\nTry asking a question below, or click one of the suggestions.", chart:null }]);
  const [input, setInput] = useState("");
  const [activeChart, setActiveChart] = useState(null);
  const [typing, setTyping] = useState(false);
  const endRef = { current:null };

  useEffect(() => { if(endRef.current) endRef.current.scrollIntoView({ behavior:"smooth" }); }, [messages, typing]);

  const handleSend = (text) => {
    const q = text || input; if(!q.trim()) return;
    setInput(""); setMessages(p=>[...p,{role:"user",text:q}]); setTyping(true);
    setTimeout(()=>{
      const match = matchResponse(q);
      if(match) { const cd=match.chart?match.chart():null; setMessages(p=>[...p,{role:"ai",text:match.text(),chart:cd}]); setActiveChart(cd); }
      else { setMessages(p=>[...p,{role:"ai",text:"I can help with: **NCR status**, **Defect Pareto**, **Supplier quality**, **CAPA effectiveness**, **Cost of quality**, **Yield trends**, **Critical NCRs**, **Quality alerts**.\n\nTry one of the suggestions below!",chart:null}]); setActiveChart(null); }
      setTyping(false);
    }, 600+Math.random()*400);
  };

  return (
    <div style={{ animation:"fadeIn 0.35s ease", display:"flex", gap:16, height:"calc(100vh - 100px)" }}>
      <div style={{ flex:1, display:"flex", flexDirection:"column", ...card, padding:0, overflow:"hidden" }}>
        <div style={{ padding:"14px 20px", borderBottom:`1px solid ${B.border}`, display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:32, height:32, borderRadius:8, background:`${B.primary}10`, display:"flex", alignItems:"center", justifyContent:"center" }}><Bot size={16} color={B.primary}/></div>
          <div>
            <p style={{ fontSize:14, fontWeight:700, fontFamily:"'Montserrat', sans-serif", margin:0 }}>Quality AI Assistant</p>
            <p style={{ fontSize:10, color:B.success, margin:0, fontWeight:600 }}>Online — Analyzing plant data</p>
          </div>
          <Sparkles size={14} color={B.warning} style={{ marginLeft:"auto" }}/>
        </div>
        <div style={{ flex:1, overflow:"auto", padding:"16px 20px", display:"flex", flexDirection:"column", gap:12 }}>
          {messages.map((m,i)=>(
            <div key={i} style={{ display:"flex", justifyContent:m.role==="user"?"flex-end":"flex-start" }}>
              <div style={{ maxWidth:"85%", padding:"12px 16px", borderRadius:12, background:m.role==="user"?B.primary:B.surface, color:m.role==="user"?"#fff":B.text, fontSize:13, lineHeight:1.6, borderBottomRightRadius:m.role==="user"?4:12, borderBottomLeftRadius:m.role==="user"?12:4 }}>
                {m.role==="ai" && <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:6 }}><Bot size={12} color={B.primary}/><span style={{ fontSize:10, fontWeight:700, color:B.primary, fontFamily:"'Montserrat', sans-serif", textTransform:"uppercase", letterSpacing:"0.5px" }}>AI Assistant</span></div>}
                <div>{formatMarkdown(m.text)}</div>
                {m.chart && <button onClick={()=>setActiveChart(m.chart)} style={{ ...btnGhost, marginTop:8, padding:"5px 12px", fontSize:11 }}><BarChart3 size={12}/> View Chart</button>}
              </div>
            </div>
          ))}
          {typing && <div style={{ display:"flex", gap:4, padding:"12px 16px", background:B.surface, borderRadius:12, width:"fit-content", borderBottomLeftRadius:4 }}>{[0,1,2].map(i=><span key={i} style={{ width:6, height:6, borderRadius:"50%", background:B.textLight, animation:`pulse 1.2s ease ${i*0.2}s infinite` }}/>)}</div>}
          <div ref={el=>endRef.current=el}/>
        </div>
        {messages.length <= 2 && (
          <div style={{ padding:"0 20px 8px", display:"flex", flexWrap:"wrap", gap:6 }}>
            {defaultSuggestions.map((s,i)=><button key={i} onClick={()=>handleSend(s)} style={{ background:"#fff", border:`1px solid ${B.border}`, borderRadius:20, padding:"5px 12px", fontSize:11, color:B.darkSoft, cursor:"pointer" }} onMouseEnter={e=>{e.currentTarget.style.borderColor=B.primary;e.currentTarget.style.color=B.primary;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=B.border;e.currentTarget.style.color=B.darkSoft;}}>{s}</button>)}
          </div>
        )}
        <div style={{ padding:"12px 20px", borderTop:`1px solid ${B.border}`, display:"flex", gap:8, alignItems:"center" }}>
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();handleSend();}}} placeholder="Ask about NCRs, CAPAs, defects, suppliers, yield..." style={{ ...inp, flex:1, borderRadius:10, fontSize:13 }}/>
          <button onClick={()=>handleSend()} disabled={!input.trim()} style={{ ...btn, padding:"9px 14px", borderRadius:10, opacity:input.trim()?1:0.5 }}><Send size={14}/></button>
        </div>
      </div>
      <div style={{ width:420, flexShrink:0, display:"flex", flexDirection:"column", gap:16 }}>
        {activeChart ? <AIChart chartData={activeChart}/> : (
          <div style={{ ...card, height:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", padding:40 }}>
            <div style={{ width:56, height:56, borderRadius:14, background:`${B.primary}10`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:16 }}><BarChart3 size={24} color={B.primary}/></div>
            <h4 style={{ fontSize:15, fontWeight:700, fontFamily:"'Montserrat', sans-serif", marginBottom:8 }}>Charts & Insights</h4>
            <p style={{ fontSize:12, color:B.textMuted, lineHeight:1.6, maxWidth:260 }}>Ask a question and relevant charts will appear here. Try queries about defects, suppliers, trends, or costs.</p>
            <div style={{ display:"flex", flexDirection:"column", gap:6, marginTop:20, width:"100%" }}>
              {["Show defect Pareto","Supplier quality status","Cost of quality trend"].map((s,i)=><button key={i} onClick={()=>handleSend(s)} style={{ ...btnGhost, width:"100%", justifyContent:"center", fontSize:12 }}><Sparkles size={12}/> {s}</button>)}
            </div>
          </div>
        )}
        {activeChart && (
          <div style={{ ...cardSm, display:"flex", gap:16 }}>
            {[{label:"Open NCRs",value:ncReports.filter(n=>n.status!=="closed").length,color:B.danger},{label:"Open CAPAs",value:capaRecords.filter(c=>c.status!=="closed").length,color:B.purple},{label:"FPY",value:"97.8%",color:B.success}].map((s,i)=>(
              <div key={i} style={{ flex:1, textAlign:"center" }}>
                <p style={{ fontSize:9, color:B.textMuted, textTransform:"uppercase", fontWeight:600, fontFamily:"'Montserrat', sans-serif", letterSpacing:"0.4px", margin:"0 0 4px" }}>{s.label}</p>
                <p style={{ fontSize:18, fontWeight:700, color:s.color, fontFamily:"'Montserrat', sans-serif", margin:0 }}>{s.value}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

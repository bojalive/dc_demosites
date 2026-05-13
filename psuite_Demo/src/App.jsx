import { useState, useEffect, useCallback } from "react";
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ComposedChart
} from "recharts";
import {
  Activity, AlertTriangle, ArrowUp, ArrowDown, BarChart3, Bell,
  Clock, CheckCircle, ChevronRight, Award, Eye,
  Gauge, Menu, Plus, RefreshCw, Save, Search, Send,
  Settings, Shield, Target, TrendingUp, User, Users, Wrench, Zap,
  Factory, LayoutDashboard, ClipboardList, Flag, Building, Bot, Sparkles, Power, Flame
} from "lucide-react";
import { config } from "./config/customer";
import "./index.css";

// ── BRAND ────────────────────────────────────────────────────────────────
const C = {
  red: config.brand.primaryColor,
  redDark: config.brand.primaryDark,
  redLight: config.brand.primaryLight,
  dark: "#1A1A2E", darkSoft: "#374151",
  gray: "#6B7280", grayLight: "#9CA3AF",
  border: "#E5E7EB", borderLight: "#F3F4F6",
  bg: "#F8F9FB", white: "#FFFFFF", surface: "#F1F5F9",
  success: "#059669", successBg: "#ECFDF5",
  warning: "#D97706", warningBg: "#FFFBEB",
  danger: "#DC2626", dangerBg: "#FEF2F2",
  info: "#2563EB", infoBg: "#EFF6FF",
  purple: "#7C3AED", purpleBg: "#F5F3FF",
  teal: "#0D9488", tealBg: "#F0FDFA",
};
const CHART = [C.red, "#2563EB", "#059669", "#D97706", "#7C3AED", "#0D9488", "#EC4899"];

// ── DATA ─────────────────────────────────────────────────────────────────
const {
  productionLines, weeklyProduction, productMix, oeeShiftData, oeeByLine, downtimeReasons,
  departments, shiftPattern, skillMatrix, maintenanceOrders, equipmentHealth,
  energyDaily, energyByDept, safetyIncidents, safetyMetrics, ltiFreeDays,
  dashboardKpis, users, kpiTargets,
} = config.data;

// ── STYLES ────────────────────────────────────────────────────────────────
const card = { background: C.white, borderRadius: 14, border: `1px solid ${C.border}`, padding: 24, transition: "box-shadow 0.2s ease" };
const cardSm = { ...card, padding: 16, borderRadius: 10 };
const btnP = { background: C.red, color: "#fff", border: "none", borderRadius: 8, padding: "9px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Montserrat',sans-serif", display: "inline-flex", alignItems: "center", gap: 6, transition: "background 0.15s" };
const btnG = { ...btnP, background: C.surface, color: C.darkSoft, border: `1px solid ${C.border}` };
const inp = { background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: "9px 13px", color: C.dark, fontSize: 13, fontFamily: "'Open Sans',sans-serif", width: "100%", outline: "none" };
const lbl = { fontSize: 11, fontWeight: 600, color: C.gray, marginBottom: 5, display: "block", fontFamily: "'Montserrat',sans-serif", textTransform: "uppercase", letterSpacing: "0.5px" };
const tipStyle = { background: C.white, border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" };

// ── SMALL COMPONENTS ──────────────────────────────────────────────────────
const Badge = ({ children, color = C.red, bg }) => (
  <span style={{ background: bg || `${color}14`, color, fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20, fontFamily: "'Montserrat',sans-serif", textTransform: "uppercase", letterSpacing: "0.4px", whiteSpace: "nowrap" }}>{children}</span>
);

const KPI = ({ icon: Icon, label, value, suffix = "", change, up, color = C.red }) => (
  <div style={card} onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)"} onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <div>
        <p style={{ fontSize: 11, color: C.gray, textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 8, fontFamily: "'Montserrat',sans-serif", fontWeight: 600 }}>{label}</p>
        <p style={{ fontSize: 28, fontWeight: 700, color: C.dark, fontFamily: "'Montserrat',sans-serif", lineHeight: 1 }}>{value}<span style={{ fontSize: 14, color: C.gray, fontWeight: 500 }}>{suffix}</span></p>
        {change && <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8 }}>
          {up ? <ArrowUp size={12} color={C.success} /> : <ArrowDown size={12} color={C.danger} />}
          <span style={{ fontSize: 12, color: up ? C.success : C.danger, fontWeight: 600 }}>{change}</span>
          <span style={{ fontSize: 11, color: C.grayLight }}>vs prev</span>
        </div>}
      </div>
      <div style={{ width: 44, height: 44, borderRadius: 12, background: `${color}10`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon size={20} color={color} />
      </div>
    </div>
  </div>
);

const Sec = ({ icon: Icon, title, action, children }) => (
  <div style={card}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: `${C.red}10`, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon size={16} color={C.red} /></div>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: C.dark, fontFamily: "'Montserrat',sans-serif", margin: 0 }}>{title}</h3>
      </div>
      {action}
    </div>
    {children}
  </div>
);

const TH = ({ children }) => <th style={{ padding: "10px 12px", fontSize: 10, color: C.gray, textTransform: "uppercase", letterSpacing: "0.6px", fontFamily: "'Montserrat',sans-serif", fontWeight: 600, textAlign: "left", borderBottom: `2px solid ${C.border}` }}>{children}</th>;
const TD = ({ children, bold, color }) => <td style={{ padding: "11px 12px", fontSize: 12, fontWeight: bold ? 600 : 400, color: color || C.darkSoft }}>{children}</td>;

const ProgressBar = ({ value, max = 100, color = C.red, height = 6 }) => (
  <div style={{ height, background: C.borderLight, borderRadius: height / 2, overflow: "hidden" }}>
    <div style={{ width: `${Math.min((value / max) * 100, 100)}%`, height: "100%", background: color, borderRadius: height / 2 }} />
  </div>
);

const HealthBar = ({ value }) => {
  const color = value >= 90 ? C.success : value >= 75 ? C.warning : C.danger;
  return <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <ProgressBar value={value} color={color} height={8} />
    <span style={{ fontSize: 12, fontWeight: 700, color, minWidth: 32, fontFamily: "'Montserrat',sans-serif" }}>{value}%</span>
  </div>;
};

// ── AI BOT ────────────────────────────────────────────────────────────────
function getBotReply(msg) {
  const m = msg.toLowerCase();
  const totalWorkers = departments.reduce((a, d) => a + d.present, 0);
  const totalHead = departments.reduce((a, d) => a + d.headcount, 0);
  const totalEnergy = energyDaily.reduce((a, d) => a + d.kwh, 0);
  const openMO = maintenanceOrders.filter(o => o.status !== "completed");
  const criticalMO = maintenanceOrders.filter(o => o.priority === "critical" && o.status !== "completed");
  const openIncidents = safetyIncidents.filter(i => i.status === "open");
  const runningLines = productionLines.filter(l => l.status === "running").length;
  const totalActual = productionLines.reduce((a, l) => a + l.actual, 0);
  const totalTarget = productionLines.reduce((a, l) => a + l.target, 0);
  const delayedLines = productionLines.filter(l => l.status !== "running");

  if (m.includes("oee")) {
    const avg = oeeByLine.reduce((a, l) => a + l.oee, 0) / oeeByLine.length;
    const best = oeeByLine.reduce((a, l) => l.oee > a.oee ? l : a);
    const worst = oeeByLine.reduce((a, l) => l.oee < a.oee ? l : a);
    return `Plant OEE is **${dashboardKpis.plantOee}%** (avg across lines: ${avg.toFixed(1)}%).\n\nBest: **${best.line}** at ${best.oee}%\nLowest: **${worst.line}** at ${worst.oee}% (target: ${worst.target}%)`;
  }
  if (m.includes("production") || m.includes("output") || m.includes("units")) {
    return `**Production Summary:**\n\n- Lines running: **${runningLines}/${productionLines.length}**\n- Total output today: **${totalActual}** / ${totalTarget} target (${((totalActual/totalTarget)*100).toFixed(1)}%)\n- Issues: ${delayedLines.map(l => `${l.id} (${l.status})`).join(", ") || "None"}`;
  }
  if (m.includes("alert") || m.includes("critical")) {
    const alerts = [];
    if (criticalMO.length) alerts.push(`**${criticalMO.length} critical maintenance**: ${criticalMO.map(o => o.equipment).join(", ")}`);
    if (openIncidents.length) alerts.push(`**${openIncidents.length} open safety incident(s)**`);
    delayedLines.forEach(l => alerts.push(`**${l.id}** is ${l.status} (${l.downtime} min downtime)`));
    return alerts.length ? `**Active Alerts:**\n\n${alerts.map(a => "- " + a).join("\n")}` : "No critical alerts. All systems operational.";
  }
  if (m.includes("workforce") || m.includes("worker") || m.includes("staff")) {
    const overtime = departments.reduce((a, d) => a + d.overtime, 0);
    return `**Workforce Status:**\n\n- Present: **${totalWorkers}** / ${totalHead} (${((totalWorkers/totalHead)*100).toFixed(1)}%)\n- Overtime today: **${overtime} hrs**\n\nShifts:\n${shiftPattern.map(s => `- ${s.shift}: ${s.workers} workers, ${s.efficiency}% efficiency`).join("\n")}`;
  }
  if (m.includes("energy") || m.includes("power") || m.includes("kwh")) {
    const solar = energyDaily.reduce((a, d) => a + d.solar, 0);
    const cost = energyDaily.reduce((a, d) => a + d.cost, 0);
    return `**Energy Today:**\n\n- Total: **${(totalEnergy/1000).toFixed(1)} MWh**\n- Cost: ₹${(cost/1000).toFixed(0)}K\n- Solar: **${solar} kWh** (${((solar/totalEnergy)*100).toFixed(1)}%)\n\nTop consumer: ${energyByDept[0].dept} at ${energyByDept[0].pct}%`;
  }
  if (m.includes("maintenance") || m.includes("repair")) {
    return `**Maintenance:**\n\n- Open orders: **${openMO.length}** / ${maintenanceOrders.length}\n- Critical: ${criticalMO.length}\n\nPending:\n${openMO.map(o => `- **${o.id}** ${o.equipment} (${o.priority})`).join("\n")}`;
  }
  if (m.includes("safety") || m.includes("incident")) {
    return `**Safety:**\n\n- LTI-free days: **${ltiFreeDays}**\n- Open incidents: ${openIncidents.length}\n\nRecent:\n${safetyIncidents.slice(0, 3).map(i => `- **${i.id}**: ${i.description} [${i.status}]`).join("\n")}`;
  }
  return `I can help with:\n\n- **OEE** — plant efficiency\n- **Production** — output & line status\n- **Alerts** — critical issues\n- **Workforce** — attendance & shifts\n- **Energy** — consumption & costs\n- **Maintenance** — work orders\n- **Safety** — incidents\n\nTry asking about any of these!`;
}

function formatBotText(text) {
  return text.split("\n").map((line, i) => {
    const parts = []; let last = 0;
    const regex = /\*\*(.+?)\*\*/g; let match;
    while ((match = regex.exec(line)) !== null) {
      if (match.index > last) parts.push(line.slice(last, match.index));
      parts.push(<strong key={`${i}-${match.index}`}>{match[1]}</strong>);
      last = match.index + match[0].length;
    }
    if (last < line.length) parts.push(line.slice(last));
    return <span key={i}>{parts.length ? parts : line}{i < text.split("\n").length - 1 && <br />}</span>;
  });
}

// ── MAIN APP ──────────────────────────────────────────────────────────────
const VALID_ROUTES = ["dashboard","production","oee","workforce","maintenance","energy","safety","ai","settings"];
function getHashRoute() {
  const h = window.location.hash.replace("#/","").replace("#","");
  return VALID_ROUTES.includes(h) ? h : "dashboard";
}

export default function App() {
  const [nav, setNavState] = useState(getHashRoute);
  const [collapsed, setCollapsed] = useState(false);
  const setNav = useCallback((id) => { window.location.hash = `#/${id}`; }, []);

  useEffect(() => {
    const onHash = () => setNavState(getHashRoute());
    window.addEventListener("hashchange", onHash);
    if (!window.location.hash) window.location.hash = "#/dashboard";
    // Dynamic favicon
    const canvas = document.createElement("canvas");
    canvas.width = 64; canvas.height = 64;
    const ctx = canvas.getContext("2d");
    const r = 14;
    ctx.beginPath();
    ctx.moveTo(r,0); ctx.lineTo(64-r,0); ctx.quadraticCurveTo(64,0,64,r);
    ctx.lineTo(64,64-r); ctx.quadraticCurveTo(64,64,64-r,64);
    ctx.lineTo(r,64); ctx.quadraticCurveTo(0,64,0,64-r);
    ctx.lineTo(0,r); ctx.quadraticCurveTo(0,0,r,0);
    ctx.closePath();
    ctx.fillStyle = config.brand.primaryColor; ctx.fill();
    ctx.fillStyle="#fff"; ctx.font="bold 26px 'Montserrat',sans-serif";
    ctx.textAlign="center"; ctx.textBaseline="middle";
    ctx.fillText(config.brand.initials, 32, 33);
    let link = document.querySelector("link[rel~='icon']");
    if (!link) { link = document.createElement("link"); link.rel="icon"; document.head.appendChild(link); }
    link.href = canvas.toDataURL("image/png");
    document.title = `${config.brand.shortName} · ${config.brand.suiteLabel}`;
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const now = new Date();
  const time = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
  const date = now.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "short", year: "numeric" });

  const navItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "production", icon: Factory, label: "Production" },
    { id: "oee", icon: Gauge, label: "OEE Analytics" },
    { id: "workforce", icon: Users, label: "Workforce" },
    { id: "maintenance", icon: Wrench, label: "Maintenance" },
    { id: "energy", icon: Zap, label: "Energy" },
    { id: "safety", icon: Shield, label: "Safety" },
    { id: "ai", icon: Bot, label: "AI Assistant" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div style={{ fontFamily:"'Open Sans',sans-serif", background:C.bg, minHeight:"100vh", color:C.dark, display:"flex" }}>
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>

      {/* SIDEBAR */}
      <nav style={{ width:collapsed?68:240, minHeight:"100vh", background:C.white, borderRight:`1px solid ${C.border}`, display:"flex", flexDirection:"column", transition:"width 0.25s ease", flexShrink:0, position:"relative", zIndex:10 }}>
        <div style={{ padding:collapsed?"20px 10px":"20px 20px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", gap:12, minHeight:68 }}>
          <div style={{ width:36, height:36, borderRadius:8, background:C.red, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <span style={{ color:"#fff", fontWeight:800, fontSize:13, fontFamily:"'Montserrat',sans-serif" }}>{config.brand.initials}</span>
          </div>
          {!collapsed && <div>
            <div style={{ fontSize:17, fontWeight:800, fontFamily:"'Montserrat',sans-serif", color:C.dark, lineHeight:1 }}>{config.brand.shortName}</div>
            <div style={{ fontSize:9, color:C.red, fontWeight:700, letterSpacing:"1.5px", textTransform:"uppercase", fontFamily:"'Montserrat',sans-serif" }}>{config.brand.suiteLabel}</div>
          </div>}
        </div>

        <div style={{ flex:1, padding:"12px 8px", display:"flex", flexDirection:"column", gap:2 }}>
          {navItems.map(item => {
            const active = nav === item.id;
            return (
              <button key={item.id} onClick={() => setNav(item.id)} style={{ display:"flex", alignItems:"center", gap:12, padding:collapsed?"11px":"10px 14px", borderRadius:8, border:"none", cursor:"pointer", background:active?`${C.red}0A`:"transparent", color:active?C.red:C.gray, fontFamily:"'Montserrat',sans-serif", fontSize:13, fontWeight:active?600:500, transition:"all 0.15s", justifyContent:collapsed?"center":"flex-start", borderLeft:active?`3px solid ${C.red}`:"3px solid transparent" }}
                onMouseEnter={e => { if(!active) e.currentTarget.style.background = C.surface; }}
                onMouseLeave={e => { if(!active) e.currentTarget.style.background = "transparent"; }}>
                <item.icon size={18}/>
                {!collapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </div>

        <div style={{ padding:"12px 8px", borderTop:`1px solid ${C.border}` }}>
          <button onClick={() => setCollapsed(p => !p)} style={{ ...btnG, width:"100%", justifyContent:"center", padding:9 }}>
            {collapsed ? <ChevronRight size={16}/> : <><Menu size={14}/><span style={{ fontSize:12 }}>Collapse</span></>}
          </button>
        </div>
      </nav>

      {/* MAIN */}
      <main style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
        <header style={{ height:60, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 24px", background:C.white, borderBottom:`1px solid ${C.border}`, flexShrink:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:16 }}>
            <h2 style={{ fontSize:18, fontWeight:700, fontFamily:"'Montserrat',sans-serif", margin:0 }}>{navItems.find(n=>n.id===nav)?.label}</h2>
            <Badge color={C.success} bg={C.successBg}>Live</Badge>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:16 }}>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontSize:13, fontWeight:600, color:C.dark }}>{time}</div>
              <div style={{ fontSize:10, color:C.grayLight }}>{date}</div>
            </div>
            <div style={{ width:1, height:24, background:C.border }}/>
            <div style={{ position:"relative" }}>
              <Search size={14} style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", color:C.grayLight }}/>
              <input placeholder="Search..." style={{ ...inp, width:180, paddingLeft:32, fontSize:12, borderRadius:8 }}/>
            </div>
            <Bell size={18} color={C.gray} style={{ cursor:"pointer" }}/>
            <div style={{ width:32, height:32, borderRadius:8, background:C.surface, display:"flex", alignItems:"center", justifyContent:"center", border:`1px solid ${C.border}` }}>
              <User size={14} color={C.gray}/>
            </div>
          </div>
        </header>

        <div style={{ flex:1, overflow:"auto", padding:"20px 24px" }}>
          {nav==="dashboard" && <DashboardPage/>}
          {nav==="production" && <ProductionPage/>}
          {nav==="oee" && <OEEPage/>}
          {nav==="workforce" && <WorkforcePage/>}
          {nav==="maintenance" && <MaintenancePage/>}
          {nav==="energy" && <EnergyPage/>}
          {nav==="safety" && <SafetyPage/>}
          {nav==="ai" && <AIAssistantPage/>}
          {nav==="settings" && <SettingsPage/>}
        </div>
      </main>
    </div>
  );
}

// ── DASHBOARD ─────────────────────────────────────────────────────────────
function DashboardPage() {
  const totalWorkers = departments.reduce((a,d) => a+d.present, 0);
  const totalHead = departments.reduce((a,d) => a+d.headcount, 0);
  return (
    <div style={{ animation:"fadeIn 0.35s ease" }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:14, marginBottom:20 }}>
        <KPI icon={Gauge} label="Plant OEE" value={dashboardKpis.plantOee} suffix="%" change="+1.8%" up={true}/>
        <KPI icon={Factory} label="Units Today" value={dashboardKpis.unitsToday} change="+12" up={true} color={C.info}/>
        <KPI icon={Users} label="Workforce Present" value={totalWorkers} suffix={`/${totalHead}`} color={C.teal}/>
        <KPI icon={Zap} label="Energy (MWh)" value={dashboardKpis.energyMwh} change="-4.2%" up={true} color={C.warning}/>
        <KPI icon={Shield} label="Safety Days" value={ltiFreeDays} suffix=" LTI-free" color={C.success}/>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1.4fr 1fr", gap:14, marginBottom:14 }}>
        <Sec icon={TrendingUp} title="Weekly Production vs Plan" action={<Badge color={C.info} bg={C.infoBg}>6 Weeks</Badge>}>
          <div style={{ height:260 }}><ResponsiveContainer>
            <ComposedChart data={weeklyProduction}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.borderLight}/>
              <XAxis dataKey="week" tick={{ fill:C.gray, fontSize:11 }} axisLine={{ stroke:C.border }}/>
              <YAxis tick={{ fill:C.gray, fontSize:11 }} axisLine={{ stroke:C.border }}/>
              <Tooltip contentStyle={tipStyle}/>
              <Bar dataKey="planned" fill={`${C.red}25`} radius={[4,4,0,0]} name="Planned"/>
              <Bar dataKey="actual" fill={C.red} radius={[4,4,0,0]} name="Actual"/>
              <Line type="monotone" dataKey="yield" stroke={C.success} strokeWidth={2} yAxisId={0} dot={{ fill:C.success, r:3 }} name="Yield %"/>
              <Legend wrapperStyle={{ fontSize:11 }}/>
            </ComposedChart>
          </ResponsiveContainer></div>
        </Sec>

        <Sec icon={Activity} title="OEE by Shift (Today)" action={<Badge color={C.success} bg={C.successBg}>Live</Badge>}>
          <div style={{ height:260 }}><ResponsiveContainer>
            <AreaChart data={oeeShiftData}>
              <defs><linearGradient id="oeeGr" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.red} stopOpacity={0.15}/><stop offset="100%" stopColor={C.red} stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke={C.borderLight}/>
              <XAxis dataKey="shift" tick={{ fill:C.gray, fontSize:11 }} axisLine={{ stroke:C.border }}/>
              <YAxis tick={{ fill:C.gray, fontSize:11 }} axisLine={{ stroke:C.border }} domain={[60,100]}/>
              <Tooltip contentStyle={tipStyle}/>
              <Area type="monotone" dataKey="oee" stroke={C.red} fill="url(#oeeGr)" strokeWidth={2.5} dot={{ fill:C.red, r:4, strokeWidth:0 }} name="OEE %"/>
              <Line type="monotone" dataKey="availability" stroke={C.info} strokeWidth={1.5} strokeDasharray="4 4" dot={false} name="Availability"/>
              <Line type="monotone" dataKey="quality" stroke={C.success} strokeWidth={1.5} strokeDasharray="4 4" dot={false} name="Quality"/>
              <Legend wrapperStyle={{ fontSize:10 }}/>
            </AreaChart>
          </ResponsiveContainer></div>
        </Sec>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14 }}>
        <Sec icon={Factory} title="Production Lines" action={<Badge color={C.success} bg={C.successBg}>{productionLines.filter(l=>l.status==="running").length} Running</Badge>}>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {productionLines.slice(0,6).map(l=>(
              <div key={l.id} style={{ ...cardSm, padding:"10px 12px", display:"flex", alignItems:"center", justifyContent:"space-between", borderLeft:`3px solid ${l.status==="running"?C.success:l.status==="delayed"?C.warning:C.danger}` }}>
                <div><p style={{ fontSize:12, fontWeight:600, margin:0, fontFamily:"'Montserrat',sans-serif" }}>{l.id}</p><p style={{ fontSize:10, color:C.gray, margin:0 }}>{l.name}</p></div>
                <div style={{ textAlign:"right" }}><p style={{ fontSize:14, fontWeight:700, color:C.dark, margin:0 }}>{l.efficiency}%</p><p style={{ fontSize:9, color:C.grayLight, margin:0 }}>{l.actual}/{l.target}</p></div>
              </div>
            ))}
          </div>
        </Sec>

        <Sec icon={Wrench} title="Equipment Health">
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {equipmentHealth.map(e=>(
              <div key={e.name}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                  <span style={{ fontSize:12, color:C.darkSoft }}>{e.name}</span>
                  <span style={{ fontSize:11, color:C.gray }}>MTBF: {e.mtbf}h</span>
                </div>
                <HealthBar value={e.health}/>
              </div>
            ))}
          </div>
        </Sec>

        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <Sec icon={Zap} title="Energy Today">
            <div style={{ height:120 }}><ResponsiveContainer>
              <AreaChart data={energyDaily}>
                <defs><linearGradient id="enGr" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.warning} stopOpacity={0.2}/><stop offset="100%" stopColor={C.warning} stopOpacity={0}/></linearGradient></defs>
                <XAxis dataKey="hour" tick={{ fill:C.grayLight, fontSize:9 }} axisLine={false} tickLine={false}/>
                <Tooltip contentStyle={tipStyle}/>
                <Area type="monotone" dataKey="kwh" stroke={C.warning} fill="url(#enGr)" strokeWidth={2} name="kWh"/>
              </AreaChart>
            </ResponsiveContainer></div>
            <div style={{ display:"flex", justifyContent:"space-between", marginTop:8 }}>
              <span style={{ fontSize:11, color:C.gray }}>Total: {energyDaily.reduce((a,d)=>a+d.kwh,0).toLocaleString()} kWh</span>
              <span style={{ fontSize:11, color:C.success, fontWeight:600 }}>Solar: {energyDaily.reduce((a,d)=>a+d.solar,0).toLocaleString()} kWh</span>
            </div>
          </Sec>
          <Sec icon={Shield} title="Safety This Month">
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
              {[{label:"Incidents",value:"2",color:C.warning},{label:"Near Miss",value:"1",color:C.info},{label:"Observations",value:"35",color:C.success},{label:"LTI Days",value:"0",color:C.success}].map(s=>(
                <div key={s.label} style={{ textAlign:"center", padding:8, background:C.surface, borderRadius:8 }}>
                  <p style={{ fontSize:20, fontWeight:700, color:s.color, margin:0, fontFamily:"'Montserrat',sans-serif" }}>{s.value}</p>
                  <p style={{ fontSize:9, color:C.gray, margin:0, textTransform:"uppercase", letterSpacing:"0.3px" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </Sec>
        </div>
      </div>
    </div>
  );
}

// ── PRODUCTION ────────────────────────────────────────────────────────────
function ProductionPage() {
  return (
    <div style={{ animation:"fadeIn 0.35s ease" }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:20 }}>
        <KPI icon={Factory} label="Today's Output" value={productionLines.reduce((a,l)=>a+l.actual,0)} suffix=" units" change="+4.5%" up={true}/>
        <KPI icon={Target} label="Plan Achievement" value="92.3" suffix="%" change="+1.2%" up={true} color={C.info}/>
        <KPI icon={AlertTriangle} label="Scrap Rate" value="1.8" suffix="%" change="-0.4%" up={true} color={C.warning}/>
        <KPI icon={Clock} label="Avg Cycle Time" value="42.5" suffix=" min" change="-2.1 min" up={true} color={C.teal}/>
      </div>
      <Sec icon={Factory} title="Production Lines — Real-Time Status" action={<button style={btnP}><RefreshCw size={14}/> Refresh</button>}>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <thead><tr>{["Line","Name","Shift","Target","Actual","Efficiency","Operators","Downtime","Status"].map(h=><TH key={h}>{h}</TH>)}</tr></thead>
          <tbody>{productionLines.map(l=>(
            <tr key={l.id} style={{ borderBottom:`1px solid ${C.borderLight}` }}>
              <TD bold color={C.red}>{l.id}</TD><TD>{l.name}</TD>
              <TD><Badge color={C.info} bg={C.infoBg}>{l.shift}</Badge></TD>
              <TD>{l.target}</TD><TD bold>{l.actual}</TD>
              <TD bold color={l.efficiency>=90?C.success:l.efficiency>=80?C.warning:C.danger}>{l.efficiency}%</TD>
              <TD>{l.operators}</TD>
              <TD color={l.downtime>30?C.danger:C.gray}>{l.downtime} min</TD>
              <TD><Badge color={l.status==="running"?C.success:l.status==="delayed"?C.warning:C.danger} bg={l.status==="running"?C.successBg:l.status==="delayed"?C.warningBg:C.dangerBg}>{l.status}</Badge></TD>
            </tr>
          ))}</tbody>
        </table>
      </Sec>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginTop:14 }}>
        <Sec icon={BarChart3} title="Product Mix — This Month">
          <div style={{ height:240 }}><ResponsiveContainer>
            <BarChart data={productMix} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke={C.borderLight}/>
              <XAxis type="number" tick={{ fill:C.gray, fontSize:10 }} axisLine={{ stroke:C.border }}/>
              <YAxis dataKey="product" type="category" tick={{ fill:C.gray, fontSize:10 }} width={120} axisLine={{ stroke:C.border }}/>
              <Tooltip contentStyle={tipStyle}/>
              <Bar dataKey="units" fill={C.red} radius={[0,6,6,0]} name="Units"/>
            </BarChart>
          </ResponsiveContainer></div>
        </Sec>
        <Sec icon={TrendingUp} title="Weekly Yield Trend">
          <div style={{ height:240 }}><ResponsiveContainer>
            <LineChart data={weeklyProduction}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.borderLight}/>
              <XAxis dataKey="week" tick={{ fill:C.gray, fontSize:11 }} axisLine={{ stroke:C.border }}/>
              <YAxis tick={{ fill:C.gray, fontSize:11 }} axisLine={{ stroke:C.border }} domain={[94,100]}/>
              <Tooltip contentStyle={tipStyle}/>
              <Line type="monotone" dataKey="yield" stroke={C.success} strokeWidth={2.5} dot={{ fill:C.success, r:4 }} name="First Pass Yield %"/>
            </LineChart>
          </ResponsiveContainer></div>
        </Sec>
      </div>
    </div>
  );
}

// ── OEE ───────────────────────────────────────────────────────────────────
function OEEPage() {
  return (
    <div style={{ animation:"fadeIn 0.35s ease" }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:20 }}>
        <KPI icon={Gauge} label="Overall OEE" value={dashboardKpis.plantOee} suffix="%" change="+1.8%" up={true}/>
        <KPI icon={CheckCircle} label="Availability" value="94.1" suffix="%" color={C.info}/>
        <KPI icon={Activity} label="Performance" value="89.8" suffix="%" color={C.warning}/>
        <KPI icon={Award} label="Quality" value="98.2" suffix="%" color={C.success}/>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:14 }}>
        <Sec icon={Activity} title="OEE Breakdown by Shift">
          <div style={{ height:280 }}><ResponsiveContainer>
            <ComposedChart data={oeeShiftData}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.borderLight}/>
              <XAxis dataKey="shift" tick={{ fill:C.gray, fontSize:11 }} axisLine={{ stroke:C.border }}/>
              <YAxis tick={{ fill:C.gray, fontSize:11 }} axisLine={{ stroke:C.border }} domain={[60,100]}/>
              <Tooltip contentStyle={tipStyle}/>
              <Bar dataKey="oee" fill={C.red} radius={[4,4,0,0]} name="OEE %"/>
              <Line type="monotone" dataKey="availability" stroke={C.info} strokeWidth={2} dot={{ r:3 }} name="Availability"/>
              <Line type="monotone" dataKey="performance" stroke={C.warning} strokeWidth={2} dot={{ r:3 }} name="Performance"/>
              <Line type="monotone" dataKey="quality" stroke={C.success} strokeWidth={2} dot={{ r:3 }} name="Quality"/>
              <Legend wrapperStyle={{ fontSize:10 }}/>
            </ComposedChart>
          </ResponsiveContainer></div>
        </Sec>
        <Sec icon={BarChart3} title="OEE by Production Line" action={<Badge color={C.red}>Target: 85%</Badge>}>
          <div style={{ height:280 }}><ResponsiveContainer>
            <BarChart data={oeeByLine} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke={C.borderLight}/>
              <XAxis type="number" tick={{ fill:C.gray, fontSize:10 }} axisLine={{ stroke:C.border }} domain={[60,100]}/>
              <YAxis dataKey="line" type="category" tick={{ fill:C.gray, fontSize:10 }} width={110} axisLine={{ stroke:C.border }}/>
              <Tooltip contentStyle={tipStyle}/>
              <Bar dataKey="oee" radius={[0,6,6,0]} name="OEE %">
                {oeeByLine.map((e,i)=><Cell key={i} fill={e.oee>=e.target?C.success:e.oee>=e.target-5?C.warning:C.danger}/>)}
              </Bar>
            </BarChart>
          </ResponsiveContainer></div>
        </Sec>
      </div>
      <Sec icon={Clock} title="Downtime Analysis" action={<Badge color={C.warning} bg={C.warningBg}>This Month</Badge>}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
          <div style={{ height:240 }}><ResponsiveContainer>
            <PieChart>
              <Pie data={downtimeReasons} cx="50%" cy="50%" innerRadius={55} outerRadius={90} dataKey="hours" startAngle={90} endAngle={-270} stroke="none">
                {downtimeReasons.map((_,i)=><Cell key={i} fill={CHART[i%CHART.length]}/>)}
              </Pie>
              <Tooltip contentStyle={tipStyle} formatter={v=>`${v} hours`}/>
            </PieChart>
          </ResponsiveContainer></div>
          <div style={{ display:"flex", flexDirection:"column", gap:10, justifyContent:"center" }}>
            {downtimeReasons.map((d,i)=>(
              <div key={d.reason} style={{ display:"flex", alignItems:"center", gap:10 }}>
                <span style={{ width:10, height:10, borderRadius:3, background:CHART[i%CHART.length], flexShrink:0 }}/>
                <span style={{ fontSize:12, flex:1 }}>{d.reason}</span>
                <span style={{ fontSize:12, fontWeight:700, color:C.dark }}>{d.hours}h</span>
                <span style={{ fontSize:11, color:C.gray, minWidth:32 }}>{d.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </Sec>
    </div>
  );
}

// ── WORKFORCE ─────────────────────────────────────────────────────────────
function WorkforcePage() {
  const total = departments.reduce((a,d)=>a+d.headcount,0);
  const present = departments.reduce((a,d)=>a+d.present,0);
  return (
    <div style={{ animation:"fadeIn 0.35s ease" }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:20 }}>
        <KPI icon={Users} label="Total Headcount" value={total} color={C.info}/>
        <KPI icon={CheckCircle} label="Present Today" value={present} suffix={` (${Math.round(present/total*100)}%)`} color={C.success}/>
        <KPI icon={Clock} label="Overtime This Week" value={departments.reduce((a,d)=>a+d.overtime,0)} suffix=" hrs" color={C.warning}/>
        <KPI icon={Award} label="Avg Skill Rating" value="4.2" suffix="/5" color={C.purple}/>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1.5fr 1fr", gap:14, marginBottom:14 }}>
        <Sec icon={Building} title="Department Summary">
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead><tr>{["Department","Headcount","Present","Leave","Absent","OT (hrs)","Skill","Productivity"].map(h=><TH key={h}>{h}</TH>)}</tr></thead>
            <tbody>{departments.map(d=>(
              <tr key={d.dept} style={{ borderBottom:`1px solid ${C.borderLight}` }}>
                <TD bold>{d.dept}</TD><TD>{d.headcount}</TD>
                <TD bold color={C.success}>{d.present}</TD>
                <TD color={C.warning}>{d.onLeave}</TD>
                <TD color={d.absent>0?C.danger:C.gray}>{d.absent}</TD>
                <TD color={d.overtime>40?C.warning:C.gray}>{d.overtime}</TD>
                <TD bold color={d.avgSkill>=4.5?C.success:d.avgSkill>=4?C.info:C.warning}>{d.avgSkill}</TD>
                <TD><ProgressBar value={d.productivity} color={d.productivity>=90?C.success:d.productivity>=80?C.warning:C.danger}/></TD>
              </tr>
            ))}</tbody>
          </table>
        </Sec>
        <Sec icon={Clock} title="Shift Deployment">
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {shiftPattern.map(s=>(
              <div key={s.shift} style={{ ...cardSm, padding:14 }}>
                <p style={{ fontSize:13, fontWeight:600, fontFamily:"'Montserrat',sans-serif", margin:"0 0 8px" }}>{s.shift}</p>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
                  <div><p style={{ fontSize:18, fontWeight:700, color:C.info, margin:0 }}>{s.workers}</p><p style={{ fontSize:9, color:C.gray, margin:0 }}>Workers</p></div>
                  <div><p style={{ fontSize:18, fontWeight:700, color:C.success, margin:0 }}>{s.efficiency}%</p><p style={{ fontSize:9, color:C.gray, margin:0 }}>Efficiency</p></div>
                  <div><p style={{ fontSize:18, fontWeight:700, color:C.dark, margin:0 }}>{s.output}</p><p style={{ fontSize:9, color:C.gray, margin:0 }}>Output</p></div>
                </div>
              </div>
            ))}
          </div>
        </Sec>
      </div>
      <Sec icon={Award} title="Skill Matrix" action={<button style={btnP}><Plus size={14}/> Add Employee</button>}>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <thead><tr>{["Name","Department","Role","Skills","Level","Certifications","Training"].map(h=><TH key={h}>{h}</TH>)}</tr></thead>
          <tbody>{skillMatrix.map(s=>(
            <tr key={s.name} style={{ borderBottom:`1px solid ${C.borderLight}` }}>
              <TD bold>{s.name}</TD><TD>{s.dept}</TD><TD>{s.role}</TD>
              <TD><div style={{ display:"flex", flexWrap:"wrap", gap:3 }}>{s.skills.map(sk=><Badge key={sk} color={C.info} bg={C.infoBg}>{sk}</Badge>)}</div></TD>
              <TD bold color={s.level>=5?C.success:s.level>=4?C.info:C.warning}>{s.level}/5</TD>
              <TD>{s.certifications}</TD>
              <TD><Badge color={s.training==="Completed"?C.success:s.training==="In Progress"?C.warning:C.info} bg={s.training==="Completed"?C.successBg:s.training==="In Progress"?C.warningBg:C.infoBg}>{s.training}</Badge></TD>
            </tr>
          ))}</tbody>
        </table>
      </Sec>
    </div>
  );
}

// ── MAINTENANCE ───────────────────────────────────────────────────────────
function MaintenancePage() {
  return (
    <div style={{ animation:"fadeIn 0.35s ease" }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:20 }}>
        <KPI icon={Wrench} label="Open Work Orders" value={maintenanceOrders.filter(m=>m.status!=="completed").length} color={C.warning}/>
        <KPI icon={AlertTriangle} label="Critical" value={maintenanceOrders.filter(m=>m.priority==="critical").length} color={C.danger}/>
        <KPI icon={Clock} label="Avg MTTR" value="2.4" suffix=" hrs" color={C.info}/>
        <KPI icon={CheckCircle} label="PM Compliance" value="91" suffix="%" color={C.success}/>
      </div>
      <Sec icon={ClipboardList} title="Maintenance Work Orders" action={<button style={btnP}><Plus size={14}/> New Work Order</button>}>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <thead><tr>{["MO ID","Equipment","Type","Priority","Status","Assignee","Scheduled","Est Hours","Spare Parts"].map(h=><TH key={h}>{h}</TH>)}</tr></thead>
          <tbody>{maintenanceOrders.map(m=>(
            <tr key={m.id} style={{ borderBottom:`1px solid ${C.borderLight}` }}>
              <TD bold color={C.red}>{m.id}</TD><TD>{m.equipment}</TD>
              <TD><Badge color={m.type==="Breakdown"?C.danger:m.type==="Corrective"?C.warning:m.type==="Predictive"?C.purple:C.info} bg={m.type==="Breakdown"?C.dangerBg:m.type==="Corrective"?C.warningBg:m.type==="Predictive"?C.purpleBg:C.infoBg}>{m.type}</Badge></TD>
              <TD><Badge color={m.priority==="critical"?C.danger:m.priority==="high"?C.warning:m.priority==="medium"?C.info:C.gray} bg={m.priority==="critical"?C.dangerBg:m.priority==="high"?C.warningBg:m.priority==="medium"?C.infoBg:C.surface}>{m.priority}</Badge></TD>
              <TD><Badge color={m.status==="open"?C.danger:m.status==="in-progress"?C.warning:m.status==="scheduled"?C.info:C.success} bg={m.status==="open"?C.dangerBg:m.status==="in-progress"?C.warningBg:m.status==="scheduled"?C.infoBg:C.successBg}>{m.status}</Badge></TD>
              <TD>{m.assignee}</TD><TD>{m.scheduledDate}</TD><TD>{m.estHours}h</TD>
              <TD><span style={{ fontSize:11, color:C.gray }}>{m.spareParts}</span></TD>
            </tr>
          ))}</tbody>
        </table>
      </Sec>
      <div style={{ marginTop:14 }}>
        <Sec icon={Activity} title="Equipment Health Overview">
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14 }}>
            {equipmentHealth.map(e=>(
              <div key={e.name} style={{ ...cardSm }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
                  <span style={{ fontSize:13, fontWeight:600, fontFamily:"'Montserrat',sans-serif" }}>{e.name}</span>
                  {e.alerts>0 && <Badge color={C.danger} bg={C.dangerBg}>{e.alerts} alerts</Badge>}
                </div>
                <HealthBar value={e.health}/>
                <div style={{ display:"flex", justifyContent:"space-between", marginTop:8 }}>
                  <span style={{ fontSize:10, color:C.gray }}>MTBF: {e.mtbf}h</span>
                  <span style={{ fontSize:10, color:C.gray }}>MTTR: {e.mttr}h</span>
                </div>
              </div>
            ))}
          </div>
        </Sec>
      </div>
    </div>
  );
}

// ── ENERGY ────────────────────────────────────────────────────────────────
function EnergyPage() {
  const totalKwh = energyDaily.reduce((a,d)=>a+d.kwh,0);
  const totalSolar = energyDaily.reduce((a,d)=>a+d.solar,0);
  const totalCost = energyDaily.reduce((a,d)=>a+d.cost,0);
  return (
    <div style={{ animation:"fadeIn 0.35s ease" }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:20 }}>
        <KPI icon={Zap} label="Total Consumption" value={(totalKwh/1000).toFixed(1)} suffix=" MWh" change="-4.2%" up={true} color={C.warning}/>
        <KPI icon={Flame} label="Energy Cost" value={`₹${(totalCost/1000).toFixed(0)}K`} color={C.danger}/>
        <KPI icon={Power} label="Solar Generated" value={(totalSolar/1000).toFixed(1)} suffix=" MWh" color={C.success}/>
        <KPI icon={Target} label="Specific Energy" value="0.82" suffix=" kWh/unit" change="-3.1%" up={true} color={C.teal}/>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:14 }}>
        <Sec icon={Activity} title="Hourly Consumption — Grid vs Solar">
          <div style={{ height:280 }}><ResponsiveContainer>
            <AreaChart data={energyDaily}>
              <defs>
                <linearGradient id="gridGr" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.warning} stopOpacity={0.2}/><stop offset="100%" stopColor={C.warning} stopOpacity={0}/></linearGradient>
                <linearGradient id="solGr" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.success} stopOpacity={0.3}/><stop offset="100%" stopColor={C.success} stopOpacity={0}/></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={C.borderLight}/>
              <XAxis dataKey="hour" tick={{ fill:C.gray, fontSize:11 }} axisLine={{ stroke:C.border }}/>
              <YAxis tick={{ fill:C.gray, fontSize:11 }} axisLine={{ stroke:C.border }}/>
              <Tooltip contentStyle={tipStyle}/>
              <Area type="monotone" dataKey="grid" stroke={C.warning} fill="url(#gridGr)" strokeWidth={2} name="Grid (kWh)"/>
              <Area type="monotone" dataKey="solar" stroke={C.success} fill="url(#solGr)" strokeWidth={2} name="Solar (kWh)"/>
              <Legend wrapperStyle={{ fontSize:10 }}/>
            </AreaChart>
          </ResponsiveContainer></div>
        </Sec>
        <Sec icon={BarChart3} title="Consumption by Department">
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <div style={{ height:260 }}><ResponsiveContainer>
              <PieChart>
                <Pie data={energyByDept} cx="50%" cy="50%" innerRadius={55} outerRadius={90} dataKey="kwh" startAngle={90} endAngle={-270} stroke="none">
                  {energyByDept.map((_,i)=><Cell key={i} fill={CHART[i%CHART.length]}/>)}
                </Pie>
                <Tooltip contentStyle={tipStyle} formatter={v=>`${v} kWh`}/>
              </PieChart>
            </ResponsiveContainer></div>
            <div style={{ display:"flex", flexDirection:"column", gap:8, justifyContent:"center" }}>
              {energyByDept.map((d,i)=>(
                <div key={d.dept} style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <span style={{ width:8, height:8, borderRadius:2, background:CHART[i%CHART.length], flexShrink:0 }}/>
                  <span style={{ fontSize:11, flex:1 }}>{d.dept}</span>
                  <span style={{ fontSize:11, fontWeight:600, color:C.dark }}>{d.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </Sec>
      </div>
    </div>
  );
}

// ── SAFETY ────────────────────────────────────────────────────────────────
function SafetyPage() {
  return (
    <div style={{ animation:"fadeIn 0.35s ease" }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:20 }}>
        <KPI icon={Shield} label="LTI-Free Days" value={ltiFreeDays} color={C.success}/>
        <KPI icon={AlertTriangle} label="Incidents (MTD)" value="2" change="-40%" up={true} color={C.warning}/>
        <KPI icon={Eye} label="Safety Observations" value="35" change="+18%" up={true} color={C.info}/>
        <KPI icon={Award} label="Safety Score" value="94" suffix="/100" color={C.success}/>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:14 }}>
        <Sec icon={TrendingUp} title="Incident Trend (6 months)">
          <div style={{ height:260 }}><ResponsiveContainer>
            <ComposedChart data={safetyMetrics}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.borderLight}/>
              <XAxis dataKey="month" tick={{ fill:C.gray, fontSize:11 }} axisLine={{ stroke:C.border }}/>
              <YAxis tick={{ fill:C.gray, fontSize:11 }} axisLine={{ stroke:C.border }}/>
              <Tooltip contentStyle={tipStyle}/>
              <Bar dataKey="nearMiss" stackId="a" fill={C.warning} name="Near Miss"/>
              <Bar dataKey="firstAid" stackId="a" fill={C.info} name="First Aid"/>
              <Bar dataKey="lostTime" stackId="a" fill={C.danger} radius={[4,4,0,0]} name="Lost Time"/>
              <Line type="monotone" dataKey="observations" stroke={C.success} strokeWidth={2} dot={{ r:3 }} name="Observations"/>
              <Legend wrapperStyle={{ fontSize:10 }}/>
            </ComposedChart>
          </ResponsiveContainer></div>
        </Sec>
        <Sec icon={Flag} title="Recent Incidents" action={<button style={btnP}><Plus size={14}/> Report Incident</button>}>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {safetyIncidents.map(s=>(
              <div key={s.id} style={{ ...cardSm, padding:"12px", borderLeft:`3px solid ${s.severity==="high"?C.danger:s.severity==="medium"?C.warning:C.info}` }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                  <span style={{ fontSize:12, fontWeight:700, fontFamily:"'Montserrat',sans-serif", color:C.red }}>{s.id}</span>
                  <Badge color={s.type==="Near Miss"?C.warning:s.type==="First Aid"?C.info:C.purple} bg={s.type==="Near Miss"?C.warningBg:s.type==="First Aid"?C.infoBg:C.purpleBg}>{s.type}</Badge>
                  <Badge color={s.status==="open"?C.danger:C.success} bg={s.status==="open"?C.dangerBg:C.successBg}>{s.status}</Badge>
                </div>
                <p style={{ fontSize:12, margin:0, lineHeight:1.4 }}>{s.description}</p>
                <p style={{ fontSize:10, color:C.gray, margin:"4px 0 0" }}>{s.area} · {s.date} · Action: {s.action}</p>
              </div>
            ))}
          </div>
        </Sec>
      </div>
    </div>
  );
}

// ── AI ASSISTANT ──────────────────────────────────────────────────────────
const BOT_QUICK = ["What is today's OEE?","Show production summary","Any critical alerts?","Workforce status","Energy consumption today","Maintenance pending","Safety incidents"];

function AIAssistantPage() {
  const [messages, setMessages] = useState([{ from:"bot", text:`Hi! I'm the ${config.brand.shortName} AI Assistant. Ask me about OEE, production, workforce, energy, maintenance, or safety. How can I help?` }]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useCallback(node => { if(node) node.scrollIntoView({ behavior:"smooth" }); }, [messages, typing]);

  const sendMessage = useCallback((text) => {
    const msg = text || input.trim(); if(!msg) return;
    setMessages(prev => [...prev, { from:"user", text:msg }]);
    setInput(""); setTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { from:"bot", text:getBotReply(msg) }]);
      setTyping(false);
    }, 600 + Math.random() * 600);
  }, [input]);

  return (
    <div style={{ animation:"fadeIn 0.35s ease", display:"flex", gap:20, height:"calc(100vh - 140px)", minHeight:0 }}>
      <div style={{ flex:1, ...card, padding:0, display:"flex", flexDirection:"column", overflow:"hidden", minHeight:0 }}>
        <div style={{ padding:"16px 20px", display:"flex", alignItems:"center", gap:12, background:`linear-gradient(135deg, ${C.red}, ${C.redDark})`, borderRadius:"14px 14px 0 0" }}>
          <div style={{ width:40, height:40, borderRadius:20, background:"rgba(255,255,255,0.2)", display:"flex", alignItems:"center", justifyContent:"center" }}><Bot size={22} color="#fff"/></div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:16, fontWeight:700, color:"#fff", fontFamily:"'Montserrat',sans-serif" }}>{config.brand.shortName} AI Assistant</div>
            <div style={{ fontSize:11, color:"rgba(255,255,255,0.8)", display:"flex", alignItems:"center", gap:4 }}><span style={{ width:7, height:7, borderRadius:4, background:"#4ADE80", display:"inline-block" }}/> Online — Plant Data Connected</div>
          </div>
          <button onClick={() => setMessages([{ from:"bot", text:"Chat cleared. How can I help?" }])} style={{ ...btnG, background:"rgba(255,255,255,0.15)", border:"none", color:"#fff", fontSize:11, padding:"6px 14px" }}><RefreshCw size={12}/> New Chat</button>
        </div>
        <div style={{ flex:1, overflowY:"auto", padding:"18px 20px 10px", display:"flex", flexDirection:"column", gap:14, background:C.bg, minHeight:0 }}>
          {messages.map((msg,i)=>(
            <div key={i} style={{ display:"flex", justifyContent:msg.from==="user"?"flex-end":"flex-start", gap:10, alignItems:"flex-start" }}>
              {msg.from==="bot" && <div style={{ width:32, height:32, borderRadius:16, background:`${C.red}12`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><Sparkles size={14} color={C.red}/></div>}
              <div style={{ maxWidth:"70%", padding:"12px 16px", borderRadius:msg.from==="user"?"16px 16px 4px 16px":"16px 16px 16px 4px", background:msg.from==="user"?C.red:C.white, color:msg.from==="user"?"#fff":C.dark, fontSize:13, lineHeight:1.6, border:msg.from==="bot"?`1px solid ${C.border}`:"none" }}>
                {msg.from==="bot" ? formatBotText(msg.text) : msg.text}
              </div>
              {msg.from==="user" && <div style={{ width:32, height:32, borderRadius:16, background:C.surface, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, border:`1px solid ${C.border}` }}><User size={14} color={C.gray}/></div>}
            </div>
          ))}
          {typing && <div style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
            <div style={{ width:32, height:32, borderRadius:16, background:`${C.red}12`, display:"flex", alignItems:"center", justifyContent:"center" }}><Sparkles size={14} color={C.red}/></div>
            <div style={{ padding:"14px 20px", borderRadius:"16px 16px 16px 4px", background:C.white, border:`1px solid ${C.border}`, fontSize:20, letterSpacing:4, color:C.gray }}>•••</div>
          </div>}
          <div ref={bottomRef}/>
        </div>
        <div style={{ padding:"14px 20px", borderTop:`1px solid ${C.border}`, display:"flex", gap:10, background:C.white, borderRadius:"0 0 14px 14px" }}>
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendMessage()} placeholder="Ask about OEE, production, safety, workforce..." style={{ ...inp, borderRadius:24, padding:"12px 20px", fontSize:13 }}/>
          <button onClick={()=>sendMessage()} style={{ width:44, height:44, borderRadius:22, border:"none", background:input.trim()?C.red:C.surface, cursor:input.trim()?"pointer":"default", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><Send size={16} color={input.trim()?"#fff":C.grayLight}/></button>
        </div>
      </div>
      <div style={{ width:260, display:"flex", flexDirection:"column", gap:14, flexShrink:0, overflowY:"auto", minHeight:0 }}>
        <div style={card}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}><Sparkles size={16} color={C.red}/><h3 style={{ fontSize:13, fontWeight:700, fontFamily:"'Montserrat',sans-serif", margin:0 }}>Quick Actions</h3></div>
          <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
            {BOT_QUICK.map(q=>(
              <button key={q} onClick={()=>sendMessage(q)} style={{ background:C.bg, border:`1px solid ${C.border}`, borderRadius:10, padding:"10px 14px", fontSize:12, color:C.darkSoft, cursor:"pointer", textAlign:"left", transition:"all 0.15s", display:"flex", alignItems:"center", gap:8 }}
                onMouseEnter={e=>{e.currentTarget.style.background=`${C.red}08`;e.currentTarget.style.borderColor=`${C.red}40`;e.currentTarget.style.color=C.red;}}
                onMouseLeave={e=>{e.currentTarget.style.background=C.bg;e.currentTarget.style.borderColor=C.border;e.currentTarget.style.color=C.darkSoft;}}>
                <ChevronRight size={12}/>{q}
              </button>
            ))}
          </div>
        </div>
        <div style={card}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}><Activity size={16} color={C.info}/><h3 style={{ fontSize:13, fontWeight:700, fontFamily:"'Montserrat',sans-serif", margin:0 }}>Live Snapshot</h3></div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {[
              { label:"Plant OEE", value:dashboardKpis.plantOee+"%", color:C.success },
              { label:"Lines Running", value:`${productionLines.filter(l=>l.status==="running").length}/${productionLines.length}`, color:C.dark },
              { label:"Workforce", value:`${departments.reduce((a,d)=>a+d.present,0)}/${departments.reduce((a,d)=>a+d.headcount,0)}`, color:C.dark },
              { label:"Open Alerts", value:maintenanceOrders.filter(o=>o.status!=="completed").length, color:C.warning },
              { label:"LTI-Free Days", value:ltiFreeDays, color:C.success },
            ].map(s=>(
              <div key={s.label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <span style={{ fontSize:11, color:C.gray }}>{s.label}</span>
                <span style={{ fontSize:13, fontWeight:700, color:s.color, fontFamily:"'Montserrat',sans-serif" }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SETTINGS ──────────────────────────────────────────────────────────────
function SettingsPage() {
  const [tab, setTab] = useState("plant");
  return (
    <div style={{ animation:"fadeIn 0.35s ease" }}>
      <div style={{ display:"flex", gap:6, marginBottom:16 }}>
        {[{id:"plant",label:"Plant Config",icon:Building},{id:"shifts",label:"Shifts & Schedules",icon:Clock},{id:"targets",label:"KPI Targets",icon:Target},{id:"users",label:"Users",icon:Users}].map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{ ...btnG, background:tab===t.id?C.red:C.white, color:tab===t.id?"#fff":C.gray, borderColor:tab===t.id?C.red:C.border }}>
            <t.icon size={14}/> {t.label}
          </button>
        ))}
      </div>
      <div style={card}>
        {tab==="plant" && <div>
          <h3 style={{ fontSize:15, fontWeight:700, fontFamily:"'Montserrat',sans-serif", margin:"0 0 16px" }}>Plant Configuration</h3>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 24px" }}>
            {[
              { l:"Plant Name", v:config.brand.plantName },
              { l:"Plant Code", v:config.brand.plantCode },
              { l:"Address", v:config.brand.address },
              { l:"Production Type", v:config.brand.productionType },
              { l:"Working Days", v:"Monday — Saturday (6 days)" },
              { l:"Shift Pattern", v:"3-Shift Continental" },
            ].map(f=><div key={f.l} style={{ marginBottom:16 }}><label style={lbl}>{f.l}</label><input style={inp} defaultValue={f.v} readOnly/></div>)}
          </div>
          <div style={{ display:"flex", justifyContent:"flex-end" }}><button style={btnP}><Save size={14}/> Save</button></div>
        </div>}
        {tab==="targets" && <div>
          <h3 style={{ fontSize:15, fontWeight:700, fontFamily:"'Montserrat',sans-serif", margin:"0 0 16px" }}>KPI Targets</h3>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14 }}>
            {kpiTargets.map(t=>(
              <div key={t.label} style={{ ...cardSm, display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ width:36, height:36, borderRadius:8, background:`${C.red}10`, display:"flex", alignItems:"center", justifyContent:"center" }}><Target size={16} color={C.red}/></div>
                <div><p style={{ fontSize:11, color:C.gray, margin:0, textTransform:"uppercase", letterSpacing:"0.3px", fontFamily:"'Montserrat',sans-serif", fontWeight:600 }}>{t.label}</p><p style={{ fontSize:16, fontWeight:700, color:C.dark, margin:0, fontFamily:"'Montserrat',sans-serif" }}>{t.value}</p></div>
              </div>
            ))}
          </div>
        </div>}
        {tab==="shifts" && <div>
          <h3 style={{ fontSize:15, fontWeight:700, fontFamily:"'Montserrat',sans-serif", margin:"0 0 16px" }}>Shift Configuration</h3>
          {shiftPattern.map(s=>(
            <div key={s.shift} style={{ ...cardSm, marginBottom:10, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div><p style={{ fontSize:13, fontWeight:600, margin:0 }}>{s.shift}</p><p style={{ fontSize:11, color:C.gray, margin:0 }}>{s.workers} workers deployed</p></div>
              <Badge color={C.success} bg={C.successBg}>Active</Badge>
            </div>
          ))}
        </div>}
        {tab==="users" && <div>
          <h3 style={{ fontSize:15, fontWeight:700, fontFamily:"'Montserrat',sans-serif", margin:"0 0 16px" }}>User Management</h3>
          {users.map(u=>(
            <div key={u.name} style={{ ...cardSm, marginBottom:8, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:32, height:32, borderRadius:8, background:C.surface, display:"flex", alignItems:"center", justifyContent:"center" }}><User size={14} color={C.gray}/></div>
                <div><p style={{ fontSize:13, fontWeight:600, margin:0 }}>{u.name}</p><p style={{ fontSize:11, color:C.gray, margin:0 }}>{u.role} · {u.access}</p></div>
              </div>
              <Badge color={C.success} bg={C.successBg}>Active</Badge>
            </div>
          ))}
        </div>}
      </div>
    </div>
  );
}

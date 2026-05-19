export const config = {
  brand: {
    name: "Roots Industries India Limited",
    shortName: "Roots",
    initials: "RI",
    suiteLabel: "Productivity Suite",
    portalName: "Productivity Suite",
    plantName: "Roots Industries — Ganapathy Plant",
    plantCode: "RI-CBE-P1",
    primaryColor: "#1565C0",
    primaryDark: "#0D47A1",
    primaryLight: "#E3F2FD",
    accentColor: "#1565C0",
  },

  data: {
    productionLines: [
      { id: "HL-A", name: "Horn Assembly Line A", product: "DH-450 Disc Horn", capacity: 2400, shift: "A", status: "running" },
      { id: "HL-B", name: "Horn Assembly Line B", product: "DH-220 Compact Horn", capacity: 2200, shift: "A", status: "running" },
      { id: "BP-1", name: "Disc Brake Pad Line 1", product: "DBP-220 Brake Pad", capacity: 1800, shift: "A", status: "running" },
      { id: "BA-1", name: "Backup Alarm Assembly", product: "BA-250 Reverse Alarm", capacity: 1200, shift: "B", status: "running" },
      { id: "CP-1", name: "Clutch Plate Stamping", product: "CP-350 Clutch Plate", capacity: 1600, shift: "B", status: "idle" },
      { id: "QC-1", name: "Testing & QC Bay", product: "Final Inspection", capacity: 5000, shift: "A", status: "running" },
    ],

    weeklyProduction: [
      { week: "W18", target: 42000, actual: 41200 },
      { week: "W19", target: 42000, actual: 43100 },
      { week: "W20", target: 44000, actual: 43800 },
      { week: "W21", target: 44000, actual: 44600 },
      { week: "W22", target: 45000, actual: 44200 },
    ],

    productMix: [
      { product: "DH-450 Disc Horn", units: 18400, revenue: 3680000 },
      { product: "DH-220 Compact Horn", units: 15200, revenue: 2280000 },
      { product: "DBP-220 Brake Pad", units: 12600, revenue: 3150000 },
      { product: "BA-250 Reverse Alarm", units: 8800, revenue: 1760000 },
      { product: "CP-350 Clutch Plate", units: 6400, revenue: 1280000 },
      { product: "EH-120 Electric Horn Kit", units: 4200, revenue: 630000 },
    ],

    oeeShiftData: [
      { shift: "A", availability: 94.2, performance: 91.8, quality: 97.1, oee: 84.1 },
      { shift: "B", availability: 91.6, performance: 89.4, quality: 96.8, oee: 79.3 },
      { shift: "C", availability: 88.9, performance: 87.2, quality: 95.9, oee: 74.4 },
    ],

    oeeByLine: [
      { line: "Horn Assembly A", oee: 86.4, target: 85 },
      { line: "Horn Assembly B", oee: 83.1, target: 85 },
      { line: "Disc Brake Pad 1", oee: 81.7, target: 83 },
      { line: "Backup Alarm", oee: 79.2, target: 80 },
      { line: "Clutch Stamping", oee: 74.8, target: 80 },
      { line: "QC Bay", oee: 92.3, target: 90 },
    ],

    downtimeReasons: [
      { reason: "Planned Maintenance", minutes: 420, percentage: 31 },
      { reason: "Material Shortage", minutes: 310, percentage: 23 },
      { reason: "Machine Breakdown", minutes: 265, percentage: 20 },
      { reason: "Changeover / Setup", minutes: 190, percentage: 14 },
      { reason: "Quality Hold", minutes: 110, percentage: 8 },
      { reason: "Other", minutes: 55, percentage: 4 },
    ],

    departments: [
      { id: "D01", name: "Horn Assembly", headcount: 42, manager: "Vijayakumar M" },
      { id: "D02", name: "Brake Components", headcount: 35, manager: "R. Krishnan" },
      { id: "D03", name: "Alarm & Accessories", headcount: 28, manager: "S. Murugan" },
      { id: "D04", name: "Stamping & Pressing", headcount: 24, manager: "K. Prakash" },
      { id: "D05", name: "Quality & Testing", headcount: 18, manager: "M. Devi" },
      { id: "D06", name: "Maintenance", headcount: 12, manager: "A. Selvam" },
    ],

    shiftPattern: {
      shifts: ["A", "B", "C"],
      hours: { A: "06:00–14:00", B: "14:00–22:00", C: "22:00–06:00" },
      currentShift: "A",
    },

    skillMatrix: [
      { employee: "Vijayakumar M", role: "Plant Manager", dept: "Horn Assembly", skills: ["Line Balancing", "OEE Analysis", "IATF 16949", "Lean Manufacturing"] },
      { employee: "R. Krishnan", role: "Dept Head", dept: "Brake Components", skills: ["Brake Pad Process", "APQP", "SPC", "5S"] },
      { employee: "S. Murugan", role: "Shift Supervisor", dept: "Horn Assembly", skills: ["Horn Assembly", "EOL Testing", "6S", "TPM"] },
      { employee: "K. Sundaram", role: "Operator", dept: "Brake Components", skills: ["Hydraulic Press", "Brake Pad Pressing", "Quality Check"] },
      { employee: "P. Anandhi", role: "Operator", dept: "Horn Assembly", skills: ["Horn Coil Winding", "Acoustic Testing", "Visual Inspection"] },
      { employee: "M. Devi", role: "QA Lead", dept: "Quality & Testing", skills: ["Final Inspection", "CMM", "Gauge R&R", "PPAP"] },
    ],

    maintenanceOrders: [
      { id: "MO-2248", equipment: "Horn Coil Winder CW-4", type: "Preventive", status: "Scheduled", dueDate: "2026-05-22", assignee: "A. Selvam" },
      { id: "MO-2249", equipment: "Hydraulic Press HP-12", type: "Corrective", status: "In Progress", dueDate: "2026-05-20", assignee: "V. Rajan" },
      { id: "MO-2250", equipment: "Acoustic Test Bench AT-3", type: "Preventive", status: "Completed", dueDate: "2026-05-18", assignee: "A. Selvam" },
      { id: "MO-2251", equipment: "Brake Pad Grinder BG-2", type: "Breakdown", status: "Open", dueDate: "2026-05-19", assignee: "V. Rajan" },
      { id: "MO-2252", equipment: "Paint Booth PB-1", type: "Preventive", status: "Scheduled", dueDate: "2026-05-25", assignee: "K. Sundar" },
    ],

    equipmentHealth: [
      { equipment: "Horn Coil Winder CW-4", health: 88, lastPM: "2026-04-22", nextPM: "2026-05-22" },
      { equipment: "Hydraulic Press HP-12", health: 61, lastPM: "2026-03-15", nextPM: "2026-05-20" },
      { equipment: "Disc Brake Press DBP-6", health: 92, lastPM: "2026-04-30", nextPM: "2026-06-01" },
      { equipment: "Acoustic Test Bench AT-3", health: 95, lastPM: "2026-05-18", nextPM: "2026-07-18" },
      { equipment: "EOL Horn Tester HT-2", health: 79, lastPM: "2026-04-08", nextPM: "2026-05-28" },
      { equipment: "Stamping Press SP-9", health: 84, lastPM: "2026-04-18", nextPM: "2026-06-15" },
    ],

    energyDaily: [
      { date: "May 13", kwh: 4820 },
      { date: "May 14", kwh: 4950 },
      { date: "May 15", kwh: 4780 },
      { date: "May 16", kwh: 5120 },
      { date: "May 17", kwh: 4640 },
      { date: "May 18", kwh: 3980 },
      { date: "May 19", kwh: 5050 },
    ],

    energyByDept: [
      { dept: "Horn Assembly", kwh: 1640, percentage: 32 },
      { dept: "Brake Components", kwh: 1320, percentage: 26 },
      { dept: "Stamping & Pressing", kwh: 1020, percentage: 20 },
      { dept: "Alarm & Accessories", kwh: 610, percentage: 12 },
      { dept: "Quality & Testing", kwh: 280, percentage: 6 },
      { dept: "Utilities", kwh: 180, percentage: 4 },
    ],

    safetyIncidents: [
      { id: "SI-112", date: "2026-04-08", type: "Near Miss", dept: "Stamping & Pressing", description: "Operator near-miss on SP-9 during changeover", status: "Closed" },
      { id: "SI-113", date: "2026-04-28", type: "First Aid", dept: "Brake Components", description: "Minor cut during brake pad trimming", status: "Closed" },
      { id: "SI-114", date: "2026-05-10", type: "Near Miss", dept: "Horn Assembly", description: "Slip on hydraulic fluid near CW-4", status: "Open" },
    ],

    safetyMetrics: {
      ltiFreeDays: 142,
      nearMissYTD: 6,
      firstAidYTD: 3,
      safetyTrainingCompletion: 94,
    },

    ltiFreeDays: 142,

    dashboardKpis: {
      oeeToday: 83.6,
      productionToday: 8420,
      productionTarget: 9000,
      defectRate: 2.9,
      onTimeDelivery: 96.4,
      energyKwh: 5050,
      activeAlerts: 3,
    },

    users: [
      { id: "U01", name: "Vijayakumar M", role: "Plant Manager", dept: "Horn Assembly", email: "vijayakumar.m@rootsindustries.in" },
      { id: "U02", name: "R. Krishnan", role: "Dept Head — Brakes", dept: "Brake Components", email: "r.krishnan@rootsindustries.in" },
      { id: "U03", name: "S. Murugan", role: "Shift Supervisor", dept: "Horn Assembly", email: "s.murugan@rootsindustries.in" },
      { id: "U04", name: "M. Devi", role: "QA Lead", dept: "Quality & Testing", email: "m.devi@rootsindustries.in" },
      { id: "U05", name: "K. Prakash", role: "Dept Head — Stamping", dept: "Stamping & Pressing", email: "k.prakash@rootsindustries.in" },
    ],

    defaultUser: "Vijayakumar M",
    defaultUserRole: "Plant Manager",

    kpiTargets: {
      oee: 85,
      defectRate: 2.0,
      onTimeDelivery: 98,
      ltiFreeDays: 200,
      energyPerUnit: 0.62,
    },
  },
};

export default config;

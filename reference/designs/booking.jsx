/* ═══════════════════════════════════════════════════════════════════════════
   booking.jsx — Multi-step booking wizard (replaces the flat BookingModal)
   Steps: 1 Clinic  2 Reason  3 Date/Time  4 Details  5 Confirm
   ═══════════════════════════════════════════════════════════════════════════ */

const REASONS = [
  { id:"well-child", label:"Well-child checkup", icon:"check-circle" },
  { id:"sick",       label:"Sick visit",          icon:"heart-pulse" },
  { id:"telehealth", label:"Telehealth / video",  icon:"video" },
  { id:"urgent",     label:"Urgent care",          icon:"shield-plus" },
  { id:"vaccines",   label:"Vaccines / shots",     icon:"syringe" },
  { id:"physical",   label:"Sports or school physical", icon:"award" },
];

const AGES = ["Newborn (0–3 mo)", "Infant (3–12 mo)", "Toddler (1–3 yr)", "Child (4–11 yr)", "Teen (12–21 yr)"];

/* generate fake week slots starting from next Monday */
function makeSlots() {
  const slots = {};
  const today = new Date();
  const dow = today.getDay();
  const daysUntilMon = dow === 0 ? 1 : (8 - dow) % 7 || 7;
  for (let d = 0; d < 5; d++) {
    const date = new Date(today);
    date.setDate(today.getDate() + daysUntilMon + d);
    const key = date.toISOString().slice(0, 10);
    const allSlots = ["8:30 AM","9:00 AM","9:30 AM","10:15 AM","11:00 AM","11:30 AM","1:00 PM","1:45 PM","2:30 PM","3:15 PM","4:00 PM","5:00 PM","5:30 PM"];
    // randomly remove some to simulate availability
    slots[key] = allSlots.filter((_, i) => (i * 7 + d * 3) % 5 !== 0);
  }
  return slots;
}
const WEEK_SLOTS = makeSlots();
const WEEK_KEYS = Object.keys(WEEK_SLOTS);

function fmt(dateStr) {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("en-US", { weekday:"short", month:"short", day:"numeric" });
}

/* ── Step components ───────────────────────────────────────────────────── */
function StepClinic({ f, set, t }) {
  const KT = window.KT;
  const [q, setQ] = React.useState("");
  const [region, setRegion] = React.useState("all");
  const shown = KT.locations.filter((l) => {
    const okR = region === "all" || l.region === region;
    const s = q.trim().toLowerCase();
    return okR && (!s || l.name.toLowerCase().includes(s) || l.city.toLowerCase().includes(s) || l.zip.includes(s));
  });
  return (
    <div>
      <div className="bk-step-label">{t("Step 1 of 4","Paso 1 de 4")}</div>
      <h3 className="bk-step-h">{t("Choose a clinic","Elija una clínica")}</h3>
      <div className="search-box" style={{ marginBottom:12 }}>
        <Icon name="search" size={18} />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("City, neighborhood or ZIP…","Ciudad o código postal…")} />
      </div>
      <div className="region-chips" style={{ marginBottom:14 }}>
        <button data-on={region==="all"?"1":"0"} onClick={() => setRegion("all")}>{t("All","Todas")}</button>
        {Object.entries(KT.REGIONS).map(([k,v]) => <button key={k} data-on={region===k?"1":"0"} onClick={() => setRegion(k)}>{v.split(" ")[0]}</button>)}
      </div>
      <div className="bk-clinic-list">
        {shown.map((l) => (
          <button key={l.slug} className={"bk-clinic-row" + (f.clinic === l.slug ? " selected" : "")}
            onClick={() => set("clinic", l.slug)}>
            <span className={"bk-check" + (f.clinic === l.slug ? " on" : "")}><Icon name="check" size={14} /></span>
            <span className="bk-clinic-info">
              <b>{l.name}</b><span>{l.city}, CA · {l.hours?.split(" ·")[0]}</span>
            </span>
            {l.urgent && <span className="pill-urgent" style={{ fontSize:10.5 }}>{t("Urgent","Urg.")}</span>}
          </button>
        ))}
        {shown.length === 0 && <div style={{ padding:"16px 0", color:"var(--ink-3)" }}>{t("No clinics match.","Sin resultados.")}</div>}
      </div>
    </div>
  );
}

function StepReason({ f, set, t }) {
  return (
    <div>
      <div className="bk-step-label">{t("Step 2 of 4","Paso 2 de 4")}</div>
      <h3 className="bk-step-h">{t("What brings you in?","¿Motivo de la visita?")}</h3>
      <div className="bk-reason-grid">
        {REASONS.map((r) => (
          <button key={r.id} className={"bk-reason" + (f.reason === r.id ? " selected" : "")}
            onClick={() => set("reason", r.id)}>
            <span className="bk-reason-ic"><Icon name={r.icon} size={22} /></span>
            <span>{r.label}</span>
          </button>
        ))}
      </div>
      <div style={{ marginTop:22 }}>
        <div className="bk-field-label">{t("Child's age group","Edad del niño")}</div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
          {AGES.map((a) => (
            <button key={a} className={"bk-age-chip" + (f.age === a ? " selected" : "")}
              onClick={() => set("age", a)}>{a}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

function StepDateTime({ f, set, t }) {
  const [selDate, setSelDate] = React.useState(f.date || WEEK_KEYS[0]);
  const slots = WEEK_SLOTS[selDate] || [];
  return (
    <div>
      <div className="bk-step-label">{t("Step 3 of 4","Paso 3 de 4")}</div>
      <h3 className="bk-step-h">{t("Pick a date & time","Elija fecha y hora")}</h3>
      <div className="bk-day-row">
        {WEEK_KEYS.map((k) => (
          <button key={k} className={"bk-day" + (selDate === k ? " selected" : "")}
            onClick={() => { setSelDate(k); set("date", k); set("time", ""); }}>
            <span className="bk-day-wd">{new Date(k+"T12:00").toLocaleDateString("en-US",{weekday:"short"})}</span>
            <span className="bk-day-d">{new Date(k+"T12:00").getDate()}</span>
          </button>
        ))}
      </div>
      <div className="bk-time-grid">
        {slots.map((sl) => (
          <button key={sl} className={"bk-slot" + (f.time === sl ? " selected" : "")}
            onClick={() => set("time", sl)}>{sl}</button>
        ))}
      </div>
      {!selDate && <p style={{ color:"var(--ink-3)", fontSize:14 }}>{t("Select a date above.","Seleccione una fecha.")}</p>}
    </div>
  );
}

function StepDetails({ f, set, t }) {
  const fi = { width:"100%", padding:"12px 14px", border:"1.5px solid var(--line-2)", borderRadius:11, font:"inherit", fontSize:15, color:"var(--ink)", background:"#fff", outline:"none" };
  const lb = { fontSize:13, fontWeight:700, color:"var(--ink-2)", display:"block", marginBottom:7 };
  return (
    <div>
      <div className="bk-step-label">{t("Step 4 of 4","Paso 4 de 4")}</div>
      <h3 className="bk-step-h">{t("Your contact details","Sus datos de contacto")}</h3>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
        <div style={{ gridColumn:"1/-1" }}>
          <label style={lb}>{t("Child's name","Nombre del niño")}</label>
          <input style={fi} value={f.child} onChange={(e) => set("child", e.target.value)} placeholder="First name is fine" />
        </div>
        <div>
          <label style={lb}>{t("Parent / guardian name","Nombre del tutor")}</label>
          <input style={fi} value={f.name} onChange={(e) => set("name", e.target.value)} placeholder={t("Full name","Nombre completo")} />
        </div>
        <div>
          <label style={lb}>{t("Phone","Teléfono")}</label>
          <input style={fi} value={f.phone} onChange={(e) => set("phone", e.target.value)} placeholder="(555) 555-5555" />
        </div>
        <div style={{ gridColumn:"1/-1" }}>
          <label style={lb}>{t("Email (optional)","Email (opcional)")}</label>
          <input style={fi} value={f.email} onChange={(e) => set("email", e.target.value)} placeholder="for appointment reminder" />
        </div>
      </div>
    </div>
  );
}

function StepConfirm({ f, t, onClose }) {
  const KT = window.KT;
  const loc = KT.locations.find((l) => l.slug === f.clinic);
  const reasonLabel = REASONS.find((r) => r.id === f.reason)?.label || f.reason;
  return (
    <div style={{ textAlign:"center", padding:"8px 0 4px" }}>
      <div style={{ width:64, height:64, borderRadius:"50%", background:"color-mix(in srgb, var(--good) 14%, #fff)", color:"var(--good)", display:"grid", placeItems:"center", margin:"0 auto 20px" }}>
        <Icon name="check-circle" size={34} />
      </div>
      <h3 style={{ fontFamily:"var(--font-body)", fontSize:24 }}>{t("You're booked! 🎉","¡Reserva enviada! 🎉")}</h3>
      <p className="muted" style={{ maxWidth:"42ch", margin:"10px auto 0" }}>
        {t("We'll call to confirm within the hour. If you need to reach us sooner:","Te llamaremos para confirmar en breve.")}
      </p>
      <div className="bk-confirm-card">
        {loc && <div className="bk-conf-row"><Icon name="map-pin" size={18} /><span><b>{loc.name}</b> · {loc.city}</span></div>}
        <div className="bk-conf-row"><Icon name="stethoscope" size={18} /><span>{reasonLabel}{f.age ? ` · ${f.age}` : ""}</span></div>
        {f.date && f.time && <div className="bk-conf-row"><Icon name="calendar" size={18} /><span>{fmt(f.date)} at {f.time}</span></div>}
        {f.name && <div className="bk-conf-row"><Icon name="user" size={18} /><span>{f.name}{f.phone ? ` · ${f.phone}` : ""}</span></div>}
      </div>
      {loc && <a href={"tel:" + loc.phone.replace(/\D/g,"")} className="btn btn-ghost" style={{ marginTop:4 }}><Icon name="phone" size={18} /> {loc.phone}</a>}
      <button className="btn btn-primary" style={{ marginTop:12, marginLeft:8 }} onClick={onClose}>{t("Done","Listo")}</button>
    </div>
  );
}

/* ── Booking wizard shell ──────────────────────────────────────────────── */
function BookingWizard({ t, onClose, prefill }) {
  const [step, setStep] = React.useState(1);
  const [f, setF] = React.useState({ clinic: prefill?.clinic || "", reason:"", age:"", date:"", time:"", name:"", phone:"", child:"", email:"", ...prefill });
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));
  const TOTAL = 4;

  const canNext = () => {
    if (step === 1) return !!f.clinic;
    if (step === 2) return !!f.reason && !!f.age;
    if (step === 3) return !!f.date && !!f.time;
    if (step === 4) return !!f.name && !!f.phone;
    return true;
  };

  const steps = {
    1: <StepClinic f={f} set={set} t={t} />,
    2: <StepReason f={f} set={set} t={t} />,
    3: <StepDateTime f={f} set={set} t={t} />,
    4: <StepDetails f={f} set={set} t={t} />,
    5: <StepConfirm f={f} t={t} onClose={onClose} />,
  };

  return (
    <Modal title={step < 5 ? t("Book an appointment","Reservar una cita") : t("Appointment requested","Cita solicitada")} onClose={onClose}>
      {step < 5 && (
        <div className="bk-progress">
          {[1,2,3,4].map((n) => (
            <div key={n} className={"bk-prog-seg" + (n <= step ? " done" : "")} />
          ))}
        </div>
      )}
      <div className="bk-body">{steps[step]}</div>
      {step < 5 && (
        <div className="bk-footer">
          {step > 1 ? (
            <button className="btn btn-ghost" onClick={() => setStep(step - 1)}><Icon name="chevron-left" size={18} /> {t("Back","Atrás")}</button>
          ) : <span />}
          <button className="btn btn-primary" disabled={!canNext()} onClick={() => setStep(step + 1)}>
            {step === TOTAL ? <><Icon name="check-circle" size={18} /> {t("Request appointment","Solicitar cita")}</> : <>{t("Next","Siguiente")} <Icon name="chevron-right" size={18} /></>}
          </button>
        </div>
      )}
      {step < 5 && <p style={{ fontSize:12.5, color:"var(--ink-3)", textAlign:"center", marginTop:12 }}>{t("Prototype — no real appointment is booked.","Prototipo — no se reserva ninguna cita.")}</p>}
    </Modal>
  );
}

Object.assign(window, { BookingWizard });

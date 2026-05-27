import { useState } from "react";

const FOUNDING_LIMIT = 100;

const ROLES = ["Video Editor","Thumbnail Designer","Script Writer","Reel Creator","Web Developer","AI Creator","SEO Expert"];
const CITIES = ["Mumbai","Delhi","Bangalore","Pune","Hyderabad","Chennai","Kolkata","Jaipur","Ahmedabad","Lucknow","Other"];
const BUDGETS = ["Under ₹1,000","₹1,000–5,000","₹5,000–15,000","₹15,000+"];
const DEADLINES = ["Urgent (1–2 days)","This week","This month","Flexible"];
const LANGUAGES_LIST = ["English","Hindi","Hinglish","Bengali","Tamil","Telugu","Marathi"];

const ROLE_COLOR = {
  "Video Editor":"#FF6B35",
  "Thumbnail Designer":"#A78BFA",
  "Script Writer":"#34D399",
  "Reel Creator":"#FBBF24",
  "Web Developer":"#60A5FA",
  "AI Creator":"#F472B6",
  "SEO Expert":"#4ADE80",
};
const ROLE_BG = {
  "Video Editor":"rgba(255,107,53,0.10)",
  "Thumbnail Designer":"rgba(167,139,250,0.10)",
  "Script Writer":"rgba(52,211,153,0.10)",
  "Reel Creator":"rgba(251,191,36,0.10)",
  "Web Developer":"rgba(96,165,250,0.10)",
  "AI Creator":"rgba(244,114,182,0.10)",
  "SEO Expert":"rgba(74,222,128,0.10)",
};
const ROLE_ICON = {
  "Video Editor":"▶",
  "Thumbnail Designer":"◈",
  "Script Writer":"✦",
  "Reel Creator":"◎",
  "Web Developer":"</>",
  "AI Creator":"✺",
  "SEO Expert":"↑",
};

const SAMPLE_CREATORS = [
  { id:"s1", name:"Video Editor", role:"Video Editor", city:"Mumbai", bio:"Sample profile — showing how Video Editor profiles will appear on Crevo. Real creators are joining during beta.", tags:["YouTube","Reels","Color Grade"], price:"3,000–8,000", per:"video", isDemo:true },
  { id:"s2", name:"Thumbnail Designer", role:"Thumbnail Designer", city:"Delhi", bio:"Sample profile — showing how Thumbnail Designer profiles will appear on Crevo. Join now and get your founding badge.", tags:["YouTube","Photoshop","Canva"], price:"500–1,500", per:"thumbnail", isDemo:true },
  { id:"s3", name:"Reel Creator", role:"Reel Creator", city:"Bangalore", bio:"Sample profile — showing how Reel Creator profiles will appear on Crevo. Be among the first 100 founding creators.", tags:["Fashion","Lifestyle","Trending"], price:"4,000–10,000", per:"reel", isDemo:true },
];

function getRoleColor(role) { return ROLE_COLOR[role] || "#FF6B35"; }
function getRoleBg(role) { return ROLE_BG[role] || "rgba(255,107,53,0.10)"; }
function getRoleIcon(role) { return ROLE_ICON[role] || "✦"; }
function randomId() { return Math.random().toString(36).slice(2,9); }
function timeAgo(ts) {
  var d = Date.now() - ts;
  if (d < 60000) return "just now";
  if (d < 3600000) return Math.floor(d/60000) + "m ago";
  if (d < 86400000) return Math.floor(d/3600000) + "h ago";
  return Math.floor(d/86400000) + "d ago";
}
function getInitials(name) {
  return name.split(" ").map(function(w){ return w[0]; }).join("").slice(0,2).toUpperCase();
}

// ── Small UI pieces ──────────────────────────────────────────────────────────

function Logo() {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer" }}>
      <svg width="26" height="26" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="64" height="64" rx="14" fill="url(#lg)"/>
        <path d="M42 20C38.8 17 34.6 15 30 15C21.2 15 14 22.2 14 31C14 39.8 21.2 47 30 47C34.6 47 38.8 45 42 42" stroke="white" strokeWidth="6" strokeLinecap="round"/>
        <path d="M34 24L44 31L34 38" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" opacity="0.85"/>
        <defs>
          <linearGradient id="lg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF6B35"/>
            <stop offset="1" stopColor="#F97316"/>
          </linearGradient>
        </defs>
      </svg>
      <span style={{ fontWeight:800, fontSize:20, letterSpacing:"-0.5px", color:"#ffffff" }}>Crevo</span>
    </div>
  );
}

function Tag({ children, color }) {
  var c = color || "#FF6B35";
  return (
    <span style={{ display:"inline-flex", alignItems:"center", background:c+"18", border:"1px solid "+c+"30", color:c, padding:"2px 9px", borderRadius:20, fontSize:11, fontWeight:600, whiteSpace:"nowrap" }}>
      {children}
    </span>
  );
}

function PrimaryBtn({ children, onClick, full, small }) {
  return (
    <button onClick={onClick} style={{ padding: small ? "8px 16px" : "12px 24px", background:"linear-gradient(135deg,#FF6B35,#F97316)", border:"none", borderRadius:9, color:"#ffffff", fontWeight:600, fontSize: small ? 12 : 14, cursor:"pointer", fontFamily:"inherit", width: full ? "100%" : "auto" }}>
      {children}
    </button>
  );
}

function SecondaryBtn({ children, onClick, full, small }) {
  return (
    <button onClick={onClick} style={{ padding: small ? "8px 16px" : "12px 24px", background:"transparent", border:"1px solid #2a2a32", borderRadius:9, color:"#A1A1AA", fontWeight:600, fontSize: small ? 12 : 14, cursor:"pointer", fontFamily:"inherit", width: full ? "100%" : "auto" }}>
      {children}
    </button>
  );
}

function GhostBtn({ children, onClick }) {
  return (
    <button onClick={onClick} style={{ background:"transparent", border:"none", color:"#71717A", fontWeight:500, fontSize:13, cursor:"pointer", fontFamily:"inherit", padding:"4px 0" }}>
      {children}
    </button>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
      {label && <label style={{ fontSize:11, color:"#71717A", fontWeight:500 }}>{label}</label>}
      {children}
    </div>
  );
}

var inputStyle = { padding:"11px 13px", background:"#0D0D10", border:"1px solid #222228", borderRadius:8, color:"#ffffff", fontSize:13, outline:"none", fontFamily:"inherit", width:"100%", boxSizing:"border-box" };

function ToastMsg({ msg }) {
  if (!msg) return null;
  return (
    <div style={{ position:"fixed", bottom:24, left:"50%", transform:"translateX(-50%)", background:"#ffffff", color:"#09090B", padding:"11px 22px", borderRadius:10, fontWeight:600, fontSize:13, zIndex:9999, boxShadow:"0 8px 32px rgba(0,0,0,0.5)", whiteSpace:"nowrap" }}>
      {msg}
    </div>
  );
}

function Overlay({ children, onClose }) {
  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.88)", zIndex:400, display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
      <div onClick={function(e){ e.stopPropagation(); }} style={{ background:"#0D0D10", border:"1px solid #1f1f26", borderRadius:20, padding:24, maxWidth:430, width:"100%", maxHeight:"92vh", overflowY:"auto", position:"relative" }}>
        <button onClick={onClose} style={{ position:"absolute", top:14, right:14, background:"#1a1a20", border:"none", color:"#52525B", width:26, height:26, borderRadius:7, cursor:"pointer", fontSize:13, display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
        {children}
      </div>
    </div>
  );
}

function FoundingBar({ label, filled }) {
  var pct = Math.min((filled/FOUNDING_LIMIT)*100, 100);
  var left = Math.max(FOUNDING_LIMIT - filled, 0);
  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
        <span style={{ fontSize:12, color:"#A1A1AA" }}>{label}</span>
        <span style={{ fontSize:12, color:"#FF6B35", fontWeight:700 }}>{left} left</span>
      </div>
      <div style={{ height:5, background:"#1a1a20", borderRadius:4 }}>
        <div style={{ height:"100%", width:pct+"%", background:"linear-gradient(90deg,#FF6B35,#F97316)", borderRadius:4 }}/>
      </div>
    </div>
  );
}

// ── Creator Card ─────────────────────────────────────────────────────────────

function CreatorCard({ creator, onClick }) {
  var color = getRoleColor(creator.role);
  var bg = getRoleBg(creator.role);
  var icon = getRoleIcon(creator.role);
  var initials = getInitials(creator.name);
  return (
    <div onClick={onClick} style={{ background:"#0D0D10", border:"1px solid #1f1f26", borderRadius:16, padding:20, cursor:"pointer" }}
      onMouseEnter={function(e){ e.currentTarget.style.borderColor = color+"55"; e.currentTarget.style.transform = "translateY(-3px)"; }}
      onMouseLeave={function(e){ e.currentTarget.style.borderColor = "#1f1f26"; e.currentTarget.style.transform = "translateY(0)"; }}>
      {creator.isDemo && (
        <div style={{ marginBottom:8 }}>
          <Tag color="#52525B">Platform Preview</Tag>
        </div>
      )}
      <div style={{ display:"flex", gap:12, alignItems:"center", marginBottom:12 }}>
        <div style={{ width:46, height:46, borderRadius:12, background:bg, border:"1px solid "+color+"25", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:15, color:color, flexShrink:0 }}>
          {initials}
        </div>
        <div>
          <div style={{ fontWeight:700, fontSize:14, marginBottom:2, color:"#ffffff" }}>{creator.name}</div>
          <div style={{ color:"#52525B", fontSize:11 }}>📍 {creator.city}</div>
        </div>
      </div>
      <div style={{ marginBottom:10 }}>
        <Tag color={color}>{icon} {creator.role}</Tag>
        {creator.founding && <span style={{ marginLeft:6 }}><Tag color="#FF6B35">⭐ Founding</Tag></span>}
        {creator.verified && <span style={{ marginLeft:6 }}><Tag color="#60A5FA">✔ Verified</Tag></span>}
      </div>
      <p style={{ color:"#71717A", fontSize:12, lineHeight:1.6, marginBottom:12, maxHeight:"3.2em", overflow:"hidden" }}>
        {creator.bio}
      </p>
      <div style={{ display:"flex", gap:5, flexWrap:"wrap", marginBottom:12 }}>
        {creator.tags.slice(0,3).map(function(tag){ return (
          <span key={tag} style={{ background:"#1a1a20", color:"#52525B", padding:"3px 8px", borderRadius:5, fontSize:10 }}>{tag}</span>
        ); })}
      </div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", borderTop:"1px solid #1a1a20", paddingTop:10 }}>
        <span style={{ color:"#3F3F46", fontSize:11 }}>{creator.isDemo ? "Sample" : (creator.worksCompleted||0)+" works"}</span>
        <span style={{ color:color, fontWeight:700, fontSize:13 }}>₹{creator.price}<span style={{ color:"#3F3F46", fontWeight:400, fontSize:10 }}>/{creator.per}</span></span>
      </div>
    </div>
  );
}

// ── Creator Detail ────────────────────────────────────────────────────────────

function CreatorDetail({ creator, onClose, credits, onConnect }) {
  var color = getRoleColor(creator.role);
  var bg = getRoleBg(creator.role);
  var icon = getRoleIcon(creator.role);
  var initials = getInitials(creator.name);
  var [requested, setRequested] = useState(false);
  var [showReport, setShowReport] = useState(false);
  return (
    <Overlay onClose={onClose}>
      <div style={{ display:"flex", gap:14, marginBottom:18 }}>
        <div style={{ width:54, height:54, borderRadius:13, background:bg, border:"1px solid "+color+"25", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:16, color:color, flexShrink:0 }}>
          {initials}
        </div>
        <div>
          <div style={{ fontWeight:700, fontSize:17, color:"#ffffff", marginBottom:4 }}>{creator.name}</div>
          <div style={{ color:color, fontSize:12, fontWeight:600, marginBottom:2 }}>{icon} {creator.role}</div>
          <div style={{ color:"#52525B", fontSize:12 }}>📍 {creator.city}</div>
        </div>
      </div>
      {creator.isDemo && (
        <div style={{ background:"rgba(82,82,91,0.15)", border:"1px solid #2a2a35", borderRadius:9, padding:"10px 14px", marginBottom:14, fontSize:12, color:"#71717A" }}>
          ℹ️ This is a sample profile showing how creator profiles will look on Crevo during beta.
        </div>
      )}
      <p style={{ color:"#A1A1AA", fontSize:13, lineHeight:1.75, marginBottom:16, borderTop:"1px solid #1a1a20", paddingTop:14 }}>{creator.bio}</p>
      <div style={{ display:"flex", gap:8, marginBottom:16 }}>
        <div style={{ flex:1, background:"#111115", border:"1px solid #1a1a20", borderRadius:9, padding:"10px 8px", textAlign:"center" }}>
          <div style={{ fontWeight:700, fontSize:13, color:color, marginBottom:3 }}>₹{creator.price}</div>
          <div style={{ color:"#3F3F46", fontSize:10, textTransform:"uppercase", letterSpacing:0.8 }}>Rate</div>
        </div>
        <div style={{ flex:1, background:"#111115", border:"1px solid #1a1a20", borderRadius:9, padding:"10px 8px", textAlign:"center" }}>
          <div style={{ fontWeight:700, fontSize:13, color:"#ffffff", marginBottom:3 }}>{creator.experience || "—"}</div>
          <div style={{ color:"#3F3F46", fontSize:10, textTransform:"uppercase", letterSpacing:0.8 }}>Experience</div>
        </div>
        <div style={{ flex:1, background:"#111115", border:"1px solid #1a1a20", borderRadius:9, padding:"10px 8px", textAlign:"center" }}>
          <div style={{ fontWeight:700, fontSize:13, color:"#34D399", marginBottom:3 }}>{creator.isDemo ? "—" : (creator.worksCompleted||0)}</div>
          <div style={{ color:"#3F3F46", fontSize:10, textTransform:"uppercase", letterSpacing:0.8 }}>Works</div>
        </div>
      </div>
      <div style={{ display:"flex", gap:5, flexWrap:"wrap", marginBottom:16 }}>
        {creator.tags.map(function(tag){ return (
          <span key={tag} style={{ background:"#1a1a20", color:"#71717A", padding:"4px 10px", borderRadius:6, fontSize:11 }}>{tag}</span>
        ); })}
      </div>
      <div style={{ background:"#111115", border:"1px solid #1a1a20", borderRadius:9, padding:"10px 14px", marginBottom:14, fontSize:12, color:"#52525B", display:"flex", justifyContent:"space-between" }}>
        <span>💳 Connect credits left today</span>
        <span style={{ color:"#FF6B35", fontWeight:700 }}>{credits}</span>
      </div>
      {creator.isDemo ? (
        <div style={{ textAlign:"center", padding:"12px", background:"rgba(255,107,53,0.06)", border:"1px solid rgba(255,107,53,0.15)", borderRadius:10, color:"#FF6B35", fontSize:13, fontWeight:600 }}>
          Join Crevo to connect with real creators
        </div>
      ) : requested ? (
        <div style={{ textAlign:"center", padding:"12px", background:"#052e16", border:"1px solid #166534", borderRadius:10, color:"#22C55E", fontSize:13, fontWeight:600 }}>
          ✅ Request sent! Creator will respond soon.
        </div>
      ) : (
        <PrimaryBtn full onClick={function(){ onConnect(); setRequested(true); }}>Request WhatsApp Connect</PrimaryBtn>
      )}
      <div style={{ textAlign:"center", marginTop:10 }}>
        <button onClick={function(){ setShowReport(function(p){ return !p; }); }} style={{ background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.3)", color:"#f87171", padding:"7px 14px", borderRadius:8, fontSize:12, cursor:"pointer", fontFamily:"inherit" }}>
          Report
        </button>
      </div>
      {showReport && (
        <div style={{ marginTop:10, background:"#1a0808", border:"1px solid #3f1515", borderRadius:10, padding:14 }}>
          {["Fake Profile","Spam","Scam Attempt"].map(function(r){ return (
            <button key={r} onClick={function(){ setShowReport(false); }} style={{ display:"block", width:"100%", textAlign:"left", padding:"8px 10px", background:"transparent", border:"none", color:"#f87171", fontSize:12, cursor:"pointer", fontFamily:"inherit", borderRadius:6 }}>
              • {r}
            </button>
          ); })}
        </div>
      )}
    </Overlay>
  );
}

// ── Proposal Modal ────────────────────────────────────────────────────────────

function ProposalModal({ job, onClose, onSubmit }) {
  var [msg, setMsg] = useState("");
  var [price, setPrice] = useState("");
  var [delivery, setDelivery] = useState("");
  return (
    <Overlay onClose={onClose}>
      <div style={{ fontWeight:700, fontSize:16, color:"#ffffff", marginBottom:4 }}>Send Proposal</div>
      <div style={{ color:"#52525B", fontSize:13, marginBottom:16 }}>For: {job.title}</div>
      <div style={{ display:"grid", gap:12 }}>
        <Field label="Your message">
          <textarea value={msg} onChange={function(e){ setMsg(e.target.value); }} placeholder="Hi, I can help with this project..." rows={3} style={Object.assign({}, inputStyle, { resize:"vertical" })}/>
        </Field>
        <Field label="Expected Price (₹)">
          <input type="number" value={price} onChange={function(e){ setPrice(e.target.value); }} placeholder="e.g. 3000" style={inputStyle}/>
        </Field>
        <Field label="Delivery Time">
          <input value={delivery} onChange={function(e){ setDelivery(e.target.value); }} placeholder="e.g. 3 days" style={inputStyle}/>
        </Field>
        <div style={{ display:"flex", gap:8 }}>
          <PrimaryBtn full onClick={function(){ if(msg && price && delivery) onSubmit(); }}>Submit Proposal</PrimaryBtn>
          <SecondaryBtn full onClick={onClose}>Cancel</SecondaryBtn>
        </div>
      </div>
    </Overlay>
  );
}

// ── Signup Form ───────────────────────────────────────────────────────────────

function CreatorSignupForm({ onSubmit, foundingLeft }) {
  var [name, setName] = useState("");
  var [email, setEmail] = useState("");
  var [role, setRole] = useState(ROLES[0]);
  var [city, setCity] = useState(CITIES[0]);
  var [price, setPrice] = useState("");
  var [per, setPer] = useState("video");
  var [experience, setExperience] = useState("");
  var [works, setWorks] = useState("0");
  var [bio, setBio] = useState("");
  var [language, setLanguage] = useState(LANGUAGES_LIST[0]);
  var [tags, setTags] = useState("");
  var [portfolio, setPortfolio] = useState("");
  var [loading, setLoading] = useState(false);

  function handleSubmit() {
    if (!name || !email || !bio || !price) return;
    setLoading(true);
    setTimeout(function() {
      onSubmit({
        id: randomId(),
        name: name,
        email: email,
        role: role,
        city: city,
        price: price,
        per: per,
        experience: experience,
        worksCompleted: parseInt(works) || 0,
        bio: bio,
        language: language,
        tags: tags.split(",").map(function(t){ return t.trim(); }).filter(Boolean),
        portfolio: portfolio,
        joinedAt: Date.now(),
        founding: foundingLeft > 0,
        verified: false,
        fastResponder: false,
        availableNow: true,
        connectCredits: 5,
        isDemo: false,
      });
      setLoading(false);
    }, 700);
  }

  return (
    <div>
      <div style={{ marginBottom:18 }}>
        <div style={{ fontWeight:700, fontSize:18, color:"#ffffff", marginBottom:6 }}>Join as Creator</div>
        {foundingLeft > 0 ? (
          <div style={{ background:"rgba(255,107,53,0.08)", border:"1px solid rgba(255,107,53,0.2)", borderRadius:9, padding:"10px 14px", fontSize:13, color:"#FF6B35" }}>
            ⭐ {foundingLeft} founding spots left — Zero commission during beta + lifetime 50% lower commission.
          </div>
        ) : (
          <div style={{ color:"#52525B", fontSize:13 }}>Join Crevo for free.</div>
        )}
      </div>
      <div style={{ display:"grid", gap:13 }}>
        <Field label="Full Name *"><input value={name} onChange={function(e){setName(e.target.value);}} placeholder="Rohit Sharma" style={inputStyle}/></Field>
        <Field label="Email *"><input type="email" value={email} onChange={function(e){setEmail(e.target.value);}} placeholder="you@email.com" style={inputStyle}/></Field>
        <Field label="Your Role *">
          <select value={role} onChange={function(e){setRole(e.target.value);}} style={inputStyle}>
            {ROLES.map(function(r){ return <option key={r} value={r}>{r}</option>; })}
          </select>
        </Field>
        <Field label="City *">
          <select value={city} onChange={function(e){setCity(e.target.value);}} style={inputStyle}>
            {CITIES.map(function(c){ return <option key={c} value={c}>{c}</option>; })}
          </select>
        </Field>
        <Field label="Starting Rate (₹) *"><input type="number" value={price} onChange={function(e){setPrice(e.target.value);}} placeholder="5000" style={inputStyle}/></Field>
        <Field label="Per (video / reel / script)"><input value={per} onChange={function(e){setPer(e.target.value);}} placeholder="video" style={inputStyle}/></Field>
        <Field label="Experience"><input value={experience} onChange={function(e){setExperience(e.target.value);}} placeholder="2 years" style={inputStyle}/></Field>
        <Field label="Works Completed (approx.)"><input type="number" value={works} onChange={function(e){setWorks(e.target.value);}} placeholder="0" style={inputStyle}/></Field>
        <Field label="Your Bio *"><textarea value={bio} onChange={function(e){setBio(e.target.value);}} placeholder="Tell clients about your skills, style, and experience..." rows={3} style={Object.assign({}, inputStyle, { resize:"vertical" })}/></Field>
        <Field label="Language You Work In">
          <select value={language} onChange={function(e){setLanguage(e.target.value);}} style={inputStyle}>
            {LANGUAGES_LIST.map(function(l){ return <option key={l} value={l}>{l}</option>; })}
          </select>
        </Field>
        <Field label="Skills & Tags (comma separated)"><input value={tags} onChange={function(e){setTags(e.target.value);}} placeholder="YouTube, Reels, Color Grading" style={inputStyle}/></Field>
        <Field label="Portfolio Link (optional)"><input value={portfolio} onChange={function(e){setPortfolio(e.target.value);}} placeholder="https://your-portfolio.com" style={inputStyle}/></Field>
        <PrimaryBtn full onClick={handleSubmit}>{loading ? "Creating..." : "Create My Profile — Free"}</PrimaryBtn>
      </div>
    </div>
  );
}

// ── Post Requirement Form ─────────────────────────────────────────────────────

function PostReqForm({ onSubmit, foundingLeft }) {
  var [clientName, setClientName] = useState("");
  var [title, setTitle] = useState("");
  var [category, setCategory] = useState(ROLES[0]);
  var [budget, setBudget] = useState(BUDGETS[0]);
  var [deadline, setDeadline] = useState(DEADLINES[0]);
  var [desc, setDesc] = useState("");
  var [loading, setLoading] = useState(false);

  function handleSubmit() {
    if (!clientName || !title) return;
    setLoading(true);
    setTimeout(function() {
      onSubmit({ id:randomId(), clientName:clientName, title:title, category:category, budget:budget, deadline:deadline, desc:desc, postedAt:Date.now(), founding:foundingLeft>0 });
      setLoading(false);
    }, 600);
  }

  return (
    <div>
      <div style={{ marginBottom:18 }}>
        <div style={{ fontWeight:700, fontSize:18, color:"#ffffff", marginBottom:6 }}>Post a Requirement</div>
        {foundingLeft > 0 ? (
          <div style={{ background:"rgba(52,211,153,0.08)", border:"1px solid rgba(52,211,153,0.2)", borderRadius:9, padding:"10px 14px", fontSize:13, color:"#34D399" }}>
            🟢 {foundingLeft} founding client spots left — Post for free, always.
          </div>
        ) : (
          <div style={{ color:"#52525B", fontSize:13 }}>Post your requirement for free.</div>
        )}
      </div>
      <div style={{ display:"grid", gap:13 }}>
        <Field label="Your Name / Channel *"><input value={clientName} onChange={function(e){setClientName(e.target.value);}} placeholder="TechWithRaj" style={inputStyle}/></Field>
        <Field label="Project Title *"><input value={title} onChange={function(e){setTitle(e.target.value);}} placeholder="Looking for a YouTube Video Editor" style={inputStyle}/></Field>
        <Field label="Category Needed">
          <select value={category} onChange={function(e){setCategory(e.target.value);}} style={inputStyle}>
            {ROLES.map(function(r){ return <option key={r} value={r}>{r}</option>; })}
          </select>
        </Field>
        <Field label="Budget">
          <select value={budget} onChange={function(e){setBudget(e.target.value);}} style={inputStyle}>
            {BUDGETS.map(function(b){ return <option key={b} value={b}>{b}</option>; })}
          </select>
        </Field>
        <Field label="Deadline">
          <select value={deadline} onChange={function(e){setDeadline(e.target.value);}} style={inputStyle}>
            {DEADLINES.map(function(d){ return <option key={d} value={d}>{d}</option>; })}
          </select>
        </Field>
        <Field label="Project Details"><textarea value={desc} onChange={function(e){setDesc(e.target.value);}} placeholder="Describe what you need, content type, style preferences..." rows={3} style={Object.assign({}, inputStyle, { resize:"vertical" })}/></Field>
        <PrimaryBtn full onClick={handleSubmit}>{loading ? "Posting..." : "Post Requirement — Free"}</PrimaryBtn>
      </div>
    </div>
  );
}

// ── Home Page ─────────────────────────────────────────────────────────────────

function HomePage({ setPage, creators, foundingCreatorsLeft, foundingClientsLeft }) {
  var allCreators = SAMPLE_CREATORS.concat(creators);
  return (
    <div>
      {/* Hero */}
      <div style={{ maxWidth:660, margin:"0 auto", padding:"60px 20px 48px", textAlign:"center" }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"#1a1a20", border:"1px solid #2a2a32", color:"#A1A1AA", padding:"5px 14px", borderRadius:20, fontSize:12, marginBottom:22 }}>
          🇮🇳 India's Hinglish-Friendly Creator Marketplace
        </div>
        <h1 style={{ fontSize:"clamp(30px,5vw,52px)", fontWeight:800, lineHeight:1.08, letterSpacing:"-2px", marginBottom:16, color:"#ffffff" }}>
          Find Indian Creators Who<br/>Actually Understand{" "}
          <span style={{ background:"linear-gradient(135deg,#FF6B35,#F97316)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Your Content</span>
        </h1>
        <p style={{ color:"#A1A1AA", fontSize:15, lineHeight:1.8, marginBottom:10, maxWidth:460, margin:"0 auto 10px" }}>
          English, Hindi & Hinglish creator marketplace built for India's creator economy.
        </p>
        <p style={{ color:"#FF6B35", fontSize:13, fontWeight:600, marginBottom:28, maxWidth:460, margin:"0 auto 28px" }}>
          🔥 First 100 creators & clients get lifetime 50% lower commission. Limited founding access.
        </p>
        <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap", marginBottom:28 }}>
          <PrimaryBtn onClick={function(){ setPage("creators"); }}>Find Creators</PrimaryBtn>
          <SecondaryBtn onClick={function(){ setPage("post-req"); }}>Post Requirement</SecondaryBtn>
        </div>
        <div style={{ display:"flex", justifyContent:"center", gap:8, flexWrap:"wrap" }}>
          {["⚡ Fast Hiring","🇮🇳 India Focused","💬 WhatsApp Workflow","🎯 Creator-First"].map(function(b){ return (
            <div key={b} style={{ display:"flex", alignItems:"center", gap:5, background:"#111115", border:"1px solid #1f1f26", borderRadius:20, padding:"5px 12px", fontSize:12, color:"#71717A" }}>{b}</div>
          ); })}
        </div>
      </div>

      <div style={{ borderTop:"1px solid #1a1a20" }}/>

      {/* Earning emotion */}
      <div style={{ background:"rgba(255,107,53,0.04)", borderBottom:"1px solid #1a1a20", padding:"16px 20px" }}>
        <div style={{ maxWidth:860, margin:"0 auto", display:"flex", gap:20, justifyContent:"center", flexWrap:"wrap" }}>
          {["Turn your skills into income.","Find clients without agencies.","Get paid for your creativity."].map(function(line){ return (
            <div key={line} style={{ display:"flex", alignItems:"center", gap:7, fontSize:13, color:"#A1A1AA" }}>
              <span style={{ color:"#FF6B35" }}>→</span>{line}
            </div>
          ); })}
        </div>
      </div>

      {/* Platform Preview */}
      <div style={{ maxWidth:960, margin:"0 auto", padding:"52px 20px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:8, flexWrap:"wrap", gap:10 }}>
          <div>
            <h2 style={{ fontSize:20, fontWeight:700, letterSpacing:"-0.5px", marginBottom:4, color:"#ffffff" }}>Platform Preview</h2>
            <p style={{ color:"#52525B", fontSize:13 }}>Sample creator cards — showing how profiles will look on Crevo during beta.</p>
          </div>
          <GhostBtn onClick={function(){ setPage("creators"); }}>View all →</GhostBtn>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(255px,1fr))", gap:14, marginTop:20 }}>
          {allCreators.slice(0,3).map(function(c){ return (
            <CreatorCard key={c.id} creator={c} onClick={function(){ setPage("creators"); }}/>
          ); })}
        </div>
      </div>

      <div style={{ borderTop:"1px solid #1a1a20" }}/>

      {/* Founding Offer */}
      <div style={{ maxWidth:880, margin:"0 auto", padding:"52px 20px" }}>
        <div style={{ background:"rgba(255,107,53,0.06)", border:"1px solid rgba(255,107,53,0.2)", borderRadius:18, padding:"28px 24px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:24 }}>
            <div style={{ maxWidth:380 }}>
              <div style={{ fontSize:11, color:"#FF6B35", letterSpacing:2, textTransform:"uppercase", fontWeight:600, marginBottom:10 }}>Founding Member Offer</div>
              <h2 style={{ fontSize:20, fontWeight:700, letterSpacing:"-0.5px", marginBottom:10, lineHeight:1.4, color:"#ffffff" }}>
                First 100 creators & clients — Zero commission during beta. Plus lifetime 50% lower commission after launch.
              </h2>
              <p style={{ color:"#52525B", fontSize:13 }}>India's creator economy — built for you.</p>
            </div>
            <div style={{ minWidth:220, flex:1, maxWidth:300, display:"flex", flexDirection:"column", gap:14 }}>
              <FoundingBar label="Creator Spots" filled={FOUNDING_LIMIT - foundingCreatorsLeft}/>
              <FoundingBar label="Client Spots" filled={FOUNDING_LIMIT - foundingClientsLeft}/>
              <PrimaryBtn full onClick={function(){ setPage("signup-creator"); }}>Join as Founding Creator</PrimaryBtn>
              <SecondaryBtn full onClick={function(){ setPage("post-req"); }}>Post a Requirement</SecondaryBtn>
            </div>
          </div>
        </div>
      </div>

      {/* Why Crevo */}
      <div style={{ background:"#0A0A0D", borderTop:"1px solid #1a1a20", borderBottom:"1px solid #1a1a20", padding:"52px 20px" }}>
        <div style={{ maxWidth:880, margin:"0 auto" }}>
          <h2 style={{ fontSize:20, fontWeight:700, letterSpacing:"-0.5px", marginBottom:28, textAlign:"center", color:"#ffffff" }}>Why Crevo?</h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:12 }}>
            {[["🎉","Zero commission during beta"],["💬","WhatsApp-native workflow"],["🇮🇳","Hinglish-friendly platform"],["⚡","Fast creator discovery"]].map(function(c){ return (
              <div key={c[1]} style={{ background:"#0D0D10", border:"1px solid #1a1a20", borderRadius:14, padding:"20px 16px", textAlign:"center" }}>
                <div style={{ fontSize:26, marginBottom:10 }}>{c[0]}</div>
                <div style={{ fontWeight:600, fontSize:13, color:"#A1A1AA", lineHeight:1.5 }}>{c[1]}</div>
              </div>
            ); })}
          </div>
        </div>
      </div>

      {/* Categories */}
      <div style={{ maxWidth:880, margin:"0 auto", padding:"52px 20px" }}>
        <h2 style={{ fontSize:20, fontWeight:700, letterSpacing:"-0.5px", marginBottom:6, color:"#ffffff" }}>Browse Categories</h2>
        <p style={{ color:"#52525B", fontSize:13, marginBottom:24 }}>Find the right creator for your content</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(148px,1fr))", gap:10 }}>
          {ROLES.map(function(role){ 
            var color = getRoleColor(role);
            var bg = getRoleBg(role);
            var icon = getRoleIcon(role);
            var count = creators.filter(function(c){ return c.role === role; }).length;
            return (
              <div key={role} onClick={function(){ setPage("creators"); }} style={{ background:"#0D0D10", border:"1px solid #1f1f26", borderRadius:13, padding:"18px 16px", cursor:"pointer" }}
                onMouseEnter={function(e){ e.currentTarget.style.borderColor=color+"55"; e.currentTarget.style.background=bg; }}
                onMouseLeave={function(e){ e.currentTarget.style.borderColor="#1f1f26"; e.currentTarget.style.background="#0D0D10"; }}>
                <div style={{ width:32, height:32, borderRadius:9, background:bg, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:10, fontSize:14, color:color }}>{icon}</div>
                <div style={{ fontWeight:600, fontSize:13, marginBottom:4, color:"#ffffff" }}>{role}</div>
                <div style={{ color:"#3F3F46", fontSize:11 }}>{count > 0 ? count+" creator"+(count>1?"s":"") : "Be the first"}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* How it works */}
      <div style={{ background:"#0A0A0D", borderTop:"1px solid #1a1a20", borderBottom:"1px solid #1a1a20", padding:"52px 20px" }}>
        <div style={{ maxWidth:760, margin:"0 auto", textAlign:"center" }}>
          <h2 style={{ fontSize:20, fontWeight:700, letterSpacing:"-0.5px", marginBottom:6, color:"#ffffff" }}>How It Works</h2>
          <p style={{ color:"#52525B", fontSize:13, marginBottom:32 }}>Simple. Direct. No middleman during beta.</p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:14 }}>
            {[["01","Browse creators or projects"],["02","Send connect request or proposal"],["03","WhatsApp connection unlocks after approval"]].map(function(s){ return (
              <div key={s[0]} style={{ background:"#0D0D10", border:"1px solid #1a1a20", borderRadius:14, padding:22, textAlign:"left" }}>
                <div style={{ fontSize:11, color:"#FF6B35", fontWeight:700, letterSpacing:2, marginBottom:12 }}>{s[0]}</div>
                <div style={{ color:"#A1A1AA", fontSize:13, lineHeight:1.65 }}>{s[1]}</div>
              </div>
            ); })}
          </div>
        </div>
      </div>

      {/* Founder Vision */}
      <div style={{ maxWidth:880, margin:"0 auto", padding:"52px 20px" }}>
        <div style={{ background:"rgba(255,107,53,0.04)", border:"1px solid #2a2a35", borderRadius:18, padding:"32px 28px" }}>
          <div style={{ fontSize:11, color:"#FF6B35", letterSpacing:2, textTransform:"uppercase", fontWeight:600, marginBottom:16 }}>From the Founder</div>
          <p style={{ color:"#A1A1AA", fontSize:15, lineHeight:1.85, marginBottom:20, maxWidth:560 }}>
            "Crevo is being built from scratch for India's creator economy. We believe Indian creators deserve a platform that speaks their language — English, Hindi, or Hinglish. No fake numbers, no inflated stats. Just a transparent, creator-first marketplace growing one real user at a time."
          </p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
            {["Built for Indian Creators","WhatsApp-first workflow","No agency cuts","Transparent & honest"].map(function(v){ return (
              <div key={v} style={{ display:"flex", alignItems:"center", gap:6, background:"#111115", border:"1px solid #1f1f26", borderRadius:20, padding:"6px 14px", fontSize:12, color:"#71717A" }}>
                <span style={{ color:"#FF6B35" }}>✓</span>{v}
              </div>
            ); })}
          </div>
        </div>
      </div>

      {/* Honest stats */}
      <div style={{ maxWidth:880, margin:"0 auto", padding:"0 20px 52px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:12 }}>
          {[["🎯","Early Access Requests","Growing daily"],["🇮🇳","Cities Represented","Pan India"],["💬","Platform Language","EN · हि · HI"],["⚡","Commission During Beta","Zero"]].map(function(s){ return (
            <div key={s[1]} style={{ background:"#0D0D10", border:"1px solid #1f1f26", borderRadius:13, padding:"18px 16px", textAlign:"center" }}>
              <div style={{ fontSize:24, marginBottom:8 }}>{s[0]}</div>
              <div style={{ fontWeight:700, fontSize:14, color:"#ffffff", marginBottom:4 }}>{s[2]}</div>
              <div style={{ color:"#3F3F46", fontSize:11 }}>{s[1]}</div>
            </div>
          ); })}
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop:"1px solid #1a1a20", padding:"20px 24px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10 }}>
        <Logo/>
        <span style={{ color:"#27272A", fontSize:12 }}>India's Creator Network · Beta · Zero Commission</span>
      </div>
    </div>
  );
}

// ── Find Creators Page ────────────────────────────────────────────────────────

function FindCreatorsPage({ creators, foundingCreatorsLeft, setPage }) {
  var allCreators = SAMPLE_CREATORS.concat(creators);
  var [search, setSearch] = useState("");
  var [roleFilter, setRoleFilter] = useState("All");
  var [selectedCreator, setSelectedCreator] = useState(null);
  var [credits, setCredits] = useState(5);
  var [toast, setToast] = useState("");

  function showToast(m) { setToast(m); setTimeout(function(){ setToast(""); }, 3000); }

  var filtered = allCreators.filter(function(c) {
    var r = roleFilter === "All" || c.role === roleFilter;
    var s = !search || [c.name, c.city].concat(c.tags).some(function(x){ return x.toLowerCase().includes(search.toLowerCase()); });
    return r && s;
  });

  function handleConnect() {
    if (credits <= 0) { showToast("No credits left today!"); return; }
    setCredits(function(p){ return p - 1; });
    showToast("Connect request sent! Creator will respond soon.");
  }

  return (
    <div style={{ maxWidth:960, margin:"0 auto", padding:"32px 20px 60px" }}>
      <ToastMsg msg={toast}/>
      {selectedCreator && <CreatorDetail creator={selectedCreator} onClose={function(){ setSelectedCreator(null); }} credits={credits} onConnect={handleConnect}/>}

      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:20, flexWrap:"wrap", gap:10 }}>
        <div>
          <h2 style={{ fontSize:22, fontWeight:700, letterSpacing:"-0.5px", marginBottom:4, color:"#ffffff" }}>Find Creators</h2>
          <p style={{ color:"#52525B", fontSize:13 }}>{filtered.length} creator{filtered.length !== 1 ? "s" : ""} · {credits} credits left today</p>
        </div>
        <PrimaryBtn onClick={function(){ setPage("signup-creator"); }}>Join as Creator</PrimaryBtn>
      </div>

      <input value={search} onChange={function(e){ setSearch(e.target.value); }} placeholder="Search by name, city, or skill..." style={Object.assign({}, inputStyle, { marginBottom:14 })}/>

      <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:22 }}>
        {["All"].concat(ROLES).map(function(r) {
          var color = getRoleColor(r);
          var active = roleFilter === r;
          return (
            <button key={r} onClick={function(){ setRoleFilter(r); }} style={{ padding:"6px 14px", background: active ? (r === "All" ? "#FF6B35" : color) : "#0D0D10", border:"1px solid "+(active ? "transparent" : "#1f1f26"), color: active ? "#000000" : "#71717A", borderRadius:20, fontWeight:600, cursor:"pointer", whiteSpace:"nowrap", fontSize:11, fontFamily:"inherit" }}>
              {r}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign:"center", padding:"72px 20px" }}>
          <div style={{ fontSize:40, marginBottom:14 }}>🎨</div>
          <div style={{ fontWeight:600, fontSize:16, marginBottom:8, color:"#ffffff" }}>No creators yet</div>
          <div style={{ color:"#52525B", fontSize:13, marginBottom:22, maxWidth:340, margin:"0 auto 22px" }}>
            Be one of the first creators on Crevo and unlock lifetime founding benefits.
          </div>
          <PrimaryBtn onClick={function(){ setPage("signup-creator"); }}>Join as Founding Creator</PrimaryBtn>
        </div>
      ) : (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(255px,1fr))", gap:14 }}>
          {filtered.map(function(c){ return (
            <CreatorCard key={c.id} creator={c} onClick={function(){ setSelectedCreator(c); }}/>
          ); })}
        </div>
      )}
    </div>
  );
}

// ── Browse Projects Page ──────────────────────────────────────────────────────

function BrowseProjectsPage({ jobs, setJobs, foundingClientsLeft, setFoundingClientsLeft, setPage }) {
  var [showForm, setShowForm] = useState(false);
  var [proposalTarget, setProposalTarget] = useState(null);
  var [proposed, setProposed] = useState([]);
  var [catFilter, setCatFilter] = useState("All");
  var [toast, setToast] = useState("");

  function showToast(m) { setToast(m); setTimeout(function(){ setToast(""); }, 3000); }

  var filtered = jobs.filter(function(j){ return catFilter === "All" || j.category === catFilter; });

  function handlePost(job) {
    setJobs(function(p){ return [job].concat(p); });
    if (foundingClientsLeft > 0) setFoundingClientsLeft(function(p){ return p - 1; });
    setShowForm(false);
    showToast("Requirement posted!");
  }

  return (
    <div style={{ maxWidth:760, margin:"0 auto", padding:"32px 20px 60px" }}>
      <ToastMsg msg={toast}/>
      {proposalTarget && (
        <ProposalModal job={proposalTarget} onClose={function(){ setProposalTarget(null); }} onSubmit={function(){
          setProposed(function(p){ return p.concat([proposalTarget.id]); });
          setProposalTarget(null);
          showToast("Proposal sent!");
        }}/>
      )}

      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:20, flexWrap:"wrap", gap:10 }}>
        <div>
          <h2 style={{ fontSize:22, fontWeight:700, letterSpacing:"-0.5px", marginBottom:4, color:"#ffffff" }}>Browse Projects</h2>
          <p style={{ color:"#52525B", fontSize:13 }}>{filtered.length} open requirements</p>
        </div>
        <SecondaryBtn onClick={function(){ setShowForm(function(p){ return !p; }); }}>
          {showForm ? "Cancel" : "+ Post Requirement"}
        </SecondaryBtn>
      </div>

      {showForm && (
        <div style={{ background:"#0D0D10", border:"1px solid #1f1f26", borderRadius:16, padding:22, marginBottom:22 }}>
          <PostReqForm onSubmit={handlePost} foundingLeft={foundingClientsLeft}/>
        </div>
      )}

      <div style={{ display:"flex", gap:6, overflowX:"auto", paddingBottom:4, marginBottom:20 }}>
        {["All"].concat(ROLES).map(function(r) {
          var color = getRoleColor(r);
          var active = catFilter === r;
          return (
            <button key={r} onClick={function(){ setCatFilter(r); }} style={{ padding:"6px 14px", background: active ? (r === "All" ? "#FF6B35" : color) : "#0D0D10", border:"1px solid "+(active ? "transparent" : "#1f1f26"), color: active ? "#000000" : "#71717A", borderRadius:20, fontWeight:600, cursor:"pointer", whiteSpace:"nowrap", fontSize:11, fontFamily:"inherit" }}>
              {r}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign:"center", padding:"72px 20px" }}>
          <div style={{ fontSize:40, marginBottom:14 }}>📋</div>
          <div style={{ fontWeight:600, fontSize:16, marginBottom:8, color:"#ffffff" }}>No requirements yet</div>
          <div style={{ color:"#52525B", fontSize:13, marginBottom:22, maxWidth:340, margin:"0 auto 22px" }}>
            Post the first requirement and connect with top Indian creators.
          </div>
          <PrimaryBtn onClick={function(){ setShowForm(true); }}>Post First Requirement</PrimaryBtn>
        </div>
      ) : (
        <div style={{ display:"grid", gap:10 }}>
          {filtered.map(function(job) {
            var color = getRoleColor(job.category);
            var isProp = proposed.includes(job.id);
            return (
              <div key={job.id} style={{ background:"#0D0D10", border:"1px solid #1f1f26", borderRadius:13, padding:"18px 20px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:14 }}>
                  <div style={{ flex:1 }}>
                    {job.founding && <div style={{ marginBottom:6 }}><Tag color="#34D399">⭐ Founding Client</Tag></div>}
                    <div style={{ fontWeight:600, fontSize:14, marginBottom:8, lineHeight:1.4, color:"#ffffff" }}>{job.title}</div>
                    <div style={{ display:"flex", gap:8, flexWrap:"wrap", alignItems:"center", marginBottom:6 }}>
                      <Tag color={color}>{job.category}</Tag>
                      <span style={{ color:"#34D399", fontWeight:700, fontSize:13 }}>{job.budget}</span>
                      <span style={{ color:"#3F3F46", fontSize:11 }}>⏰ {job.deadline}</span>
                      <span style={{ color:"#3F3F46", fontSize:11 }}>by {job.clientName} · {timeAgo(job.postedAt)}</span>
                    </div>
                    {job.desc && <p style={{ color:"#52525B", fontSize:12, lineHeight:1.6, marginTop:6 }}>{job.desc}</p>}
                  </div>
                  <button onClick={function(){ if(!isProp) setProposalTarget(job); }} style={{ padding:"8px 16px", background: isProp ? "transparent" : "linear-gradient(135deg,#FF6B35,#F97316)", border: isProp ? "1px solid #2a2a32" : "none", color: isProp ? "#52525B" : "#ffffff", borderRadius:8, fontWeight:600, fontSize:12, cursor: isProp ? "default" : "pointer", fontFamily:"inherit", flexShrink:0 }}>
                    {isProp ? "Sent ✓" : "Apply"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── App Root ──────────────────────────────────────────────────────────────────

export default function Crevo() {
  var [page, setPage] = useState("home");
  var [creators, setCreators] = useState([]);
  var [jobs, setJobs] = useState([]);
  var [foundingCreatorsLeft, setFoundingCreatorsLeft] = useState(FOUNDING_LIMIT);
  var [foundingClientsLeft, setFoundingClientsLeft] = useState(FOUNDING_LIMIT);
  var [toast, setToast] = useState("");

  function showToast(m) { setToast(m); setTimeout(function(){ setToast(""); }, 3000); }

  function handleCreatorSignup(creator) {
    setCreators(function(p){ return p.concat([creator]); });
    if (foundingCreatorsLeft > 0) setFoundingCreatorsLeft(function(p){ return p - 1; });
    showToast("Welcome to Crevo! Your profile is live.");
    setPage("creators");
  }

  var NAV = [["home","Home"],["creators","Creators"],["projects","Projects"]];

  return (
    <div style={{ fontFamily:"'DM Sans','Segoe UI',sans-serif", background:"#09090B", minHeight:"100vh", color:"#ffffff" }}>
      <ToastMsg msg={toast}/>

      {/* Navbar */}
      <nav style={{ background:"rgba(9,9,11,0.97)", borderBottom:"1px solid #1a1a20", padding:"10px 16px", position:"sticky", top:0, zIndex:100 }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
          <div onClick={function(){ setPage("home"); }}><Logo/></div>
          <PrimaryBtn small onClick={function(){ setPage("signup-creator"); }}>Join as Creator</PrimaryBtn>
        </div>
        <div style={{ display:"flex", gap:2, borderTop:"1px solid #1a1a20", paddingTop:8 }}>
          {NAV.map(function(item) {
            var active = page === item[0];
            return (
              <button key={item[0]} onClick={function(){ setPage(item[0]); }} style={{ padding:"6px 12px", background: active ? "#1a1a20" : "transparent", border:"none", color: active ? "#ffffff" : "#52525B", borderRadius:8, fontWeight: active ? 600 : 400, cursor:"pointer", fontSize:13, fontFamily:"inherit", flex:1, textAlign:"center" }}>
                {item[1]}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Pages */}
      {page === "home" && <HomePage setPage={setPage} creators={creators} foundingCreatorsLeft={foundingCreatorsLeft} foundingClientsLeft={foundingClientsLeft}/>}
      {page === "creators" && <FindCreatorsPage creators={creators} foundingCreatorsLeft={foundingCreatorsLeft} setPage={setPage}/>}
      {page === "projects" && <BrowseProjectsPage jobs={jobs} setJobs={setJobs} foundingClientsLeft={foundingClientsLeft} setFoundingClientsLeft={setFoundingClientsLeft} setPage={setPage}/>}

      {page === "signup-creator" && (
        <div style={{ maxWidth:520, margin:"0 auto", padding:"28px 20px 60px" }}>
          <GhostBtn onClick={function(){ setPage("creators"); }}>← Back</GhostBtn>
          <div style={{ background:"#0D0D10", border:"1px solid #1f1f26", borderRadius:18, padding:24, marginTop:16 }}>
            <CreatorSignupForm onSubmit={handleCreatorSignup} foundingLeft={foundingCreatorsLeft}/>
          </div>
        </div>
      )}

      {page === "post-req" && (
        <div style={{ maxWidth:520, margin:"0 auto", padding:"28px 20px 60px" }}>
          <GhostBtn onClick={function(){ setPage("projects"); }}>← Back</GhostBtn>
          <div style={{ background:"#0D0D10", border:"1px solid #1f1f26", borderRadius:18, padding:24, marginTop:16 }}>
            <PostReqForm onSubmit={function(job){ setJobs(function(p){ return [job].concat(p); }); if(foundingClientsLeft>0) setFoundingClientsLeft(function(p){ return p-1; }); showToast("Posted!"); setPage("projects"); }} foundingLeft={foundingClientsLeft}/>
          </div>
        </div>
      )}
    </div>
  );
}

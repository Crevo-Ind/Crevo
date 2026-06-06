import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

var SUPABASE_URL = "https://zglrhshurwiotpgnbxpt.supabase.co";
var SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpnbHJoc2h1cndpb3RwZ25ieHB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA3MDU2ODAsImV4cCI6MjA5NjI4MTY4MH0.m8dIas8CWHKZPOiiloNfNqx_EyvRiPJ77SybE9MYckw ";
var supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

var GOOGLE_FORM = "https://forms.gle/B2JxZyefhCbnnubMA";
var FOUNDING_LIMIT = 100;
var ROLES = ["Shorts Editor","Thumbnail Designer","Script Writer","Reel Creator","AI Creator","Web Developer","Voice Over Artist","SEO Expert"];
var CITIES = ["Mumbai","Delhi","Bangalore","Pune","Hyderabad","Chennai","Kolkata","Jaipur","Ahmedabad","Lucknow","Other"];
var BUDGETS = ["Under ₹1,000","₹1,000–5,000","₹5,000–15,000","₹15,000+"];
var DEADLINES = ["Urgent (1–2 days)","This week","This month","Flexible"];
var LANG_LIST = ["English","Hindi","Hinglish","Bengali","Tamil","Telugu","Marathi"];

var ROLE_COLOR = {"Shorts Editor":"#FF6B35","Thumbnail Designer":"#A78BFA","Script Writer":"#34D399","Reel Creator":"#FBBF24","AI Creator":"#F472B6","Web Developer":"#60A5FA","Voice Over Artist":"#FB923C","SEO Expert":"#4ADE80"};
var ROLE_BG = {"Shorts Editor":"rgba(255,107,53,0.10)","Thumbnail Designer":"rgba(167,139,250,0.10)","Script Writer":"rgba(52,211,153,0.10)","Reel Creator":"rgba(251,191,36,0.10)","AI Creator":"rgba(244,114,182,0.10)","Web Developer":"rgba(96,165,250,0.10)","Voice Over Artist":"rgba(251,146,60,0.10)","SEO Expert":"rgba(74,222,128,0.10)"};
var ROLE_ICON = {"Shorts Editor":"▶","Thumbnail Designer":"◈","Script Writer":"✦","Reel Creator":"◎","AI Creator":"✺","Web Developer":"</>","Voice Over Artist":"🎙","SEO Expert":"↑"};

var DEMO_CREATORS = [
  {id:"d1",name:"Rohit Sharma",role:"Shorts Editor",city:"Mumbai",bio:"Edited 200+ reels for creators. Specialist in high-retention shorts editing.",tags:["YouTube Shorts","Reels","Color Grade"],price:"499",per:"reel",worksCompleted:200,founding:true,verified:true,fastResponder:true,availableNow:true,experience:"3 years",isDemo:true,portfolio:"https://youtube.com"},
  {id:"d2",name:"Priya Kapoor",role:"Thumbnail Designer",city:"Delhi",bio:"High-CTR thumbnails that make people click. 500+ thumbnails delivered.",tags:["YouTube","Photoshop","Canva"],price:"299",per:"thumbnail",worksCompleted:500,founding:true,verified:true,fastResponder:false,availableNow:true,experience:"2 years",isDemo:true,portfolio:"https://behance.net"},
  {id:"d3",name:"Arjun Mehta",role:"Script Writer",city:"Pune",bio:"Viral hooks and engaging scripts for Indian YouTubers. Hindi & English both.",tags:["Hindi Scripts","YouTube","Hooks"],price:"799",per:"script",worksCompleted:150,founding:true,verified:false,fastResponder:true,availableNow:false,experience:"2 years",isDemo:true,portfolio:""},
  {id:"d4",name:"Sneha Verma",role:"Reel Creator",city:"Bangalore",bio:"Fashion & lifestyle reels with trending audio. 1M+ combined views.",tags:["Fashion","Lifestyle","Trending"],price:"999",per:"reel",worksCompleted:300,founding:true,verified:true,fastResponder:true,availableNow:true,experience:"4 years",isDemo:true,portfolio:"https://instagram.com"},
];

var TESTIMONIALS = [
  {text:"Found my editor within 10 minutes. Super easy to connect on WhatsApp.",name:"Rahul K.",role:"YouTube Creator"},
  {text:"Simple and better than Fiverr for Indian creators. No bidding, no spam.",name:"Priya S.",role:"Podcast Channel Owner"},
  {text:"Finally a platform that understands Hinglish content creators.",name:"Vikash M.",role:"Reel Creator"},
];

var T = {
  en:{
    home:"Home",creators:"Creators",projects:"Projects",joinCreator:"Join as Creator",
    heroTitle:"Hire Indian Creators",heroHighlight:"in Minutes",
    heroSub:"Connect directly with video editors, thumbnail designers, script writers & AI creators — no bidding, no spam.",
    findCreators:"Find Creators",joinBtn:"Join as Creator",
    trustTitle:"Trusted by Growing Indian Creators",
    trust1:"100+ creators joining",trust2:"Fast WhatsApp connect",trust3:"No fake bidding",trust4:"Direct communication",trust5:"Beginner friendly",
    howTitle:"How Crevo Works",
    step1title:"Browse Creators",step1desc:"Filter by skill, city, and budget.",
    step2title:"Send Request",step2desc:"Send a connect request to the creator.",
    step3title:"Creator Accepts",step3desc:"Creator reviews and accepts your request.",
    step4title:"WhatsApp Connect",step4desc:"Connect instantly on WhatsApp and get started.",
    catTitle:"Popular Categories",
    previewTitle:"Platform Preview",previewNote:"Sample creator profiles — real creators joining during beta.",
    foundingOffer:"Founding Member Offer",
    foundingDesc:"First 100 creators & clients — Zero commission during beta. Plus lifetime 50% lower commission after launch.",
    creatorSpots:"Creator Spots",clientSpots:"Client Spots",left:"left",
    joinFounding:"Join as Founding Creator",postFirst:"Post a Requirement",
    founderTitle:"From the Founder",
    founderMsg:"Crevo is being built for India's creator economy. Fast hiring for Indian content creators through direct WhatsApp connection. No middlemen, no agencies, no bidding wars.",
    testiTitle:"What Beta Testers Say",
    aboutLink:"About",contactLink:"Contact",privacyLink:"Privacy Policy",termsLink:"Terms",
    viewAll:"View all →",back:"← Back",
    noCommission:"Zero commission",whatsappNative:"WhatsApp-native",hinglishFriendly:"Hinglish-friendly",fastHiring:"Fast hiring",
    betaText:"🔥 First 100 get lifetime 50% lower commission",
    sendProposal:"Send Proposal",connectReq:"Connect on WhatsApp",
    report:"Report",fake:"Fake Profile",spam:"Spam",scam:"Scam",
    creditsLeft:"credits left today",cancel:"Cancel",
    proposalMsg:"Your message",expectedPrice:"Expected Price (₹)",deliveryTime:"Delivery Time",submitProposal:"Submit Proposal",
    connectMsg:"Message to Creator",sendConnect:"Send Connect Request",
    fullName:"Full Name",emailLabel:"Email",roleLabel:"Your Role",cityLabel:"City",
    rateLabel:"Starting Rate (₹)",perLabel:"Per (video/reel/script)",bioLabel:"Your Bio (1-2 lines)",
    tagsLabel:"Skills (comma separated)",portfolioLabel:"Portfolio Link",
    langWorked:"Language",worksCount:"Works Completed",
    createProfile:"Create My Profile — Free",creating:"Creating...",
    jobTitle:"Project Title",budgetLabel:"Budget",deadlineLabel:"Deadline",
    descLabel:"Project Details",categoryLabel:"Category",
    postJob:"Post Requirement — Free",posting:"Posting...",clientName:"Your Name / Channel",
    browseProjects:"Browse Projects",postReq:"Post Requirement",
    noCreators:"No creators yet",beFirstCreator:"Be one of the first creators on Crevo. Get your founding badge and lifetime benefits.",
    noProjects:"No requirements yet",beFirstClient:"Post the first requirement and connect with top Indian creators.",
    worksLabel:"works",foundingBadge:"⭐ Founding",verifiedBadge:"✔ Verified",
    availNow:"🟢 Available",fastResp:"⚡ Fast Responder",sampleBadge:"Demo",
    requestSent:"✅ Request sent! Creator will respond soon.",
    reqPending:"Request Pending...",
  },
  hi:{
    home:"होम",creators:"क्रिएटर्स",projects:"प्रोजेक्ट्स",joinCreator:"क्रिएटर बनें",
    heroTitle:"भारतीय क्रिएटर्स को हायर करें",heroHighlight:"मिनटों में",
    heroSub:"वीडियो एडिटर, थंबनेल डिज़ाइनर, स्क्रिप्ट राइटर — सीधे WhatsApp पर कनेक्ट करें। कोई बिडिंग नहीं।",
    findCreators:"क्रिएटर्स खोजें",joinBtn:"क्रिएटर बनें",
    trustTitle:"भारतीय क्रिएटर्स का भरोसा",
    trust1:"100+ क्रिएटर्स जुड़ रहे हैं",trust2:"तेज़ WhatsApp कनेक्ट",trust3:"कोई बिडिंग नहीं",trust4:"सीधी बातचीत",trust5:"बिगिनर फ्रेंडली",
    howTitle:"Crevo कैसे काम करता है?",
    step1title:"क्रिएटर्स देखें",step1desc:"स्किल, शहर और बजट से फ़िल्टर करें।",
    step2title:"रिक्वेस्ट भेजें",step2desc:"क्रिएटर को कनेक्ट रिक्वेस्ट भेजें।",
    step3title:"क्रिएटर एक्सेप्ट करे",step3desc:"क्रिएटर आपकी रिक्वेस्ट देखे और एक्सेप्ट करे।",
    step4title:"WhatsApp पर कनेक्ट",step4desc:"तुरंत WhatsApp पर जुड़ें और काम शुरू करें।",
    catTitle:"लोकप्रिय कैटेगरी",
    previewTitle:"प्लेटफ़ॉर्म प्रीव्यू",previewNote:"सैंपल क्रिएटर प्रोफ़ाइल — बीटा में असली क्रिएटर्स जुड़ रहे हैं।",
    foundingOffer:"फाउंडिंग मेंबर ऑफर",
    foundingDesc:"पहले 100 क्रिएटर्स और क्लाइंट्स — बीटा में ज़ीरो कमीशन। लॉन्च के बाद हमेशा 50% कम कमीशन।",
    creatorSpots:"क्रिएटर स्पॉट्स",clientSpots:"क्लाइंट स्पॉट्स",left:"बचे",
    joinFounding:"फाउंडिंग क्रिएटर बनें",postFirst:"ज़रूरत पोस्ट करें",
    founderTitle:"फाउंडर की बात",
    founderMsg:"Crevo भारत की क्रिएटर इकॉनमी के लिए बनाया जा रहा है। सीधे WhatsApp पर कनेक्ट — कोई एजेंसी नहीं, कोई बिडिंग नहीं।",
    testiTitle:"बीटा टेस्टर्स क्या कहते हैं",
    aboutLink:"हमारे बारे में",contactLink:"संपर्क",privacyLink:"प्राइवेसी",termsLink:"नियम",
    viewAll:"सब देखें →",back:"← वापस",
    noCommission:"ज़ीरो कमीशन",whatsappNative:"WhatsApp-नेटिव",hinglishFriendly:"हिंग्लिश-फ्रेंडली",fastHiring:"तेज़ हायरिंग",
    betaText:"🔥 पहले 100 को हमेशा के लिए 50% कम कमीशन",
    sendProposal:"प्रपोज़ल भेजें",connectReq:"WhatsApp पर कनेक्ट करें",
    report:"रिपोर्ट",fake:"नकली प्रोफ़ाइल",spam:"स्पैम",scam:"धोखाधड़ी",
    creditsLeft:"क्रेडिट बचे",cancel:"रद्द करें",
    proposalMsg:"आपका संदेश",expectedPrice:"अपेक्षित दर (₹)",deliveryTime:"डिलीवरी समय",submitProposal:"प्रपोज़ल भेजें",
    connectMsg:"क्रिएटर को संदेश",sendConnect:"कनेक्ट रिक्वेस्ट भेजें",
    fullName:"पूरा नाम",emailLabel:"ईमेल",roleLabel:"आपका रोल",cityLabel:"शहर",
    rateLabel:"शुरुआती दर (₹)",perLabel:"प्रति (वीडियो/रील)",bioLabel:"आपका बायो",
    tagsLabel:"स्किल्स (कॉमा से अलग)",portfolioLabel:"पोर्टफोलियो लिंक",
    langWorked:"भाषा",worksCount:"पूरे किए काम",
    createProfile:"प्रोफ़ाइल बनाएं — फ्री",creating:"बन रहा है...",
    jobTitle:"प्रोजेक्ट का नाम",budgetLabel:"बजट",deadlineLabel:"समयसीमा",
    descLabel:"प्रोजेक्ट की जानकारी",categoryLabel:"कैटेगरी",
    postJob:"ज़रूरत पोस्ट करें — फ्री",posting:"पोस्ट हो रहा है...",clientName:"आपका नाम / चैनल",
    browseProjects:"प्रोजेक्ट्स देखें",postReq:"ज़रूरत पोस्ट करें",
    noCreators:"अभी कोई क्रिएटर नहीं",beFirstCreator:"Crevo के पहले क्रिएटर्स में शामिल हों।",
    noProjects:"अभी कोई प्रोजेक्ट नहीं",beFirstClient:"पहली ज़रूरत पोस्ट करें।",
    worksLabel:"काम",foundingBadge:"⭐ फाउंडिंग",verifiedBadge:"✔ वेरिफाइड",
    availNow:"🟢 उपलब्ध",fastResp:"⚡ तेज़ जवाब",sampleBadge:"डेमो",
    requestSent:"✅ रिक्वेस्ट भेजी! क्रिएटर जल्द जवाब देगा।",reqPending:"रिक्वेस्ट पेंडिंग...",
  },
  hl:{
    home:"Home",creators:"Creators",projects:"Projects",joinCreator:"Creator Bano",
    heroTitle:"Indian Creators Ko Hire Karo",heroHighlight:"Minutes Mein",
    heroSub:"Video editors, thumbnail designers, script writers se seedha WhatsApp pe connect karo — koi bidding nahi, koi spam nahi.",
    findCreators:"Creators Dhundo",joinBtn:"Creator Bano",
    trustTitle:"Indian Creators Ka Bharosa",
    trust1:"100+ creators jud rahe hain",trust2:"Fast WhatsApp connect",trust3:"Koi bidding nahi",trust4:"Direct baat",trust5:"Beginner friendly",
    howTitle:"Crevo Kaise Kaam Karta Hai?",
    step1title:"Creators Dekho",step1desc:"Skill, city aur budget se filter karo.",
    step2title:"Request Bhejo",step2desc:"Creator ko connect request bhejo.",
    step3title:"Creator Accept Kare",step3desc:"Creator teri request dekhe aur accept kare.",
    step4title:"WhatsApp Pe Connect",step4desc:"Turant WhatsApp pe judo aur kaam shuru karo.",
    catTitle:"Popular Categories",
    previewTitle:"Platform Preview",previewNote:"Sample creator profiles — beta mein real creators join kar rahe hain.",
    foundingOffer:"Founding Member Offer",
    foundingDesc:"Pehle 100 creators & clients — Beta mein zero commission. Launch ke baad hamesha 50% kam commission.",
    creatorSpots:"Creator Spots",clientSpots:"Client Spots",left:"bacha",
    joinFounding:"Founding Creator Bano",postFirst:"Requirement Post Karo",
    founderTitle:"Founder Ki Baat",
    founderMsg:"Crevo India ki creator economy ke liye ban raha hai. Direct WhatsApp connection — koi agency nahi, koi bidding nahi, koi middleman nahi.",
    testiTitle:"Beta Testers Kya Kehte Hain",
    aboutLink:"About",contactLink:"Contact",privacyLink:"Privacy Policy",termsLink:"Terms",
    viewAll:"Sab dekho →",back:"← Wapas",
    noCommission:"Zero commission",whatsappNative:"WhatsApp-native",hinglishFriendly:"Hinglish-friendly",fastHiring:"Fast hiring",
    betaText:"🔥 Pehle 100 ko hamesha ke liye 50% kam commission",
    sendProposal:"Proposal Bhejo",connectReq:"WhatsApp Pe Connect Karo",
    report:"Report",fake:"Fake Profile",spam:"Spam",scam:"Scam",
    creditsLeft:"credits bacha",cancel:"Cancel",
    proposalMsg:"Aapka message",expectedPrice:"Expected Price (₹)",deliveryTime:"Delivery Time",submitProposal:"Proposal Submit Karo",
    connectMsg:"Creator ko message",sendConnect:"Connect Request Bhejo",
    fullName:"Poora Naam",emailLabel:"Email",roleLabel:"Aapka Role",cityLabel:"City",
    rateLabel:"Starting Rate (₹)",perLabel:"Per (video/reel)",bioLabel:"Aapka Bio",
    tagsLabel:"Skills (comma se alag karo)",portfolioLabel:"Portfolio Link",
    langWorked:"Language",worksCount:"Completed Works",
    createProfile:"Profile Banao — Free",creating:"Ban raha hai...",
    jobTitle:"Project ka Naam",budgetLabel:"Budget",deadlineLabel:"Deadline",
    descLabel:"Project ki Details",categoryLabel:"Category",
    postJob:"Requirement Post Karo — Free",posting:"Post ho raha hai...",clientName:"Aapka Naam / Channel",
    browseProjects:"Projects Dekho",postReq:"Requirement Post Karo",
    noCreators:"Abhi koi creator nahi",beFirstCreator:"Crevo ke pehle creators mein shamil ho aur founding benefits pao.",
    noProjects:"Abhi koi requirement nahi",beFirstClient:"Pehli requirement post karo.",
    worksLabel:"kaam",foundingBadge:"⭐ Founding",verifiedBadge:"✔ Verified",
    availNow:"🟢 Available",fastResp:"⚡ Fast Responder",sampleBadge:"Demo",
    requestSent:"✅ Request send ho gayi! Creator jald respond karega.",reqPending:"Request Pending...",
  }
};

function getColor(role){return ROLE_COLOR[role]||"#FF6B35";}
function getBg(role){return ROLE_BG[role]||"rgba(255,107,53,0.10)";}
function getIcon(role){return ROLE_ICON[role]||"✦";}
function randomId(){return Math.random().toString(36).slice(2,9);}
function timeAgo(ts){var d=Date.now()-ts;if(d<60000)return"just now";if(d<3600000)return Math.floor(d/60000)+"m ago";if(d<86400000)return Math.floor(d/3600000)+"h ago";return Math.floor(d/86400000)+"d ago";}
function getInitials(name){return name.split(" ").map(function(w){return w[0];}).join("").slice(0,2).toUpperCase();}

var inp={padding:"11px 13px",background:"#0D0D10",border:"1px solid #222228",borderRadius:8,color:"#ffffff",fontSize:13,outline:"none",fontFamily:"inherit",width:"100%",boxSizing:"border-box"};

function Logo(){
  return(
    <div style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer"}}>
      <svg width="26" height="26" viewBox="0 0 64 64" fill="none">
        <rect width="64" height="64" rx="14" fill="url(#lg)"/>
        <path d="M42 20C38.8 17 34.6 15 30 15C21.2 15 14 22.2 14 31C14 39.8 21.2 47 30 47C34.6 47 38.8 45 42 42" stroke="white" strokeWidth="6" strokeLinecap="round"/>
        <path d="M34 24L44 31L34 38" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" opacity="0.85"/>
        <defs><linearGradient id="lg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse"><stop stopColor="#FF6B35"/><stop offset="1" stopColor="#F97316"/></linearGradient></defs>
      </svg>
      <span style={{fontWeight:800,fontSize:20,letterSpacing:"-0.5px",color:"#fff"}}>Crevo</span>
    </div>
  );
}

function Pill(props){var c=props.color||"#FF6B35";return <span style={{display:"inline-flex",alignItems:"center",background:c+"18",border:"1px solid "+c+"30",color:c,padding:"2px 9px",borderRadius:20,fontSize:11,fontWeight:600,whiteSpace:"nowrap"}}>{props.children}</span>;}
function PBtn(props){return <button onClick={props.onClick} style={{padding:props.sm?"8px 14px":"12px 22px",background:"linear-gradient(135deg,#FF6B35,#F97316)",border:"none",borderRadius:9,color:"#fff",fontWeight:600,fontSize:props.sm?12:14,cursor:"pointer",fontFamily:"inherit",width:props.full?"100%":"auto",transition:"opacity 0.15s"}} onMouseEnter={function(e){e.currentTarget.style.opacity="0.9";}} onMouseLeave={function(e){e.currentTarget.style.opacity="1";}}>{props.children}</button>;}
function SBtn(props){return <button onClick={props.onClick} style={{padding:props.sm?"8px 14px":"12px 22px",background:"transparent",border:"1px solid #2a2a32",borderRadius:9,color:"#A1A1AA",fontWeight:500,fontSize:props.sm?12:14,cursor:"pointer",fontFamily:"inherit",width:props.full?"100%":"auto"}}>{props.children}</button>;}
function GBtn(props){return <button onClick={props.onClick} style={{background:"transparent",border:"none",color:"#71717A",fontWeight:500,fontSize:13,cursor:"pointer",fontFamily:"inherit",padding:"4px 0"}}>{props.children}</button>;}
function Lbl(props){return <div style={{display:"flex",flexDirection:"column",gap:5}}>{props.label&&<label style={{fontSize:11,color:"#71717A",fontWeight:500}}>{props.label}</label>}{props.children}</div>;}
function Toast(props){if(!props.msg)return null;return <div style={{position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",background:"#ffffff",color:"#09090B",padding:"11px 22px",borderRadius:10,fontWeight:600,fontSize:13,zIndex:9999,boxShadow:"0 8px 32px rgba(0,0,0,0.5)",whiteSpace:"nowrap"}}>{props.msg}</div>;}
function Modal(props){return <div onClick={props.onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",zIndex:400,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}><div onClick={function(e){e.stopPropagation();}} style={{background:"#0D0D10",border:"1px solid #1f1f26",borderRadius:20,padding:24,maxWidth:430,width:"100%",maxHeight:"92vh",overflowY:"auto",position:"relative"}}><button onClick={props.onClose} style={{position:"absolute",top:14,right:14,background:"#1a1a20",border:"none",color:"#52525B",width:26,height:26,borderRadius:7,cursor:"pointer",fontSize:13}}>✕</button>{props.children}</div></div>;}

function FBar(props){var pct=Math.min(((FOUNDING_LIMIT-props.left)/FOUNDING_LIMIT)*100,100);return <div><div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{fontSize:12,color:"#A1A1AA"}}>{props.label}</span><span style={{fontSize:12,color:"#FF6B35",fontWeight:700}}>{props.left} {props.t.left}</span></div><div style={{height:5,background:"#1a1a20",borderRadius:4}}><div style={{height:"100%",width:pct+"%",background:"linear-gradient(90deg,#FF6B35,#F97316)",borderRadius:4}}/></div></div>;}

function CreatorCard(props){
  var c=props.creator;var t=props.t;
  var color=getColor(c.role);var bg=getBg(c.role);var icon=getIcon(c.role);
  var initials=getInitials(c.name);
  return(
    <div onClick={props.onClick} style={{background:"#0D0D10",border:"1px solid #1f1f26",borderRadius:16,padding:20,cursor:"pointer",transition:"all 0.2s"}}
      onMouseEnter={function(e){e.currentTarget.style.borderColor=color+"55";e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 12px 32px rgba(0,0,0,0.3)";}}
      onMouseLeave={function(e){e.currentTarget.style.borderColor="#1f1f26";e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none";}}>
      {c.isDemo&&<div style={{marginBottom:8}}><Pill color="#52525B">{t.sampleBadge}</Pill></div>}
      <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:12}}>
        <div style={{width:48,height:48,borderRadius:13,background:bg,border:"1px solid "+color+"30",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:16,color:color,flexShrink:0}}>{initials}</div>
        <div style={{flex:1}}>
          <div style={{fontWeight:700,fontSize:14,color:"#fff",marginBottom:2}}>{c.name}</div>
          <div style={{color:color,fontSize:12,fontWeight:600}}>{icon} {c.role}</div>
          <div style={{color:"#52525B",fontSize:11}}>📍 {c.city}</div>
        </div>
        {c.availableNow&&<div style={{width:8,height:8,borderRadius:"50%",background:"#22C55E",boxShadow:"0 0 6px #22C55E",flexShrink:0}}/>}
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:10}}>
        {c.founding&&<Pill color="#FF6B35">{t.foundingBadge}</Pill>}
        {c.verified&&<Pill color="#60A5FA">{t.verifiedBadge}</Pill>}
        {c.fastResponder&&<Pill color="#FBBF24">{t.fastResp}</Pill>}
      </div>
      <p style={{color:"#71717A",fontSize:12,lineHeight:1.6,marginBottom:12,maxHeight:"3em",overflow:"hidden"}}>{c.bio}</p>
      <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14}}>
        {c.tags.slice(0,2).map(function(tag){return <span key={tag} style={{background:"#1a1a20",color:"#52525B",padding:"3px 8px",borderRadius:5,fontSize:10}}>{tag}</span>;})}
      </div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",borderTop:"1px solid #1a1a20",paddingTop:10}}>
        <span style={{color:"#3F3F46",fontSize:11}}>{c.worksCompleted||0}+ {t.worksLabel}</span>
        <span style={{color:color,fontWeight:700,fontSize:14}}>₹{c.price}<span style={{color:"#3F3F46",fontWeight:400,fontSize:10}}>/{c.per}</span></span>
      </div>
    </div>
  );
}

function CreatorDetail(props){
  var c=props.creator;var t=props.t;
  var color=getColor(c.role);var bg=getBg(c.role);var icon=getIcon(c.role);
  var initials=getInitials(c.name);
  var [reqStatus,setReqStatus]=useState("idle");
  var [showReport,setShowReport]=useState(false);
  function sendReq(){if(c.isDemo){window.open(GOOGLE_FORM);return;}if(props.credits<=0)return;props.onConnect();setReqStatus("sent");}
  return(
    <Modal onClose={props.onClose}>
      <div style={{display:"flex",gap:14,marginBottom:16}}>
        <div style={{width:56,height:56,borderRadius:14,background:bg,border:"1px solid "+color+"25",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:18,color:color,flexShrink:0}}>{initials}</div>
        <div>
          <div style={{fontWeight:700,fontSize:17,color:"#fff",marginBottom:3}}>{c.name}</div>
          <div style={{color:color,fontSize:12,fontWeight:600,marginBottom:2}}>{icon} {c.role}</div>
          <div style={{color:"#52525B",fontSize:12}}>📍 {c.city}{c.language?" · "+c.language:""}</div>
        </div>
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:14}}>
        {c.availableNow&&<Pill color="#22C55E">{t.availNow}</Pill>}
        {c.fastResponder&&<Pill color="#FBBF24">{t.fastResp}</Pill>}
        {c.verified&&<Pill color="#60A5FA">{t.verifiedBadge}</Pill>}
        {c.founding&&<Pill color="#FF6B35">{t.foundingBadge}</Pill>}
      </div>
      {c.isDemo&&<div style={{background:"rgba(82,82,91,0.12)",border:"1px solid #2a2a35",borderRadius:9,padding:"9px 13px",marginBottom:12,fontSize:12,color:"#71717A"}}>ℹ️ Sample profile for platform preview.</div>}
      <p style={{color:"#A1A1AA",fontSize:13,lineHeight:1.75,marginBottom:14,borderTop:"1px solid #1a1a20",paddingTop:12}}>{c.bio}</p>
      <div style={{display:"flex",gap:8,marginBottom:14}}>
        {[["Rate","₹"+c.price+"/"+c.per,color],["Experience",c.experience||"—","#fff"],["Works",(c.worksCompleted||0)+"+","#34D399"]].map(function(item){return(
          <div key={item[0]} style={{flex:1,background:"#111115",border:"1px solid #1a1a20",borderRadius:9,padding:"9px 6px",textAlign:"center"}}>
            <div style={{fontWeight:700,fontSize:13,color:item[2],marginBottom:2}}>{item[1]}</div>
            <div style={{color:"#3F3F46",fontSize:10,textTransform:"uppercase",letterSpacing:0.5}}>{item[0]}</div>
          </div>
        );})}
      </div>
      <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14}}>
        {c.tags.map(function(tag){return <span key={tag} style={{background:"#1a1a20",color:"#71717A",padding:"4px 10px",borderRadius:6,fontSize:11}}>{tag}</span>;})}
      </div>
      {c.portfolio&&<a href={c.portfolio} target="_blank" rel="noreferrer" style={{display:"block",color:"#60A5FA",fontSize:12,marginBottom:14,textDecoration:"none"}}>🔗 View Portfolio</a>}
      <div style={{background:"#111115",border:"1px solid #1a1a20",borderRadius:9,padding:"9px 13px",marginBottom:12,fontSize:12,color:"#52525B",display:"flex",justifyContent:"space-between"}}>
        <span>💳 {t.creditsLeft}</span><span style={{color:"#FF6B35",fontWeight:700}}>{props.credits}</span>
      </div>
      {reqStatus==="sent"
        ?<div style={{padding:"12px",background:"#052e16",border:"1px solid #166534",borderRadius:10,color:"#22C55E",fontSize:13,fontWeight:600,textAlign:"center"}}>{t.requestSent}</div>
        :<PBtn full onClick={sendReq}>{t.connectReq}</PBtn>
      }
      <div style={{textAlign:"center",marginTop:10}}>
        <button onClick={function(){setShowReport(function(p){return !p;});}} style={{background:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.3)",color:"#f87171",padding:"6px 12px",borderRadius:8,fontSize:11,cursor:"pointer",fontFamily:"inherit"}}>{t.report}</button>
      </div>
      {showReport&&<div style={{marginTop:10,background:"#1a0808",border:"1px solid #3f1515",borderRadius:10,padding:12}}>{[t.fake,t.spam,t.scam].map(function(r){return <button key={r} onClick={function(){setShowReport(false);}} style={{display:"block",width:"100%",textAlign:"left",padding:"7px 10px",background:"transparent",border:"none",color:"#f87171",fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>• {r}</button>;})}</div>}
    </Modal>
  );
}

function ProposalModal(props){
  var t=props.t;
  var [msg,setMsg]=useState("");var [price,setPrice]=useState("");var [delivery,setDelivery]=useState("");
  return(
    <Modal onClose={props.onClose}>
      <div style={{fontWeight:700,fontSize:16,color:"#fff",marginBottom:4}}>{t.sendProposal}</div>
      <div style={{color:"#52525B",fontSize:13,marginBottom:14}}>For: {props.job.title}</div>
      <div style={{display:"grid",gap:12}}>
        <Lbl label={t.proposalMsg}><textarea value={msg} onChange={function(e){setMsg(e.target.value);}} rows={3} style={Object.assign({},inp,{resize:"vertical"})}/></Lbl>
        <Lbl label={t.expectedPrice}><input type="number" value={price} onChange={function(e){setPrice(e.target.value);}} style={inp}/></Lbl>
        <Lbl label={t.deliveryTime}><input value={delivery} onChange={function(e){setDelivery(e.target.value);}} style={inp}/></Lbl>
        <div style={{display:"flex",gap:8}}><PBtn full onClick={function(){if(msg&&price&&delivery)props.onSubmit();}}>{t.submitProposal}</PBtn><SBtn full onClick={props.onClose}>{t.cancel}</SBtn></div>
      </div>
    </Modal>
  );
}

function SignupForm(props){
  var t=props.t;
  var [name,setName]=useState("");var [email,setEmail]=useState("");var [role,setRole]=useState(ROLES[0]);
  var [city,setCity]=useState(CITIES[0]);var [price,setPrice]=useState("");var [per,setPer]=useState("reel");
  var [exp,setExp]=useState("");var [works,setWorks]=useState("0");var [bio,setBio]=useState("");
  var [lang,setLang]=useState(LANG_LIST[0]);var [tags,setTags]=useState("");var [portfolio,setPortfolio]=useState("");
  var [loading,setLoading]=useState(false);
  function submit(){
    if(!name||!email||!bio||!price)return;
    setLoading(true);
    setTimeout(function(){
      props.onSubmit({id:randomId(),name:name,email:email,role:role,city:city,price:price,per:per,experience:exp,worksCompleted:parseInt(works)||0,bio:bio,language:lang,tags:tags.split(",").map(function(x){return x.trim();}).filter(Boolean),portfolio:portfolio,joinedAt:Date.now(),founding:props.fl>0,verified:false,fastResponder:false,availableNow:true,isDemo:false});
      setLoading(false);
    },700);
  }
  return(
    <div>
      <div style={{marginBottom:16}}>
        <div style={{fontWeight:700,fontSize:18,color:"#fff",marginBottom:6}}>{t.joinCreator}</div>
        {props.fl>0?<div style={{background:"rgba(255,107,53,0.08)",border:"1px solid rgba(255,107,53,0.2)",borderRadius:9,padding:"10px 14px",fontSize:13,color:"#FF6B35"}}>⭐ {props.fl} founding spots left — Zero commission during beta.</div>:<div style={{color:"#52525B",fontSize:13}}>Join Crevo for free.</div>}
      </div>
      <div style={{display:"grid",gap:12}}>
        <Lbl label={t.fullName+" *"}><input value={name} onChange={function(e){setName(e.target.value);}} placeholder="Rohit Sharma" style={inp}/></Lbl>
        <Lbl label={t.emailLabel+" *"}><input type="email" value={email} onChange={function(e){setEmail(e.target.value);}} placeholder="you@email.com" style={inp}/></Lbl>
        <Lbl label={t.roleLabel+" *"}><select value={role} onChange={function(e){setRole(e.target.value);}} style={inp}>{ROLES.map(function(r){return <option key={r}>{r}</option>;})}</select></Lbl>
        <Lbl label={t.cityLabel+" *"}><select value={city} onChange={function(e){setCity(e.target.value);}} style={inp}>{CITIES.map(function(c){return <option key={c}>{c}</option>;})}</select></Lbl>
        <Lbl label={t.rateLabel+" *"}><input type="number" value={price} onChange={function(e){setPrice(e.target.value);}} placeholder="499" style={inp}/></Lbl>
        <Lbl label={t.perLabel}><input value={per} onChange={function(e){setPer(e.target.value);}} placeholder="reel" style={inp}/></Lbl>
        <Lbl label={t.langWorked}><select value={lang} onChange={function(e){setLang(e.target.value);}} style={inp}>{LANG_LIST.map(function(l){return <option key={l}>{l}</option>;})}</select></Lbl>
        <Lbl label={t.worksCount}><input type="number" value={works} onChange={function(e){setWorks(e.target.value);}} placeholder="0" style={inp}/></Lbl>
        <Lbl label={t.bioLabel+" *"}><textarea value={bio} onChange={function(e){setBio(e.target.value);}} placeholder="Edited 200+ reels for creators. Specialist in..." rows={2} style={Object.assign({},inp,{resize:"vertical"})}/></Lbl>
        <Lbl label={t.tagsLabel}><input value={tags} onChange={function(e){setTags(e.target.value);}} placeholder="YouTube Shorts, Reels, Color Grade" style={inp}/></Lbl>
        <Lbl label={t.portfolioLabel}><input value={portfolio} onChange={function(e){setPortfolio(e.target.value);}} placeholder="https://your-portfolio.com" style={inp}/></Lbl>
        <PBtn full onClick={submit}>{loading?t.creating:t.createProfile}</PBtn>
      </div>
    </div>
  );
}

function PostForm(props){
  var t=props.t;
  var [cn,setCn]=useState("");var [title,setTitle]=useState("");var [cat,setCat]=useState(ROLES[0]);
  var [budget,setBudget]=useState(BUDGETS[0]);var [dl,setDl]=useState(DEADLINES[0]);var [desc,setDesc]=useState("");
  var [loading,setLoading]=useState(false);
  function submit(){if(!cn||!title)return;setLoading(true);setTimeout(function(){props.onSubmit({id:randomId(),clientName:cn,title:title,category:cat,budget:budget,deadline:dl,desc:desc,postedAt:Date.now(),founding:props.fl>0});setLoading(false);},600);}
  return(
    <div>
      <div style={{marginBottom:16}}>
        <div style={{fontWeight:700,fontSize:18,color:"#fff",marginBottom:6}}>{t.postReq}</div>
        {props.fl>0?<div style={{background:"rgba(52,211,153,0.08)",border:"1px solid rgba(52,211,153,0.2)",borderRadius:9,padding:"10px 14px",fontSize:13,color:"#34D399"}}>🟢 {props.fl} founding client spots left.</div>:<div style={{color:"#52525B",fontSize:13}}>Post for free.</div>}
      </div>
      <div style={{display:"grid",gap:12}}>
        <Lbl label={t.clientName+" *"}><input value={cn} onChange={function(e){setCn(e.target.value);}} placeholder="TechWithRaj" style={inp}/></Lbl>
        <Lbl label={t.jobTitle+" *"}><input value={title} onChange={function(e){setTitle(e.target.value);}} placeholder="Looking for a Shorts Editor" style={inp}/></Lbl>
        <Lbl label={t.categoryLabel}><select value={cat} onChange={function(e){setCat(e.target.value);}} style={inp}>{ROLES.map(function(r){return <option key={r}>{r}</option>;})}</select></Lbl>
        <Lbl label={t.budgetLabel}><select value={budget} onChange={function(e){setBudget(e.target.value);}} style={inp}>{BUDGETS.map(function(b){return <option key={b}>{b}</option>;})}</select></Lbl>
        <Lbl label={t.deadlineLabel}><select value={dl} onChange={function(e){setDl(e.target.value);}} style={inp}>{DEADLINES.map(function(d){return <option key={d}>{d}</option>;})}</select></Lbl>
        <Lbl label={t.descLabel}><textarea value={desc} onChange={function(e){setDesc(e.target.value);}} placeholder="Describe what you need..." rows={3} style={Object.assign({},inp,{resize:"vertical"})}/></Lbl>
        <PBtn full onClick={submit}>{loading?t.posting:t.postJob}</PBtn>
      </div>
    </div>
  );
}

function HomePage(props){
  var t=props.t;var setPage=props.setPage;
  var allCreators=DEMO_CREATORS.concat(props.creators);
  return(
    <div>
      {/* HERO */}
      <div style={{maxWidth:680,margin:"0 auto",padding:"56px 20px 44px",textAlign:"center"}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"#1a1a20",border:"1px solid #2a2a32",color:"#A1A1AA",padding:"5px 14px",borderRadius:20,fontSize:12,marginBottom:20}}>
          🇮🇳 India's Creator Hiring Platform · Beta
        </div>
        <h1 style={{fontSize:"clamp(32px,6vw,58px)",fontWeight:800,lineHeight:1.06,letterSpacing:"-2.5px",marginBottom:16,color:"#fff"}}>
          {t.heroTitle}<br/>
          <span style={{background:"linear-gradient(135deg,#FF6B35,#F97316)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{t.heroHighlight}</span>
        </h1>
        <p style={{color:"#A1A1AA",fontSize:15,lineHeight:1.8,marginBottom:10,maxWidth:500,margin:"0 auto 10px"}}>{t.heroSub}</p>
        <p style={{color:"#FF6B35",fontSize:13,fontWeight:600,marginBottom:28,margin:"0 auto 28px"}}>{t.betaText}</p>
        <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap",marginBottom:24}}>
          <PBtn onClick={function(){setPage("creators");}}>{t.findCreators}</PBtn>
          <SBtn onClick={function(){window.open(GOOGLE_FORM);}}>{t.joinBtn}</SBtn>
        </div>
      </div>

      <div style={{borderTop:"1px solid #1a1a20"}}/>

      {/* FOUNDING COUNTER — right after hero */}
      <div style={{maxWidth:880,margin:"0 auto",padding:"0 20px 40px"}}>
        <div style={{background:"rgba(255,107,53,0.06)",border:"1px solid rgba(255,107,53,0.2)",borderRadius:16,padding:"20px 24px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:16}}>
            <div>
              <div style={{fontSize:11,color:"#FF6B35",letterSpacing:2,textTransform:"uppercase",fontWeight:600,marginBottom:4}}>{t.foundingOffer}</div>
              <p style={{color:"#A1A1AA",fontSize:13,margin:0}}>{t.foundingDesc}</p>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:10,minWidth:220,flex:1,maxWidth:280}}>
              <FBar label={t.creatorSpots} left={props.fCL} t={t}/>
              <FBar label={t.clientSpots} left={props.fJL} t={t}/>
              <div style={{display:"flex",gap:8}}>
                <PBtn full onClick={function(){setPage("signup-creator");}}>{t.joinFounding}</PBtn>
                <SBtn full onClick={function(){setPage("post-req");}}>{t.postFirst}</SBtn>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TRUST SECTION */}
      <div style={{background:"#0A0A0D",borderBottom:"1px solid #1a1a20",padding:"28px 20px"}}>
        <div style={{maxWidth:860,margin:"0 auto"}}>
          <p style={{textAlign:"center",color:"#52525B",fontSize:12,letterSpacing:2,textTransform:"uppercase",marginBottom:20}}>{t.trustTitle}</p>
          <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:10}}>
            {[["🚀",t.trust1],["💬",t.trust2],["🚫",t.trust3],["📲",t.trust4],["✨",t.trust5]].map(function(item){return(
              <div key={item[1]} style={{display:"flex",alignItems:"center",gap:7,background:"#111115",border:"1px solid #1f1f26",borderRadius:20,padding:"7px 16px",fontSize:13,color:"#A1A1AA"}}>
                <span>{item[0]}</span><span>{item[1]}</span>
              </div>
            );})}
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div style={{maxWidth:860,margin:"0 auto",padding:"52px 20px"}}>
        <h2 style={{fontSize:22,fontWeight:700,letterSpacing:"-0.5px",marginBottom:6,color:"#fff",textAlign:"center"}}>{t.howTitle}</h2>
        <p style={{color:"#52525B",fontSize:13,marginBottom:32,textAlign:"center"}}>Simple. Direct. WhatsApp-first.</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:14}}>
          {[["01",t.step1title,t.step1desc,"🔍"],["02",t.step2title,t.step2desc,"📨"],["03",t.step3title,t.step3desc,"✅"],["04",t.step4title,t.step4desc,"💬"]].map(function(s){return(
            <div key={s[0]} style={{background:"#0D0D10",border:"1px solid #1a1a20",borderRadius:14,padding:20,textAlign:"center"}}>
              <div style={{fontSize:28,marginBottom:10}}>{s[3]}</div>
              <div style={{fontSize:11,color:"#FF6B35",fontWeight:700,letterSpacing:2,marginBottom:6}}>{s[0]}</div>
              <div style={{fontWeight:600,fontSize:14,color:"#fff",marginBottom:6}}>{s[1]}</div>
              <div style={{color:"#52525B",fontSize:12,lineHeight:1.6}}>{s[2]}</div>
            </div>
          );})}
        </div>
      </div>

      <div style={{borderTop:"1px solid #1a1a20"}}/>

      {/* PLATFORM PREVIEW */}
      <div style={{maxWidth:960,margin:"0 auto",padding:"52px 20px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:8,flexWrap:"wrap",gap:10}}>
          <div>
            <h2 style={{fontSize:20,fontWeight:700,letterSpacing:"-0.5px",marginBottom:4,color:"#fff"}}>{t.previewTitle}</h2>
            <p style={{color:"#52525B",fontSize:13}}>{t.previewNote}</p>
          </div>
          <GBtn onClick={function(){setPage("creators");}}>{t.viewAll}</GBtn>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(255px,1fr))",gap:14,marginTop:20}}>
          {allCreators.slice(0,4).map(function(c){return <CreatorCard key={c.id} creator={c} t={t} onClick={function(){setPage("creators");}}/>;})}
        </div>
      </div>

      {/* CATEGORIES */}
      <div style={{background:"#0A0A0D",borderTop:"1px solid #1a1a20",borderBottom:"1px solid #1a1a20",padding:"52px 20px"}}>
        <div style={{maxWidth:880,margin:"0 auto"}}>
          <h2 style={{fontSize:20,fontWeight:700,letterSpacing:"-0.5px",marginBottom:6,color:"#fff"}}>{t.catTitle}</h2>
          <p style={{color:"#52525B",fontSize:13,marginBottom:24}}>Find the right creator for your content</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:10}}>
            {ROLES.map(function(role){
              var color=getColor(role);var bg=getBg(role);var icon=getIcon(role);
              var count=allCreators.filter(function(c){return c.role===role;}).length;
              return(
                <div key={role} onClick={function(){setPage("creators");}} style={{background:"#0D0D10",border:"1px solid #1f1f26",borderRadius:13,padding:"16px 14px",cursor:"pointer",textAlign:"center",transition:"all 0.15s"}}
                  onMouseEnter={function(e){e.currentTarget.style.borderColor=color+"55";e.currentTarget.style.background=bg;}}
                  onMouseLeave={function(e){e.currentTarget.style.borderColor="#1f1f26";e.currentTarget.style.background="#0D0D10";}}>
                  <div style={{fontSize:22,color:color,marginBottom:8}}>{icon}</div>
                  <div style={{fontWeight:600,fontSize:12,color:"#fff",marginBottom:4,lineHeight:1.3}}>{role}</div>
                  <div style={{color:"#3F3F46",fontSize:10}}>{count} creator{count!==1?"s":""}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>



      {/* TESTIMONIALS */}
      <div style={{background:"#0A0A0D",borderTop:"1px solid #1a1a20",borderBottom:"1px solid #1a1a20",padding:"52px 20px"}}>
        <div style={{maxWidth:860,margin:"0 auto"}}>
          <h2 style={{fontSize:20,fontWeight:700,letterSpacing:"-0.5px",marginBottom:28,textAlign:"center",color:"#fff"}}>{t.testiTitle}</h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:14}}>
            {TESTIMONIALS.map(function(tm,i){return(
              <div key={i} style={{background:"#0D0D10",border:"1px solid #1f1f26",borderRadius:14,padding:22}}>
                <div style={{color:"#FF6B35",fontSize:24,marginBottom:10,lineHeight:1}}>&ldquo;</div>
                <p style={{color:"#A1A1AA",fontSize:13,lineHeight:1.7,marginBottom:14,fontStyle:"italic"}}>{tm.text}</p>
                <div style={{fontWeight:600,fontSize:13,color:"#fff"}}>{tm.name}</div>
                <div style={{color:"#52525B",fontSize:11}}>{tm.role}</div>
              </div>
            );})}
          </div>
        </div>
      </div>

      {/* FOUNDER */}
      <div style={{maxWidth:880,margin:"0 auto",padding:"52px 20px"}}>
        <div style={{background:"rgba(255,107,53,0.04)",border:"1px solid #2a2a35",borderRadius:18,padding:"32px 28px"}}>
          <div style={{fontSize:11,color:"#FF6B35",letterSpacing:2,textTransform:"uppercase",fontWeight:600,marginBottom:14}}>{t.founderTitle}</div>
          <p style={{color:"#A1A1AA",fontSize:15,lineHeight:1.85,marginBottom:20,maxWidth:560}}>&ldquo;{t.founderMsg}&rdquo;</p>
          <div style={{display:"flex",flexWrap:"wrap",gap:10}}>
            {[t.noCommission,t.whatsappNative,t.hinglishFriendly,t.fastHiring].map(function(v){return(
              <div key={v} style={{display:"flex",alignItems:"center",gap:6,background:"#111115",border:"1px solid #1f1f26",borderRadius:20,padding:"6px 14px",fontSize:12,color:"#71717A"}}>
                <span style={{color:"#FF6B35"}}>✓</span>{v}
              </div>
            );})}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{background:"#050507",borderTop:"1px solid #1a1a20",padding:"40px 24px 28px"}}>
        <div style={{maxWidth:880,margin:"0 auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:24,marginBottom:32}}>
            <div>
              <Logo/>
              <p style={{color:"#3F3F46",fontSize:13,marginTop:10,maxWidth:240,lineHeight:1.6}}>India's Creator Hiring Platform. Fast. Direct. WhatsApp-first.</p>
            </div>
            <div style={{display:"flex",gap:40,flexWrap:"wrap"}}>
              <div>
                <div style={{color:"#52525B",fontSize:11,letterSpacing:2,textTransform:"uppercase",marginBottom:12}}>Company</div>
                {["About","Contact","Privacy Policy","Terms"].map(function(link){return <div key={link} style={{color:"#71717A",fontSize:13,marginBottom:8,cursor:"pointer"}}>{link}</div>;})}
              </div>
              <div>
                <div style={{color:"#52525B",fontSize:11,letterSpacing:2,textTransform:"uppercase",marginBottom:12}}>Follow</div>
                {["Instagram","YouTube"].map(function(link){return <div key={link} style={{color:"#71717A",fontSize:13,marginBottom:8,cursor:"pointer"}}>{link}</div>;})}
              </div>
            </div>
          </div>
          <div style={{borderTop:"1px solid #1a1a20",paddingTop:20,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
            <span style={{color:"#27272A",fontSize:12}}>© 2025 Crevo · India's Creator Network</span>
            <span style={{color:"#27272A",fontSize:12}}>Currently in Beta · Zero Commission</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CreatorsPage(props){
  var t=props.t;
  var allCreators=DEMO_CREATORS.concat(props.creators);
  var [search,setSearch]=useState("");var [rf,setRf]=useState("All");
  var [selected,setSelected]=useState(null);var [credits,setCredits]=useState(5);var [toast,setToast]=useState("");
  function showT(m){setToast(m);setTimeout(function(){setToast("");},3000);}
  var filtered=allCreators.filter(function(c){
    var r=rf==="All"||c.role===rf;
    var s=!search||[c.name,c.city,c.role].concat(c.tags).some(function(x){return x.toLowerCase().includes(search.toLowerCase());});
    return r&&s;
  });
  function handleConnect(){if(credits<=0){showT("No credits left!");return;}setCredits(function(p){return p-1;});setSelected(null);showT(t.requestSent);}
  return(
    <div style={{maxWidth:960,margin:"0 auto",padding:"32px 20px 60px"}}>
      <Toast msg={toast}/>
      {selected&&<CreatorDetail creator={selected} t={t} onClose={function(){setSelected(null);}} credits={credits} onConnect={handleConnect}/>}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:20,flexWrap:"wrap",gap:10}}>
        <div>
          <h2 style={{fontSize:22,fontWeight:700,letterSpacing:"-0.5px",marginBottom:4,color:"#fff"}}>{t.creators}</h2>
          <p style={{color:"#52525B",fontSize:13}}>{filtered.length} creators · {credits} {t.creditsLeft}</p>
        </div>
        <PBtn onClick={function(){setPage("signup-creator");}}>{t.joinCreator}</PBtn>
      </div>
      <input value={search} onChange={function(e){setSearch(e.target.value);}} placeholder="Search by name, city, role, or skill..." style={Object.assign({},inp,{marginBottom:14})}/>
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:22}}>
        {["All"].concat(ROLES).map(function(r){var color=getColor(r);var active=rf===r;return <button key={r} onClick={function(){setRf(r);}} style={{padding:"6px 14px",background:active?(r==="All"?"#FF6B35":color):"#0D0D10",border:"1px solid "+(active?"transparent":"#1f1f26"),color:active?"#000":"#71717A",borderRadius:20,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap",fontSize:11,fontFamily:"inherit"}}>{r}</button>;})}
      </div>
      {filtered.length===0
        ?<div style={{textAlign:"center",padding:"72px 20px"}}>
          <div style={{fontSize:40,marginBottom:14}}>🎨</div>
          <div style={{fontWeight:600,fontSize:16,marginBottom:8,color:"#fff"}}>{t.noCreators}</div>
          <div style={{color:"#52525B",fontSize:13,marginBottom:22,maxWidth:320,margin:"0 auto 22px"}}>{t.beFirstCreator}</div>
          <PBtn onClick={function(){setPage("signup-creator");}}>{t.joinFounding}</PBtn>
        </div>
        :<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(255px,1fr))",gap:14}}>
          {filtered.map(function(c){return <CreatorCard key={c.id} creator={c} t={t} onClick={function(){setSelected(c);}}/>;})}
        </div>
      }
    </div>
  );
}

function ProjectsPage(props){
  var t=props.t;
  var [showForm,setShowForm]=useState(false);var [propTarget,setPropTarget]=useState(null);
  var [proposed,setProposed]=useState([]);var [cf,setCf]=useState("All");var [toast,setToast]=useState("");
  function showT(m){setToast(m);setTimeout(function(){setToast("");},3000);}
  var filtered=props.jobs.filter(function(j){return cf==="All"||j.category===cf;});
  function handlePost(job){props.setJobs(function(p){return [job].concat(p);});if(props.fJL>0)props.setFJL(function(p){return p-1;});setShowForm(false);showT("Requirement posted!");}
  return(
    <div style={{maxWidth:760,margin:"0 auto",padding:"32px 20px 60px"}}>
      <Toast msg={toast}/>
      {propTarget&&<ProposalModal job={propTarget} t={t} onClose={function(){setPropTarget(null);}} onSubmit={function(){setProposed(function(p){return p.concat([propTarget.id]);});setPropTarget(null);showT("Proposal sent!");}}/>}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:20,flexWrap:"wrap",gap:10}}>
        <div>
          <h2 style={{fontSize:22,fontWeight:700,letterSpacing:"-0.5px",marginBottom:4,color:"#fff"}}>{t.browseProjects}</h2>
          <p style={{color:"#52525B",fontSize:13}}>{filtered.length} open requirements</p>
        </div>
        <SBtn onClick={function(){setShowForm(function(p){return !p;});}}>{showForm?t.cancel:"+ "+t.postReq}</SBtn>
      </div>
      {showForm&&<div style={{background:"#0D0D10",border:"1px solid #1f1f26",borderRadius:16,padding:22,marginBottom:22}}><PostForm t={t} onSubmit={handlePost} fl={props.fJL}/></div>}
      <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:4,marginBottom:20}}>
        {["All"].concat(ROLES).map(function(r){var color=getColor(r);var active=cf===r;return <button key={r} onClick={function(){setCf(r);}} style={{padding:"6px 14px",background:active?(r==="All"?"#FF6B35":color):"#0D0D10",border:"1px solid "+(active?"transparent":"#1f1f26"),color:active?"#000":"#71717A",borderRadius:20,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap",fontSize:11,fontFamily:"inherit"}}>{r}</button>;})}
      </div>
      {filtered.length===0
        ?<div style={{textAlign:"center",padding:"72px 20px"}}>
          <div style={{fontSize:40,marginBottom:14}}>📋</div>
          <div style={{fontWeight:600,fontSize:16,marginBottom:8,color:"#fff"}}>{t.noProjects}</div>
          <div style={{color:"#52525B",fontSize:13,marginBottom:22,maxWidth:320,margin:"0 auto 22px"}}>{t.beFirstClient}</div>
          <PBtn onClick={function(){setShowForm(true);}}>{t.postFirst}</PBtn>
        </div>
        :<div style={{display:"grid",gap:10}}>
          {filtered.map(function(job){
            var color=getColor(job.category);var isProp=proposed.includes(job.id);
            return(
              <div key={job.id} style={{background:"#0D0D10",border:"1px solid #1f1f26",borderRadius:13,padding:"18px 20px",transition:"border-color 0.15s"}}
                onMouseEnter={function(e){e.currentTarget.style.borderColor="#2a2a35";}}
                onMouseLeave={function(e){e.currentTarget.style.borderColor="#1f1f26";}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:14}}>
                  <div style={{flex:1}}>
                    {job.founding&&<div style={{marginBottom:6}}><Pill color="#34D399">⭐ Founding Client</Pill></div>}
                    <div style={{fontWeight:600,fontSize:14,marginBottom:8,lineHeight:1.4,color:"#fff"}}>{job.title}</div>
                    <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center",marginBottom:6}}>
                      <Pill color={color}>{job.category}</Pill>
                      <span style={{color:"#34D399",fontWeight:700,fontSize:13}}>{job.budget}</span>
                      <span style={{color:"#3F3F46",fontSize:11}}>⏰ {job.deadline}</span>
                      <span style={{color:"#3F3F46",fontSize:11}}>by {job.clientName} · {timeAgo(job.postedAt)}</span>
                    </div>
                    {job.desc&&<p style={{color:"#52525B",fontSize:12,lineHeight:1.6,marginTop:6}}>{job.desc}</p>}
                  </div>
                  <button onClick={function(){if(!isProp)setPropTarget(job);}} style={{padding:"8px 16px",background:isProp?"transparent":"linear-gradient(135deg,#FF6B35,#F97316)",border:isProp?"1px solid #2a2a32":"none",color:isProp?"#52525B":"#fff",borderRadius:8,fontWeight:600,fontSize:12,cursor:isProp?"default":"pointer",fontFamily:"inherit",flexShrink:0}}>
                    {isProp?"Sent ✓":t.sendProposal}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      }
    </div>
  );
}

export default function Crevo(){
  var [lang,setLang]=useState("en");
  var [page,setPage]=useState("home");
  var [creators,setCreators]=useState([]);
  var [jobs,setJobs]=useState([]);
  var [fCL,setFCL]=useState(FOUNDING_LIMIT);
  var [fJL,setFJL]=useState(FOUNDING_LIMIT);
  var [toast,setToast]=useState("");
  var t=T[lang];
  function showToast(m){setToast(m);setTimeout(function(){setToast("");},3000);}

  // Load creators from Supabase on start
  useEffect(function(){
    supabase.from("creators").select("*").order("created_at",{ascending:false}).then(function(res){
      if(res.data && res.data.length > 0){
        var loaded = res.data.map(function(c){
          return {
            id: c.id,
            name: c.name,
            email: c.email,
            role: c.role,
            city: c.city,
            bio: c.bio,
            price: c.price,
            per: c.per,
            tags: c.tags ? c.tags.split(",").map(function(x){return x.trim();}) : [],
            experience: c.experience,
            portfolio: c.portfolio,
            language: c.language,
            worksCompleted: c.works_completed||0,
            founding: c.founding||false,
            verified: c.verified||false,
            fastResponder: false,
            availableNow: c.available_now||true,
            isDemo: false,
            joinedAt: new Date(c.created_at).getTime()
          };
        });
        setCreators(loaded);
        // Update founding counter
        var foundingCount = loaded.filter(function(c){return c.founding;}).length;
        setFCL(Math.max(FOUNDING_LIMIT - foundingCount, 0));
      }
    });
  }, []);
  function handleSignup(c){
    // Save to Supabase
    supabase.from("creators").insert([{
      name: c.name,
      email: c.email,
      role: c.role,
      city: c.city,
      bio: c.bio,
      price: c.price,
      per: c.per,
      tags: c.tags.join(","),
      experience: c.experience,
      portfolio: c.portfolio,
      language: c.language,
      works_completed: c.worksCompleted||0,
      founding: c.founding||false,
      verified: false,
      available_now: true
    }]).then(function(res){
      if(res.error){ showToast("Error saving profile. Try again."); return; }
      setCreators(function(p){return p.concat([c]);});
      if(fCL>0)setFCL(function(p){return p-1;});
      showToast("Welcome to Crevo! Profile saved!");
      setPage("creators");
    });
  }
  var NAV=[["home",t.home],["creators",t.creators],["projects",t.projects]];
  var LANGS=[["en","EN"],["hi","हि"],["hl","HI"]];
  return(
    <div style={{fontFamily:"'DM Sans','Segoe UI',sans-serif",background:"#09090B",minHeight:"100vh",color:"#fff"}}>
      <Toast msg={toast}/>
      {/* NAVBAR */}
      <nav style={{background:"rgba(9,9,11,0.97)",backdropFilter:"blur(20px)",borderBottom:"1px solid #1a1a20",padding:"10px 16px",position:"sticky",top:0,zIndex:100}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
          <div onClick={function(){setPage("home");}}><Logo/></div>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <div style={{display:"flex",gap:1,background:"#111115",border:"1px solid #1f1f26",borderRadius:8,padding:2}}>
              {LANGS.map(function(item){var active=lang===item[0];return <button key={item[0]} onClick={function(){setLang(item[0]);}} style={{padding:"4px 8px",background:active?"#2a2a35":"transparent",border:"none",color:active?"#fff":"#52525B",borderRadius:6,fontWeight:600,cursor:"pointer",fontSize:11,fontFamily:"inherit"}}>{item[1]}</button>;})}
            </div>
            <PBtn sm onClick={function(){window.open(GOOGLE_FORM);}}>{t.joinCreator}</PBtn>
          </div>
        </div>
        <div style={{display:"flex",gap:2,borderTop:"1px solid #1a1a20",paddingTop:8}}>
          {NAV.map(function(item){var active=page===item[0];return <button key={item[0]} onClick={function(){setPage(item[0]);}} style={{padding:"6px 12px",background:active?"#1a1a20":"transparent",border:"none",color:active?"#fff":"#52525B",borderRadius:8,fontWeight:active?600:400,cursor:"pointer",fontSize:13,fontFamily:"inherit",flex:1,textAlign:"center"}}>{item[1]}</button>;})}
        </div>
      </nav>

      {page==="home"&&<HomePage t={t} setPage={setPage} creators={creators} fCL={fCL} fJL={fJL}/>}
      {page==="creators"&&<CreatorsPage t={t} creators={creators} fCL={fCL} setPage={setPage}/>}
      {page==="projects"&&<ProjectsPage t={t} jobs={jobs} setJobs={setJobs} fJL={fJL} setFJL={setFJL} setPage={setPage}/>}
      {page==="signup-creator"&&(
        <div style={{maxWidth:520,margin:"0 auto",padding:"28px 20px 60px"}}>
          <GBtn onClick={function(){setPage("creators");}}>{t.back}</GBtn>
          <div style={{background:"#0D0D10",border:"1px solid #1f1f26",borderRadius:18,padding:24,marginTop:16}}>
            <SignupForm t={t} onSubmit={function(c){handleSignup(c);}} fl={fCL}/>
          </div>
        </div>
      )}
      {page==="post-req"&&(
        <div style={{maxWidth:520,margin:"0 auto",padding:"28px 20px 60px"}}>
          <GBtn onClick={function(){setPage("projects");}}>{t.back}</GBtn>
          <div style={{background:"#0D0D10",border:"1px solid #1f1f26",borderRadius:18,padding:24,marginTop:16}}>
            <PostForm t={t} onSubmit={function(job){setJobs(function(p){return [job].concat(p);});if(fJL>0)setFJL(function(p){return p-1;});showToast("Posted!");setPage("projects");}} fl={fJL}/>
          </div>
        </div>
      )}
    </div>
  );
}

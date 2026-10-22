(function(){
var C=window.CONFIG||{},$=function(s){return document.querySelectorAll(s)};
var m=document.getElementById("menu"),n=document.getElementById("nav");
if(m)m.onclick=function(){var o=n.classList.toggle("open");m.setAttribute("aria-expanded",o)};
function wa(p,t){return "https://wa.me/91"+p+"?text="+encodeURIComponent(t||C.whatsappMessage)}
$("[data-link]").forEach(function(a){var k=a.dataset.link;
 if(k=="call1"&&C.phone1)a.href="tel:+91"+C.phone1;if(k=="call2"&&C.phone2)a.href="tel:+91"+C.phone2;
 if(k=="wa1"&&C.phone1)a.href=wa(C.phone1);if(k=="wa2"&&C.phone2)a.href=wa(C.phone2)});
var S={ig:C.instagram,fb:C.facebook,yt:C.youtube};
$("[data-social]").forEach(function(a){if(S[a.dataset.social])a.href=S[a.dataset.social]});
$("[data-wa-cat]").forEach(function(a){a.href=wa(C.phone1,"Hello Pragati Pharmaceuticals, I would like to enquire about "+a.dataset.waCat+" (availability and wholesale rates).")});
/* Enquiry form */
var f=document.getElementById("enq");
if(f)f.onsubmit=function(e){e.preventDefault();var o=document.getElementById("msg");o.className="";
 if(!C.formAccessKey){o.className="err";o.textContent="This form is not active yet. Please call or WhatsApp us instead.";return}
 var d=new FormData(f);d.append("access_key",C.formAccessKey);d.append("subject","New wholesale enquiry from website");d.append("from_name","Pragati Pharmaceuticals website");
 o.textContent="Sending…";
 fetch("https://api.web3forms.com/submit",{method:"POST",body:d}).then(function(r){return r.json()}).then(function(j){
  if(j.success){o.className="ok";o.textContent="Thank you. Your enquiry was sent. We will contact you soon.";f.reset()}else throw 0
 }).catch(function(){o.className="err";o.textContent="Could not send. Please call or WhatsApp us instead."})};
/* Festival offers */
var box=document.getElementById("offers");if(!box)return;
var SAMPLE="Campaign,Headline,Image,Description,Categories,Start,End,Terms,Theme\n"+
"SAMPLE: Diwali Offer,SAMPLE headline,,Sample text only. Replace with your approved offer.,OTC; Gloves,2026-10-01,2026-12-31,Sample terms. For licensed trade customers only.,diwali\n"+
"SAMPLE: Ugadi Offer,SAMPLE headline,,Sample text only. Replace with your approved offer.,Surgical disposables,2027-03-01,2027-03-31,Sample terms. For licensed trade customers only.,ugadi";
function csv(t){var r=[],row=[],c="",q=false,i,ch;for(i=0;i<t.length;i++){ch=t[i];
 if(q){if(ch=='"'){if(t[i+1]=='"'){c+='"';i++}else q=false}else c+=ch}
 else if(ch=='"')q=true;else if(ch==","){row.push(c);c=""}
 else if(ch=="\n"||ch=="\r"){if(ch=="\r"&&t[i+1]=="\n")i++;row.push(c);r.push(row);row=[];c=""}else c+=ch}
 if(c||row.length){row.push(c);r.push(row)}return r}
function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x)e.textContent=x;return e}
function show(text){var rows=csv(text).filter(function(r){return r.join("").trim()});rows.shift();
 var today=new Date().toISOString().slice(0,10),L=[];
 rows.forEach(function(r){var s=(r[5]||"").trim(),e=(r[6]||"").trim(),st=(e&&e<today)?"expired":(s&&s>today)?"upcoming":"active";
  if(st!="expired")L.push({r:r,s:s,e:e,st:st})});
 L.sort(function(a,b){return (a.st==b.st)?0:a.st=="active"?-1:1});
 box.textContent="";
 if(!L.length){box.appendChild(el("p","note","No offers are running right now. Please contact us for current wholesale rates."));return}
 L.forEach(function(o){var r=o.r,a=el("article","offer "+((r[8]||"general").trim().toLowerCase()));
  var p=el("div","pic");if(r[2]&&r[2].trim()){var im=el("img");im.src=r[2].trim();im.alt=r[0]+" banner";p.appendChild(im)}else p.textContent=r[0];
  var t=el("div","txt"),g=el("span","tag"+(o.st=="upcoming"?" up":""),o.st=="active"?"ACTIVE":"UPCOMING");
  t.appendChild(g);t.appendChild(el("h2","",r[0]));t.appendChild(el("h3","",r[1]));t.appendChild(el("p","",r[3]));
  if(r[4])t.appendChild(el("p","","Applies to: "+r[4]));
  t.appendChild(el("p","","Valid from "+(o.s||"—")+" to "+(o.e||"—")));
  if(r[7])t.appendChild(el("p","terms","Terms: "+r[7]));
  var b=el("a","btn sm","Enquire About This Offer");b.href=wa(C.phone1||"8073040769","Hello Pragati Pharmaceuticals, I would like to enquire about the offer: "+r[0]);b.target="_blank";b.rel="noopener";t.appendChild(b);
  a.appendChild(p);a.appendChild(t);box.appendChild(a)})}
if(C.offersSheetCsv)fetch(C.offersSheetCsv).then(function(r){return r.text()}).then(show).catch(function(){show(SAMPLE)});else show(SAMPLE);
})();
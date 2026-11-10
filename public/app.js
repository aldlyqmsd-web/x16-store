/* X16 STORE configuration: edit these values before publishing. */
const STORE_CONFIG = {
  // The website and its API are served from the same Node.js app.
  apiBaseUrl: "",
  currency: "ر.س",
  products: [
    {id:"ticket-v3",name:"Ticket V3",category:"support",categoryName:"التذاكر والدعم",icon:"🎫",tag:"الأكثر طلبًا",description:"نظام تذاكر احترافي بخيارات متعددة، فئات وسجلات مستقلة، وأدوات متكاملة لفريق الدعم.",features:["تذاكر متعددة","إضافة وحذف أعضاء","سجل محادثة"],price:"5$"},
    {id:"protection",name:"Protection Bot",category:"security",categoryName:"الحماية واللوقات",icon:"🛡️",tag:"حماية السيرفر",description:"راقب الأحداث الإدارية المهمة واضبط قواعد الحماية والعقوبات والقائمة البيضاء من أوامر السلاش.",features:["Anti-Nuke","Anti-Raid","Whitelist"],price:"5$"},
    {id:"full-logger",name:"Full Logger",category:"security",categoryName:"الحماية واللوقات",icon:"📋",tag:"تسجيل شامل",description:"سجّل أحداث الرسائل والأعضاء والرومات والرتب والصوت والإشراف في قنوات لوق منظمة.",features:["Message Logs","Member Logs","Audit Logs"],price:"4$"},
    {id:"points",name:"Points System",category:"engagement",categoryName:"التفاعل والنقاط",icon:"🏆",tag:"نظام مكافآت",description:"احتسب النقاط حسب مدة التواجد الصوتي، أضف بونص، وأدر الأرصدة واعرض أفضل عشرة أعضاء.",features:["نقاط بالساعات","بونص قابل للتعديل","Top 10"],price:"5$"},
    {id:"apply",name:"Apply System",category:"support",categoryName:"التذاكر والدعم",icon:"📝",tag:"طلبات التقديم",description:"لوحة تقديم بأسئلة قابلة للتعديل، حالة فتح وإغلاق، ومراجعة الطلبات بالقبول أو الرفض.",features:["أسئلة مخصصة","APPLY / STATUS","إشعار خاص"],price:"3$"},
    {id:"vacation",name:"Vacation & Resignation",category:"management",categoryName:"الإدارة والتنظيم",icon:"🌴",tag:"إدارة الطلبات",description:"استقبل طلبات الإجازات والاستقالات بنماذج منظمة، وراجعها من روم اللوق مع إشعار النتيجة.",features:["طلب إجازة","طلب استقالة","قبول ورفض"],price:"4$"},
    {id:"attendance",name:"Login & Logout V2",category:"management",categoryName:"الإدارة والتنظيم",icon:"⏱️",tag:"الحضور والانصراف",description:"سجّل دخول وخروج الأعضاء، احسب مجموع الساعات، واعرض المتصدرين مع أدوات تعديل للإدارة.",features:["Login / Logout","Hours","Top 10"],price:"4$"},
    {id:"waiting",name:"Waiting Nickname",category:"utility",categoryName:"أدوات أخرى",icon:"🎧",tag:"ترتيب تلقائي",description:"نظّم قائمة الانتظار الصوتية بترقيم الأعضاء تلقائيًا مع الحفاظ على أسمائهم الأصلية.",features:["ترقيم تلقائي","إعادة ترتيب","اتصال صوتي"],price:"5$"},
    {id:"prayer",name:"Makkah Prayer Bot",category:"utility",categoryName:"أدوات أخرى",icon:"🕌",tag:"تذكير يومي",description:"تنبيهات مواقيت الصلاة بتوقيت مكة، مع نشر الأدعية والأذكار وإمكانية اختبار الرسائل.",features:["الصلوات الخمس","توقيت مكة","أذكار وأدعية"],price:"2$"},
    {id:"broadcast",name:"Broadcast For Room",category:"management",categoryName:"الإدارة والتنظيم",icon:"📢",tag:"الإعلانات",description:"لوحة إرسال إعلانات للأعضاء عبر الرسائل الخاصة مع بنر، معاينة، وتقارير للإرسال.",features:["لوحة BC","بنر PNG","تقرير الإرسال"],price:"4$"},
    {id:"afk-bot",name:"بوت AFK",category:"utility",categoryName:"أدوات أخرى",icon:"💤",tag:"تنظيم ذكي",description:"بوت AFK لمراقبة الرومات الصوتية وتنظيم الأعضاء غير النشطين تلقائيًا.",features:["مراقبة حتى 20 روم صوتي","تنبيه العضو بعد 15 دقيقة","منح العضو 6 دقائق للرد","نقل العضو تلقائيًا عند عدم الرد","تحديد روم AFK للنقل"],price:"2$"},
    {id:"room-presence-check-bot",name:"Room Presence Check Bot",category:"management",categoryName:"الإدارة والتنظيم",icon:"👥",tag:"متابعة الأعضاء",description:"بوت ذكي لمتابعة وجود الأعضاء في الرومات الصوتية، وتنبيه العضو للتأكد من استمراره، ونقل غير المستجيبين إلى روم AFK المحدد.",features:["مراقبة الرومات الصوتية","تحديد الرومات من الإعدادات","تنبيه العضو برسالة خاصة","مهلة 6 دقائق للرد","نقل غير المستجيبين إلى روم AFK"],price:"5$"},
    {"id": "ticket-v4","name": "Ticket V4","category": "support",categoryName: "التذاكر والدعم","icon": "🎟️","tag": "الأكثر طلباً","description": "نظام تذاكر احترافي متكامل لسيرفرات الديسكورد، يتيح للأعضاء فتح التذاكر والتواصل مع الإدارة عبر الخاص، مع نظام محادثات ذكي يجعل الإداري يرد على العضو باسم البوت، واستلام التذاكر وإغلاقها وإدارتها، وإضافة وحذف الأعضاء، وسجلات محادثات وتقارير متكاملة لفريق الدعم."],price:"5$"},
  ]
};

const state = {filter:"all",query:"",cart:[],submitting:false};
const $ = (id)=>document.getElementById(id);
const productGrid = $("productGrid");
const countProducts = STORE_CONFIG.products.length;
$("year").textContent = new Date().getFullYear();
document.querySelector('[data-filter="all"] span').textContent = countProducts;

function renderProducts(){
  const q=state.query.trim().toLowerCase();
  const list=STORE_CONFIG.products.filter(p=>{
    const matchesFilter=state.filter==="all"||p.category===state.filter;
    const haystack=[p.name,p.description,p.categoryName,...p.features].join(" ").toLowerCase();
    return matchesFilter&&(!q||haystack.includes(q));
  });
  productGrid.innerHTML=list.map(p=>`<article class="product-card">
    <div class="card-top"><div class="product-icon">${p.icon}</div><span class="product-tag">${escapeHtml(p.tag)}</span></div>
    <h3>${escapeHtml(p.name)}</h3><p>${escapeHtml(p.description)}</p>
    <div class="product-features">${p.features.map(f=>`<span>${escapeHtml(f)}</span>`).join("")}</div>
    <div class="card-bottom"><div class="price-label"><small>${escapeHtml(p.categoryName)}</small><b>${escapeHtml(p.price)}</b></div><button class="add-button" data-add="${escapeHtml(p.id)}">أضف إلى الطلب +</button></div>
  </article>`).join("");
  $("emptyState").hidden=list.length!==0;
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function showToast(message){const t=$("toast");t.textContent=message;t.classList.add("show");clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>t.classList.remove("show"),2600);}
function updateCart(){
  $("cartCount").textContent=state.cart.length;$("drawerCount").textContent=state.cart.length;
  if(!state.cart.length){$("cartItems").innerHTML='<div class="cart-empty">قائمة طلباتك فارغة حاليًا.<br>أضف البوتات التي تحتاجها من المتجر.</div>';return;}
  $("cartItems").innerHTML=state.cart.map((id,i)=>{const p=STORE_CONFIG.products.find(x=>x.id===id);return `<div class="cart-line"><div><b>${escapeHtml(p.name)}</b><small>${escapeHtml(p.categoryName)} · ${escapeHtml(p.price)}</small></div><button class="remove-item" data-remove="${i}">حذف</button></div>`;}).join("");
}
function openCart(){updateCart();$("cartDrawer").classList.add("open");$("drawerBackdrop").classList.add("open");$("cartDrawer").setAttribute("aria-hidden","false");document.body.style.overflow="hidden";}
function closeCart(){ $("cartDrawer").classList.remove("open");$("drawerBackdrop").classList.remove("open");$("cartDrawer").setAttribute("aria-hidden","true");if(!$('checkoutModal').classList.contains('open'))document.body.style.overflow=""; }
function openCheckout(){
  if(!state.cart.length){showToast("أضف بوتًا واحدًا على الأقل أولًا");return;}
  const items=state.cart.map(id=>STORE_CONFIG.products.find(p=>p.id===id));
  $("checkoutOrderPreview").innerHTML=`<b>ملخص طلبك</b><br>${items.map((p,i)=>`${i+1}. ${escapeHtml(p.name)} — ${escapeHtml(p.price)}`).join("<br>")}`;
  $("checkoutError").hidden=true;$("checkoutFormView").hidden=false;$("checkoutSuccessView").hidden=true;
  closeCart();$("checkoutModal").classList.add("open");$("checkoutModal").setAttribute("aria-hidden","false");document.body.style.overflow="hidden";
  setTimeout(()=>$("customerName").focus(),50);
}
function closeCheckout(){
  if(state.submitting)return;
  $("checkoutModal").classList.remove("open");$("checkoutModal").setAttribute("aria-hidden","true");document.body.style.overflow="";
}
productGrid.addEventListener("click",e=>{const b=e.target.closest("[data-add]");if(!b)return;const id=b.dataset.add;if(!state.cart.includes(id)){state.cart.push(id);showToast("تمت إضافة البوت إلى طلباتك");}else showToast("هذا البوت موجود في قائمة طلباتك");updateCart();});
$("cartItems").addEventListener("click",e=>{const b=e.target.closest("[data-remove]");if(!b)return;state.cart.splice(Number(b.dataset.remove),1);updateCart();});
$("openCart").addEventListener("click",openCart);$("closeCart").addEventListener("click",closeCart);$("drawerBackdrop").addEventListener("click",closeCart);
$("sendOrder").addEventListener("click",openCheckout);
$("closeCheckout").addEventListener("click",closeCheckout);
$("finishCheckout").addEventListener("click",closeCheckout);
$("checkoutModal").addEventListener("click",e=>{if(e.target.matches("[data-close-checkout]"))closeCheckout();});
$("checkoutForm").addEventListener("submit",async e=>{
  e.preventDefault();
  if(state.submitting||!state.cart.length)return;
  const customerName=$("customerName").value.trim();
  const discordContact=$("discordContact").value.trim();
  const notes=$("orderNotes").value.trim();
  if(!customerName||!discordContact){$("checkoutError").textContent="يرجى تعبئة الاسم ووسيلة التواصل في ديسكورد.";$("checkoutError").hidden=false;return;}
  const items=state.cart.map(id=>STORE_CONFIG.products.find(p=>p.id===id)).filter(Boolean).map(p=>({id:p.id,name:p.name,category:p.categoryName,price:p.price}));
  if(!items.length){$("checkoutError").textContent="قائمة الطلب فارغة. أعد إضافة المنتجات وحاول مرة أخرى.";$("checkoutError").hidden=false;return;}
  state.submitting=true;const button=$("confirmOrder");button.disabled=true;button.innerHTML='جارٍ إرسال طلبك...';$("checkoutError").hidden=true;
  try{
    const response=await fetch(`${STORE_CONFIG.apiBaseUrl}/api/orders`,{
      method:"POST",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({customerName,discordContact,notes,items})
    });
    const result=await response.json().catch(()=>({}));
    if(!response.ok)throw new Error(result.error||"تعذر إرسال الطلب. حاول مرة أخرى أو تواصل معنا عبر الديسكورد.");
    $("successOrderId").textContent=result.orderId||"تم التسجيل";
    const invite=$("discordInviteLink");
    if(result.inviteUrl){invite.href=result.inviteUrl;invite.hidden=false;}else{invite.hidden=true;}
    $("checkoutFormView").hidden=true;$("checkoutSuccessView").hidden=false;
    state.cart=[];$("orderNotes").value="";updateCart();
  }catch(error){
    $("checkoutError").textContent=error.message||"حدث خطأ أثناء إرسال الطلب.";$("checkoutError").hidden=false;
  }finally{
    state.submitting=false;button.disabled=false;button.innerHTML='تأكيد وإرسال الطلب <span>←</span>';
  }
});
$("searchInput").addEventListener("input",e=>{state.query=e.target.value;renderProducts();});
$("filters").addEventListener("click",e=>{const b=e.target.closest("[data-filter]");if(!b)return;state.filter=b.dataset.filter;document.querySelectorAll(".filter-chip").forEach(x=>x.classList.toggle("selected",x===b));renderProducts();});
$("menuToggle").addEventListener("click",()=>$ ("mainNav").classList.toggle("open"));
document.querySelectorAll(".nav-link").forEach(a=>a.addEventListener("click",()=>$ ("mainNav").classList.remove("open")));
$("sortButton").addEventListener("click",()=>{state.filter="all";state.query="";$("searchInput").value="";document.querySelectorAll(".filter-chip").forEach(x=>x.classList.toggle("selected",x.dataset.filter==="all"));renderProducts();showToast("تم عرض جميع المنتجات");});
renderProducts();updateCart();

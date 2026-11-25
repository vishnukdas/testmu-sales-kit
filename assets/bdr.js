/* Stage 1 for BDRs, told as an interactive story.
   A play keeps its content as data (window.BDR_DATA) and calls
   BDRStage.render(el, data, aud, outreach) whenever the account type changes.
   Styles live in assets/play.css under "BDR story". Tool logos live in assets/logos/tools/. */
(function(){
var BASE=((document.currentScript&&document.currentScript.src)||'').replace(/bdr\.js.*$/,'');
var IC={
  server:'<rect x="3" y="4" width="18" height="7" rx="2"/><rect x="3" y="13" width="18" height="7" rx="2"/><path d="M7 7.5h.01M7 16.5h.01"/>',
  pin:'<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  check:'<path d="M5 12l4 4 10-10"/>',
  x:'<path d="M18 6L6 18M6 6l12 12"/>',
  bolt:'<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
  users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17.5" cy="9.5" r="2.5"/><path d="M16 14.6a5 5 0 0 1 5.5 5.4"/>',
  user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  crown:'<path d="M3 8l4 4 5-7 5 7 4-4-2 11H5z"/>',
  star:'<path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z"/>',
  flame:'<path d="M12 22c4 0 7-2.8 7-7 0-4-3-6-4-9-1 2-2 3-3.5 3.5C12 7 11 4 9 2c0 4-4 6.5-4 12 0 4.2 3 8 7 8z"/>',
  shield:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>',
  building:'<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1M10 21v-3h4v3"/>',
  globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  app:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 6.5h.01M10 6.5h.01"/>',
  gauge:'<path d="M12 14l4-4"/><path d="M3.5 18a9 9 0 1 1 17 0"/>',
  phone:'<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
  mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  voice:'<circle cx="6.5" cy="12" r="3.5"/><circle cx="17.5" cy="12" r="3.5"/><path d="M6.5 15.5h11"/>',
  chat:'<path d="M21 12a8 8 0 0 1-11.5 7.2L4 20l1-4.5A8 8 0 1 1 21 12z"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
  copy:'<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>',
  arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
  left:'<path d="M19 12H5M11 6l-6 6 6 6"/>',
  alert:'<path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/>',
  flag:'<path d="M4 22V4M4 4h13l-2 4 2 4H4"/>',
  cart:'<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.7 12.3a2 2 0 0 0 2 1.7h8.6a2 2 0 0 0 2-1.6L22 8H6"/>',
  bank:'<path d="M3 10l9-6 9 6M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 21h18"/>',
  plane:'<path d="M17.8 19.2L16 11l3.5-3.5a2.1 2.1 0 0 0-3-3L13 8 4.8 6.2l-1.3 1.3 6.5 3.5-3.5 3.5-2.5-.5L3 15l3.5 2 2 3.5 1-1-.5-2.5 3.5-3.5 3.5 6.5z"/>',
  play:'<rect x="2" y="4" width="20" height="16" rx="3"/><path d="M10 9v6l5-3z"/>',
  landmark:'<path d="M3 21h18M5 21V10M19 21V10M9 21v-6h6v6M2 10l10-6 10 6"/>',
  cloud:'<path d="M17.5 19H8a5 5 0 1 1 1-9.9A6 6 0 0 1 20 11a4 4 0 0 1-2.5 8z"/>',
  trend:'<path d="M3 17l6-6 4 4 8-8M15 7h6v6"/>',
  refresh:'<path d="M21 12a9 9 0 0 1-15.5 6.2L3 16M3 12a9 9 0 0 1 15.5-6.2L21 8M21 3v5h-5M3 21v-5h5"/>',
  calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18"/>',
  lock:'<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  pause:'<circle cx="12" cy="12" r="9"/><path d="M10 9v6M14 9v6"/>',
  target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
  hand:'<path d="M18 11V6a2 2 0 0 0-4 0v5M14 10V4a2 2 0 0 0-4 0v6M10 10.5V6a2 2 0 0 0-4 0v8a8 8 0 0 0 16 0v-3a2 2 0 0 0-4 0"/>',
  flip:'<path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5"/>',
  layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>',
  dot:'<circle cx="12" cy="12" r="3"/>'
};
function ic(n,c){return '<svg class="bi'+(c?' '+c:'')+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(IC[n]||IC.dot)+'</svg>'}
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function ph(s){return esc(s).replace(/\{([^}]+)\}/g,function(m,k){return '<span class="ph" data-ph="'+k+'">{'+k+'}</span>'})}

/* Brand logos (assets/logos/tools) and drawn pictograms. */
var TOOLS={jmeter:'JMeter',gatling:'Gatling',k6:'k6',blazemeter:'BlazeMeter',loadrunner:'LoadRunner (OpenText)',neoload:'NeoLoad (Tricentis)',linkedin:'LinkedIn',salesforce:'Salesforce',kubernetes:'Kubernetes',ec2:'Amazon EC2'};
function logo(k){
  if(TOOLS[k])return '<span class="b-lg" title="'+esc(TOOLS[k])+'"><img src="'+BASE+'logos/tools/'+k+'.svg" alt="'+esc(TOOLS[k])+'"></span>';
  if(k==='locust')return '<span class="b-lg b-txt" title="Locust">Locust</span>';
  if(k.charAt(0)==='#')return '<span class="b-kwd">'+esc(k.slice(1))+'</span>';
  if(k==='hx')return '<span class="b-lg b-hx" title="HyperExecute"><i style="--m:url('+BASE+'logos/performance-testing.svg)"></i></span>';
  if(k==='testmu')return '<span class="b-lg b-tm" title="TestMu AI">'+ic('check')+'</span>';
  return '';
}
function pg(n,c,t){return '<span class="b-pg" style="--pc:'+(c||'#3E6BF0')+'"'+(t?' title="'+esc(t)+'"':'')+'>'+ic(n)+'</span>'}
function mark(x){return x.lg?x.lg.map(logo).join(''):pg(x.pg,x.c,x.t)}

var TXT={},uid=0;
function copyBtn(text,label,cls){var id='bc'+(++uid);TXT[id]=text;return '<button type="button" class="b-copy'+(cls?' '+cls:'')+'" data-bcopy="'+id+'">'+ic('copy')+(label?'<span>'+esc(label)+'</span>':'')+'</button>'}

/* ---------- scene 1: their world, today vs with us ---------- */
function vis(v){
  if(v.lg)return '<div class="b-v logos">'+v.lg.map(logo).join('')+'</div>';
  switch(v.k){
    case 'servers':return '<div class="b-v servers"><span class="b-rack"><span></span><span></span><span></span></span>'+(v.alt?'<em>or</em>'+v.alt.map(logo).join(''):'')+'</div>';
    case 'hx':return '<div class="b-v hx">'+logo('hx')+'<span class="b-spin"></span></div>';
    case 'pins1':return '<div class="b-v map"><i style="--x:30%;--y:42%"></i></div>';
    case 'pins3':return '<div class="b-v map on"><i style="--x:22%;--y:40%"></i><i style="--x:58%;--y:30%"></i><i style="--x:74%;--y:58%"></i></div>';
    case 'late':return '<div class="b-v late">'+ic('clock')+'</div>';
    case 'chart':return '<div class="b-v chart"><svg viewBox="0 0 120 50" aria-hidden="true"><polyline class="l1" points="0,40 15,36 30,38 45,30 60,33 75,24 90,27 105,20 120,22"/><polyline class="l2" points="0,44 15,41 30,42 45,36 60,38 75,31 90,33 105,27 120,29"/><polyline class="l3" points="0,47 15,45 30,46 45,42 60,43 75,38 90,40 105,35 120,36"/></svg><span>LIVE</span></div>';
    case 'tm':return '<div class="b-v tm">'+logo('testmu')+(v.plus?'<b>+ load</b>':'')+'</div>';
    default:return '<div class="b-v">'+pg(v.k,v.c)+'</div>';
  }
}
function world(d){
  var h='';
  if(d.intro)h+='<div class="b-intro">'+d.intro.map(function(x,i){return (i?'<span class="b-ia" aria-hidden="true">'+ic('arrow')+'</span>':'')+'<div class="b-ic" style="--pc:'+x.c+'"><span class="b-pg">'+ic(x.i)+'</span><div><span class="b-sh">'+esc(x.h)+'</span><p>'+esc(x.t)+'</p></div></div>'}).join('')+'</div>';
  h+='<div class="b-world" data-ws="today">'+
    '<div class="b-switch" role="group" aria-label="Show"><button type="button" data-wsb="today" aria-pressed="true">'+esc(d.todayL||'Today')+'</button><button type="button" data-wsb="with" aria-pressed="false">'+esc(d.withL)+'</button><span class="b-taphint" aria-hidden="true">'+ic('hand')+'Tap to compare</span><span class="b-knob" aria-hidden="true"></span></div>'+
    '<div class="b-cols">'+d.cols.map(function(c,i){
      return (i?'<span class="b-link" aria-hidden="true"><i></i></span>':'')+'<div class="b-col"><span class="b-ch">'+esc(c.h)+'</span><div class="b-vw"><div class="t">'+vis(c.today)+'</div><div class="w">'+vis(c['with'])+'</div></div><p><span class="t">'+esc(c.today.t)+'</span><span class="w">'+esc(c['with'].t)+'</span></p></div>'}).join('')+'</div>'+
    '<p class="b-cap"><span class="t">'+esc(d.capToday)+'</span><span class="w">'+esc(d.capWith)+'</span></p></div>';
  if(d.who)h+='<div class="b-buyers">'+d.who.map(function(g){return '<div class="b-bg" style="--k:'+g.items.length+'"><span class="b-sh">'+esc(g.h)+'</span><div>'+g.items.map(function(x){return '<span class="b-bi">'+mark(x)+'<small>'+esc(x.t)+'</small></span>'}).join('')+'</div></div>'}).join('')+'</div>';
  if(d.dont)h+='<p class="b-never">'+ic('x')+'<b>Never say</b>'+d.dont.map(esc).join('<i></i>')+'</p>';
  return h;
}

/* ---------- scene 2: find your person ---------- */
function people(d){
  var nodes=d.nodes,sel=0;nodes.forEach(function(n,i){if(n.start)sel=i});
  function node(n,i){return '<button type="button" class="b-pn'+(n.start?' start':'')+'" data-pn="'+i+'" aria-pressed="'+(i===sel)+'" style="--tc:'+n.c+'">'+(n.start?'<span class="b-flag">'+esc(n.start)+'</span>':'')+'<span class="b-av">'+ic(n.i)+'</span><b>'+esc(n.label)+'</b><small>'+esc(n.sub)+'</small></button>'}
  var map;
  if(d.layout==='path'){
    map='<div class="b-pathmap">'+nodes.filter(function(n){return !n.side}).map(function(n){var i=nodes.indexOf(n);return (i?'<span class="b-ask">'+ic('arrow')+(nodes[i-1].ask?'<em>'+esc(nodes[i-1].ask)+'</em>':'')+'</span>':'')+node(n,i)}).join('')+'</div>'+
      nodes.filter(function(n){return n.side}).map(function(n){return '<div class="b-sidenode">'+node(n,nodes.indexOf(n))+'</div>'}).join('');
  }else{
    var main=nodes.filter(function(n){return !n.side}),side=nodes.filter(function(n){return n.side});
    map='<div class="b-tree"><div class="b-trunk">'+main.map(function(n){return node(n,nodes.indexOf(n))}).join('<span class="b-edge" aria-hidden="true"></span>')+'</div>'+
      '<div class="b-branch">'+side.map(function(n){return node(n,nodes.indexOf(n))}).join('')+
      (d.skip?'<div class="b-skipn"><span class="b-sh">'+ic('x')+'Skip</span><div>'+d.skip.map(function(t){return '<s>'+esc(t)+'</s>'}).join('')+'</div></div>':'')+'</div></div>';
  }
  var det='<div class="b-pds">'+nodes.map(function(n,i){
    return '<div class="b-pd" data-pd="'+i+'" style="--tc:'+n.c+'"'+(i===sel?'':' hidden')+'>'+
      '<div class="b-pdh"><span class="b-av">'+ic(n.i)+'</span><div><b>'+esc(n.label)+'</b><small>'+esc(n.sub)+'</small></div></div>'+
      '<div class="b-titles">'+n.titles.map(function(t){return '<span>'+esc(t)+'</span>'}).join('')+'</div>'+
      (n.worry?'<div class="b-line worry">'+ic('alert')+'<span><small>Worried about</small>'+esc(n.worry)+'</span></div>':'')+
      (n.say?'<div class="b-line say">'+ic('chat')+'<span><small>Open with</small>'+esc(n.say)+'</span></div>':'')+
      (n.search?'<div class="b-sn">'+logo('linkedin')+'<span class="b-tl">Sales Navigator search</span>'+copyBtn(n.search,'Copy')+'</div>':'')+
    '</div>'}).join('')+'</div>';
  var h='<div class="b-people'+(d.layout==='path'?' path':'')+'">'+'<div class="b-map"><p class="b-tap">'+ic('hand')+'Tap a group</p>'+map+'</div>'+det+'</div>';
  if(d.lookFor)h+='<div class="b-look"><span class="b-sh">'+ic('search')+'Look for these on their profile</span><div>'+d.lookFor.map(logo).join('')+'</div></div>';
  return h;
}

/* ---------- scene 3: is it worth a call? ---------- */
function signals(d){
  /* A guided flow: one step at a time, with the meter always in view. */
  var pre='',tabs=[],panels=[];
  if(d.amSteps)pre+='<div class="b-ladder am"><span class="b-sh">'+ic('briefcase')+'Before anyone at the customer hears from you</span><ol>'+d.amSteps.map(function(x,i){return '<li><span class="b-ln">'+(i+1)+'</span><b>'+esc(x)+'</b></li>'}).join('')+'</ol></div>';
  if(d.checks)pre+='<div class="b-pre"><span class="b-sh">'+ic('search')+esc(d.checksH||'Check the account')+'</span><div>'+d.checks.map(function(c){return '<span class="b-pc2">'+mark(c)+'<span><b>'+esc(c.t)+'</b><small>'+esc(c.d)+'</small>'+(c.w?'<em>'+esc(c.w)+'</em>':'')+'</span></span>'}).join('')+'</div></div>';
  if(d.ladder)pre+='<div class="b-ladder big"><p class="b-lq">'+ic('hand')+esc(d.ladderQ||'Which kind of account are you working on? Tap one.')+'</p><ol>'+d.ladder.map(function(x,i){return '<li><button type="button" class="b-lad" data-lad="'+i+'" aria-pressed="false" data-pick="'+esc(x.pick||'')+'" data-view="'+esc(x.view||'')+'"><span class="b-lh"><span class="b-ln">'+(i+1)+'</span><span class="b-ll">'+mark(x)+'</span><i class="b-tick">'+ic('check')+'</i></span><b>'+esc(x.t)+'</b>'+(x.note?'<small>'+esc(x.note)+'</small>':'')+'</button></li>'}).join('')+'</ol><div class="b-ladres" aria-live="polite" hidden></div><p class="b-lnote">'+ic('trend')+esc(d.ladderNote||'Numbers show the order: 1 books meetings fastest.')+'</p></div>';
  if(pre){tabs.push(d.preH||(d.amSteps?'Check the account':'Which accounts first'));panels.push(pre)}
  tabs.push(d.fitH||'Does it fit?');
  panels.push('<div class="b-tgs">'+d.fit.map(function(f,i){return '<button type="button" class="b-tg" data-fit="'+i+'" aria-pressed="false">'+mark(f)+'<span class="b-tl">'+esc(f.t)+(f.d?'<small>'+esc(f.d)+'</small>':'')+'</span><i class="b-tick">'+ic('check')+'</i></button>'}).join('')+'</div><p class="b-fitok" hidden>'+ic('check')+'It fits. Now look for a signal.</p>');
  tabs.push(d.sigH||'Spot the signal');
  panels.push(finder(d));
  var h='<div class="b-mflow" data-mp="0"><div class="b-mtop"><ol class="b-msteps">'+tabs.map(function(t,i){return '<li><button type="button" data-mgo="'+i+'" aria-selected="'+(i===0)+'"><span class="b-mn">'+(i+1)+'</span>'+esc(t)+'</button></li>'}).join('')+'</ol>'+
    '<div class="b-verdict" data-v="start"><div class="b-vt"><b></b><span></span></div><div class="b-meter"><i></i></div></div></div>'+
    '<div class="b-mpanels">'+panels.map(function(p,i){return '<div class="b-mpanel'+(i?'':' on')+'" data-mpi="'+i+'"'+(i?' aria-hidden="true"':'')+'><div class="b-mbody">'+p+'</div>'+(i<panels.length-1?'<div class="b-mnext"><button type="button" data-mgo="'+(i+1)+'">Next: '+esc(tabs[i+1])+ic('arrow')+'</button></div>':'')+'</div>'}).join('')+'</div></div>';
  return h;
}
var STR={strong:['Strong',3,'flame','Act now'],medium:['Medium',2,'trend','Two of these equal one strong'],park:['Park it',0,'pause','Note it and move on']};
function bars(n){var h='<span class="b-bars" aria-hidden="true">';for(var i=1;i<=3;i++)h+='<i class="'+(i<=n?'on':'')+'"></i>';return h+'</span>'}
function mock(l){
  if(!l)return '';
  var tags=(l.tags||[]).map(function(t){return '<span>'+esc(t)+'</span>'}).join('');
  switch(l.kind){
    case 'job':return '<div class="b-mock job"><div class="b-mh">'+logo('linkedin')+'<span><b>'+esc(l.title)+'</b><small>'+ph(l.sub||'{company}')+'</small></span><em>Job post</em></div>'+(tags?'<div class="b-mt">'+tags+'</div>':'')+(l.line?'<p>'+esc(l.line)+'</p>':'')+'</div>';
    case 'status':var bs='';for(var i=0;i<28;i++)bs+='<i class="'+(i===21||i===22?'bad':i===20||i===23?'warn':'')+'"></i>';return '<div class="b-mock status"><div class="b-mh"><span class="b-dotw"></span><span><b>'+esc(l.title)+'</b><small>'+esc(l.sub||'')+'</small></span><em>Status page</em></div><div class="b-up">'+bs+'</div></div>';
    case 'crm':return '<div class="b-mock crm"><div class="b-mh">'+logo('salesforce')+'<span><b>'+esc(l.title)+'</b><small>'+esc(l.sub||'')+'</small></span><em>Salesforce</em></div>'+(l.rows||[]).map(function(r){return '<div class="b-row2"><span>'+esc(r[0])+'</span><b>'+esc(r[1])+'</b></div>'}).join('')+'</div>';
    case 'note':return '<div class="b-mock note"><em>'+esc(l.src||'Account note')+'</em><p>'+esc(l.title)+'</p></div>';
    case 'post':return '<div class="b-mock post"><div class="b-mh"><span class="b-avt">'+ic('user')+'</span><span><b>'+esc(l.sub||'An engineer at {company}')+'</b><small>'+esc(l.src||'Blog or LinkedIn post')+'</small></span></div><p>'+esc(l.title)+'</p>'+(tags?'<div class="b-mt">'+tags+'</div>':'')+'</div>';
    case 'dash':return '<div class="b-mock crm dash"><div class="b-mh">'+pg('gauge','#3E6BF0')+'<span><b>'+esc(l.title)+'</b><small>'+esc(l.sub||'')+'</small></span><em>'+esc(l.src||'GTM dashboard')+'</em></div>'+(l.rows||[]).map(function(r){return '<div class="b-row2"><span>'+esc(r[0])+'</span><b class="'+(r[2]||'')+'">'+esc(r[1])+'</b></div>'}).join('')+'</div>';
    case 'cal':return '<div class="b-mock cal"><span class="b-cd"><small>'+esc(l.mon||'Nov')+'</small><b>'+esc(l.day||'28')+'</b></span><span><b>'+esc(l.title)+'</b><small>'+esc(l.sub||'')+'</small></span></div>';
    default:return '<div class="b-mock news"><em>'+esc(l.src||'News')+'</em><b>'+esc(l.title)+'</b>'+(l.sub?'<small>'+esc(l.sub)+'</small>':'')+'</div>';
  }
}
function finder(d){
  var all=[];['strong','medium','park'].forEach(function(k){(d[k]||[]).forEach(function(x){all.push({k:k,s:x})})});
  var list='<div class="b-slist"><div class="b-sgrps" role="tablist" aria-label="Signals">'+['strong','medium','park'].map(function(k){
    var items=all.map(function(o,i){return o.k===k?'<button type="button" role="tab" class="b-sitem '+k+'" data-si="'+i+'" aria-selected="'+(i===0)+'">'+mark(o.s)+'<span class="b-tl">'+esc(o.s.t)+'</span>'+bars(STR[k][1])+'<i class="b-seen" title="You marked this one">'+ic('check')+'</i></button>':''}).join('');
    return items?'<div class="b-sgrp '+k+(k==='strong'?' on':'')+'" data-g="'+k+'">'+items+'</div>':''}).join('')+'</div></div>';
  var tabs='<div class="b-stabs" role="tablist" aria-label="Signal strength">'+['strong','medium','park'].map(function(k){var c=(d[k]||[]).length;return c?'<button type="button" role="tab" class="'+k+'" data-sg="'+k+'" aria-selected="'+(k==='strong')+'">'+ic(STR[k][2])+STR[k][0]+'<span>'+c+'</span></button>':''}).join('')+'</div>';
  list=list.replace(/^(<div class="b-slist">)/,function(m){return m+tabs}).replace(/<\/div>$/,'<p class="b-slegend"><i>'+ic('check')+'</i>Marked as seen at your account</p></div>');
  var panes=all.map(function(o,i){var x=o.s,k=o.k,st=STR[k];
    return '<div class="b-spane '+k+(i?'':' on')+'" data-sp="'+i+'">'+
      '<div class="b-sph">'+mark(x)+'<div><b>'+esc(x.t)+'</b><span class="b-strg">'+bars(st[1])+st[0]+' · '+st[3]+'</span></div></div>'+
      '<p class="b-why2" title="'+esc(x.d)+'">'+esc(x.d)+'</p>'+
      (x.look?mock(x.look):'')+
      (x.where?'<div class="b-wrow"><span class="b-sh">'+ic('pin')+'Find it on</span><div class="b-where">'+x.where.map(function(w){return '<span>'+mark(w)+esc(w.t)+'</span>'}).join('')+'</div>'+(x.find?copyBtn(x.find,'Copy search'):'')+'</div>':'')+
      (x.say&&k!=='park'?'<p class="b-sayit">'+ic('chat')+'<span>Say it like this: <b>"'+esc(x.say)+'"</b></span></p>':'')+
      '<button type="button" class="b-isee '+k+'" data-sig="'+k+'" data-si="'+i+'" aria-pressed="false" data-d="'+esc(x.d)+'" data-say="'+esc(x.say||'')+'"><i class="b-tick">'+ic('check')+'</i><span class="b-off">'+(k==='park'?'I see this, park the account':'I see this at my account')+'</span><span class="b-onl">Marked. It counts in the meter</span></button>'+
    '</div>'}).join('');
  return '<div class="b-ssig"><div class="b-finder">'+list+'<div class="b-spanes">'+panes+'</div></div></div>';
}
function verdict(box){
  var fit=box.querySelectorAll('[data-fit][aria-pressed="true"]').length,all=box.querySelectorAll('[data-fit]').length;
  var st=box.querySelectorAll('[data-sig="strong"][aria-pressed="true"]').length,md=box.querySelectorAll('[data-sig="medium"][aria-pressed="true"]').length,pk=box.querySelectorAll('[data-sig="park"][aria-pressed="true"]').length;
  var v,b,s,pct;
  if(pk){v='park';b='Park it';s='Note it in Salesforce and move on.';pct=8}
  else if(fit===all&&(st>=1||md>=2)){v='go';b='Reach out now';s='Fits, with a signal. Next: Time it.';pct=100}
  else if(fit<all){v='fit';b=fit?'Check the rest of the fit':'Start with the fit';s=fit+' of '+all+' fit checks ticked.';pct=Math.round(fit/all*50)}
  else if(md===1){v='watch';b='Almost';s='One more medium, or one strong signal.';pct=75}
  else{v='watch';b='Fits, but no signal yet';s='Look for one strong or two medium signals.';pct=55}
  var el=box.querySelector('.b-verdict');el.dataset.v=v;el.querySelector('.b-meter i').style.transform='scaleX('+(pct/100)+')';el.querySelector('.b-vt b').textContent=b;el.querySelector('.b-vt span').textContent=s;
}

/* ---------- scene 4: time it ---------- */
var MON=['J','F','M','A','M','J','J','A','S','O','N','D'],MONL=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function span(a,cls,label){if(!a||!a.length)return '';var s=Math.min.apply(null,a),e=Math.max.apply(null,a);return '<span class="b-bar '+cls+'" style="--s:'+s+';--e:'+(e+1)+'">'+esc(label)+'</span>'}
function timing(d){
  var now=new Date().getMonth()+1;
  return '<div class="b-time" style="--now:'+now+'"><div class="b-trow head"><span></span><div class="b-track">'+MON.map(function(m,i){return '<span class="'+(i+1===now?'now':'')+'" title="'+MONL[i]+'">'+m+'</span>'}).join('')+'</div></div>'+
    d.rows.map(function(r){return '<div class="b-trow"><div class="b-tw">'+mark(r)+'<span><b>'+esc(r.who)+'</b><small>'+esc(r.peakT)+'</small></span></div><div class="b-track lane">'+(r.note?'<span class="b-bar note" style="--s:1;--e:13">'+esc(r.note)+'</span>':span(r.out,'out','Reach out')+span(r.peak,'peak','Peak'))+'<i class="b-now"></i></div></div>'}).join('')+
    '</div>'+(d.tip?'<p class="b-tip">'+ic('alert')+'<span>'+esc(d.tip)+'</span></p>':'');
}

/* ---------- scene 5: reach out ---------- */
function chan(t){t=t.toLowerCase();if(t.indexOf('voicemail')>-1)return pg('voice','#0EA5E9');if(t.indexOf('call')>-1)return pg('phone','#16A34A');if(t.indexOf('linkedin')>-1)return logo('linkedin');if(t.indexOf('email')>-1)return pg('mail','#3E6BF0');return pg('chat','#7C3AED')}
function day(o){var m=/Day\s*\d+/i.exec(o.m);return m?m[0]:(/voicemail/i.test(o.t)?'If no answer':'Day 1')}
var sigOpts=[];
function outreach(list){
  var keys=[];list.forEach(function(o){String(o.b).replace(/\{([^}]+)\}/g,function(m,k){if(keys.indexOf(k)<0)keys.push(k)})});
  var sigs=[];if(sigOpts)sigs=sigOpts;
  var mk=function(o){var a=[];String(o.b).replace(/\{([^}]+)\}/g,function(m,k){if(a.indexOf(k)<0)a.push(k)});return a};
  var first=list.length?mk(list[0]):[];
  var panel='<div class="b-fields"><div class="b-fh"><span class="b-sh">'+ic('user')+'Your details</span><span class="b-fcount" data-keys="'+esc(first.join('|'))+'"></span></div><p class="b-fsub">Only what this message needs. Pick or type, and Copy includes it.</p><div class="b-fg2">'+
    keys.map(function(k,i){var f=FIELDS[k]||{},opts=k==='signal'?sigs:(f.opts||[]);var id='bdl'+(++uid);
      return '<label class="b-fld" data-fk="'+esc(k)+'"'+(first.indexOf(k)<0?' hidden':'')+'><span>'+esc(f.label||k)+'</span><span class="b-in"><input type="text" data-field="'+esc(k)+'" list="'+id+'" placeholder="'+esc(f.hint||(opts.length?'Pick or type':'Type'))+'" autocomplete="off">'+(opts.length?ic('arrow','b-dd'):'')+'</span>'+(opts.length?'<datalist id="'+id+'">'+opts.map(function(o){return '<option value="'+esc(o)+'">'}).join('')+'</datalist>':'')+'</label>'}).join('')+
    '</div></div>';
  return panel+'<div class="b-seq">'+list.map(function(o,i){return '<button type="button" class="b-step2" data-om="'+i+'" data-keys="'+esc(mk(o).join('|'))+'" aria-pressed="'+(i===0)+'"><span class="b-day">'+esc(day(o))+'</span>'+chan(o.t)+'<b>'+esc(o.t)+'</b></button>'}).join('')+'</div>'+
    '<div class="b-msgs">'+list.map(function(o,i){return '<div class="b-msg" data-omp="'+i+'"'+(i?' hidden':'')+'><header>'+chan(o.t)+'<b>'+esc(o.t)+'</b><span class="b-mm">'+esc(o.m)+'</span>'+copyBtn(o.b,'Copy')+'</header><pre>'+ph(o.b)+'</pre></div>'}).join('')+'</div>';
}

/* ---------- scene 6: brush-offs ---------- */
function pushback(d){
  return '<div class="b-flips">'+d.items.map(function(p){return '<div class="b-fc"><button type="button" class="b-fin" aria-pressed="false"><span class="b-front"><span class="b-q">'+esc(p.say)+'</span><small>'+ic('flip')+'Tap for your reply</small></span><span class="b-back"><small>'+esc(p.means)+'</small><span class="b-r">'+esc(p.you)+'</span></span></button>'+copyBtn(p.you,'','b-fcopy')+'</div>'}).join('')+'</div>';
}

/* ---------- scene 7: qualify and book ---------- */
function qualify(d){
  var tags=[];d.qs.forEach(function(q){if(tags.indexOf(q.tests)<0)tags.push(q.tests)});
  var h='<div class="b-qmeter"><span class="b-sh">A good meeting has</span>'+tags.map(function(t){return '<span data-qt="'+esc(t)+'">'+ic('check')+esc(t)+'</span>'}).join('')+'</div>'+
  '<div class="b-qual"><div class="b-qlist"><div class="b-qhead"><span class="b-sh">Ask these five</span><span class="b-qc"><b>0</b> of '+d.qs.length+' asked</span></div>'+
    d.qs.map(function(q,i){return '<div class="b-qr"><button type="button" class="b-qb" data-q="'+i+'" data-tag="'+esc(q.tests)+'" aria-expanded="false"><i class="b-ck">'+ic('check')+'</i><span class="b-qt">'+esc(q.tests)+'</span><b>'+esc(q.q)+'</b></button><div class="b-qx" hidden>'+(q.p?'<p class="b-qp">'+ic('chat')+esc(q.p)+'</p>':'')+'<span class="g">'+ic('check')+esc(q.good)+'</span><span class="w">'+ic('alert')+esc(q.watch)+'</span></div></div>'}).join('')+'</div>'+
    '<div class="b-book">'+(d.strongest?'<div class="b-strong">'+ic('flame')+'<span><small>Strongest sign of a real deal</small>'+esc(d.strongest)+'</span></div>':'')+'<span class="b-sh">'+ic('target')+'The meeting</span><b class="b-goal">'+esc(d.goal)+'</b><ul>'+d.bookWhen.map(function(t){return '<li>'+ic('check')+esc(t)+'</li>'}).join('')+'</ul><small>'+esc(d.tag)+'</small>'+copyBtn(d.handoff,'Copy handoff note','b-big')+'</div></div>';
  return h;
}
function quiz(q){
  return '<div class="b-quiz" hidden><span class="b-sh">'+ic('star')+'Quick check</span><b class="b-qq">'+esc(q.q)+'</b><div class="b-qo">'+q.opts.map(function(o,i){return '<button type="button" data-qz="'+i+'" data-ok="'+(i===q.a?1:0)+'">'+esc(o)+'</button>'}).join('')+'</div><p class="b-qw" hidden><b class="b-qr2"></b>'+esc(q.why)+'</p></div>';
}
/* ---------- final check: questions, score, gaps ---------- */
var STEPS=[];
function exam(d){
  var n=d.qs.length,topics=[];d.qs.forEach(function(q){if(topics.indexOf(q.topic)<0)topics.push(q.topic)});
  var h='<div class="b-exam" data-res="[]">'+
    '<div class="b-ex-start"><span class="b-ex-big">'+ic('star')+'</span><b>'+esc(d.intro||(n+' quick questions on everything in this play'))+'</b><p>'+esc(d.sub||'About three minutes. You see the answer after each one, and get a plan for what to review at the end.')+'</p>'+
      '<div class="b-ex-tops">'+topics.map(function(t){return '<span>'+esc(t)+'</span>'}).join('')+'</div><button type="button" class="b-ex-go" data-exs>'+ic('play')+'Start the check</button></div>'+
    d.qs.map(function(q,i){return '<div class="b-ex-q" data-qi="'+i+'" hidden><div class="b-ex-prog"><span>Question '+(i+1)+' of '+n+'</span><span class="b-ex-tp">'+esc(q.topic)+'</span></div><div class="b-ex-bar"><i style="transform:scaleX('+(i/n)+')"></i></div>'+
      '<b class="b-ex-qq">'+esc(q.q)+'</b><div class="b-ex-opts">'+q.opts.map(function(o,j){return '<button type="button" data-exa="'+j+'" data-ok="'+(j===q.a?1:0)+'"><span class="b-ex-l">'+String.fromCharCode(65+j)+'</span><span>'+esc(o)+'</span></button>'}).join('')+'</div>'+
      '<div class="b-ex-fb" hidden><b class="b-ex-r"></b><span>'+esc(q.why)+'</span></div>'+
      '<button type="button" class="b-ex-next" data-exn hidden>'+(i<n-1?'Next question':'See my score')+ic('arrow')+'</button></div>'}).join('')+
    '<div class="b-ex-res" hidden></div></div>';
  return h;
}
function examResult(box,d){
  var res=JSON.parse(box.dataset.res||'[]'),n=d.qs.length,ok=res.filter(Boolean).length,pct=Math.round(ok/n*100);
  var by={};d.qs.forEach(function(q,i){var t=by[q.topic]||(by[q.topic]={ok:0,n:0});t.n++;if(res[i])t.ok++});
  var level=pct>=80?['go','Ready to book meetings','You know this play. Go to The moment and pick your first account.']:pct>=50?['watch','Almost there','Review the topics below, then take the check again.']:['park','Review first','Go back through the scenes below before your first call.'];
  if(d.levels){var L=pct>=80?d.levels.go:pct>=50?d.levels.watch:d.levels.park;if(L)level=[level[0],level[1],L]}
  var C=2*Math.PI*52;
  var weak=Object.keys(by).filter(function(t){return by[t].ok<by[t].n}).sort(function(a,b){return (by[a].ok/by[a].n)-(by[b].ok/by[b].n)});
  var h='<div class="b-ex-top"><div class="b-ring '+level[0]+'"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="52" class="bg"/><circle cx="60" cy="60" r="52" class="fg" style="stroke-dasharray:'+C+';stroke-dashoffset:'+C+'" data-off="'+(C*(1-ok/n))+'"/></svg><span><b>'+ok+'/'+n+'</b><small>'+pct+'%</small></span></div>'+
    '<div><span class="b-sh">Your result</span><b class="b-ex-v '+level[0]+'">'+level[1]+'</b><p>'+esc(level[2])+'</p><button type="button" class="b-ex-again" data-exr>'+ic('refresh')+'Take it again</button></div></div>'+
    '<div class="b-ex-cols"><div class="b-ex-by"><span class="b-sh">'+ic('gauge')+'By topic</span>'+Object.keys(by).map(function(t){var x=by[t],p=x.ok/x.n;return '<div class="b-ex-row"><span>'+esc(t)+'</span><span class="b-ex-tr"><i class="'+(p===1?'g':p>=.5?'m':'r')+'" style="--w:'+p+'"></i></span><b>'+x.ok+'/'+x.n+'</b></div>'}).join('')+'</div>'+
    '<div class="b-ex-focus"><span class="b-sh">'+ic('target')+(weak.length?'Focus on':'Nothing to fix')+'</span>'+
      (weak.length?weak.map(function(t){var idx=(box.closest('.b-app').__steps||[]).indexOf(t);return '<div class="b-ex-f"><div><b>'+esc(t)+'</b><p>'+esc((d.focus&&d.focus[t])||'Go back through this scene.')+'</p></div>'+(idx>-1?'<button type="button" data-bgo="'+idx+'">Review'+ic('arrow')+'</button>':'')+'</div>'}).join(''):'<p class="b-ex-ok">'+ic('check')+'Every topic is solid. Open The moment and pick your first account.</p>')+
    '</div></div>';
  var r=box.querySelector('.b-ex-res');r.innerHTML=h;r.hidden=false;
  requestAnimationFrame(function(){requestAnimationFrame(function(){var fg=r.querySelector('.fg');fg.style.strokeDashoffset=fg.dataset.off;r.classList.add('on')})});
}
/* ---------- AE / AM scenes ---------- */
function storyLink(ch,label){return '<a class="b-demo" href="'+esc((window.BDR_STORY||'../../stories/performance-testing/')+'#'+ch)+'" target="_blank" rel="noopener">'+ic('play')+esc(label)+'</a>'}
/* 1 your mission: what you receive, your goal, who is in the room, the call map */
function plan(d){
  var h='<div class="b-plan"><div class="b-hand"><span class="b-sh">'+ic('door')+esc(d.handH||'What the BDR hands you')+'</span><div class="b-note2">'+d.handoff.map(function(f){return '<span><i></i>'+esc(f)+'</span>'}).join('')+'</div></div>'+
    '<span class="b-parrow" aria-hidden="true">'+ic('arrow')+'</span>'+
    '<div class="b-goalc"><span class="b-sh">'+ic('target')+'Your goal</span><b>'+esc(d.goal)+'</b><div class="b-room"><span class="b-sh">'+ic('users')+'Who is on the call</span>'+d.room.map(function(r){return '<span class="b-rp" style="--pc:'+r.c+'">'+pg(r.i,r.c)+'<span><b>'+esc(r.t)+'</b><small>'+esc(r.s)+'</small></span></span>'}).join('')+'</div></div></div>'+
    '<div class="b-cmap"><span class="b-sh">'+ic('flag')+'Your call, step by step. Tap one to jump there.</span><ol>'+d.flow.map(function(f,i){return '<li><button type="button" data-bgo="'+f.go+'" style="--i:'+i+'"><span class="b-cn">'+(i+1)+'</span>'+ic(f.i)+'<b>'+esc(f.t)+'</b><small>'+esc(f.s)+'</small></button></li>'}).join('')+'</ol></div>';
  return h;
}
/* 2 discovery: groups as tabs, questions on the left, what to listen for on the right */
function disc(d){
  var all=[],n=0;d.groups.forEach(function(g){g.qs.forEach(function(q){all.push({g:g.n,q:q,k:++n})})});
  var tabs='<div class="b-dtabs" role="tablist">'+d.groups.map(function(g,i){return '<button type="button" role="tab" data-dg="'+g.n+'" aria-selected="'+(i===(d.start||0))+'" class="'+(g.focus?'focus':'')+(g.skip?' skip':'')+'"><span class="b-dl">'+g.n+'</span><span class="b-dt">'+esc(g.h)+'</span>'+(g.focus?'<em>Focus</em>':g.skip?'<em class="s">Skim</em>':'')+'</button>'}).join('')+'</div>';
  var lists='<div class="b-dlists">'+d.groups.map(function(g,i){var on=i===(d.start||0);return '<div class="b-dlist'+(on?' on':'')+'" data-dgl="'+g.n+'">'+all.filter(function(x){return x.g===g.n}).map(function(x,j){return '<button type="button" class="b-dq" data-dq="'+x.k+'" aria-selected="'+(on&&j===0)+'"><span class="b-dqn">'+x.k+'</span><span>'+esc(x.q.q)+'</span><i class="b-tick">'+ic('check')+'</i></button>'}).join('')+'</div>'}).join('')+'</div>';
  var first=all.filter(function(x){return x.g===d.groups[d.start||0].n})[0];
  var panes='<div class="b-dpanes">'+all.map(function(x){return '<div class="b-dpane'+(x===first?' on':'')+'" data-dp="'+x.k+'"><span class="b-dqn big">'+x.k+'</span><b>'+esc(x.q.q)+'</b><div class="b-dli"><span>'+ic('search')+'<small>Listen for</small>'+esc(x.q.l)+'</span><span>'+ic('arrow')+'<small>Points to</small>'+esc(x.q.p)+'</span></div>'+(x.q.num?'<p class="b-dnum">'+ic('alert')+'Write this number down. The business case uses it.</p>':'')+'<button type="button" class="b-dask" data-dask="'+x.k+'" aria-pressed="false"><i class="b-tick">'+ic('check')+'</i><span class="b-off">I asked this</span><span class="b-onl">Asked</span></button></div>'}).join('')+'</div>';
  return '<div class="b-dtop"><p class="b-dtip">'+ic('star')+esc(d.tip)+'</p><span class="b-dcount"><b>0</b> of '+n+' asked</span></div>'+tabs+'<div class="b-dwrap">'+lists+panes+'</div>';
}
/* 3 name the problem: pick the two or three they confirmed */
function problems(d){
  return '<div class="b-probs">'+d.items.map(function(p,i){return '<button type="button" class="b-pr" data-pr="'+i+'" aria-pressed="false" style="--pc:'+p.c+'"><span class="b-prh">'+pg(p.i,p.c)+'<i class="b-tick">'+ic('check')+'</i></span><b>'+esc(p.t)+'</b><small>'+esc(p.d)+'</small></button>'}).join('')+'</div>'+
    '<div class="b-prbar"><div class="b-prmsg" data-n="0"><b>Tap the problems the buyer confirmed</b><span>Use what you heard in discovery.</span></div><div class="b-costs"><span class="b-sh">'+ic('alert')+'What it costs them</span>'+d.costs.map(function(c){return '<span>'+esc(c)+'</span>'}).join('')+'</div></div>';
}
/* 4 map it: each problem, the HyperExecute answer, and the demo chapter to show */
function mapit(d){
  var list='<div class="b-mlist">'+d.rows.map(function(r,i){return '<button type="button" class="b-mi2" data-mr="'+i+'" aria-selected="'+(i===0)+'">'+pg(r.i,r.c)+'<span>'+esc(r.p)+'</span></button>'}).join('')+'</div>';
  var panes='<div class="b-mpanes2">'+d.rows.map(function(r,i){return '<div class="b-mpane'+(i?'':' on')+'" data-mrp="'+i+'" style="--pc:'+r.c+'"><div class="b-mflow2"><div class="b-mside bad">'+pg(r.i,'#DC2626')+'<span class="b-sh">They told you</span><b>'+esc(r.p)+'</b><small>'+esc(r.pd||'')+'</small></div><span class="b-marr" aria-hidden="true"><i></i>'+ic('arrow')+'</span><div class="b-mside good">'+logo('hx')+'<span class="b-sh">HyperExecute answer</span><b>'+esc(r.a)+'</b></div></div>'+
    (r.demo?'<div class="b-mdemo"><span class="b-sh">'+ic('play')+'Show it in the demo</span>'+r.demo.map(function(x){return storyLink(x[0],x[1])}).join('')+'</div>':'')+'</div>'}).join('')+'</div>';
  return '<p class="b-hint3">'+ic('hand')+esc(d.hint||'Lead with the row that matches the pain you heard in discovery.')+'</p><div class="b-mwrap">'+list+panes+'</div>';
}
/* 5 the competition: pick who you are up against */
function compare(d){
  var tabs='<div class="b-ctabs" role="tablist">'+d.tabs.map(function(t,i){return '<button type="button" role="tab" data-ct="'+i+'" aria-selected="'+(i===0)+'">'+(t.lg?t.lg.map(logo).join(''):pg(t.i,t.c))+'<span><b>'+esc(t.t)+'</b><small>'+esc(t.s)+'</small></span></button>'}).join('')+'</div>';
  var panes='<div class="b-cpanes">'+d.tabs.map(function(t,i){var body;
    if(t.grid)body='<div class="b-ten">'+t.grid.map(function(g,j){return '<div class="b-tn" style="--i:'+j+'"><span>'+String(j+1).padStart(2,'0')+'</span><b>'+esc(g[0])+'</b><small>'+esc(g[1])+'</small></div>'}).join('')+'</div>';
    else body='<div class="b-cvs">'+t.rows.map(function(r,j){return '<div class="b-cv" style="--i:'+j+'"><span class="them">'+ic('x')+'<span><b>'+esc(r[0])+'</b><small>'+esc(r[1])+'</small></span></span><span class="us">'+ic('check')+esc(r[2])+'</span></div>'}).join('')+'</div>';
    return '<div class="b-cpane'+(i?'':' on')+'" data-ctp="'+i+'">'+body+(t.warn?'<p class="b-cwarn">'+ic('alert')+'<span><b>Do not</b> '+esc(t.warn)+'</span></p>':'')+'</div>'}).join('')+'</div>';
  var stats='<div class="b-stats2">'+d.stats.map(function(s,i){return '<span style="--i:'+i+'"><b>'+esc(s[0])+'</b><small>'+esc(s[1])+'</small></span>'}).join('')+'</div>';
  return tabs+panes+stats;
}
/* 6 business case: sliders in, live numbers out */
function roi(d){
  var ins='<div class="b-rin"><div class="b-rcur" role="group" aria-label="Currency"><button type="button" data-cur="USD" aria-pressed="true">USD $</button><button type="button" data-cur="INR" aria-pressed="false">INR ₹</button></div>'+d.inputs.map(function(x){return '<label class="b-rs"><span class="b-rl"><b>'+esc(x.t)+'</b><output data-ro="'+x.id+'"></output></span><input type="range" data-r="'+x.id+'" min="'+x.min+'" max="'+x.max+'" step="'+x.step+'" value="'+x.v+'" data-fmt="'+(x.f||'')+'"><small title="'+esc(x.ask)+'">'+ic('chat')+'<span>Ask: '+esc(x.ask)+'</span></small></label>'}).join('')+'</div>';
  var outs='<div class="b-rout"><div class="b-rbig"><span><small>Load testing costs them today</small><b data-rv="now">0</b></span><span class="g"><small>Saved and risk avoided, per year</small><b data-rv="save">0</b></span><span class="n"><small>Net benefit after HyperExecute</small><b data-rv="net">0</b></span></div>'+
    '<div class="b-rkpi"><span><small>ROI</small><b data-rv="roi">0</b></span><span><small>Payback</small><b data-rv="pay">0</b></span></div>'+
    '<div class="b-rbars">'+['Load servers no longer kept','Engineer time on the rig','Separate load tool removed','Peak incidents avoided','HyperExecute performance testing'].map(function(l,i){return '<div class="b-rbar'+(i===4?' neg':'')+'" data-rb="'+i+'"><span>'+esc(l)+'</span><i><em></em></i><b></b></div>'}).join('')+'</div>'+
    '<div class="b-rsum"><span class="b-sh">'+ic('mail')+'Summary for the proposal</span>'+copyBtn('','Copy','b-rcopy')+'</div><p class="b-rformula">'+esc(d.formula)+'</p></div>';
  return '<p class="b-hint3">'+ic('hand')+esc(d.hint)+'</p><div class="b-roi" data-cur="USD">'+ins+outs+'</div>';
}
function roiCalc(box,d){
  var g=function(id){var e=box.querySelector('[data-r="'+id+'"]');return e?parseFloat(e.value)||0:0};
  var inr=box.dataset.cur==='INR',sym=inr?'₹':'$',loc=inr?'en-IN':'en-US',fx=1;
  var m=function(n){return (n<0?'-':'')+sym+Math.round(Math.abs(n)).toLocaleString(loc)};
  box.querySelectorAll('[data-r]').forEach(function(e){var o=box.querySelector('[data-ro="'+e.dataset.r+'"]'),v=parseFloat(e.value),f=e.dataset.fmt;o.textContent=f==='money'?m(v*fx):f==='pct'?v+'%':v.toLocaleString(loc)});
  var rig=g('srv')*g('srvCost')*fx*12,hrs=g('hours')*g('rate')*fx*12,red=Math.min(g('red'),100)/100,tool=g('tool')*fx,risk=g('inc')*fx*g('incN'),q=g('quote')*fx;
  var now=rig+hrs+tool,save=rig+hrs*red+tool+risk,net=save-q;
  var set=function(k,v){box.querySelector('[data-rv="'+k+'"]').textContent=v};
  set('now',m(now));set('save',m(save));set('net',m(net));set('roi',q?Math.round(net/q*100)+'%':'Add the quote');set('pay',(q&&save)?(q/(save/12)<1?'Under 1 month':(q/(save/12)).toFixed(1)+' months'):'Add the quote');
  box.querySelector('.b-rbig .n').classList.toggle('neg',net<0);
  var rows=[rig,hrs*red,tool,risk,q],mx=Math.max.apply(null,rows.concat([1]));
  rows.forEach(function(v,i){var b=box.querySelector('[data-rb="'+i+'"]');b.querySelector('em').style.transform='scaleX('+(v/mx)+')';b.querySelector('b').textContent=(i===4?'-':'')+m(v)});
  var co=VALS.company||'{company}';
  var txt='Load testing at '+co+' costs about '+m(now)+' a year today: '+m(rig)+' in load servers, '+m(hrs)+' in engineer time maintaining them'+(tool?', and '+m(tool)+' for a separate load testing tool':'')+'.\n\nWith HyperExecute performance testing, load generators exist only while a test runs. Based on your figures, that saves about '+m(save-risk)+' a year'+(risk?', plus about '+m(risk)+' in peak-day incidents avoided':'')+'.\n\nAgainst a HyperExecute cost of '+m(q)+' a year, the net benefit is about '+m(net)+(q&&save?', with payback in '+box.querySelector('[data-rv="pay"]').textContent.toLowerCase()+'.':'.');
  var cb=box.querySelector('.b-rcopy');if(cb)TXT[cb.dataset.bcopy]=txt;
}
/* 7 the proposal: fill in what you heard, get a plan, risks and a recap email */
function proposal(d){
  var chipset=function(key,opts,multi){return '<div class="b-pchips" data-pk="'+key+'"'+(multi?' data-multi="1"':'')+'>'+opts.map(function(o,i){return '<button type="button" data-pv="'+esc(o.v)+'" aria-pressed="'+(!!o.on)+'">'+(o.lg?o.lg.map(logo).join(''):'')+esc(o.t)+'</button>'}).join('')+'</div>'};
  var ins='<div class="b-pin">'+
    '<div class="b-prow2"><label class="b-fld"><span>Company</span><span class="b-in"><input type="text" data-field="company" placeholder="Type"></span></label><label class="b-fld"><span>Contact first name</span><span class="b-in"><input type="text" data-field="name" placeholder="Type"></span></label></div>'+
    '<div class="b-prow2"><label class="b-rs"><span class="b-rl"><b>Peak concurrent users</b><output data-po="users"></output></span><input type="range" data-pr2="users" min="100" max="20000" step="100" value="'+d.users+'"></label>'+
    '<label class="b-rs"><span class="b-rl"><b>Longest test, hours</b><output data-po="hours"></output></span><input type="range" data-pr2="hours" min="0.25" max="10" step="0.25" value="'+d.hours+'"></label></div>'+
    '<div class="b-pg2"><span class="b-sh">Load from</span>'+chipset('multi',[{t:'One region',v:'no',on:1},{t:'Several regions',v:'yes'}])+'</div>'+
    '<div class="b-pg2"><span class="b-sh">Tools they use</span>'+chipset('tools',[{t:'JMeter',v:'JMeter',lg:['jmeter'],on:1},{t:'Gatling',v:'Gatling',lg:['gatling']},{t:'k6',v:'k6',lg:['k6']},{t:'LoadRunner',v:'LoadRunner',lg:['loadrunner']},{t:'Locust',v:'Locust'}],1)+'</div>'+
    '<div class="b-pg2"><span class="b-sh">Where they run today</span>'+chipset('today',[{t:'Own servers',v:'self',on:1},{t:'BlazeMeter',v:'BlazeMeter',lg:['blazemeter']},{t:'Another SaaS',v:'saas'},{t:'Not yet',v:'none'}])+'</div>'+
    '<div class="b-pg2"><span class="b-sh">Problems they confirmed</span>'+chipset('pains',d.pains.map(function(p){return {t:p[1],v:p[0]}}),1)+'</div>'+
    '<label class="b-fld"><span>Deadline that drives it</span><span class="b-in"><input type="text" data-field="deadline" list="bdl-dead" placeholder="Pick or type">'+ic('arrow','b-dd')+'</span><datalist id="bdl-dead">'+d.deadlines.map(function(x){return '<option value="'+esc(x)+'">'}).join('')+'</datalist></label></div>';
  var outs='<div class="b-pout"><div class="b-tiers">'+['Free to start','Basic','Pro','Enterprise'].map(function(t){return '<span data-tier="'+t+'">'+esc(t)+'</span>'}).join('')+'</div><div class="b-prec"></div><div class="b-pflags"></div>'+
    '<div class="b-msg b-pmail"><header>'+pg('mail','#3E6BF0')+'<b>Recap email after the call</b><span class="b-mm"></span>'+copyBtn('','Copy','b-pcopy')+'</header><pre></pre></div></div>';
  return '<div class="b-prop">'+ins+outs+'</div><p class="b-plimit">'+ic('alert')+esc(d.limits)+'</p>';
}
function propCalc(box,d,aud){
  var sel=function(k){return [].map.call(box.querySelectorAll('[data-pk="'+k+'"] [aria-pressed="true"]'),function(b){return b.dataset.pv})};
  var users=parseFloat(box.querySelector('[data-pr2="users"]').value),hrs=parseFloat(box.querySelector('[data-pr2="hours"]').value);
  box.querySelector('[data-po="users"]').textContent=users.toLocaleString('en-US');box.querySelector('[data-po="hours"]').textContent=hrs+' h';
  var multi=sel('multi')[0]==='yes',tools=sel('tools'),today=sel('today')[0]||'self',pains=sel('pains');
  var plan,why;
  if(users>8000||hrs>6){plan='Enterprise';why='Above Pro limits of 8,000 users or 6 hours.'}
  else if(users>2000||hrs>2){plan='Pro';why='Up to 8,000 users and 6-hour runs.'}
  else if(users>100||hrs>40/60){plan='Basic';why='Up to 2,000 users and 2-hour runs.'}
  else{plan='Free to start';why='100 users for 40 minutes is enough to prove their plans run.'}
  box.querySelectorAll('[data-tier]').forEach(function(t){t.classList.toggle('on',t.dataset.tier===plan)});
  var gens=Math.ceil(users/2000);
  var li=['<li>'+esc(why)+'</li>','<li>About '+gens.toLocaleString('en-US')+' JMeter generator'+(gens>1?'s':'')+' for '+users.toLocaleString('en-US')+' users at the 2,000-per-generator planning cap.</li>'];
  if(multi)li.push('<li>Split users across regions by percentage with the Total Load Distribution override on. Works on this plan.</li>');
  li.push(aud==='ex'?'<li>Existing customer: the account team adds performance testing to their current TestMu contract.</li>':'<li>Offer the Free plan first so their engineer can upload one plan before the POC.</li>');
  box.querySelector('.b-prec').innerHTML='<span class="b-sh">'+ic('target')+'Starting plan</span><b>'+esc(plan)+'</b><ul>'+li.join('')+'</ul>';
  var f=[];
  if(tools.indexOf('Locust')>-1)f.push(['b','Locust is not supported. Only move ahead if they also have JMeter, Gatling or k6 scripts.']);
  if(tools.indexOf('LoadRunner')>-1)f.push(['w','LoadRunner scripts do not run as they are. Scope a rebuild of the top journeys in JMeter or k6 with the SE before proposing.']);
  if(tools.indexOf('k6')>-1)f.push(['w','k6 runs through hyperexecute.yaml and the CLI. Check their k6 version in the dry run.']);
  if(tools.indexOf('JMeter')>-1)f.push(['','JMeter runs from the portal and can be scheduled with Workflows. Validate any Plugins Manager components in the dry run.']);
  if(today==='BlazeMeter')f.push(['w','Moving from BlazeMeter: export run history and baselines before the contract ends. Private Locations map to static IPs through support.']);
  if(today==='none')f.push(['w','No load testing today. Confirm they have scripts or someone to write them, or this stays in Stage 2.']);
  if(pains.indexOf('rare')>-1&&tools.length&&tools.every(function(t){return t==='JMeter'}))f.push(['','For JMeter, CI gating is not available from the CLI. Position nightly runs with Workflows instead.']);
  if(!pains.length)f.push(['b','No confirmed problem yet. Go back to discovery before proposing.']);
  box.querySelector('.b-pflags').innerHTML='<span class="b-sh">'+ic('alert')+'Raise with the SE</span>'+f.map(function(x){return '<div class="b-pf '+x[0]+'">'+ic(x[0]==='b'?'x':x[0]==='w'?'alert':'check')+'<span>'+esc(x[1])+'</span></div>'}).join('');
  var co=VALS.company||'{company}',nm=VALS.name||'{name}',dl=VALS.deadline||'{deadline}';
  var good=tools.filter(function(t){return t!=='Locust'&&t!=='LoadRunner'});var toolTxt=good.length?good.join(', ').replace(/, ([^,]*)$/,' and $1'):'your';
  var t='Subject: load testing at '+co+': next steps\n\nHi '+nm+',\n\nThanks for the time today. What I heard:\n'+(pains.length?pains.map(function(p){return '- '+d.heard[p]}).join('\n'):'- {what you heard}')+'\n\nHow HyperExecute helps:\n'+(pains.length?pains.map(function(p){return '- '+d.value[p]}).join('\n'):'- {value}')+'\n\n'+(aud==='ex'?'This runs under the TestMu account your team already uses, with the same login and credentials.':'Your '+toolTxt+' scripts run as they are.')+'\n\nProposed next step: a POC on one of your plans at '+users.toLocaleString('en-US')+' users '+(multi?'from several regions':'from one region')+', compared with your current p90, throughput and error rate, finished before '+dl+'.\n\nCould you share the plan and your last results, and confirm who from your team will join the setup call?\n\nThanks,\n{you}';
  box.querySelector('.b-pmail pre').innerHTML=ph(t);box.querySelector('.b-pmail .b-mm').textContent=plan+' · '+users.toLocaleString('en-US')+' users';
  var cb=box.querySelector('.b-pcopy');if(cb)TXT[cb.dataset.bcopy]=t;
}
/* 8 close: the one line, the low-risk path, the commercial path, the gate to Stage 3 */
function closeit(d){
  var h='<div class="b-close"><div class="b-pitch"><span class="b-sh">'+ic('chat')+'Close with one line</span><q>'+esc(d.line)+'</q><p>'+esc(d.lineSub)+'</p>'+copyBtn(d.line,'Copy line','b-light')+'<div class="b-lowrisk">'+d.path.map(function(p,i){return '<span style="--i:'+i+'"><b>'+(i+1)+'</b>'+esc(p)+'</span>'}).join('')+'</div></div>'+
    '<div class="b-gate2"><span class="b-sh">'+ic('flag')+'Ready for Stage 3? Tick what is true</span>'+d.move.map(function(m,i){return '<button type="button" class="b-gt" data-gt="'+i+'" aria-pressed="false"><i class="b-tick">'+ic('check')+'</i><span>'+esc(m)+'</span></button>'}).join('')+
      '<div class="b-gres" data-ok="0"><b class="no">'+ic('pause')+'Stay in Stage 2</b><b class="yes">'+ic('check')+'Hand it to the SE. Book the POC.</b><small class="no">'+esc(d.stay)+'</small><small class="yes">'+esc(d.go)+'</small></div></div></div>';
  if(d.paths)h+='<div class="b-cpath"><span class="b-sh">'+ic('briefcase')+'Pick the commercial path with the AM</span><div>'+d.paths.map(function(p,i){return '<button type="button" class="b-cp" data-cp="'+i+'" aria-pressed="false"><b>'+esc(p.t)+'</b><small><em>When:</em> '+esc(p.when)+'</small><small class="b-cpw"><em>Propose:</em> '+esc(p.what)+'</small></button>'}).join('')+'</div></div>';
  return h;
}
var R={plan:plan,disc:disc,problems:problems,map:mapit,compare:compare,roi:roi,proposal:proposal,close:closeit,exam:exam,world:world,people:people,signals:signals,timing:timing,pushback:pushback,qualify:qualify};

/* ---------- shell ---------- */
var VALS={},FIELDS={},APPS=[];
try{VALS=JSON.parse(localStorage.getItem('bdr-fields')||'{}')||{}}catch(e){VALS={}}
function saveVals(){try{localStorage.setItem('bdr-fields',JSON.stringify(VALS))}catch(e){}}
function fillText(t){return String(t).replace(/\{([^}]+)\}/g,function(m,k){return VALS[k]?VALS[k]:m})}
/* Write the BDR's values into every placeholder on the page, and keep the inputs in step. */
function fillSignal(el){
  el.querySelectorAll('.ph[data-ph]').forEach(function(x){var k=x.dataset.ph,v=VALS[k];x.textContent=v||'{'+(FIELDS[k]&&FIELDS[k].short||k)+'}';x.classList.toggle('filled',!!v)});
  el.querySelectorAll('input[data-field]').forEach(function(i){if(document.activeElement!==i)i.value=VALS[i.dataset.field]||''});
  el.querySelectorAll('.b-fcount').forEach(function(c){var ks=c.dataset.keys.split('|'),n=ks.filter(function(k){return VALS[k]}).length;c.textContent=n+' of '+ks.length+' filled'});
}
function render(el,data,aud,out){
  if(!el||!data)return;
  var D=data[aud]||data.new;if(data.fields)for(var fk in data.fields)FIELDS[fk]=data.fields[fk];if(el.__cur==null)el.__cur=0;
  var steps=D.steps;if(el.__cur>=steps.length)el.__cur=0;el.__steps=steps.map(function(x){return x.label});el.__D=D;
  var h='<div class="b-mission"><span class="b-mi">'+ic('target')+'</span><div><span class="kicker">'+esc(D.kicker||'Stage 1 · Your mission')+'</span><h2>'+esc(D.mission)+'</h2></div></div>'+
    '<ol class="b-journey" role="tablist" aria-label="Scenes" style="--n:'+steps.length+'"><span class="b-rail" aria-hidden="true"><i></i></span>'+steps.map(function(s,i){return '<li><button type="button" role="tab" data-bs="'+i+'"><span class="b-dot">'+ic(s.icon||'dot')+'</span><span class="b-jl">'+esc(s.label)+'</span></button></li>'}).join('')+'</ol>';
  steps.forEach(function(s,i){
    if(s.type==='signals'){sigOpts=[];['strong','medium'].forEach(function(k){(s[k]||[]).forEach(function(x){if(x.say)sigOpts.push(x.say)})})}
    var body=s.type==='outreach'?outreach(out||[]):R[s.type](s);
    h+='<section class="b-scene" data-bp="'+i+'" data-type="'+s.type+'" hidden><header class="b-sh2"><div><span class="b-no">'+(i+1)+'/'+steps.length+'</span><h3>'+esc(s.title)+'</h3>'+(s.cap?'<p>'+esc(s.cap)+'</p>':'')+'</div>'+'<div class="b-hbtns">'+(s.quiz?'<button type="button" class="b-quizb" aria-expanded="false">'+ic('star')+'Quick check</button>':'')+(s.coach?'<button type="button" class="b-coachb" aria-expanded="false">'+ic('user')+'Coach\'s tip</button>':'')+'</div></header>'+
      (s.coach?'<div class="b-coach" hidden><span class="b-cav">'+ic('user')+'</span><p>'+esc(s.coach)+'</p></div>':'')+(s.quiz?quiz(s.quiz):'')+body+
      '<nav class="b-nav">'+(i?'<button type="button" class="b-prev" data-bgo="'+(i-1)+'" aria-label="Back to '+esc(steps[i-1].label)+'">'+ic('left')+'</button>':'<span></span>')+
      (s.type==='exam'?'<span></span>':i<steps.length-1?'<button type="button" class="b-next" data-bgo="'+(i+1)+'">'+esc(steps[i+1].label)+ic('arrow')+'</button>':'<span class="b-done">'+ic('check')+esc(D.doneText||'Done. Go book your first meeting.')+'</span>')+'</nav></section>';
  });
  el.innerHTML=h;el.classList.add('b-app');el.dataset.bview=aud;el.hidden=false;
  el.querySelectorAll('[data-bp]').forEach(function(p){p.querySelectorAll(STAG).forEach(function(x,j){x.style.setProperty('--i',j)})});
  el.querySelectorAll('.b-bar').forEach(function(x,j){x.style.setProperty('--j',j)});
  /* keep a clean copy of every scene, so a scene starts fresh each time it is opened */
  el.__tpl={};el.querySelectorAll('[data-bp]').forEach(function(p){el.__tpl[p.dataset.bp]=p.outerHTML});if(APPS.indexOf(el)<0)APPS.push(el);
  fillSignal(el);
  el.querySelectorAll('[data-bp]').forEach(function(sc){initScene(el,sc)});
  go(el,el.__cur,false);
  if(!el.dataset.wired){el.dataset.wired='1';wire(el)}
}
var STAG='.b-ex-start,.b-ex-tops span,.b-world,.b-col,.b-bg,.b-never,.b-pn,.b-edge,.b-skipn,.b-pd,.b-look,.b-ladder li,.b-pc2,.b-tg,.b-sgrp,.b-spanes,.b-verdict,.b-trow,.b-tip,.b-step2,.b-msg,.b-fc,.b-qmeter,.b-qr,.b-book,.b-quiz,.b-fillnote';
var SEEN={};
function enter(p){
  p.classList.remove('enter');void p.offsetWidth;p.classList.add('enter');
  var k=(p.closest('.b-app').id||'')+'|'+p.dataset.bp+'|'+p.closest('.b-app').dataset.bview;if(SEEN[k])return;SEEN[k]=1;
  if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  /* first visit: play a short demo so the scene explains itself */
  var w=p.querySelector('.b-world');
  var fc=p.querySelector('.b-fc');if(fc)setTimeout(function(){fc.classList.add('peek');setTimeout(function(){fc.classList.remove('peek')},900)},1200);
}
function initScene(el,sc){
  var st=el.__D&&el.__D.steps[+sc.dataset.bp];if(!st)return;
  if(st.type==='signals')verdict(sc);
  var rb=sc.querySelector('.b-roi');if(rb)roiCalc(rb,st);
  var pb=sc.querySelector('.b-prop');if(pb)propCalc(pb,st,el.dataset.bview);
}
function refresh(el){el.querySelectorAll('[data-bp]').forEach(function(sc){if(!sc.hidden)initScene(el,sc)})}
function resetScene(el,i){
  var old=el.querySelector('[data-bp="'+i+'"]'),tpl=el.__tpl&&el.__tpl[i];if(!old||!tpl)return;
  var box=document.createElement('div');box.innerHTML=tpl;var fresh=box.firstElementChild;fresh.hidden=old.hidden;old.replaceWith(fresh);
  if(fresh.dataset.type==='signals'&&VALS.__sigMark){delete VALS.signal;delete VALS.__sigMark;saveVals()}
  fillSignal(el);initScene(el,fresh);
}
function go(el,i,scroll){
  if(i!==el.__cur)resetScene(el,i);
  el.__cur=i;var n=el.querySelectorAll('[data-bp]').length;
  el.querySelectorAll('[data-bp]').forEach(function(p){p.hidden=+p.dataset.bp!==i;if(!p.hidden)enter(p)});
  el.querySelectorAll('[data-bs]').forEach(function(b){var k=+b.dataset.bs;b.setAttribute('aria-selected',String(k===i));b.classList.toggle('past',k<i);b.tabIndex=k===i?0:-1});
  var r=el.querySelector('.b-rail i');if(r)r.style.transform='scaleX('+(n>1?i/(n-1):0)+')';
  if(scroll){var s=el.querySelector('.b-journey');if(s)s.scrollIntoView({block:'start',behavior:'smooth'})}
}
function wire(el){
  el.addEventListener('click',function(e){
    var t=e.target.closest('[data-bs],[data-bgo],[data-om],[data-bcopy],[data-wsb],[data-pn],[data-fit],[data-sig],.b-fin,[data-q],.b-coachb,.b-quizb,[data-qz],.b-sitem,[data-mgo],[data-sg],[data-lad],[data-switch],[data-dg],[data-dq],[data-dask],[data-pr],[data-mr],[data-ct],[data-cur],[data-pv],[data-gt],[data-cp],[data-exs],[data-exr],[data-exa],[data-exn]');if(!t)return;
    if(t.hasAttribute('data-exs')||t.hasAttribute('data-exr')){var bx=t.closest('.b-exam');bx.dataset.res='[]';bx.querySelector('.b-ex-start').hidden=true;bx.querySelector('.b-ex-res').hidden=true;bx.querySelector('.b-ex-res').classList.remove('on');
      bx.querySelectorAll('.b-ex-q').forEach(function(q,i){q.hidden=i!==0;q.querySelectorAll('[data-exa]').forEach(function(b){b.className='';b.disabled=false});q.querySelector('.b-ex-fb').hidden=true;q.querySelector('[data-exn]').hidden=true;q.classList.remove('done')});return}
    if(t.dataset.exa!=null){var q=t.closest('.b-ex-q');if(q.classList.contains('done'))return;q.classList.add('done');var right=t.dataset.ok==='1';
      q.querySelectorAll('[data-exa]').forEach(function(b){b.disabled=true;b.classList.add(b.dataset.ok==='1'?'right':(b===t?'wrong':'dim'))});
      var fb=q.querySelector('.b-ex-fb');fb.hidden=false;fb.className='b-ex-fb '+(right?'ok':'no');fb.querySelector('.b-ex-r').textContent=right?'Correct. ':'Not quite. ';
      var bx2=t.closest('.b-exam'),rs=JSON.parse(bx2.dataset.res||'[]');rs[+q.dataset.qi]=right;bx2.dataset.res=JSON.stringify(rs);q.querySelector('[data-exn]').hidden=false;return}
    if(t.hasAttribute('data-exn')){var q2=t.closest('.b-ex-q'),bx3=t.closest('.b-exam'),nx=bx3.querySelector('.b-ex-q[data-qi="'+(+q2.dataset.qi+1)+'"]');q2.hidden=true;
      if(nx)nx.hidden=false;else{var st=el.__D.steps.filter(function(x){return x.type==='exam'})[0];examResult(bx3,st)}
      bx3.scrollIntoView({block:'nearest',behavior:'smooth'});return}
    if(t.classList.contains('b-quizb')){var oq=t.getAttribute('aria-expanded')!=='true';t.setAttribute('aria-expanded',String(oq));t.closest('.b-scene').querySelector('.b-quiz').hidden=!oq;return}
    if(t.classList.contains('b-coachb')){var op=t.getAttribute('aria-expanded')!=='true';t.setAttribute('aria-expanded',String(op));t.closest('.b-scene').querySelector('.b-coach').hidden=!op;return}
    if(t.dataset.qz!=null){var qb=t.closest('.b-quiz');if(qb.dataset.done)return;qb.dataset.done='1';qb.querySelectorAll('[data-qz]').forEach(function(b){b.classList.add(b.dataset.ok==='1'?'right':(b===t?'wrong':'dim'))});var w=qb.querySelector('.b-qw');w.hidden=false;w.querySelector('.b-qr2').textContent=t.dataset.ok==='1'?'Right. ':'Not quite. ';qb.classList.add(t.dataset.ok==='1'?'ok':'no');return}
    if(t.dataset.bcopy){copy(t);return}
    if(t.dataset.bs!=null){go(el,+t.dataset.bs,false);return}
    if(t.dataset.bgo!=null){go(el,+t.dataset.bgo,true);return}
    if(t.dataset.om!=null){var sc=t.closest('.b-scene');sc.querySelectorAll('[data-om]').forEach(function(b){b.setAttribute('aria-pressed',String(b===t))});sc.querySelectorAll('[data-omp]').forEach(function(p){p.hidden=p.dataset.omp!==t.dataset.om});
      /* show only the fields this message uses */
      var need=(t.dataset.keys||'').split('|').filter(Boolean),fc=sc.querySelector('.b-fcount');
      sc.querySelectorAll('[data-fk]').forEach(function(l){var show=need.indexOf(l.dataset.fk)>-1,was=!l.hidden;l.hidden=!show;if(show&&!was){l.classList.remove('b-in-up');void l.offsetWidth;l.classList.add('b-in-up')}});
      if(fc){fc.dataset.keys=need.join('|')}var fs=sc.querySelector('.b-fields');if(fs)fs.hidden=!need.length;fillSignal(el);return}
    if(t.dataset.wsb){var w=t.closest('.b-world');w.dataset.ws=t.dataset.wsb;w.dataset.touched='1';w.querySelectorAll('[data-wsb]').forEach(function(b){b.setAttribute('aria-pressed',String(b===t))});return}
    if(t.dataset.pn!=null){var pp=t.closest('.b-scene');pp.querySelectorAll('[data-pn]').forEach(function(b){b.setAttribute('aria-pressed',String(b===t))});pp.querySelectorAll('[data-pd]').forEach(function(p){p.hidden=p.dataset.pd!==t.dataset.pn});return}
    var scn=t.closest('.b-scene');
    if(t.dataset.dg){scn.querySelectorAll('[data-dg]').forEach(function(b){b.setAttribute('aria-selected',String(b===t))});scn.querySelectorAll('[data-dgl]').forEach(function(l){var on=l.dataset.dgl===t.dataset.dg;l.classList.toggle('on',on);l.classList.remove('b-in-up');if(on){void l.offsetWidth;l.classList.add('b-in-up')}});var fq=scn.querySelector('[data-dgl="'+t.dataset.dg+'"] [data-dq]');if(fq)fq.click();return}
    if(t.dataset.dq){scn.querySelectorAll('[data-dq]').forEach(function(b){b.setAttribute('aria-selected',String(b===t))});scn.querySelectorAll('[data-dp]').forEach(function(p){var on=p.dataset.dp===t.dataset.dq;p.classList.toggle('on',on);p.classList.remove('b-in-r');if(on){void p.offsetWidth;p.classList.add('b-in-r')}});return}
    if(t.dataset.dask){var on3=t.getAttribute('aria-pressed')!=='true';t.setAttribute('aria-pressed',String(on3));var dq=scn.querySelector('[data-dq="'+t.dataset.dask+'"]');if(dq)dq.classList.toggle('asked',on3);scn.querySelector('.b-dcount b').textContent=scn.querySelectorAll('.b-dask[aria-pressed="true"]').length;return}
    if(t.dataset.pr!=null){t.setAttribute('aria-pressed',String(t.getAttribute('aria-pressed')!=='true'));var c=scn.querySelectorAll('[data-pr][aria-pressed="true"]').length,mg=scn.querySelector('.b-prmsg');mg.dataset.n=c>3?'many':c?'ok':'0';
      mg.innerHTML=c>3?'<b>'+c+' picked: too many</b><span>Pick the two or three that hurt most. Do not read all six.</span>':c?'<b>'+c+' picked. Lead with these</b><span>Next, map each one to HyperExecute.</span>':'<b>Tap the problems the buyer confirmed</b><span>Use what you heard in discovery.</span>';return}
    if(t.dataset.mr!=null){scn.querySelectorAll('[data-mr]').forEach(function(b){b.setAttribute('aria-selected',String(b===t))});scn.querySelectorAll('[data-mrp]').forEach(function(p){var on=p.dataset.mrp===t.dataset.mr;p.classList.toggle('on',on);p.classList.remove('b-in-r');if(on){void p.offsetWidth;p.classList.add('b-in-r')}});return}
    if(t.dataset.ct!=null){scn.querySelectorAll('[data-ct]').forEach(function(b){b.setAttribute('aria-selected',String(b===t))});scn.querySelectorAll('[data-ctp]').forEach(function(p){var on=p.dataset.ctp===t.dataset.ct;p.classList.toggle('on',on);p.classList.remove('b-in-up');if(on){void p.offsetWidth;p.classList.add('b-in-up')}});return}
    if(t.dataset.cur){var rb=t.closest('.b-roi');if(rb.dataset.cur!==t.dataset.cur){var st2=el.__D.steps[+scn.dataset.bp],k2=t.dataset.cur==='INR'?(st2.inr||80):1/(st2.inr||80);
      /* money sliders move in the chosen currency: rescale range, step and value */
      rb.querySelectorAll('input[data-fmt="money"]').forEach(function(x){var v=parseFloat(x.value)*k2;x.max=Math.round(parseFloat(x.max)*k2);x.step=Math.max(1,Math.round(parseFloat(x.step)*k2));x.value=Math.round(v)})}
      rb.dataset.cur=t.dataset.cur;rb.querySelectorAll('[data-cur]').forEach(function(b){b.setAttribute('aria-pressed',String(b===t))});initScene(el,scn);return}
    if(t.dataset.pv!=null){var grp=t.closest('[data-pk]');if(grp.dataset.multi)t.setAttribute('aria-pressed',String(t.getAttribute('aria-pressed')!=='true'));else grp.querySelectorAll('[data-pv]').forEach(function(b){b.setAttribute('aria-pressed',String(b===t))});initScene(el,scn);return}
    if(t.dataset.gt!=null){t.setAttribute('aria-pressed',String(t.getAttribute('aria-pressed')!=='true'));var all2=scn.querySelectorAll('[data-gt]').length,on4=scn.querySelectorAll('[data-gt][aria-pressed="true"]').length,gr=scn.querySelector('.b-gres');var was=gr.dataset.ok;gr.dataset.ok=on4===all2?'1':'0';if(gr.dataset.ok==='1'&&was!=='1'){gr.classList.remove('pop');void gr.offsetWidth;gr.classList.add('pop')}return}
    if(t.dataset.cp!=null){scn.querySelectorAll('[data-cp]').forEach(function(b){b.setAttribute('aria-pressed',String(b===t))});return}
    if(t.dataset.lad!=null){var lw=t.closest('.b-ladder');lw.querySelectorAll('[data-lad]').forEach(function(b){b.setAttribute('aria-pressed',String(b===t))});
      var rs=lw.querySelector('.b-ladres'),v=t.dataset.view,curv=el.dataset.bview;
      rs.className='b-ladres '+(v&&v!==curv?'sw':'ok');
      rs.innerHTML=ic(v&&v!==curv?'refresh':'check')+'<p>'+esc(t.dataset.pick)+'</p>'+(v&&v!==curv?'<button type="button" data-switch="'+esc(v)+'">'+ic('arrow')+(v==='ex'?'Switch to Existing customer':'Switch to New logo')+'</button>':'');
      rs.hidden=false;rs.classList.remove('b-in-up');void rs.offsetWidth;rs.classList.add('b-in-up');return}
    if(t.dataset.switch){var want=t.dataset.switch,done=false;
      /* inside the role page: flip its toggle so both stay in step; on its own, flip the play's toggle */
      try{if(window.parent!==window){var pb=window.parent.document.querySelector('[data-a="'+want+'"]');if(pb){pb.click();done=true}}}catch(x){}
      if(!done){var own=document.getElementById(want==='ex'?'audEx':'audNew');if(own)own.click()}return}
    if(t.dataset.mgo!=null){var fl=t.closest('.b-mflow'),to=+t.dataset.mgo,from=+fl.dataset.mp;fl.dataset.mp=to;
      fl.querySelectorAll('.b-msteps [data-mgo]').forEach(function(b){var k=+b.dataset.mgo;b.setAttribute('aria-selected',String(k===to));b.classList.toggle('past',k<to)});
      fl.querySelectorAll('[data-mpi]').forEach(function(p){var k=+p.dataset.mpi,on=k===to;p.classList.toggle('on',on);if(on)p.removeAttribute('aria-hidden');else p.setAttribute('aria-hidden','true');p.classList.remove('b-in-r','b-in-l');if(on){void p.offsetWidth;p.classList.add(to>=from?'b-in-r':'b-in-l')}});
      var tp=fl.querySelector('.b-mtop');if(tp&&tp.getBoundingClientRect().top<0)tp.scrollIntoView({block:'start',behavior:'smooth'});return}
    if(t.dataset.sg){var fd=t.closest('.b-finder');fd.querySelectorAll('[data-sg]').forEach(function(b){b.setAttribute('aria-selected',String(b===t))});
      fd.querySelectorAll('[data-g]').forEach(function(g){var on=g.dataset.g===t.dataset.sg;g.classList.toggle('on',on);g.classList.remove('b-in-up');if(on){void g.offsetWidth;g.classList.add('b-in-up')}});
      var first=fd.querySelector('[data-g="'+t.dataset.sg+'"] .b-sitem');if(first)first.click();return}
    if(t.classList.contains('b-sitem')){var f=t.closest('.b-finder');f.querySelectorAll('.b-sitem').forEach(function(b){b.setAttribute('aria-selected',String(b===t))});f.querySelectorAll('[data-sp]').forEach(function(p){var on=p.dataset.sp===t.dataset.si;p.classList.toggle('on',on);p.classList.remove('b-in-r');if(on){void p.offsetWidth;p.classList.add('b-in-r')}});if(window.innerWidth<=860){var pn=f.querySelector('[data-sp="'+t.dataset.si+'"]');if(pn)pn.scrollIntoView({block:'start',behavior:'smooth'})}return}
    if(t.dataset.fit!=null||t.dataset.sig){
      t.setAttribute('aria-pressed',String(t.getAttribute('aria-pressed')!=='true'));
      var sc2=t.closest('.b-scene');
      if(t.dataset.sig){var on=t.getAttribute('aria-pressed')==='true',li=sc2.querySelector('.b-sitem[data-si="'+t.dataset.si+'"]');if(li)li.classList.toggle('seen',on);
        if(on&&t.dataset.say&&t.dataset.sig!=='park'){VALS.signal=t.dataset.say;VALS.__sigMark=1}else if(!on&&VALS.signal===t.dataset.say)delete VALS.signal;saveVals();fillSignal(el)}
      verdict(sc2);
      var fl2=sc2.querySelector('.b-mflow');if(fl2){var all=sc2.querySelectorAll('[data-fit]').length,on2=sc2.querySelectorAll('[data-fit][aria-pressed="true"]').length,ok=sc2.querySelector('.b-fitok');if(ok)ok.hidden=on2!==all;var nb=t.closest('.b-mpanel')&&t.closest('.b-mpanel').querySelector('.b-mnext button');if(nb&&t.dataset.fit!=null)nb.classList.toggle('ready',on2===all)}
      return;
    }
    if(t.classList.contains('b-fin')){t.setAttribute('aria-pressed',String(t.getAttribute('aria-pressed')!=='true'));t.parentNode.classList.toggle('flipped');return}
    if(t.dataset.q!=null){
      var open=t.getAttribute('aria-expanded')!=='true';t.setAttribute('aria-expanded',String(open));t.nextElementSibling.hidden=!open;t.classList.add('asked');
      var sc3=t.closest('.b-scene');sc3.querySelector('.b-qc b').textContent=sc3.querySelectorAll('.b-qb.asked').length;
      sc3.querySelectorAll('[data-qt]').forEach(function(m){var all=sc3.querySelectorAll('.b-qb[data-tag="'+m.dataset.qt+'"]'),done=sc3.querySelectorAll('.b-qb.asked[data-tag="'+m.dataset.qt+'"]');m.classList.toggle('on',all.length>0&&done.length===all.length)});return;
    }
  });
  el.addEventListener('input',function(e){
    var rg=e.target.closest&&e.target.closest('input[data-r],input[data-pr2]');if(rg){initScene(el,rg.closest('.b-scene'));return}
    var i=e.target.closest&&e.target.closest('input[data-field]');if(!i)return;var v=i.value.trim();if(v)VALS[i.dataset.field]=v;else delete VALS[i.dataset.field];if(i.dataset.field==='signal')delete VALS.__sigMark;saveVals();fillSignal(el);refresh(el)});
  el.addEventListener('click',function(e){var p=e.target.closest&&e.target.closest('.ph[data-ph]');if(!p)return;var sc=p.closest('.b-scene'),i=sc&&sc.querySelector('input[data-field="'+p.dataset.ph+'"]');if(i){i.focus();i.scrollIntoView({block:'center',behavior:'smooth'})}});
  el.addEventListener('keydown',function(e){
    if(!e.target.closest('.b-journey'))return;if(e.key!=='ArrowRight'&&e.key!=='ArrowLeft')return;
    var n=el.querySelectorAll('[data-bs]').length,i=(el.__cur+(e.key==='ArrowRight'?1:-1)+n)%n;go(el,i,false);el.querySelector('[data-bs="'+i+'"]').focus();e.preventDefault();
  });
}
function copy(t){
  var txt=fillText(TXT[t.dataset.bcopy]||''),lab=t.querySelector('span'),old=lab?lab.textContent:'';
  var done=function(){t.classList.add('done');t.querySelector('svg').outerHTML=ic('check');if(lab)lab.textContent='Copied';setTimeout(function(){t.classList.remove('done');t.querySelector('svg').outerHTML=ic('copy');if(lab)lab.textContent=old},1500)};
  var fb=function(){var ta=document.createElement('textarea');ta.value=txt;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();try{document.execCommand('copy');done()}catch(x){}ta.remove()};
  try{navigator.clipboard.writeText(txt).then(done,fb)}catch(x){fb()}
}
/* resetCurrent: start the open scene fresh (the role page calls it when a product is shown again) */
window.BDRStage={render:render,resetCurrent:function(){APPS.forEach(function(a){if(!a.isConnected||a.closest('[hidden]'))return;resetScene(a,a.__cur);var p=a.querySelector('[data-bp="'+a.__cur+'"]');if(p){p.hidden=false;enter(p)}})}};
})();

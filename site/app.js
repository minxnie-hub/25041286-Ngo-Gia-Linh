
(() => {
  const root=document.documentElement;
  const finishLoad=()=>root.classList.add('site-ready');
  if(document.readyState==='complete') setTimeout(finishLoad,160); else window.addEventListener('load',()=>setTimeout(finishLoad,160),{once:true});

  const menuBtn=document.querySelector('.menu-button');
  const drawer=document.querySelector('.menu-drawer');
  const closeMenu=()=>{if(!menuBtn||!drawer)return;menuBtn.setAttribute('aria-expanded','false');drawer.classList.remove('open');drawer.setAttribute('aria-hidden','true');document.body.classList.remove('menu-open')};
  if(menuBtn&&drawer){menuBtn.addEventListener('click',()=>{const open=menuBtn.getAttribute('aria-expanded')!=='true';menuBtn.setAttribute('aria-expanded',String(open));drawer.classList.toggle('open',open);drawer.setAttribute('aria-hidden',String(!open));document.body.classList.toggle('menu-open',open)});drawer.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()})}

  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.08,rootMargin:'0px 0px -6%'});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

  document.querySelectorAll('a[href]').forEach(link=>link.addEventListener('click',e=>{
    const href=link.getAttribute('href');
    if(!href||href.startsWith('#')||href.startsWith('mailto:')||link.target==='_blank'||e.metaKey||e.ctrlKey||e.shiftKey)return;
    const url=new URL(link.href,location.href);
    if(url.origin!==location.origin)return;
    if(url.pathname===location.pathname&&url.hash)return;
    e.preventDefault(); closeMenu(); root.classList.add('is-leaving'); setTimeout(()=>location.href=link.href,360);
  }));

  const canvas=document.querySelector('.eraser-canvas');
  if(canvas){
    const ctx=canvas.getContext('2d',{alpha:true});
    let last=null, dpr=1;
    const paint=()=>{
      const rect=canvas.getBoundingClientRect(); dpr=Math.min(window.devicePixelRatio||1,2);
      canvas.width=Math.max(1,Math.floor(rect.width*dpr)); canvas.height=Math.max(1,Math.floor(rect.height*dpr));
      ctx.setTransform(dpr,0,0,dpr,0,0); ctx.globalCompositeOperation='source-over';
      ctx.fillStyle='#06384a';ctx.fillRect(0,0,rect.width,rect.height);
      ctx.fillStyle='rgba(143,194,220,.14)';
      for(let y=28;y<rect.height;y+=56){for(let x=(y/56%2)*28;x<rect.width;x+=56){ctx.beginPath();ctx.arc(x,y,1.5,0,Math.PI*2);ctx.fill()}}
      ctx.globalCompositeOperation='destination-out';ctx.lineCap='round';ctx.lineJoin='round';ctx.lineWidth=Math.max(84,Math.min(140,rect.width*.095));last=null;
    };
    const erase=(x,y)=>{ctx.beginPath();if(last){ctx.moveTo(last.x,last.y);ctx.lineTo(x,y)}else{ctx.moveTo(x-1,y);ctx.lineTo(x,y)}ctx.stroke();last={x,y}};
    const point=e=>{const r=canvas.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top}};
    canvas.addEventListener('pointerenter',e=>{canvas.setPointerCapture?.(e.pointerId);const p=point(e);erase(p.x,p.y)});
    canvas.addEventListener('pointermove',e=>{const p=point(e);erase(p.x,p.y)});
    canvas.addEventListener('pointerleave',()=>last=null);
    canvas.addEventListener('pointerdown',e=>{const p=point(e);erase(p.x,p.y)});
    let rt;window.addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(paint,120)});paint();
  }

  const lightbox=document.querySelector('.lightbox');
  if(lightbox){const img=lightbox.querySelector('img');const close=()=>{lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');img.removeAttribute('src')};document.querySelectorAll('.image-zoom img').forEach(el=>el.parentElement.addEventListener('click',()=>{img.src=el.src;img.alt=el.alt;lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false')}));lightbox.querySelector('button').addEventListener('click',close);lightbox.addEventListener('click',e=>{if(e.target===lightbox)close()});document.addEventListener('keydown',e=>{if(e.key==='Escape')close()})}
})();


(function(){
  const root=document.documentElement;
  const key="vrushank-theme";

  function applyTheme(theme){
    const next=theme==="light"?"light":"dark";
    root.dataset.theme=next;
    const btn=document.querySelector("[data-theme-toggle]");
    if(btn){
      btn.textContent=next==="light"?"☾":"☀";
      btn.title=next==="light"?"Switch to dark mode":"Switch to light mode";
      btn.setAttribute("aria-label",btn.title);
    }
  }
  try { applyTheme(localStorage.getItem(key)||"light"); } catch(e){ applyTheme("light"); }

  document.addEventListener("click",function(event){
    const themeButton=event.target.closest("[data-theme-toggle]");
    if(themeButton){
      const next=root.dataset.theme==="light"?"dark":"light";
      try{ localStorage.setItem(key,next); }catch(e){}
      applyTheme(next);
    }
    const menuButton=event.target.closest("[data-menu-toggle]");
    if(menuButton){
      const nav=document.querySelector("[data-nav]");
      const open=nav && nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded",String(!!open));
    }
    const navLink=event.target.closest("[data-nav-link]");
    if(navLink){
      const nav=document.querySelector("[data-nav]");
      if(nav)nav.classList.remove("open");
      const menuButton=document.querySelector("[data-menu-toggle]");
      if(menuButton)menuButton.setAttribute("aria-expanded","false");
    }
  });

  function wireSearch(id, selector, emptyId){
    const input=document.getElementById(id);
    if(!input)return;
    const items=[...document.querySelectorAll(selector)];
    const empty=document.getElementById(emptyId);
    input.addEventListener("input",function(){
      const q=input.value.trim().toLowerCase();
      let count=0;
      items.forEach(item=>{
        const visible=!q || item.dataset.search.toLowerCase().includes(q);
        item.hidden=!visible;
        if(visible)count++;
      });
      if(empty)empty.style.display=count?"none":"block";
    });
  }
  wireSearch("projectSearch",".project","projectEmpty");
  wireSearch("blogSearch",".post","blogEmpty");
})();

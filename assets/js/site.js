
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
  const viewHost=document.querySelector("[data-view-host]");
  const homeView=document.querySelector('[data-view="home"]');
  const resumeMain=document.querySelector(".resume-main");
  const viewCache={};

  if(resumeMain && homeView){
    resumeMain.style.height=resumeMain.offsetHeight+"px";
  }

  let scrollTimer;
  if(viewHost){
    viewHost.addEventListener("scroll",function(){
      viewHost.classList.add("is-scrolling");
      clearTimeout(scrollTimer);
      scrollTimer=setTimeout(function(){
        viewHost.classList.remove("is-scrolling");
      },700);
    });
  }

  async function loadView(view){
    if(!viewHost || !homeView)return;
    if(view==="home"){
      viewHost.hidden=true;
      viewHost.innerHTML="";
      homeView.hidden=false;
      window.scrollTo({top:0,behavior:"smooth"});
      return;
    }
    const url=view+".html";
    viewHost.hidden=false;
    homeView.hidden=true;
    viewHost.innerHTML='<div class="view-loading">Loading '+(view==="projects"?"systems":"engineering notes")+'…</div>';
    try{
      if(!viewCache[view]){
        const response=await fetch(url);
        if(!response.ok)throw new Error("Unable to load view");
        const documentText=await response.text();
        const parsed=new DOMParser().parseFromString(documentText,"text/html");
        const content=parsed.querySelector(".subpage");
        if(!content)throw new Error("View content is missing");
        viewCache[view]=content.innerHTML;
      }
      viewHost.innerHTML='<button class="view-back" type="button" data-view-target="home">← Overview</button>'+viewCache[view];
      wireSearch(view==="projects"?"projectSearch":"blogSearch",view==="projects"?".project":".post",view==="projects"?"projectEmpty":"blogEmpty");
      window.scrollTo({top:0,behavior:"smooth"});
    }catch(error){
      viewHost.innerHTML='<div class="view-error">This section could not be loaded right now.</div>';
    }
  }

  document.addEventListener("click",function(event){
    const viewButton=event.target.closest("[data-view-target]");
    if(viewButton){
      event.preventDefault();
      loadView(viewButton.dataset.viewTarget);
    }
  });
  wireSearch("projectSearch",".project","projectEmpty");
  wireSearch("blogSearch",".post","blogEmpty");
})();

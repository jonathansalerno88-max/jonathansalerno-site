/* Phones: a wide figure is shown as panels stacked one under the other.
   An <svg data-stack="x,y,w,h; x,y,w,h; …"> lists its panels as viewBox
   rectangles; data-stack-main says which one the original svg keeps (default 0).
   The other panels are live copies (<use>) of the same drawing, so they follow
   every change the figure's script makes. Only the original receives the
   pointer, so anything draggable belongs in the main panel. */
(function(){
  var NS='http://www.w3.org/2000/svg', MQ=matchMedia('(max-width:600px)'), all=[];
  Array.prototype.forEach.call(document.querySelectorAll('svg[data-stack]'), function(svg, i){
    var full=svg.getAttribute('viewBox'),
        rects=svg.getAttribute('data-stack').split(';').map(function(s){return s.trim();}).filter(Boolean),
        main=+(svg.getAttribute('data-stack-main')||0),
        g=document.createElementNS(NS,'g'), copies=[];
    g.id='stk'+i;
    while(svg.firstChild) g.appendChild(svg.firstChild);
    svg.appendChild(g);
    /* keep anything the figure later adds to the svg inside the copied group */
    new MutationObserver(function(){
      if(g.parentNode!==svg) svg.appendChild(g);
      Array.prototype.slice.call(svg.childNodes).forEach(function(n){if(n!==g) g.appendChild(n);});
    }).observe(svg,{childList:true});
    rects.forEach(function(r,k){
      if(k===main) return;
      var s=document.createElementNS(NS,'svg'), u=document.createElementNS(NS,'use');
      s.setAttribute('viewBox',r); s.setAttribute('class','stk'); s.setAttribute('aria-hidden','true');
      u.setAttribute('href','#'+g.id); s.appendChild(u);
      copies.push({k:k,el:s});
    });
    all.push(function(on){
      copies.forEach(function(c){if(c.el.parentNode) c.el.parentNode.removeChild(c.el);});
      if(on){
        svg.setAttribute('viewBox',rects[main]); svg.classList.add('stk');
        copies.forEach(function(c){
          if(c.k<main) svg.parentNode.insertBefore(c.el,svg);
        });
        var after=svg.nextSibling;
        copies.forEach(function(c){
          if(c.k>main) svg.parentNode.insertBefore(c.el,after);
        });
      }else{
        svg.setAttribute('viewBox',full); svg.classList.remove('stk');
      }
    });
  });
  function apply(){all.forEach(function(f){f(MQ.matches);});}
  apply();
  if(MQ.addEventListener) MQ.addEventListener('change',apply); else if(MQ.addListener) MQ.addListener(apply);
})();

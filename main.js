// Minimal JS: mobile nav toggle, year injection, smooth-scroll
document.addEventListener('DOMContentLoaded',function(){
  var navToggle=document.getElementById('navToggle');
  var nav=document.getElementById('nav');
  navToggle&&navToggle.addEventListener('click',function(){
    if(nav.style.display==='flex'){nav.style.display='none'}else{nav.style.display='flex';nav.style.flexDirection='column'}
  });

  // Smooth anchor scroll for browsers that support it
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor){
    anchor.addEventListener('click',function(e){
      var target=document.querySelector(this.getAttribute('href'));
      if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'});}
    });
  });

  // Insert current year
  var y=document.getElementById('year');if(y) y.textContent=new Date().getFullYear();
});

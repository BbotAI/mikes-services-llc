// Load images from assets.json
async function loadAssets() {
  try {
    const response = await fetch('./assets.json');
    const assets = await response.json();
    
    // Populate all images with data-image attributes
    document.querySelectorAll('[data-image]').forEach(img => {
      const imagePath = img.getAttribute('data-image');
      const imageUrl = getNestedProperty(assets, imagePath);
      
      if (imageUrl) {
        img.src = imageUrl;
        img.style.display = 'block';
      }
    });
    
    // Show logo if it exists
    const logoImg = document.getElementById('headerLogo');
    if (logoImg && assets.logo) {
      logoImg.src = assets.logo;
      logoImg.style.display = 'inline-block';
    }
  } catch (error) {
    console.warn('Could not load assets.json:', error);
    // Site still works with fallback local images
  }
}

// Helper to get nested object properties (e.g., "services.septic" -> assets.services.septic)
function getNestedProperty(obj, path) {
  return path.split('.').reduce((current, prop) => current?.[prop], obj);
}

document.addEventListener('DOMContentLoaded',function(){
  // Load images from config
  loadAssets();
  
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

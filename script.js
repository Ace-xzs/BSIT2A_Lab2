document.addEventListener('DOMContentLoaded',function(){
  const form = document.getElementById('registerForm');

  function showError(el,msg){
    // el may be input or checkbox; locate nearest .error
    const container = el.closest('.field') || el.parentElement;
    const span = container && container.querySelector('.error');
    if(span) span.textContent = msg || '';
    el.classList.toggle('invalid', !!msg);
  }

  function validate(){
    let ok = true;
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const first = document.getElementById('firstName');
    if(!first.value.trim()){ showError(first,'First name is required'); ok=false } else showError(first,'');

    const last = document.getElementById('lastName');
    if(!last.value.trim()){ showError(last,'Last name is required'); ok=false } else showError(last,'');

    const email = document.getElementById('email');
    if(!email.value.trim()){ showError(email,'Email is required'); ok=false }
    else if(!emailRe.test(email.value)){ showError(email,'Enter a valid email'); ok=false }
    else showError(email,'');

    const pwd = document.getElementById('password');
    if(pwd.value.length < 8){ showError(pwd,'Password must be at least 8 characters'); ok=false } else showError(pwd,'');

    const cp = document.getElementById('confirmPassword');
    if(cp.value !== pwd.value){ showError(cp,'Passwords do not match'); ok=false } else showError(cp,'');

    const dob = document.getElementById('dob');
    if(!dob.value){ showError(dob,'Date of birth is required'); ok=false } else showError(dob,'');

    const terms = document.getElementById('terms');
    if(!terms.checked){ showError(terms, 'You must accept the terms'); ok=false } else showError(terms,'');

    return ok;
  }

  form.addEventListener('submit',function(e){
    e.preventDefault();
    const ok = validate();
    if(!ok) return;
    const data = {
      firstName: document.getElementById('firstName').value.trim(),
      lastName: document.getElementById('lastName').value.trim(),
      email: document.getElementById('email').value.trim()
    };
    try{ localStorage.setItem('demo_registration', JSON.stringify(data)) }catch(_){}
    form.querySelector('.success').hidden = false;
    form.reset();
  });
});

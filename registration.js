const shareBtn = document.getElementById('whatsappShare');
const shareCount = document.getElementById('shareCount');
const form = document.getElementById('registrationForm');
const submitBtn = document.getElementById('submitBtn');
const successMessage = document.getElementById('successMessage');
let shareClicks = 0;
const maxShares = 5;

function updateShareCount() {
    shareCount.textContent = `Click count: ${shareClicks}/${maxShares}`;
}

function disableFormAndShowSuccess() {
    if (form) Array.from(form.elements).forEach(el => el.disabled = true);
    if (submitBtn) submitBtn.disabled = true;
    if (shareBtn) shareBtn.disabled = true;
    // Redirect to new success page
    window.location.href = 'submission-success.html';
}

// On page load, check if already submitted
if (localStorage.getItem('tfg_registration_submitted')) {
    disableFormAndShowSuccess();
} else {
    shareBtn.addEventListener('click', () => {
        if (shareClicks >= maxShares) return;
        const message = encodeURIComponent('Hey Buddy, Join Tech For Girls Community');
        const url = `https://wa.me/?text=${message}`;
        window.open(url, '_blank');
        shareClicks++;
        updateShareCount();
        if (shareClicks === maxShares) {
            shareBtn.disabled = true;
            shareCount.textContent = 'Sharing complete. Please continue.';
        }
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (shareClicks < maxShares) {
            alert('Please complete WhatsApp sharing (5/5) before submitting.');
            return;
        }
        // Collect form data
        const formData = new FormData(form);
        // Here you would send formData to a server if needed
        // For demo, just show the success message and disable form
        localStorage.setItem('tfg_registration_submitted', 'true');
        disableFormAndShowSuccess();
    });

    updateShareCount();
} 
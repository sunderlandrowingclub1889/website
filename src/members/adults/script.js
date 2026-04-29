document.addEventListener('DOMContentLoaded', function() {
  const coachImages = [
    'Chris_1.webp',
    'Chris_2.webp',
    'Chris_3.webp',
    'Chris_4.webp',
    'Chris_5.webp',
    'Chris_6.webp',
    'Chris_7.webp',
    'Chris_8.webp'
  ];

  const coachImageElement = document.getElementById('coach-image');
  if (coachImageElement) {
    const randomImage = coachImages[Math.floor(Math.random() * coachImages.length)];
    coachImageElement.src = `/assets/members/coaches/${randomImage}`;
  }
});

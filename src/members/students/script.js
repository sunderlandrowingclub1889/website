document.addEventListener('DOMContentLoaded', function() {
  const coachImages = [
    'Steve_1.webp',
    'Steve_2.webp',
    'Steve_3.webp',
    'Steve_4.webp',
    'Steve_5.webp',
    'Steve_6.webp',
    'Steve_7.webp',
    'Steve_8.webp',
    'Steve_9.webp'
  ];

  const coachImageElement = document.getElementById('coach-image');
  if (coachImageElement) {
    const randomImage = coachImages[Math.floor(Math.random() * coachImages.length)];
    coachImageElement.src = `/assets/members/coaches/${randomImage}`;
  }
});

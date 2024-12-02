export function playSound(type: 'correct' | 'incorrect') {
  const audioPath = type === 'correct' ? '/sonidos/correcto.mp3' : '/sonidos/incorrecto.mp3';
  const audio = new Audio(audioPath);

  // Ajustar el volumen (por ejemplo, al 50%)
  audio.volume = 0.3;  // Ajusta este valor según el nivel de volumen que desees

  audio.play().catch((error) => {
    console.error('Error reproduciendo el audio:', error);
  });
}

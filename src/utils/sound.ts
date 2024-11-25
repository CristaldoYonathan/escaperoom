export function playSound(type: 'correct' | 'incorrect') {
  const audioPath = type === 'correct' ? '/sonidos/correcto.mp3' : '/sonidos/incorrecto.mp3';
  const audio = new Audio(audioPath);
  audio.play().catch((error) => {
    console.error('Error reproduciendo el audio:', error);
  });
}

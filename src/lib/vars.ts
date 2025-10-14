/** 
 * - Common vars file, that WILL be injected into the `fe` AND `be` build, anything imported into this file will too!
 * - 🚨 Do not put secret information into this file, use the `.env` file for that please
 */


export const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })


export const emojis = ['🚨', '🌹', '❤️', '🔥', '😎', '👷‍♀️', '🙏', '🎄', '✅', '💚', '🐛', '🦋', '🐬', '🌸', '🪷']


export const fortunes = [
  { id: 1, text: 'Love flows to you today' },
  { id: 2, text: 'Kindness is your superpower' },
  { id: 3, text: 'Your inner light guides the way' },
  { id: 4, text: 'Every breath you take is a gift' },
  { id: 5, text: 'Bright ideas sprout in calm minds' },
  { id: 6, text: 'Peace grows when you breathe deeply' },
  { id: 7, text: 'Compassion opens doors to new joys' },
  { id: 8, text: 'A shared smile bridges distant hearts' },
  { id: 9, text: 'Your presence brings comfort and peace' },
  { id: 10, text: 'Your wisdom guides you gently forward' },
  { id: 11, text: 'A kind word from you will yield kindness in return' },
  { id: 12, text: 'Joy comes to those who smile gently at the world' },
  { id: 13, text: 'Your heart is a wellspring of endless compassion' },
  { id: 14, text: 'An inspiring idea will brighten your day' },
  { id: 15, text: 'A small act of kindness today changes tomorrow' },
  { id: 16, text: 'A gentle breeze brings fresh opportunities' },
  { id: 17, text: 'Happiness finds you when you embrace gratitude' },
  { id: 18, text: 'Your courage inspires those around you' },
  { id: 19, text: 'A heartfelt laugh is the best medicine' },
  { id: 20, text: 'Peace blossoms where patience takes root' },
  { id: 21, text: 'Your creative spark will ignite something beautiful' },
  { id: 22, text: 'New friendships bloom with an open heart' },
  { id: 23, text: 'A moment of stillness brings profound clarity' },
  { id: 24, text: 'Your intuition guides you toward fulfilling paths' },
  { id: 25, text: 'Every challenge hides a seed of growth' },
  { id: 26, text: 'A fresh start awaits your bold step' },
  { id: 27, text: 'Your generosity returns to you a hundredfold' },
  { id: 28, text: 'A focused mind makes powerful strides' },
  { id: 29, text: 'Let your dreams be bigger than your fears' },
  { id: 30, text: 'Today is a perfect day for a joyful discovery' },
]

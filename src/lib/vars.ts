/** 
 * - Common vars file, that WILL be injected into the `fe` AND `be` build
 * - 🚨 Do not put secret information into this file, use the `.env` file for that please
 */


import { Enums } from '@ace/enums'


export const elementEnums = new Enums(['fire', 'water', 'air', 'earth'])


export const characters = {
  air: [ 'Tenzin', 'Pema', 'Appa', 'Opal', 'Kai', 'Jinora' ],
  fire: [ 'Zuko', 'Azula', 'Iroh', 'Ty Lee', 'Mai', 'Ozai' ],
  earth: [ 'Toph', 'Lin', 'Suki', 'Suyin', 'Kuvira', 'Bumi' ],
  water: [ 'Sokka', 'Katara', 'Yue', 'Kya', 'Amon', 'Gran Gran' ],
} as const


export const fortunes = [
  'Kindness is your superpower',
  'Your inner light guides the way',
  'Every breath you take is a gift',
  'Your laughter spreads sunshine',
  'A shared smile bridges distant hearts',
  'Peace grows when you breathe deeply',
  'Your presence brings comfort and peace',
  'Your wisdom guides you gently forward',
  'Bright ideas sprout in calm minds',
  'Compassion opens doors to new joys',
  'A kind word from you will yield kindness in return',
  'Joy comes to those who smile gently at the world',
  'Your heart is a wellspring of endless compassion',
  'An inspiring idea will brighten your day',
  'Love flows to you today',
  'A small act of kindness today changes tomorrow',
  'Your light illuminates their path',
  'A gentle breeze brings fresh opportunities',
  'Happiness finds you when you embrace gratitude',
  'Your courage inspires those around you',
  'A heartfelt laugh is the best medicine',
  'Peace blossoms where patience takes root',
  'Your creative spark will ignite something beautiful',
  'New friendships bloom with an open heart',
  'A moment of stillness brings profound clarity',
  'Your intuition guides you toward fulfilling paths',
  'Every challenge hides a seed of growth',
  'A fresh start awaits your bold step',
  'Your generosity returns to you a hundredfold'
] as const

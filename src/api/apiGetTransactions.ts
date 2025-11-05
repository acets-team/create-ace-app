import { API } from '@ace/api'
import { msDay } from '@ace/ms'
import { date2Iso } from '@ace/date2Iso'
import { dateShift } from '@ace/dateShift'
import type { Transaction } from '@src/lib/types'


export const GET = new API('/api/get-transactions', 'apiGetTransactions')
  .resolve(async (scope) => {
    return scope.success(
      getTransactions()
    )
  })


function getTransactions(): Transaction[] {
  return [
    { id: 1, date: getDate(msDay * -1), description: 'Groceries 🥦', amount: -85.50 },
    { id: 2, date: getDate(msDay * -2), description: 'Yoga Membership 🧘‍♂️', amount: -45.00 },
    { id: 3, date: getDate(msDay * -3), description: 'Freelance Project 💻', amount: 3000.00 },
    { id: 4, date: getDate(msDay * -4), description: 'Matcha 🍵', amount: -4.75 },
    { id: 5, date: getDate(msDay * -5), description: 'Dinner Out 🍝', amount: -62.30 },
    { id: 6, date: getDate(msDay * -6), description: 'Gas ⛽️', amount: -48.00 },
    { id: 7, date: getDate(msDay * -7), description: 'Sponsorship 💰', amount: 6000.00 },
    { id: 8, date: getDate(msDay * -8), description: 'Streaming Premium 🎬', amount: -30 },
    { id: 9, date: getDate(msDay * -9), description: 'Groceries 🛒', amount: -93.20 },
    { id: 10, date: getDate(msDay * -10), description: 'Book Purchase 📚', amount: -18.50 },
    { id: 11, date: getDate(msDay * -11), description: 'Online Course 🎓', amount: -7.99 },
    { id: 12, date: getDate(msDay * -12), description: 'Car Wash 🚗', amount: -15.00 },
    { id: 13, date: getDate(msDay * -13), description: 'Gifts 🧸', amount: -36.45 },
    { id: 14, date: getDate(msDay * -14), description: 'Tutor Time 📓', amount: 60.00 },
    { id: 15, date: getDate(msDay * -15), description: 'Donation 💖', amount: -30.00 },
  ]
}



function getDate(shift: number) {
  return date2Iso(dateShift(shift))
}

import { gets, posts } from '@ace/apis'
import type { APIEvent } from '@ace/types'
import { onAPIEvent } from '@ace/onAPIEvent'


export async function GET(event: APIEvent) {
  'use server'
  return await onAPIEvent(event, gets)
}


export async function POST(event: APIEvent) {
  'use server'
  return await onAPIEvent(event, posts)
}

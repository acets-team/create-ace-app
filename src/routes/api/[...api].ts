import type { APIEvent } from '@ace/types'
import { onAPIEvent } from '@ace/onAPIEvent'
import { regexApiGets } from '@ace/regexApiGets'
import { regexApiPuts } from '@ace/regexApiPuts'
import { regexApiPosts } from '@ace/regexApiPosts'
import { regexApiDeletes } from '@ace/regexApiDeletes'


export async function GET(event: APIEvent) {
  'use server'
  return await onAPIEvent(event, regexApiGets)
}


export async function POST(event: APIEvent) {
  'use server'
  return await onAPIEvent(event, regexApiPosts)
}


export async function PUT(event: APIEvent) {
  'use server'
  return await onAPIEvent(event, regexApiPuts)
}


export async function DELETE(event: APIEvent) {
  'use server'
  return await onAPIEvent(event, regexApiDeletes)
}

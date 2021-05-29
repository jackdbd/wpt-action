import { getInput, info, startGroup, endGroup } from '@actions/core'
import type {
  Connectivity,
  Browser,
  LocationId
} from 'wpt-api-client/lib/es2015/types'
import type { Options } from 'wpt-api-client/lib/es2015/run-test'

export const booleanOrUndefined = (input: string): boolean | undefined => {
  switch (input) {
    case 'false': {
      return false
    }
    case 'true': {
      return true
    }
    default: {
      return undefined
    }
  }
}

export const positiveNumberOrUndefined = (
  input: string
): number | undefined => {
  const number = Number(input)
  if (number > 0) {
    return number
  } else {
    return undefined
  }
}

export const getAllOptionalInputs = (name: string): Options => {
  startGroup(`${name} Process optional inputs, set defaults`)

  let blockUrls: string[] | undefined = undefined
  const blockUrlsStr = getInput('block_urls')
  if (blockUrlsStr) {
    blockUrls = blockUrlsStr.trim().split('\n')
    info(`${name} INPUT[block_urls] = ${blockUrls.join(',')}`)
  }

  const browser = getInput('browser') as Browser | undefined
  if (browser) {
    info(`${name} INPUT[browser] = ${browser}`)
  }

  const captureTcpPackets = booleanOrUndefined(getInput('tcpdump'))
  if (captureTcpPackets) {
    info(`${name} INPUT[tcpdump] = true`)
  }

  const connectivity = getInput('connectivity') as Connectivity | undefined
  if (connectivity) {
    info(`${name} INPUT[connectivity] = ${connectivity}`)
  }

  const disableJavaScript = booleanOrUndefined(getInput('disable_javascript'))
  if (disableJavaScript) {
    info(`${name} INPUT[disable_javascript] = true`)
  }

  const emulateMobile = booleanOrUndefined(getInput('emulate_mobile'))
  if (emulateMobile) {
    info(`${name} INPUT[emulate_mobile] = true`)
  }

  const firstViewOnly = booleanOrUndefined(getInput('first_view_only'))
  if (firstViewOnly) {
    info(`${name} INPUT[first_view_only] = true`)
  }

  const isPrivate = booleanOrUndefined(getInput('private'))
  if (isPrivate) {
    info(`${name} INPUT[private] = true`)
  }

  const label = getInput('label')
  if (label) {
    info(`${name} INPUT[label] = ${label}`)
  }

  const locationId = getInput('location') as LocationId | undefined
  if (locationId) {
    info(`${name} INPUT[location] = ${locationId}`)
  }

  const pingback = getInput('pingback')
  if (pingback) {
    info(`${name} INPUT[pingback] = ${pingback}`)
  }

  const runs = positiveNumberOrUndefined(getInput('runs'))
  if (runs) {
    info(`${name} INPUT[runs] = ${runs}`)
  }

  const video = booleanOrUndefined(getInput('video'))
  if (video) {
    info(`${name} INPUT[video] = true`)
  }

  endGroup()

  return {
    blockUrls,
    browser,
    captureTcpPackets,
    connectivity,
    disableJavaScript,
    emulateMobile,
    firstViewOnly,
    isPrivate,
    label,
    locationId,
    pingback,
    runs,
    video
  }
}

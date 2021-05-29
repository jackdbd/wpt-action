import {
  booleanOrUndefined,
  getAllOptionalInputs,
  positiveNumberOrUndefined
} from '../src/helpers'

describe('booleanOrUndefined [unit]', () => {
  it('returns `true` `"true"`', () => {
    expect(booleanOrUndefined('true')).toBe(true)
  })

  it('returns `false` `"false"`', () => {
    expect(booleanOrUndefined('false')).toBe(false)
  })

  it('returns `undefined` `""` (empty string)', () => {
    expect(booleanOrUndefined('')).toBeUndefined()
  })
})

describe('positiveNumberOrUndefined [unit]', () => {
  it('returns a positive number for `"42"`', () => {
    expect(positiveNumberOrUndefined('42')).toBe(42)
  })

  it('returns undefined for `""` (empty string)', () => {
    expect(positiveNumberOrUndefined('')).toBeUndefined()
  })

  it('returns undefined for `"-42"`', () => {
    expect(positiveNumberOrUndefined('-42')).toBeUndefined()
  })
})

const NAME = 'test-input-helper'

describe('getAllOptionalInputs [unit]', () => {
  it('has each option either `""` or `undefined` when no optional inputs are provided', () => {
    const options = getAllOptionalInputs(NAME)

    expect(options.blockUrls).toBeUndefined()
    expect(options.browser).toBe('')
    expect(options.captureTcpPackets).toBeUndefined()
    expect(options.connectivity).toBe('')
    expect(options.disableJavaScript).toBeUndefined()
    expect(options.emulateMobile).toBeUndefined()
    expect(options.firstViewOnly).toBeUndefined()
    expect(options.isPrivate).toBeUndefined()
    expect(options.label).toBe('')
    expect(options.locationId).toBe('')
    // expect(options.pingback).not.toBe('') // I have an env variable for this
    expect(options.runs).toBeUndefined()
    expect(options.video).toBeUndefined()
  })
})

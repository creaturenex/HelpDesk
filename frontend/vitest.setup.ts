import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, expect } from 'vitest'
// different than in video
import * as matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers);

afterEach(() => {
  cleanup()
});
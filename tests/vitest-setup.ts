/// <reference types="vitest-dom/extend-expect" />
import "vitest-dom/extend-expect"
// vitest-setup.js
import * as matchers from "vitest-dom/matchers"
import "vitest-dom/extend-expect"
import { expect } from "vitest"
expect.extend(matchers)

export { expect }

# Basic Usage Example

This example demonstrates initializing the library and calling a core function.

```ts
import { initialize, doWork } from '<your-package>'

async function main() {
  const client = await initialize({ /* config */ })
  const result = await doWork('input')
  console.log(result)
}

main().catch(console.error)
```
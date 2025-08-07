# Advanced Flow Example

Demonstrates composing multiple APIs and handling errors.

```ts
import { initialize, fetchItems, transform, save } from '<your-package>'

async function run() {
  const client = await initialize({ retries: 3 })

  const items = await fetchItems({ limit: 50 })
  const output = transform(items)
  await save(output)
}

run().catch(err => {
  // Handle expected errors cleanly
  if (err.code === 'RATE_LIMIT') {
    console.error('Rate limited, try again later')
  } else {
    console.error(err)
  }
})
```
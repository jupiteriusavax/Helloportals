# Configuration

Document all configuration options and environment variables.

## Environment variables
- `EXAMPLE_API_KEY`: description
- `EXAMPLE_ENV`: description

## Configuration file
Provide a sample configuration file and explain each option.

```json
{
  "optionA": true,
  "optionB": "value",
  "nested": { "threshold": 0.9 }
}
```

## Programmatic configuration
```ts
import { initialize } from '<your-package>'

const client = await initialize({
  optionA: true,
  optionB: 'value',
})
```
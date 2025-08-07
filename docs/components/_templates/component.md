# <ComponentName>

- Category: `<form|data|layout|feedback|navigation|...>`
- Since: `<version>`
- Stability: `<stable|experimental|deprecated>`

## Description
What the component does and typical use cases.

## Props
- `propName` (Type, default: `value`): description

## Events
- `onChange(value: Type)`: when fired and payload

## Accessibility
Notes on ARIA roles, keyboard navigation, and WCAG considerations.

## Examples
### Basic
```tsx
import { <ComponentName> } from '<your-ui-lib>'

export default function Demo() {
  return <ComponentName propName="value" />
}
```

### Controlled
```tsx
function Example() {
  const [value, setValue] = useState('')
  return <ComponentName value={value} onChange={setValue} />
}
```

## See also
Related components.
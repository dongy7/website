import Code from '../components/post/Code'
import Snippet from '../components/post/Snippet'
import P from '../components/post/Paragraph'
import Link from '../components/post/Link'

export default Component => ({ children, ...props }) =>
  <Component
    {...props}
    components={{
      p: P,
      code: Snippet,
      inlineCode: Code,
      a: Link,
    }}
  >
    {children}
  </Component>

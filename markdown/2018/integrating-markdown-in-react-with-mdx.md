import LazyLoad from 'react-lazyload'
import Terminal from '../../components/post/Terminal'

The [Next](https://nextjs.org/) framework is great for creating websites with [React](https://reactjs.org/). In fact this [blog](https://github.com/dongy7/dongy7.github.io) is built with Next. But one thing that I have missed about using static site frameworks such as [Jekyll](https://jekyllrb.com/) is the ability to write content in Markdown. JSX syntax is nice for defining declarative components, but can be awkward to use when mixed with text. Here is an example from one of my previous posts written with JSX:

```
<P>
  We can see that the data that we're actually interested in, which are the <Code>ids</Code> of
  the articles is in the <Code>response</Code> field of the object. Since we are only interested
  in the <Code>response</Code> field, we can use the <Code>map</Code> operator:
</P>
```

As you can see JSX introduces breaks in the text and is hard to write even with editor integration for JSX. In comparison, the following is an equivalent markdown version:

```
We can see that the data that we're actually interested in, which are the `ids` of the articles
is in the `response` field of the object. Since we are only interested in the `response` field,
we can use the `map` operator:
```

Markdown feels much better to write for things like blog posts where the majority of the content is text. But how do we integrate Markdown with JSX? Fortunately, we can use the [MDX](https://github.com/mdx-js/mdx) library to render JSX in Markdown. First install the `MDX` library:

<LazyLoad height={120}>
  <Terminal
    lines={[
      {
        text: 'npm install --save-dev @mdx-js/loader @mdx-js/mdx',
        cmd: true
      }
    ]}
    interval={50}
    height={120}
  />
</LazyLoad>

or if you use [Yarn](https://yarnpkg.com/en/):

<LazyLoad height={120}>
  <Terminal
    lines={[
      {
        text: 'yarn add --dev @mdx-js/loader @mdx-js/mdx',
        cmd: true
      }
    ]}
    interval={50}
    height={120}
  />
</LazyLoad>


If you are using `Next`, add this to your `next.config.js` so that the `MDX` loader is used to load `jsx` and `md` files.

```
module.exports = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  webpack: (config, { defaultLoaders }) => {
    config.module.rules.push({
      test: /\.md$/,
      use: [
        defaultLoaders.babel,
        {
          loader: '@mdx-js/loader'
        }
      ]
    })

    return config
  }
}
```

If you are using `webpack`, then specify the `MDX` loader as follows:

```
module.exports = {
  module: {
    rules: [
      {
        test: /\.md$/,
        use: ['babel-loader', '@mdx-js/loader']
      }
    ]
  }
}
```

Next, compose your content and save it to a `markdown` file and just import it and use it like a normal React component:

```
import MyBlogPost from './MyBlogPost.md'

export default () =>
  <MyBlogPost />
```

If you are like me and have defined custom React components for things like code snippets, you can specify them through the `components` prop:

```
import MyBlogPost from './MyBlogPost.md'
import Snippet from '../components/Snippet'

export default () =>
  <MyBlogPost
    components={{
      code: Snippet
    }}
  />
```

That's all you need to do in order to start writing content in Markdown for your React powered websites! If you want to learn more about `MDX`, I encourage you to check out the [MDX project page](https://github.com/mdx-js/mdx).
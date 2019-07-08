This post assumes a basic understanding of [RxJS](http://reactivex.io/rxjs/).
If you don't then, I highly recommend you read the following [intro](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754) that gives you the basic idea behind Rx and observables.

Have you ever had to work with a complex query where you had to chain and
nest multiple promises in order to get the data you wanted? I can tell you
I have and it can get complex very quickly.

Consider this query: I want to get the second page of the top stories on
Hacker News where each page contains 30 posts. Now, Hacker News provides
an excellent real time [API](https://github.com/HackerNews/API), but how do we get
the specific posts that we want? The [endpoint](https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty), provided by Firebase simply gives us the id of the top 500 posts for a specific category.

Let's think about how we would accomplish this in Rx. First, we want to
create a stream of the top 500 post ids from the Firebase API. We can do
this with the `ajax` operator provided by `RxDom`.


```
const source = Rx.Observable
  .ajax('https://hacker-news.firebaseio.com/v0/topstories.json')`}
```
Let's subscribe to our observable and see what we get by logging to the
console:

```
source.subscribe(x => console.log(x))
```

You should see something like this:
```
[object Object] {
  originalEvent: [object Event] {
    AT_TARGET: 2,
    bubbles: false,
    BUBBLING_PHASE: 3,
    cancelable: false,
    cancelBubble: false,
    CAPTURING_PHASE: 1,
    composed: false,
    composedPath: function composedPath() { [native code] },
    currentTarget: [object XMLHttpRequest] { ... },
    defaultPrevented: false,
    eventPhase: 2,
    initEvent: function initEvent() { [native code] },
    isTrusted: true,
    NONE: 0,
    path: [],
    preventDefault: function preventDefault() { [native code] },
    returnValue: true,
    srcElement: [circular object XMLHttpRequest],
    stopImmediatePropagation: function stopImmediatePropagation() { [native code] },
    stopPropagation: function stopPropagation() { [native code] },
    target: [circular object XMLHttpRequest],
    timeStamp: 102.11500000000001,
    type: "readystatechange"
  },
  request: [object Object] {
    async: true,
    body: undefined,
    createXHR: function () {
                  return this.crossDomain ? getCORSRequest.call(this) : getXMLHttpRequest();
              },
    crossDomain: false,
    headers: [object Object] { ... },
    method: "GET",
    responseType: "json",
    timeout: 0,
    url: "https://hacker-news.firebaseio.com/v0/topstories.json",
    withCredentials: false
  },
  response: [14625795, 14626107, 14626295, ...],
  responseType: "json",
  status: 200,
  xhr: [circular object XMLHttpRequest]
}
```
We can see that the data that we're actually interested in, which are the
`ids` of the articles is in the `response` field of the object. Since we are only interested in the `response` field, we can use the `map` operator:

```
const source = Rx.Observable
  .ajax('https://hacker-news.firebaseio.com/v0/topstories.json')
  .map(res => res.response)
```

You should now see the list of all the IDs returned from the request.

```
[14625795, 14626107, 14626295, ...]
```

Now let's think about how we would filter the IDs so that we are working
with just the IDs that are in the range specified a page number and the
number of items per page. We could simply just fetch all of the articles
from the list of IDs and get the articles that we need using array
operations. However, using this approach, we are potentially throwing away
most of the data that we fetch.

Let's say we have a stream of post IDs. We'll also assume that a page
contains 30 posts and we want to get the post IDs for the second page. In
this scenario we want to skip the first 30 post IDs and get the next 30
post IDs. Conveniently, Rx provides the [skip](http://reactivex.io/documentation/operators/skip.html) operator to skip a specified number of items.

```
const itemsPerPage = 30
const page = 2

const source = Rx.Observable
  .ajax('https://hacker-news.firebaseio.com/v0/topstories.json')
  .map(res => res.response)
  .skip(itemsPerPage * (page - 1))
```


When we run this code, you'll see no output in the conole. Why? Remember
that we transformed our response into an array of IDs. We aren't dealing
with a stream of IDs but rather an array of IDs. So we need to create a
new Observable from the response array. We can accomplish this using the [from](http://reactivex.io/documentation/operators/from.html) operator.

```
const source = Rx.Observable
  .ajax('https://hacker-news.firebaseio.com/v0/topstories.json')
  .map(res => Rx.Observable.from(res.response))
  .skip(itemsPerPage * (page - 1))
```

Let's try running this code. Again, we get nothing logged to the console.
To see why, let's take a look at the second operator. We have mapped our
response array into another observable, but we have not subscribed to it.
In order to emit the items that are being emitted by our second
observable, we need to make use of the [flapMap](http://reactivex.io/documentation/operators/flatmap.html) operator. We are going to use a variant of `flatMap` called
`concatMap`. `concatMap` preserves the order of the
items emitted by the observable, which we need because we want to get a
certain part of the posts in the ordering.

```
const source = Rx.Observable
  .ajax('https://hacker-news.firebaseio.com/v0/topstories.json')
  .concatMap(res => Rx.Observable.from(res.response))
  .skip(itemsPerPage * (page - 1))
```

Now when we run the code, we get the IDs of posts excluding the first 30
items.

```
"14621347"
"14625257"
"14625653"
"14625736"
"14625302"
...
```

Now, we just need to get the number posts that are needed for a page. We
can use the [take](http://reactivex.io/documentation/operators/take.html) operator to get the first `n` elements from the stream.

```
const source = Rx.Observable
  .ajax('https://hacker-news.firebaseio.com/v0/topstories.json')
  .concatMap(res => Rx.Observable.from(res.response))
  .skip(itemsPerPage * (page - 1))
  .take(itemsPerPage)
```

You should now see 30 post IDs in the console.

```
"14624090"
"14620990"
"14625212"
"14618455"
"14618830"
"14612680"
"14618256"
"14622947"
"14621806"
"14624038"
"14625882"
"14623937"
"14622181"
"14617713"
"14618853"
"14618128"
"14624904"
"14619888"
"14619336"
"14623821"
"14619623"
"14624560"
"14623650"
"14618751"
"14625422"
"14622608"
"14620848"
"14620479"
"14621663"
"14619629"
```

Great, now that we have the IDs of the posts that we want to fetch, we
need to get the data associated with each post. We can use the item
endpoint provided by the Firebase API. We'll use the `ajax` operator to create a stream of response objects. Once again, we'll need to make use of the `concatMap` operator to merge an observable of observables into a single stream.

```
const source = Rx.Observable
  .ajax('https://hacker-news.firebaseio.com/v0/topstories.json')
  .concatMap(res => Rx.Observable.from(res.response))
  .skip(itemsPerPage * (page - 1))
  .take(itemsPerPage)
  .concatMap(id => Rx.Observable.ajax(`https://hacker-news.firebaseio.com/v0/item/${id}.json`))
  .map(res => res.response)
```

In the console, you should now see post objects corresponding to the IDs.

```
[object Object] {
  by: "kawera",
  descendants: 11,
  id: 14624090,
  kids: [14624882, 14626280, 14624880, 14625548],
  score: 38,
  time: 1498271415,
  title: "Voice and the uncanny valley of AI",
  type: "story",
  url: "http://ben-evans.com/benedictevans/2017/2/22/voice-and-the-uncanny-valley-of-ai"
}
...
```

To make it easy to consume the result of this stream, we'll merge all of
the post objects into a single array. We can accomplish this using the [scan](http://reactivex.io/documentation/operators/scan.html) operator. You can think of `scan` as a `reduce` where a function is applied to the item emitted by the observable then the result is emitted. In our case, we'll push items from stream onto an array.

```
const source = Rx.Observable
  .ajax('https://hacker-news.firebaseio.com/v0/topstories.json')
  .concatMap(res => Rx.Observable.from(res.response))
  .skip(itemsPerPage * (page - 1))
  .take(itemsPerPage)
  .concatMap(id => Rx.Observable.ajax(`https://hacker-news.firebaseio.com/v0/item/${id}.json`))
  .map(res => res.response)
  .scan((posts, post) => {
    posts.push(post)
    return posts
  }, [])
```

Taking a look at the output, you can see that posts are being accumulated
into a single array:

```
[[object Object] {
  by: "vinnyglennon",
  descendants: 52,
  id: 14623669,
  kids: [14624652, 14624755, 14624888, 14626483, 14624514, 14624426, 14624746, 14624715, 14625915, 14624579, 14625877, 14625655, 14625748, 14624911, 14625745],
  score: 130,
  time: 1498262659,
  title: "How did a 30 year-old Su-22 defeat a modern AIM-9X?",
  type: "story",
  url: "http://www.combataircraft.net/2017/06/23/how-did-a-30-year-old-su-22-defeat-a-modern-aim-9x/"
}]
[[object Object] {
  by: "vinnyglennon",
  descendants: 52,
  id: 14623669,
  kids: [14624652, 14624755, 14624888, 14626483, 14624514, 14624426, 14624746, 14624715, 14625915, 14624579, 14625877, 14625655, 14625748, 14624911, 14625745],
  score: 130,
  time: 1498262659,
  title: "How did a 30 year-old Su-22 defeat a modern AIM-9X?",
  type: "story",
  url: "http://www.combataircraft.net/2017/06/23/how-did-a-30-year-old-su-22-defeat-a-modern-aim-9x/"
}, [object Object] {
  by: "kawera",
  descendants: 11,
  id: 14624090,
  kids: [14624882, 14624880, 14626280, 14625548],
  score: 38,
  time: 1498271415,
  title: "Voice and the uncanny valley of AI",
  type: "story",
  url: "http://ben-evans.com/benedictevans/2017/2/22/voice-and-the-uncanny-valley-of-ai"
}]
...
```

We're only interested in the array containing all of the posts. We can use the [takeLast](http://reactivex.io/documentation/operators/takelast.html) operator, which takes the final `n` elements emitted by the observable.

```
const source = Rx.Observable
  .ajax('https://hacker-news.firebaseio.com/v0/topstories.json')
  .concatMap(res => Rx.Observable.from(res.response))
  .skip(itemsPerPage * (page - 1))
  .take(itemsPerPage)
  .concatMap(id => Rx.Observable.ajax(`https://hacker-news.firebaseio.com/v0/item/${id}.json`))
  .map(res => res.response)
  .scan((posts, post) => {
    posts.push(post)
    return posts
  }, [])
  .takeLast(1)
```
Now when you look at the output, you should see an array of post items
corresponding to the page number. I hope this example gave you an idea of
the things you can do with `Rx`. If you want to play around
with the example, you can checkout the [JSBin](http://jsbin.com/yezugex/edit?js,console).
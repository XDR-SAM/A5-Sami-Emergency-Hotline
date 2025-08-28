# DOM Manipulation Q&A

## What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

**getElementById** - Gets one element by ID. Fast and simple.

**getElementsByClassName** - Gets multiple elements by class name. Returns live collection that updates automatically.

**querySelector/querySelectorAll** - Uses CSS selectors. querySelector gets first match, querySelectorAll gets all matches. Returns static list.

## How do you create and insert a new element into the DOM?

Create element with `document.createElement()`, add content, then insert with `appendChild()` or `insertBefore()`.

```javascript
const div = document.createElement('nav');
div.textContent = 'Hello';
document.body.appendChild(nav);
```

## What is Event Bubbling and how does it work?

Events start at target element and bubble up through parent elements. Like clicking a button inside a div  button fires first, then div, then body.

## What is Event Delegation in JavaScript? Why is it useful?

Put one event listener on parent instead of many on children. Listen for events on parent and check what was actually clicked.

Useful because it uses less memory, works with new elements added later, and is faster.

## What is the difference between preventDefault() and stopPropagation() methods?

**preventDefault()** - Stops default browser action (like form submit or link click).

**stopPropagation()** - Stops event from bubbling up to parent elements.
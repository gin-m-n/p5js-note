import sketchList from './sketch'
import './style.css'

const app = document.getElementById("app") as HTMLElement
const path = location.pathname

if (path === "/") {
  app.innerHTML = `
    <ul>
      ${sketchList.map((sketch) => (`
      <li>
        <a href=${sketch.name}>${sketch.name}</a>
      </li>
      `)).join("")}
    </ul>
  `
} else {
  const sketch = sketchList.find(s => s.name === path.slice(1))
  if (sketch) {
    sketch.start(app)
  } else {
    app.innerHTML = `not found`
  }
}


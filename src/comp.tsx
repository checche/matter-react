/** https://www.fabiofranchino.com/blog/how-to-use-matter-js-in-react-functional-component/ */

import {Engine, Bodies,  Render, Composite, Runner} from "matter-js"

import { useEffect, useRef, } from "react"

/** composite */
export function Comp(){
  const scene = useRef()
  const engine = useRef(Engine.create())

  useEffect(() => {
    // mount
    const cw = document.body.clientWidth / 2
    const ch = document.body.clientHeight / 2

    const render = Render.create({
      element: scene.current,
      engine: engine.current,
      options: {
        width: cw,
        height: ch,
        wireframes: false,
        background: 'transparent'
      }
    })

    // boundaries
    Composite.add(engine.current.world, [
      Bodies.rectangle(cw / 2, -10, cw, 20, { isStatic: true }),
      Bodies.rectangle(-10, ch / 2, 20, ch, { isStatic: true }),
      Bodies.rectangle(cw / 2, ch + 10, cw, 20, { isStatic: true }),
      Bodies.rectangle(cw + 10, ch / 2, 20, ch, { isStatic: true })
    ])

    // run the engine
    Runner.run(engine.current)
    Render.run(render)

    // unmount
    return () => {
      // destroy Matter
      Render.stop(render)
      Composite.clear(engine.current.world,true)
      Engine.clear(engine.current)
      render.canvas.remove()
      console.log(render.canvas)
      render.canvas = null
      render.context = null
      render.textures = {}
    }
  }, [])

  const isPressed = useRef(false)

  const handleDown = () => {
    isPressed.current = true
  }

  const handleUp = () => {
    isPressed.current = false
  }

  const handleAddCircle = e => {
    if (isPressed.current) {
      const ball = Bodies.circle(
        e.clientX,
        e.clientY,
        10 + Math.random() * 30,
        {
          mass: 10,
          restitution: 0.9,
          friction: 0.005,
          render: {
            fillStyle: '#0000ff'
          }
        })
      Composite.add(engine.current.world, [ball])
    }
  }

  return (
    <div
        onMouseDown={handleDown}
        onMouseUp={handleUp}
        onMouseMove={handleAddCircle}
    >
        <div ref={scene} style={{ width: '100%', height: '100%' }} />
    </div>
  )
}

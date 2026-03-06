/**
 * Framer Code Component: Globe Morph with Property Panel
 *
 * HOW TO USE IN FRAMER:
 * 1. Host van-der-grinten-map.html (e.g. GitHub Pages)
 * 2. In Framer: Insert → Code → Create new component
 * 3. Paste this code, set GLOBE_URL to your hosted URL
 * 4. Drag the component onto the canvas
 * 5. Select it — Framer's Property Panel (right side) shows all controls
 *
 * @framerIntrinsicWidth 800
 * @framerIntrinsicHeight 450
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 */

import { useEffect, useRef } from "react"
import { addPropertyControls, ControlType } from "framer"

// Host your globe and put the full URL here. MUST be HTTPS (Framer blocks HTTP).
const GLOBE_URL = "https://tkartik.com/globe-to-flat-map/van-der-grinten-map.html"

const GLOBE_ORIGIN = new URL(GLOBE_URL).origin
const DEFAULTS = {
  hex: "#ffffff",
  ocean: "#000000",
  bg: "#000000",
  landOpacity: 1,
  globeOpacity: 0.5,
  density: 500,
  globeAlpha: 0.8,
}

function toHexColor(color) {
  if (!color) return null
  if (color.startsWith("#")) return color
  const h = toHex(color)
  return h ? "#" + h : null
}

function toHex(color) {
  if (!color) return ""
  if (color.startsWith("#")) return color.slice(1)
  const m = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
  if (!m) return ""
  const r = parseInt(m[1], 10).toString(16).padStart(2, "0")
  const g = parseInt(m[2], 10).toString(16).padStart(2, "0")
  const b = parseInt(m[3], 10).toString(16).padStart(2, "0")
  return r + g + b
}

export function GlobeMorph(props) {
  const iframeRef = useRef(null)
  const propsRef = useRef(props)

  const sendUpdate = (p) => {
    const iframe = iframeRef.current
    if (!iframe?.contentWindow) return
    const msg = {
      type: "globe-update",
      hex: toHexColor(p.hex) ?? DEFAULTS.hex,
      ocean: toHexColor(p.ocean) ?? DEFAULTS.ocean,
      bg: toHexColor(p.bg) ?? DEFAULTS.bg,
      landOpacity: p.landOpacity ?? DEFAULTS.landOpacity,
      globeOpacity: p.globeOpacity ?? DEFAULTS.globeOpacity,
      globeAlpha: p.globeAlpha ?? DEFAULTS.globeAlpha,
      density: p.density ?? DEFAULTS.density,
    }
    iframe.contentWindow.postMessage(msg, GLOBE_ORIGIN)
  }

  useEffect(() => {
    propsRef.current = props
    sendUpdate(props)
  }, [props.hex, props.ocean, props.bg, props.landOpacity, props.globeOpacity, props.globeAlpha, props.density])

  useEffect(() => {
    const onMessage = (e) => {
      if (e.origin === GLOBE_ORIGIN && e.data?.type === "globe-ready") sendUpdate(propsRef.current)
    }
    window.addEventListener("message", onMessage)
    return () => window.removeEventListener("message", onMessage)
  }, [])

  const handleLoad = () => {
    setTimeout(() => sendUpdate(propsRef.current), 200)
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        minWidth: 320,
        minHeight: 180,
        position: "relative",
        backgroundColor: "#0a0a0a",
        ...props.style,
      }}
    >
      <iframe
        ref={iframeRef}
        src={GLOBE_URL}
        onLoad={handleLoad}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          border: "none",
        }}
        title="Globe Morph"
      />
    </div>
  )
}

GlobeMorph.defaultProps = {
  hex: "#ffffff",
  ocean: "#000000",
  bg: "#000000",
  landOpacity: 1,
  globeOpacity: 0.5,
  density: 500,
  globeAlpha: 0.8,
}

addPropertyControls(GlobeMorph, {
  hex: {
    type: ControlType.Color,
    title: "Land Color",
    defaultValue: "#ffffff",
  },
  ocean: {
    type: ControlType.Color,
    title: "Ocean Color",
    defaultValue: "#000000",
  },
  bg: {
    type: ControlType.Color,
    title: "Background",
    defaultValue: "#000000",
  },
  landOpacity: {
    type: ControlType.Number,
    title: "Land Opacity",
    min: 0,
    max: 1,
    step: 0.05,
    defaultValue: 1,
  },
  globeOpacity: {
    type: ControlType.Number,
    title: "Globe Opacity",
    min: 0,
    max: 1,
    step: 0.05,
    defaultValue: 0.5,
  },
  density: {
    type: ControlType.Number,
    title: "Hex Density",
    min: 100,
    max: 800,
    step: 50,
    defaultValue: 500,
  },
  globeAlpha: {
    type: ControlType.Number,
    title: "Globe Core Alpha",
    min: 0,
    max: 1,
    step: 0.05,
    defaultValue: 0.8,
  },
})

import { useState, useEffect, useCallback } from "react"
import './index.css'
export default function ReactCalender(props) {
    const { onChange, valueMode = 'string', style = {}, cancalStyle = {}, selectStyle = {}, className = "", cancalTxt = 'cancel', selectTxt = 'select' } = props
    //const levelOneColorList = ['#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff']
    const [showPicker, setShowPicker] = useState(false)
    const [value, setValue] = useState('')
    const [color, setColor] = useState('#ff0000')
    const [levelOneLeft, setLevelOneLeft] = useState(0)
    const cancel = useCallback(() => {
        setShowPicker(false)
    }, [])

    const select = useCallback((value) => {
        setValue(value)
        onChange(value)
    }, [])

    const touchLevelOne = useCallback((e) => {
        if (e.changedTouches[0].clientX < 0 || e.changedTouches[0].clientX > window.screen.width * 0.95) {
            return false
        }
        const ratio = e.changedTouches[0].clientX / window.screen.width * 100
        const flag = e.changedTouches[0].clientX / window.screen.width * 5
        let result = ``
        if (ratio >= 0 && ratio <= 20) {
            result = `rgb(255,${Math.floor(0xff * flag)},0)`
        } else if (ratio >= 20 && ratio < 40) {
            result = `rgb(${Math.floor(0xff - 0xff * (flag - 1))},255,0)`
        } else if (ratio >= 40 && ratio < 60) {
            result = `rgb(0,255,${Math.floor(0xff * (flag - 2))})`
        } else if (ratio >= 60 && ratio < 80) {
            result = `rgb(0,${Math.floor(0xff - 0xff * (flag - 3))},255)`
        } else if (ratio >= 80 && ratio <= 100) {
            result = `rgb(${Math.floor(0xff * (flag - 4))},0,255)`
        }
        if (valueMode === 'string') {
            setColor(rgbToString(result))
        } else {
            setColor(result)
        }
        setLevelOneLeft(ratio)
    }, [])

    const rgbToString = (str) => {
        let result = ''
        if (str.indexOf("#") === 0) {
            result = str
        } else if (str.indexOf("rgb(") === 0) {
            const colors = str.replace(/rgb\(/g, "").replace(/\)/g, "").split(",")
            const r = parseInt(colors[0]).toString(16).length === 1 ? "0" + parseInt(colors[0]).toString(16) : parseInt(colors[0]).toString(16)
            const g = parseInt(colors[1]).toString(16).length === 1 ? "0" + parseInt(colors[1]).toString(16) : parseInt(colors[1]).toString(16)
            const b = parseInt(colors[2]).toString(16).length === 1 ? "0" + parseInt(colors[2]).toString(16) : parseInt(colors[2]).toString(16)
            result = `#${r}${g}${b}`
        }
        return result
    }
    const stringToRgb = (str, mode = "string") => {
        const template = str.toLowerCase()
        let result = ''
        if (template.indexOf("rgb(") === 0) {
            result = template
        } else if (template.indexOf("rgba(") === 0) {
            const colors = template.replace(/rgba\(/g, "").replace(/\)/g, "").split(",")
            const r = colors[0]
            const g = colors[1]
            const b = colors[2]
            result = `rgb(${r},${g},${b})`
        } else if (template.indexOf("#") === 0) {
            let colors = template.replace(/#/g, "")
            let resultArr = []
            if (colors.length === 3) {
                colors = colors.replace(/[0-9a-f]/g, (str) => {
                    return str + str
                })
            }
            for (let i = 0; i < colors.length; i += 2) {
                resultArr.push(parseInt(colors[i] + colors[i + 1], 16))
            }
            result = `rgb(${resultArr.join(",")})`
        }
        if (mode === "string") {
            return result
        } else if (mode === "array") {
            return result.replace(/rgb\(/g, "").replace(/\)/g, "").split(",")
        }
    }
    return (
        <>
            <input className={className} type="text" defaultValue={value} style={style} onClick={() => setShowPicker(true)} />
            <div className="react-color-picker-content" style={!showPicker ? { display: "none" } : {}}>
                <div className="react-color-picker-header">
                    <div className="react-color-picker-header-cancel" onClick={() => cancel()} style={cancalStyle}>{cancalTxt}</div>
                    <div className="react-color-picker-header-select" onClick={() => select(color)} style={selectStyle}>{selectTxt}</div>
                </div>
                <div className="react-picker-body">
                    <div className="react-color-list-level-one" onTouchMove={(e) => touchLevelOne(e)}>
                        <div
                            className="react-color-list-level-one-slider"
                            style={{ left: `${levelOneLeft}%`, backgroundColor: color }}
                        ></div>
                    </div>
                    <div className="react-color-list-level-two">

                    </div>
                </div>
            </div>
        </>
    )
}
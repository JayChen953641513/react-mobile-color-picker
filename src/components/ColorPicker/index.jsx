import { useState, useEffect, useCallback } from "react"
import { rgbToString } from '../../utils/index'
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
import React, { forwardRef, useEffect, useState } from 'react'
import withClickOutside from './WithClickOutside'
// import './MenuDropdown.css'
const dropdownSvg = '/assets/dropdown_black.svg'

const MenuDropdown = forwardRef((props, ref) => {
    const {
        items,
        label,
        itemText = 'label',
        placeholder,
        dropdownWidth = 220,
        dropdownStyles = {},
        dropdownTriggerStyles = {},
        onSelect,
        inputClass,
        hideDropdownIcon = false,
        open,
        setOpen,
        inputWidth
    } = props || {}

    const [query, setQuery] = useState('')
    const [list, setList] = useState([])

    useEffect(() => {
        setQuery(label || '')
    }, [])

    useEffect(() => {
        if (!query || (query && !query.trim())) {
            setList(items)
            onSelect(null)
        }
    }, [query])

    useEffect(() => {
        setList(state => items)
    }, [items])

    // useEffect(() => {
    //     if (open && (query !== label)) filterList(query || label)
    //     if (!open) setQuery(label)
    // }, [open])

    const toggleMenu = (evt) => {
        setOpen(!open)
    }

    const onSelectItem = (item) => {
        const value = item.hasOwnProperty(itemText) ? item[itemText] : item
        setQuery(value)
        onSelect(value)
        setOpen(false)
    }

    const onSearch = (evt) => {
        if (!open) setOpen(true)

        const value = evt.target.value
        setQuery(value)

        if (value && value.trim()) filterList(value)
    }

    const filterList = (value) => {
        const data = items.filter(item => {
            const val = item.hasOwnProperty(itemText) ? item[itemText] : item
            if (!val || (val && !val.trim())) return item
            if (!value || (value && !value.trim())) return item

            return val.toLowerCase().includes(value.toLowerCase()) ? item : null
        })

        setList(data)
    }

    const inputStyles = {
        outline: 'none',
        border: 'none',
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent'
    }

    const menuList = () => {
        return (
            <ul
                className={`c-menu-dropdown__list ${open ? 'c-menu-dropdown--show' : 'c-menu-dropdown--hide'} p-0 m-0`}
                style={{ width: dropdownWidth + 'px', transition: '0.4s all', ...dropdownStyles }}>
                <>
                    {
                        !list.length ? (
                            <li className="c-menu-dropdown__list-item cursor-pointer">
                                No Data Found
                            </li>
                        ) : (
                            list.map((i, index) => (
                                <li key={index} onClick={() => onSelectItem(i)} className="c-menu-dropdown__list-item cursor-pointer" style={{ borderTop: index !== 0 ? '1px solid #f6f6f6' : 'none' }}>
                                    {i.hasOwnProperty(itemText) ? i[itemText] : i}
                                </li>
                            ))
                        )
                    }
                </>
            </ul>
        )
    }

    return (
        <div className="c-menu-dropdown position-relative" ref={ref}>
            <div
                onClick={(evt) => toggleMenu(evt)}
                className="c-menu-dropdown__trigger cursor-pointer d-flex align-items-center justify-content-between"
                style={{ userSelect: 'none', width: inputWidth && inputWidth.includes('%') ? inputWidth : inputWidth + 'px', ...dropdownTriggerStyles }}
            >
                <input
                    type="text"
                    placeholder={placeholder}
                    className={inputClass}
                    style={{ ...inputStyles }}
                    value={query || ''}
                    onChange={onSearch}
                />
                {!hideDropdownIcon ? (
                    <img src={dropdownSvg} className={`dropdown ${open ? 'c-menu-dropdown--icon-open' : 'c-menu-dropdown--icon-close'}`} alt="dropdownSvg" />
                ) : null}
            </div>
            {menuList()}
        </div>
    )
})

export default withClickOutside(MenuDropdown)

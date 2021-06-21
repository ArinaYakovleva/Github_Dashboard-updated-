import * as React from "react";
import { Input, Button } from 'antd';
import styles from './Header.module.scss'
import './Header.scss'

interface HeaderProps{
    onSetText: (value: string) => void
    showForm: boolean
}

export function Header(props: HeaderProps){
    const {onSetText, showForm} = props
    const [searchText, setSearchText] = React.useState('')

    return(
        <div className={styles.header}>
        <div className={styles.iconWrapper}>
            <img src='https://image.flaticon.com/icons/svg/25/25231.svg' alt='github icon' className={styles.icon}/>
            <header style={{paddingLeft:'20px'}}>Github Dashboard</header>
        </div>
        {
            showForm && (
                <Input className={styles.searchInput} placeholder="Type the name of repository" onChange={(e: any) => {
                    const { value } = e.target
                    setSearchText(value)
                    onSetText(value)
                }}/> 
            )
        }
        </div>
    )
}
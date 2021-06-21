import * as React from "react";
import { Link } from 'react-router-dom'
import { Table, Button } from 'antd';
import styles from './ReposList.module.scss'
import moment from 'moment'
import './ReposList.scss'

interface Props{
    repos: any
    searchText: string
    onSetCurrentName: (url: string, name: string) => void
}

export function ReposList(props: Props){
    const { repos, searchText, onSetCurrentName } = props
    console.log('searchText', searchText);
    
    const columns = [
        {
            title: 'Name',
            dataIndex: 'owner',
            render: (owner: any, record: any) => {
                return(
                    <Link to={`/${record.owner.login}`}onClick={() => {
                        onSetCurrentName(record.contributors_url, record.owner.login)
                    }}>
                        <p style={{color: '#FFFF', textDecoration: 'underline'}}>{record.owner.login}</p>
                    </Link>
                
                )
            }
        },
        {
            title: 'Stars',
            dataIndex: 'stargazers_count',
            render: (stargazers_count: number, record: any) => {
                return(
                    <div>{record.stargazers_count}</div>
                )
            }
        },
        {
            title: 'Latest commit',
            dataIndex: 'pushed_at',
            render: (pushed_at: any, record: any) => {
                const formattedDate = record.pushed_at.split('T')[0].split('-')
                const lastCommit = `${formattedDate[2]}.${formattedDate[1]}.${formattedDate[0]}`
                return(
                    <div>{lastCommit}</div>
                )
            }
        },
        {
            title: 'Profile link',
            dataIndex: 'profileLink',
            render: (profileLink: any, record: any) => {
                return(
                     <Button style={{color: '#FFFF', textDecoration:'underline'}} type="link" href={record.owner.html_url}>Profile</Button>
                )
            }
        }

    ]
    return(
        <div className={styles.reposList}>
            <Table dataSource={repos && repos.items !== undefined ? repos.items.filter((item:any) => {
                if(searchText === ''){
                    return item
                }else if(item.owner.login.toLowerCase().includes(searchText.toLocaleLowerCase())){
                    return item
                }
            }) : null}
                bordered={false}
                columns={columns}
                style={{ width: '85%', margin: '0 auto' }}
            />           
        </div>
    )
}
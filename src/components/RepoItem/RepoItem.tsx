import * as React from "react";
import {Button, Card} from 'antd'
import styles from './RepoItem.module.scss'

interface RepoItemProps{
    contributors: any,
    repos: any,
    name: string,
    languages: any
}
export function RepoItem(props: RepoItemProps) {
    console.log(props);
    const {contributors, repos, name, languages} = props

    const currentRepo = repos && repos.items ? repos.items.find((item: any)=> item.owner.login === name) : null
    const formattedDate = currentRepo ? currentRepo.pushed_at.split('T')[0].split('-') : null
    const lastCommit = currentRepo ? `${formattedDate[2]}.${formattedDate[1]}.${formattedDate[0]}` : null
    const mostActiveContributors = contributors ? contributors.filter((item: any, index: number) => index <= 10) : null
    let activeContributors = ""
    let allLanguages = ""

    mostActiveContributors.forEach((contributor: any )=> {
        activeContributors += `${contributor.login}, `
    })

    Object.keys(languages).forEach(key => {
        allLanguages += `${key}, `
    })

    return(
        <div>
            {
                currentRepo && (
                    <Card className={styles.repoItemContainer} hoverable style={{width: '60%', margin: '0 auto', marginTop:'200px'}}
                    cover={<img style={{height: '250px', width: '350px', padding: '10px', margin: '0 auto'}} src={currentRepo.owner.avatar_url} alt="avatar" />}
                    >
                        <p className={styles.repoItemText} style={{textAlign: 'center'}}>Repository: {currentRepo.owner.login} - Stars: {currentRepo.stargazers_count} - Last commit: {lastCommit}</p>
                        <Button style={{marginLeft: '30px'}} className={styles.repoItemText} type="link" href={currentRepo.html_url}>Github profile: {currentRepo.owner.login}</Button>
                        <p className={styles.repoItemText}>"{currentRepo.description}"</p>
                        <p className={styles.repoItemText}>Contributors: {activeContributors}</p>
                        <p className={styles.repoItemText}>Languages: {allLanguages}</p>
                    </Card>
                )
            }

        </div>
    )
}
import Layout from '../../components/Layout'
import { List, Avatar, Skeleton, Divider } from 'antd';
import React, { useEffect, useState } from 'react';
import './index.css'

function IM() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([])

    const loadMoreData = () => {
        if (loading) {
            return;
        }

        setLoading(true)

        fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
            .then(res => res.json())
            .then((body) => {
                setData([...data, ...body.results]);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        console.log(111)
        loadMoreData()
    }, [])


    return (
        <Layout>
            <div className='container'>
                <div className='friend' style={{ float: 'left' }}>
                    <h2 >好友列表</h2>
                    <div
                        id="scrollableDiv"
                        className='scrollableFriend'
                    >
                        <List
                            dataSource={data}
                            renderItem={(item) => (
                                <List.Item key={item.email}>
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.picture.large} />}
                                        title={<a href="https://ant.design">{item.name.last}</a>}
                                        description={item.email}
                                    />
                                    <div>Content</div>
                                </List.Item>
                            )}
                        />
                    </div>
                </div>
            </div>


        </Layout>
    )
}

export default IM
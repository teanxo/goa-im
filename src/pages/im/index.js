import Layout from '../../components/Layout'
import { List, Avatar, Button, Row, Col, Card, Input, Space, Badge } from 'antd';
import React, { useEffect, useState } from 'react';
import { AudioOutlined, SmileTwoTone, VideoCameraOutlined } from '@ant-design/icons'
import './index.css'

function IM() {
    const [loading, setLoading] = useState(false);
    // 好友列表
    const [friendData, setFriendData] = useState([])
    // 文本框输入值
    const [inputValue, setInputValue] = useState('')
    // 消息记录
    const [messages, setMessages] = useState([])
    // 当前聊天对象
    const [currentFriend, setCurrentFriend] = useState(null)

    const renderChatTitle = () => {
        if (!currentFriend) return '暂无聊天对象'
        return '聊天对话-' + currentFriend.name.last
    }

    // 输入框输入事件
    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    // 消息发送事件
    const sendMessage = () => {
        if (!inputValue.trim()) return
        setMessages([...messages, inputValue])
        setInputValue('')
    }

    // 好友点击事件
    const friendClick = (item) => {
        setCurrentFriend(item)
    }

    const loadMoreFriendData = () => {
        if (loading) {
            return;
        }

        setLoading(true)

        fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
            .then(res => res.json())
            .then((body) => {
                setFriendData([...friendData, ...body.results]);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        loadMoreFriendData()
    }, [])

    return (
        <Layout>
            <div className='container'>
                <Row>
                    <Col span={6}>
                        <Card
                            title="好友列表"
                            extra={(
                                <a href='' >...</a>
                            )}
                        >
                            <div className='friendList'>
                                <List
                                    dataSource={friendData}
                                    renderItem={(item) => (
                                        <List.Item key={item.email}>
                                            <List.Item.Meta
                                                avatar={
                                                    <Badge count={99}>
                                                        <Avatar src={item.picture.large} />
                                                    </Badge>
                                                }
                                                title={<a>{item.name.last}</a>}
                                                description={item.email}
                                                onClick={() => friendClick(item)}
                                            />
                                        </List.Item>
                                    )}
                                >
                                </List>
                            </div>
                        </Card>
                    </Col>
                    <Col span={18}>
                        <Card
                            title={renderChatTitle()}>
                            <div className='chatContainer'>
                                <List
                                    split={false}
                                    style={{ height: '100%' }}
                                    dataSource={messages}
                                    renderItem={message => (
                                        <List.Item>
                                            <div className='chatItem'>
                                                <Avatar
                                                    size={40}
                                                    src="https://randomuser.me/api/portraits/men/99.jpg"
                                                    className='chatItemAvatar'
                                                />
                                                <div style={{flex: 1, minWidth:0}}>
                                                    <div className='chatItemNickName'>用户昵称</div>
                                                    <div className='chatContent'>{message}</div>
                                                </div>
                                            </div>
                                        </List.Item>
                                    )}
                                />
                            </div>

                            <div className='chatOperation'>
                                <Row>
                                    <Col span={4} style={{ display: 'flex' }}>
                                        <Button
                                            type='primary'
                                            icon={<VideoCameraOutlined />}
                                            style={{ flex: 1 }}
                                        ></Button>
                                        <Button type='primary' icon={<AudioOutlined />} style={{ flex: 1 }}></Button>
                                        <Button type='primary' icon={<SmileTwoTone />} style={{ flex: 1 }}></Button>
                                    </Col>
                                    <Col span={20}>
                                        <Space.Compact style={{ width: '100%' }}>
                                            <Input placeholder='请输入聊天内容' onChange={handleInputChange} value={inputValue} />
                                            <Button type="primary" onClick={sendMessage}>发送</Button>
                                        </Space.Compact>
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>


        </Layout>
    )
}

export default IM
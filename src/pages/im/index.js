import Layout from '../../components/Layout'
import { List, Avatar, Button, Row, Col, Card, Input, Space, Badge } from 'antd';
import React, { useEffect, useState } from 'react';
import { AudioOutlined, SmileTwoTone, VideoCameraOutlined, CameraOutlined } from '@ant-design/icons'
import './index.css'

const loginUUID = "217481278101284012"

function IM() {
    const [loading, setLoading] = useState(false);
    // 好友列表
    const [friendData, setFriendData] = useState([])
    // 文本框输入值
    const [inputValue, setInputValue] = useState('')
    // 消息记录
    const [messages, setMessages] = useState([
        { loginUUID: "217481278101284012", text: "你好！" },
        { loginUUID: "328932582975283592", text: "嗨，你好！" },
        // ... 其他消息
    ])
    // 当前聊天对象
    const [currentFriend, setCurrentFriend] = useState(null)

    const renderChatTitle = () => {
        if (!currentFriend) return '暂无聊天对象'
        return '聊天对话-' + currentFriend.name.last
    }

    const renderMessageItem = (message) => {
        const isMyMessage = message.loginUUID === loginUUID;

        const messageStyle = {
            alignSelf: isMyMessage ? 'flex-end' : 'flex-start',
            backgroundColor: isMyMessage ? '#daf8cb' : '#f1f0f0',
            borderRadius: '10px',
            padding: '8px',
            maxWidth: '60%',
            wordWrap: 'break-word',
            wordBreak: 'break-all',
            margin: '4px 0',
        };

        return (
            <div style={{ display: 'flex', width: '100%', justifyContent: isMyMessage ? 'flex-end' : 'flex-start' }}>
                {!isMyMessage && <Avatar src="https://randomuser.me/api/portraits/men/99.jpg" style={{ marginRight: '10px' }} />}
                <div style={messageStyle}>{message.text}</div>
                {isMyMessage && <Avatar src="https://randomuser.me/api/portraits/men/99.jpg" style={{ marginLeft: '10px' }} />}
            </div>
        );
    }

    // 输入框输入事件
    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    // 消息发送事件
    const sendMessage = () => {
        if (!inputValue.trim()) return
        setMessages([...messages, {loginUUID: loginUUID, text: inputValue}])
        setInputValue('')
    }

    // 好友点击事件
    const friendClick = (item) => {
        setCurrentFriend(item)
    }

    // 加载好友列表
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
                                {messages.map((message, index) => (
                                    <div key={index}>
                                        {renderMessageItem(message)}
                                    </div>
                                ))}

                                {/* <List
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
                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                    <div className='chatItemNickName'>用户昵称</div>
                                                    <div className='chatContent'>{message}</div>
                                                </div>
                                            </div>
                                        </List.Item>
                                    )}
                                /> */}
                            </div>

                            <div className='chatOperation'>
                                <Row>
                                    <Col span={4} style={{ display: 'flex' }}>
                                        <Space.Compact block>
                                            <Button type='primary' icon={<AudioOutlined />} style={{ flex: 1 }}></Button>
                                            <Button type='primary' icon={<VideoCameraOutlined />} style={{ flex: 1 }}></Button>
                                            <Button type='primary' icon={<CameraOutlined />} style={{ flex: 1 }}></Button>
                                            <Button type='primary' icon={<SmileTwoTone />} style={{ flex: 1 }}></Button>
                                        </Space.Compact>

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
import WebLayout from "../../components/Layout"
import { List, Button, Row, Input, Space, Avatar, Tabs } from "antd"
import "./index.css"
import Search from "antd/es/input/Search"
import { useState } from "react"


const Friend = () => {

    const [firendList, setFriendData] = useState([
        {
            title: 'Ant Design Title 1',
        },
        {
            title: 'Ant Design Title 2',
        },
        {
            title: 'Ant Design Title 3',
        },
        {
            title: 'Ant Design Title 4',
        },
    ])


    // 好友列表
    const friendListView = (
        <div className="friendView">
            <Search placeholder="请输入用户昵称/UUID进行搜索" />
            <List
                style={{ margin: '10px' }}
                dataSource={firendList}
                renderItem={(item, index) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={
                                <Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />
                            }
                            title={<a href="/im">{item.title}</a>}
                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        />
                    </List.Item>
                )}
            />
        </div>
    )

    // 添加好友
    const addFriendView = (
        <div className="addFriend">
            <Search placeholder="请输入用户昵称/UUID进行搜索" />
            <div className="addRecommend">
                <h3>为您推荐好友</h3>
                <List
                    style={{ margin: '10px' }}
                    dataSource={firendList}
                    renderItem={(item, index) => (
                        <List.Item
                            extra={(
                                <Button type="link">添加好友</Button>
                            )}>
                            <List.Item.Meta
                                avatar={
                                    <Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />
                                }
                                title={<a href="/im">{item.title}</a>}
                                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                            />
                        </List.Item>
                    )}
                />
            </div>
        </div>
    )


    const [tabList, setTabList] = useState([
        {
            label: '我的好友',
            key: 0,
            children: friendListView
        },
        {
            label: '添加好友',
            key: 1,
            children: addFriendView
        }
    ])


    return (
        <WebLayout>
            <div className="webContainer">
                <Tabs
                    tabPosition='left'
                    items={tabList} />
            </div>
        </WebLayout>
    )
}

export default Friend
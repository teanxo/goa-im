import IM from '../pages/im/index.js'
import About from '../pages/about/index.js'
import Friend from '../pages/friend/index.js'


export default  [
    {
        path: "/friend",
        element: <Friend />
    },
    {
        path: "/im",
        element: <IM />
    },
    {
        path: "/about",
        element: <About />
    }
]
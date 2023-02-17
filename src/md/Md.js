import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

const Md = (props) => {
    const [mdText, setMdText] = useState('')
    useEffect(() => {
        fetch(props.src).then(res => res.text()).then(text => setMdText(text))
    })

    return (<ReactMarkdown className="md" children={mdText} />)
}

export default Md;

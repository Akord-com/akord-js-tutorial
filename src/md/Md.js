import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

const Md = (props) => {
    const [mdText, setMdText] = useState('')
    useEffect(() => {
        fetch(props.src).then(res => res.text()).then(text => setMdText(text))
    })

    console.log(mdText)

    return <ReactMarkdown className='md'>{mdText}</ReactMarkdown>
    return (<ReactMarkdown className="md" source={mdText} />)
}

export default Md;

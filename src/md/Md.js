import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

const Md = (props) => {
    const [mdText, setMdText] = useState('')
    useEffect(() => {
        fetch(props.src).then(res => res.text()).then(text => setMdText(text))
    })

    console.log(mdText)

    const markdown = `
  # Header 1
  ## Header 2

  _ italic _

  ** bold **

  <b> bold Html </b>
  `;
    return <pre>{mdText}</pre>
    return (<ReactMarkdown className="md" source={markdown} />)
}

export default Md;

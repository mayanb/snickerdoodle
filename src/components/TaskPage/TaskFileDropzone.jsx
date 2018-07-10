import React from 'react'
import Dropzone from 'react-dropzone'
import { List } from 'antd'
import Img from '../Img/Img'
import './styles/taskfiledropzone.css'

export default class TaskFileDropzone extends React.Component {
    constructor(props) {
        super(props)
        this.state = { className: 'dropzone' }
        this.handleDrop = this.handleDrop.bind(this)
        this.handleDragEnter = this.handleDragEnter.bind(this)
        this.handleDragLeave = this.handleDragLeave.bind(this)
    }

    render() {
        const { files } = this.props.task
        return (
            <section className='dropzone-container'>
                <Dropzone className={this.state.className} onDrop={this.handleDrop} onDragEnter={this.handleDragEnter} onDragLeave={this.handleDragLeave}>
                    <Img useExtension src='plus.svg' />
                    <div>Drag a file here to attach it.</div>
                </Dropzone>
                <aside>
                    <List className='file-list'
                        size='small'
                        locale={{emptyText: 'No Files'}}
                        bordered 
                        dataSource={files}
                        renderItem={this.FileDownloadLink}
                    />
                </aside>
            </section>
        );
    }

    FileDownloadLink(f) {
        return (
            <List.Item style={{overflow: 'scroll'}} >
                <a href={`https://${f.url}`}>{f.name}</a>
            </List.Item>
        )
    }

    handleDrop(files) {
        this.setState({ className: 'dropzone' })
        this.props.onDropFiles(files)
    }

    handleDragEnter() {
        this.setState({ className: 'dropzone active' })
    }

    handleDragLeave() {
        this.setState({ className: 'dropzone' })
    }
}


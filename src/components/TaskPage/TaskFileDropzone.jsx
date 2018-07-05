import React from 'react'
import Dropzone from 'react-dropzone'
//import * as actions from './TaskActions'
import { List } from 'antd'
import Img from '../Img/Img'
import './styles/taskfiledropzone.css'

export default class TaskFileDropzone extends React.Component {

    constructor(props) {
        super(props)
        this.state = { className: 'dropzone' }
        this.onDrop = this.onDrop.bind(this)
        this.onDragEnter = this.onDragEnter.bind(this)
        this.onDragLeave = this.onDragLeave.bind(this)
    }

    render() {
        const { files } = this.props.task
        return (
            <section>
                <div className='dropzone-container'>
                    <Dropzone className={this.state.className} onDrop={this.onDrop} onDragEnter={this.onDragEnter} onDragLeave={this.onDragLeave}>
                        <Img useExtension src='plus.svg' />
                        <div>Drag a file here to attach it.</div>
                    </Dropzone>
                </div>
                <aside>
                    <List className='file-list'
                        size='small'
                        locale={ {emptyText: 'No Files'} }
                        bordered 
                        dataSource={files}
                        renderItem={f => (<List.Item><a href={f.url}>{f.name}</a></List.Item>)}
                    />
                </aside>
            </section>
        );
    }

    onDrop(files) {
        this.setState({ className: 'dropzone' })
        this.props.onDropFiles(files)
    }

    onDragEnter() {
        this.setState({ className: 'dropzone active' })
    }

    onDragLeave() {
        this.setState({ className: 'dropzone' })
    }

    getDropzone() {
        return 
    }
}


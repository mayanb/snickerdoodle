import React from 'react'
import Dropzone from 'react-dropzone'

export default class TaskFileDropzone extends React.Component {

    constructor() {
        super()
        this.state = { files: [] }
    }

    render() {
        return (
            <section>
                <div className="dropzone">
                <Dropzone onDrop={this.onDrop.bind(this)}>
                    <p>Drag a file here to attach it.</p>
                </Dropzone>
                </div>
                <aside>
                    <h2>Dropped files</h2>
                    <ul>
                        {
                        this.state.files.map(f => <li key={f.name}>{f.name}</li>)
                        }
                    </ul>
                </aside>
            </section>
        );
    }

    onDrop(files) {
        this.props.onDropFile(files)
        console.log(this.props)
        this.setState({
            files
        });
    }
}


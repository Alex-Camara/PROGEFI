'use strict'

class Template {
    constructor() {
        this.id = null
        this.name = null
        this.height = null
        this.width = null
        this.height = null
        this.backgroundColor = null
        this.fontColor = null
        this.samplePath = null
        this.tags = []
        this.layout = []
    }
    setTemplate(template) {
        this.id = template.id
        this.name = template.name
        this.height = template.height
        this.width = template.width
        this.samplePath = template.samplePath
        this.fontColor = template.fontColor
        this.backgroundColor = template.backgroundColor
    }
    setSamplePath(samplePath) {
        this.samplePath = samplePath
    }
    setId(id) {
        this.id = id
    }
    setTags(tags) {
        this.tags = tags
    }
    setLayout(layout) {
        this.layout = layout
    }
    getName() {
        return this.name
    }
    getId() {
        return this.id
    }
    getSamplePath() {
        return this.samplePath
    }
}

export default Template
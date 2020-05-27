import { prop, required } from '@rxweb/reactive-form-validators'

export class Todo {
    @prop({ defaultValue:"5ece13151bfb44ab95f2cea0"})
    _id?: string
    @required()
    Desc: string
    @prop()
    Img?: string
    @prop()
    Done: boolean
    @required()
    Deadline: Date
}
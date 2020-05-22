import { prop, required } from '@rxweb/reactive-form-validators'

export class Todo {
    ID?: string
    @required()
    Desc: string
    @prop()
    Img?: string
    @prop()
    Done: boolean
    @required()
    Deadline: Date
}
import { prop, required } from '@rxweb/reactive-form-validators'

export class Todo {
    ID?: string
    @required()
    Desc: string
    @prop()
    Img?: string
    @required()
    Done: boolean
    @required()
    Deadline: Date
}

export interface Id {
    _data: string;
}

export interface Timestamp {
    t: string;
    i: string;
}

export interface ClusterTime {
    $timestamp: Timestamp;
}

export interface Id2 {
    $oid: string;
}

export interface FullDocument {
    _id: Id2;
    Desc: string;
    Img: string;
    Done: boolean;
    Deadline: Date;
}

export interface Ns {
    db: string;
    coll: string;
}

export interface Id3 {
    $oid: string;
}

export interface DocumentKey {
    _id: Id3;
}

export interface UpdatedFields {
    Desc: string;
}

export interface UpdateDescription {
    updatedFields: UpdatedFields;
    removedFields: any[];
}

export interface ChangeEvents {
    _id: Id;
    operationType: string;
    clusterTime: ClusterTime;
    fullDocument: FullDocument;
    ns: Ns;
    documentKey: DocumentKey;
    updateDescription: UpdateDescription;
}